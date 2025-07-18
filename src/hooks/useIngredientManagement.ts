import { useState, useMemo, type KeyboardEvent } from 'react';

const MAX_SUGGESTIONS = 5;

export const useIngredientManagement = (
  availableIngredients: string[],
  selectedIngredients: string[],
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIngredients = useMemo(() => {
    if (!searchTerm) return [];
    
    return availableIngredients
      .filter(ing => 
        !selectedIngredients.includes(ing) && 
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, MAX_SUGGESTIONS);
  }, [searchTerm, availableIngredients, selectedIngredients]);

  const addIngredient = (ingredient: string) => {
    if (ingredient && !selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
    setSearchTerm(''); 
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(ing => ing !== ingredient));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredIngredients.length > 0) {
      e.preventDefault(); 
      addIngredient(filteredIngredients[0]);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredIngredients,
    addIngredient,
    removeIngredient,
    handleKeyDown,
  };
};