import type { Recipe } from '../lib/types';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export const RecipeCard = ({ recipe, isFavorite, onSelect, onToggleFavorite }: Props) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    className="bg-surface-1 border border-surface-3 rounded-lg p-3 flex items-center gap-4 relative group shadow-sm"
  >
    <button onClick={onSelect} className="flex-grow flex items-center gap-4 text-left">
      <img src={recipe.imageUrl} alt={recipe.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
      <div className="overflow-hidden">
        <p className="font-semibold text-ink-primary line-clamp-2 group-hover:text-brand-primary transition-colors">{recipe.name}</p>
      </div>
    </button>
    <button onClick={onToggleFavorite} className="p-2 rounded-full hover:bg-red-100 transition-colors z-10" title={isFavorite ? 'Remove favorite' : 'Add favorite'}>
      <Heart size={20} className={`transition-all ${isFavorite ? 'text-red-500 fill-current' : 'text-ink-subtle group-hover:text-red-400'}`} />
    </button>
  </motion.div>
);