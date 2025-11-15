import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Select from 'react-select';
import GiftCard from './GiftCard';

export default function GiftList({ gifts, onPurchase, loading }) {
  const [filter, setFilter] = useState('all'); // all, available, purchased
  const [sortBy, setSortBy] = useState('none'); // none, price-asc, price-desc

  const sortOptions = [
    { value: 'price-asc', label: 'Menor Preço' },
    { value: 'price-desc', label: 'Maior Preço' }
  ];

  const selectedSortOption = sortOptions.find(opt => opt.value === sortBy) || null;

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
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'none':
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
          <div className="w-52 md:w-56">
            <Select
              inputId="sort"
              isClearable
              value={selectedSortOption}
              onChange={(option) => setSortBy(option ? option.value : 'none')}
              options={sortOptions}
              placeholder="Ordenar por..."
              classNamePrefix="react-select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderRadius: '0.5rem',
                  borderColor: '#E5E7EB',
                  boxShadow: 'none',
                  minHeight: '38px'
                }),
                menu: (provided) => ({ ...provided, zIndex: 60 })
              }}
            />
          </div>
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
