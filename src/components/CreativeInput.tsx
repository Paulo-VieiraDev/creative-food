import { useRef } from 'react';
import { X, Search, Plus, Frown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIngredientManagement } from '../hooks/useIngredientManagement';

interface Props {
  availableIngredients: string[];
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  onSearch: () => void;
  isLoading: boolean;
}

export const CreativeInput = ({ availableIngredients, selectedIngredients, setSelectedIngredients, onSearch, isLoading }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    searchTerm,
    setSearchTerm,
    filteredIngredients,
    addIngredient,
    removeIngredient,
    handleKeyDown,
  } = useIngredientManagement(availableIngredients, selectedIngredients, setSelectedIngredients);

  const showSuggestions = searchTerm.length > 0;
  
  return (
    <div className="w-full flex flex-col gap-4">
      <AnimatePresence>
        {selectedIngredients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 items-center justify-center"
            aria-label="Selected ingredients"
          >
            {selectedIngredients.map(ing => (
              <motion.div
                key={ing}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium"
              >
                <span>{ing}</span>
                <button
                  onClick={() => removeIngredient(ing)}
                  aria-label={`Remove ${ing}`}
                  className="cursor-pointer text-gray-500 dark:text-gray-400 rounded-full p-0.5 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <label htmlFor="ingredient-search" className="sr-only">
          Search for an ingredient
        </label>
        <div className="flex items-center gap-2 sm:gap-3 w-full">
          <div className="relative flex-grow">
            <input
              id="ingredient-search"
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., tomato, onion, garlic..."
              disabled={isLoading}
              className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              role="combobox"
              aria-expanded={showSuggestions && filteredIngredients.length > 0}
              aria-controls="ingredient-suggestions"
            />
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-full w-full mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden"
                >
                  {filteredIngredients.length > 0 ? (
                    <ul id="ingredient-suggestions" role="listbox">
                      {filteredIngredients.map(ing => (
                        <li
                          key={ing}
                          role="option"
                          aria-selected="false"
                          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-gray-100 flex items-center justify-between transition-colors"
                          onClick={() => {
                            addIngredient(ing);
                            inputRef.current?.focus();
                          }}
                        >
                          {ing}
                          <div className="p-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300">
                            <Plus size={16} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                       <Frown size={16}/> No ingredients found.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={onSearch}
            disabled={selectedIngredients.length === 0 || isLoading}
            className="h-12 px-4 sm:px-6 rounded-lg flex items-center justify-center flex-shrink-0 font-bold transition-all duration-200 ease-in-out bg-blue-600 text-white active:scale-95 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-700 hover:-translate-y-0.5"
          >
            <Search size={20} className="sm:mr-2" />
            <span className="hidden sm:block">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};