import { useEffect, useRef } from 'react';
import type { Recipe } from '../lib/types';
import { Heart, X, HeartCrack } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  favorites: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onRemove: (recipe: Recipe) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesSidebar = ({ favorites, onSelect, onRemove, isOpen, onClose }: Props) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('md:overflow-auto', 'overflow-hidden');
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.classList.remove('md:overflow-auto', 'overflow-hidden');
    }
    return () => {
      document.body.classList.remove('md:overflow-auto', 'overflow-hidden');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            aria-hidden="true"
          />
          
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className="bg-white dark:bg-gray-900 w-full max-w-sm md:max-w-none md:w-80 border-l border-gray-200 dark:border-gray-800 flex-shrink-0 flex-col overflow-hidden flex fixed md:static top-0 right-0 h-full z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="favorites-title"
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 h-[70px] flex-shrink-0">
              <div className="flex items-center gap-3">
                <Heart className="text-red-500" />
                <h2 id="favorites-title" className="text-lg font-bold text-gray-900 dark:text-white">Favorites</h2>
              </div>
              <button 
                ref={closeButtonRef}
                onClick={onClose} 
                aria-label="Close favorites panel"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-2 overflow-y-auto flex-grow">
              {favorites.length > 0 ? (
                <ul className="space-y-2">
                  <AnimatePresence>
                    {favorites.map(fav => (
                      <motion.li 
                        key={fav.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                        onClick={() => onSelect(fav)} 
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 group"
                      >
                        <img src={fav.imageUrl} alt={fav.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                        <p className="font-semibold text-sm flex-grow truncate text-gray-900 dark:text-gray-100">{fav.name}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onRemove(fav); }}
                          aria-label={`Remove ${fav.name} from favorites`}
                          className="text-gray-500 dark:text-gray-400 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500 transition-opacity md:opacity-0 group-hover:opacity-100 focus-within:opacity-100"
                        >
                          <X size={18} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ) : (
                <div className="text-center text-sm text-gray-500 p-6 h-full flex flex-col items-center justify-center gap-3">
                  <HeartCrack size={40} className="text-gray-300 dark:text-gray-700" />
                  <p className="font-semibold">No favorite recipes yet.</p>
                  <p>Click the heart on any recipe to add it here!</p>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};