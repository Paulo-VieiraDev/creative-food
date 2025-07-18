import type { Recipe } from '../lib/types';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, onClose }: Props) => (
  <AnimatePresence>
    {recipe && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} onClick={(e: React.MouseEvent) => e.stopPropagation()} className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-64 object-cover rounded-t-lg flex-shrink-0" />
          <div className="p-6 overflow-y-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{recipe.name}</h2>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredientsWithMeasures?.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 flex gap-2">
                    <span className="font-bold text-gray-800 dark:text-gray-100">- {item.measure}</span>
                    <span>{item.ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Instructions</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{recipe.instructions}</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all">
            <X className="text-gray-800 dark:text-white" />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);