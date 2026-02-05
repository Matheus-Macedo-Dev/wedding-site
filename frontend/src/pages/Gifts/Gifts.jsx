import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGifts, createCheckout, uploadPhoto } from '@/services/api';
import GiftList from '@/components/features/GiftList';
import PhotoUploadModal from '@/components/features/PhotoUploadModal';
import Loader, { Spinner } from '@/components/common/Loader';

export default function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoModal, setPhotoModal] = useState({ isOpen: false, giftId: null });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGifts();
      setGifts(response.data);
    } catch (err) {
      console.error('Error fetching gifts:', err);
      setError('Não foi possível carregar os presentes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (giftId) => {
    try {
      // Check if this is the special gift
      const gift = gifts.find(g => g.id === giftId);
      if (gift?.name === "Presenteou? Virou destaque no nosso site. 🏆") {
        // Open photo upload modal instead of directly checking out
        setPhotoModal({ isOpen: true, giftId });
        setPendingCheckout(giftId);
        return;
      }

      // Regular checkout for other gifts
      await proceedToCheckout(giftId);
    } catch (err) {
      // Handle version conflicts
      if (err.response?.status === 409) {
        alert('Este presente foi modificado por outro usuário. Atualizando a lista...');
        await fetchGifts(); // Refresh the gift list
      } else {
        console.error('Error creating checkout:', err);
        alert('Não foi possível processar o pagamento. Tente novamente.');
      }
    }
  };

  const proceedToCheckout = async (giftId, imageUrl = null) => {
    // Get the gift to access its version
    const gift = gifts.find(g => g.id === giftId);
    if (!gift) {
      throw new Error('Gift not found');
    }

    // For special gift with uploaded image, pass it through metadata
    const response = await createCheckout(giftId, gift.version, imageUrl || uploadedImageUrl);
    // Redirect to Mercado Pago checkout
    window.location.href = response.data.initPoint;
  };

  const handlePhotoUpload = async (file) => {
    try {
      setUploadLoading(true);

      // Create FormData with the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('giftId', pendingCheckout);

      // Upload photo to backend
      const response = await uploadPhoto(formData);
      const data = response.data;

      // Store the image URL for later use in checkout
      setUploadedImageUrl(data.imageUrl);

      // Close modal and proceed to checkout
      setPhotoModal({ isOpen: false, giftId: null });
      
      // Proceed with regular checkout - pass image URL directly to avoid state update delay
      await proceedToCheckout(pendingCheckout, data.imageUrl);
    } catch (err) {
      console.error('Error in photo upload or checkout:', err);
      
      // Handle version conflicts
      if (err.response?.status === 409) {
        alert('Este presente foi modificado por outro usuário. Atualizando a lista...');
        await fetchGifts();
      } else {
        alert('Não foi possível processar. Tente novamente.');
      }
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 pt-32">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Lista de Presentes
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Escolha um presente especial para nos ajudar a começar nossa nova vida juntos!
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <Spinner size="large" color="primary" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchGifts}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-couple-names"
            >
              Tentar Novamente
            </button>
          </motion.div>
        )}

        {/* Gift List */}
        {!loading && !error && gifts.length > 0 && (
          <GiftList
            gifts={gifts}
            onPurchase={handlePurchase}
            loading={loading}
          />
        )}

        {/* Empty State */}
        {!loading && !error && gifts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-text-muted">
              Nenhum presente disponível no momento.
            </p>
          </motion.div>
        )}

        {/* Photo Upload Modal */}
        <PhotoUploadModal
          isOpen={photoModal.isOpen}
          onClose={() => setPhotoModal({ isOpen: false, giftId: null })}
          onUpload={handlePhotoUpload}
          isLoading={uploadLoading}
        />
      </div>
    </div>
  );
}
