import { useState, useRef } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  availableIngredients: string[];
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  onSearch: () => void;
  isLoading: boolean;
}

export const CreativeInput = ({ availableIngredients, selectedIngredients, setSelectedIngredients, onSearch, isLoading }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredIngredients = searchTerm
    ? availableIngredients.filter(ing => !selectedIngredients.includes(ing) && ing.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 4)
    : [];
  
  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(ing => ing !== ingredient));
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3">
      <AnimatePresence>
        {selectedIngredients.length > 0 && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 items-center justify-center"
            >
            {selectedIngredients.map(ing => (
                <motion.div key={ing} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="bg-surface-2 text-ink-primary px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
                <span>{ing}</span>
                <button onClick={() => handleRemoveIngredient(ing)} className="text-ink-subtle hover:text-red-500">
                    <X size={14} />
                </button>
                </motion.div>
            ))}
            </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="flex items-center gap-3 w-full">
            <div className="relative flex-grow">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for an ingredient..."
                    disabled={isLoading}
                    className="w-full bg-surface-2 border border-surface-3 rounded-lg p-3 pl-4 text-ink-primary focus:ring-2 focus:ring-accent focus:outline-none"
                />
                <AnimatePresence>
                    {filteredIngredients.length > 0 && (
                        <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-full w-full mb-2 bg-surface-1 border border-surface-2 rounded-lg shadow-lg z-10 overflow-hidden">
                        {filteredIngredients.map(ing => (
                            <li key={ing} className="p-3 hover:bg-surface-2 cursor-pointer text-sm text-ink-primary flex items-center justify-between" onClick={() => handleAddIngredient(ing)}>
                            {ing}
                            <button className="p-1 rounded-full bg-surface-2 hover:bg-accent hover:text-surface-0">
                                <Plus size={16} />
                            </button>
                            </li>
                        ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
            <button onClick={onSearch} disabled={selectedIngredients.length === 0 || isLoading} className="h-12 px-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all bg-accent text-surface-0 font-bold hover:bg-accent-dark active:scale-95 disabled:bg-surface-3 disabled:text-ink-subtle disabled:cursor-not-allowed">
                <Search size={20} className="mr-2 md:hidden" />
                <span className="hidden md:block">Find Recipes</span>
            </button>
        </div>
      </div>
    </div>
  );
};