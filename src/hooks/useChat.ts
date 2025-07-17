import { useState, useEffect } from 'react';
import type { ChatMessage, Recipe } from '../lib/types';
import { fetchRecipesByIngredients } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('food-bot-favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    
    setMessages([{
      id: Date.now(),
      role: 'bot',
      text: 'Hello! 👋 Add ingredients in English from the list below and I will find recipes for you!',
    }]);
  }, []);

  useEffect(() => {
    localStorage.setItem('food-bot-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      const isFavorited = prev.some(fav => fav.id === recipe.id);
      return isFavorited ? prev.filter(fav => fav.id !== recipe.id) : [...prev, recipe];
    });
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      role: 'bot',
      text: 'Ok, let\'s start over! Add ingredients and click search.',
    }]);
  };

  const sendMessage = async (ingredients: string[]) => {
    if (ingredients.length === 0 || isLoading) return;

    const ingredientsText = ingredients.join(', ');
    const userMessage: ChatMessage = { id: Date.now(), role: 'user', text: `Searching recipes with: ${ingredientsText}` };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const foundRecipes = await fetchRecipesByIngredients(ingredients);
      const botResponseText = foundRecipes.length > 0 ? `I found ${foundRecipes.length} ${foundRecipes.length > 1 ? 'options' : 'option'} for you!` : 'Sorry, I couldn\'t find any recipes with that combination.';
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: botResponseText,
        recipes: foundRecipes.length > 0 ? foundRecipes : undefined,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Falha ao processar a mensagem:", error);
      const errorMessage: ChatMessage = { id: Date.now() + 1, role: 'bot', text: "Oops! Something went wrong. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, favorites, sendMessage, clearChat, toggleFavorite };
};