import type { Recipe } from '../lib/types';
import { Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  favorites: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onRemove: (recipe: Recipe) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesSidebar = ({ favorites, onSelect, onRemove, isOpen, onClose }: Props) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
        <motion.aside 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          className="bg-surface-0 w-full max-w-sm md:max-w-none md:w-80 border-l border-surface-2 flex-shrink-0 flex-col overflow-hidden flex fixed md:static top-0 right-0 h-full z-30"
        >
          <div className="p-4 flex items-center justify-between border-b h-[70px] flex-shrink-0">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />
              <h2 className="text-lg font-bold text-ink-primary">Favorites</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-2"><X size={20} /></button>
          </div>
          <div className="p-2 overflow-y-auto flex-grow">
            {favorites.length > 0 ? (
              <ul className="space-y-2">
                {favorites.map(fav => (
                  <motion.li key={fav.id} onClick={() => onSelect(fav)} className="p-2 rounded-md hover:bg-surface-2 cursor-pointer flex items-center gap-3" layout>
                    <img src={fav.imageUrl} alt={fav.name} className="w-12 h-12 rounded-md object-cover" />
                    <p className="font-semibold text-sm flex-grow truncate">{fav.name}</p>
                    <button onClick={(e) => { e.stopPropagation(); onRemove(fav); }} className="text-ink-subtle hover:text-red-500 p-1">
                      <X size={16} />
                    </button>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-sm text-ink-secondary p-6 h-full flex items-center justify-center">
                <p>Your favorite recipes will appear here.</p>
              </div>
            )}
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);