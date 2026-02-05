import { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

export default function PhotoUploadModal({ isOpen, onClose, onUpload, isLoading }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);

  // Resize image to 4:3 aspect ratio
  const resizeImageTo4_3 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Get original dimensions
        const originalWidth = img.width;
        const originalHeight = img.height;
        const originalRatio = originalWidth / originalHeight;
        const targetRatio = 4 / 3;

        // Calculate crop area from source image (center crop)
        let sx, sy, sWidth, sHeight;
        
        if (originalRatio > targetRatio) {
          // Too wide - crop left/right sides
          sHeight = originalHeight;
          sWidth = originalHeight * targetRatio;
          sx = (originalWidth - sWidth) / 2;  // Center horizontally
          sy = 0;
        } else {
          // Too tall - crop top/bottom
          sWidth = originalWidth;
          sHeight = originalWidth / targetRatio;
          sx = 0;
          sy = (originalHeight - sHeight) / 2;  // Center vertically
        }

        // Set output dimensions (can be same as crop or scaled down for optimization)
        const maxDimension = 1200;
        let outputWidth = sWidth;
        let outputHeight = sHeight;
        
        // Scale down if too large while maintaining 4:3
        if (sWidth > maxDimension || sHeight > maxDimension) {
          if (sWidth > sHeight) {
            outputWidth = maxDimension;
            outputHeight = maxDimension / targetRatio;
          } else {
            outputHeight = maxDimension;
            outputWidth = maxDimension * targetRatio;
          }
        }

        // Create canvas at output size
        const canvas = document.createElement('canvas');
        canvas.width = outputWidth;
        canvas.height = outputHeight;

        const ctx = canvas.getContext('2d');
        // Draw cropped portion of source image to fill entire canvas
        ctx.drawImage(
          img,
          sx, sy, sWidth, sHeight,           // Source: crop area from original
          0, 0, outputWidth, outputHeight    // Dest: fill entire canvas
        );

        // Convert canvas to blob
        canvas.toBlob((blob) => {
          callback(blob, { 
            width: outputWidth, 
            height: outputHeight, 
            original: { width: originalWidth, height: originalHeight } 
          });
        }, 'image/jpeg', 0.9);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem');
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('A imagem não pode ser maior que 5MB');
      return;
    }

    setError(null);

    // Resize to 4:3 and create preview
    resizeImageTo4_3(selectedFile, (resizedBlob, dimensions) => {
      // Create a new File object from the resized blob
      const resizedFile = new File([resizedBlob], selectedFile.name, { type: 'image/jpeg' });
      setFile(resizedFile);
      setImageInfo(dimensions);

      // Create preview from resized image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(resizedBlob);
    });
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Selecione uma imagem');
      return;
    }

    await onUpload(file);
    resetForm();
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    setImageInfo(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif font-bold text-primary">
            Sua Foto Especial
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          Escolha uma foto para aparecer em nosso site como destaque! 📸
        </p>

        {/* Resolution Info Box */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-2">
            <InformationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Dica: Proporção ideal 4:3</p>
              <p className="text-xs text-blue-700 mt-1">
                A imagem será automaticamente ajustada para a proporção 4:3 (ex: 800x600px)
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full aspect-[4/3] object-cover rounded-lg border-2 border-accent"
            />
            {imageInfo && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Resolução final: {Math.round(imageInfo.width)}x{Math.round(imageInfo.height)}px (4:3)
              </p>
            )}
          </div>
        )}

        {/* File Input */}
        <div className="mb-4">
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isLoading}
              className="hidden"
              id="photo-input"
            />
            <div className="border-2 border-dashed border-accent rounded-lg p-6 text-center cursor-pointer hover:border-accent-dark transition-colors"
              onClick={() => document.getElementById('photo-input').click()}
            >
              {file ? (
                <>
                  <p className="font-medium text-primary">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-primary">Clique para selecionar</p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG ou WebP (máx. 5MB)
                  </p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || isLoading}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Enviando...' : 'Confirmar e Pagar'}
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Sua foto será exibida em nosso site como destaque após a confirmação do pagamento ✨
        </p>
      </motion.div>
    </div>
  );
}
