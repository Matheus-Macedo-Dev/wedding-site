import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import GiftCard from './GiftCard';

export default function GiftList({ gifts, onPurchase, loading }) {
  const [filter, setFilter] = useState('all'); // all, available, purchased
  const [sortBy, setSortBy] = useState('name-asc'); // name-asc, price-asc, price-desc

  // Filter gifts
  const filteredGifts = useMemo(() => {
    let filtered = [...gifts];

    switch (filter) {
      case 'available':
        filtered = filtered.filter(g => g.isAvailable);
        break;
      case 'purchased':
        filtered = filtered.filter(g => !g.isAvailable);
        break;
      default:
        // Show all
        break;
    }

    return filtered;
  }, [gifts, filter]);

  // Sort gifts
  const sortedGifts = useMemo(() => {
    let sorted = [...filteredGifts];

    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredGifts, sortBy]);

  return (
    <div>
      {/* Filters and Sorting */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-secondary text-text-dark hover:bg-secondary-dark'
            }`}
          >
            Todos ({gifts.length})
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'available'
                ? 'bg-primary text-white'
                : 'bg-secondary text-text-dark hover:bg-secondary-dark'
            }`}
          >
            Disponíveis ({gifts.filter(g => g.isAvailable).length})
          </button>
          <button
            onClick={() => setFilter('purchased')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'purchased'
                ? 'bg-primary text-white'
                : 'bg-secondary text-text-dark hover:bg-secondary-dark'
            }`}
          >
            Comprados ({gifts.filter(g => !g.isAvailable).length})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-text-dark">
            Ordenar:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="name-asc">Nome (A-Z)</option>
            <option value="price-asc">Preço (Menor)</option>
            <option value="price-desc">Preço (Maior)</option>
          </select>
        </div>
      </div>

      {/* Gift Grid */}
      {sortedGifts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-text-muted">
            {filter === 'available' 
              ? 'Todos os presentes foram comprados! 🎉'
              : 'Nenhum presente encontrado.'
            }
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onPurchase={onPurchase}
              loading={loading}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

GiftList.propTypes = {
  gifts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPurchase: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
