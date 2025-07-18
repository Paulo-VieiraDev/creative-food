import { useState, useEffect } from 'react';
import { useChat } from './hooks/useChat';
import type { Recipe } from './lib/types';
import { fetchAllIngredientsList, fetchRecipeDetails } from './services/api';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { CreativeInput } from './components/CreativeInput';
import { RecipeModal } from './components/RecipeModal';
import { FavoritesSidebar } from './components/FavoritesSidebar';

function App() {
  const { messages, isLoading, favorites, sendMessage, clearChat, toggleFavorite } = useChat();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);

  useEffect(() => {
    fetchAllIngredientsList().then(list => setAvailableIngredients(list.sort()));
  }, []);

  const handleSearch = () => {
    if (selectedIngredients.length === 0 || isLoading) return;
    sendMessage(selectedIngredients);
    setSelectedIngredients([]);
  };
  
  const handleSelectFavorite = async (recipe: Recipe) => {
    const fullRecipe = await fetchRecipeDetails(recipe.id);
    if(fullRecipe) {
      setIsFavoritesOpen(false);
      setSelectedRecipe(fullRecipe);
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 animate-gradient">
      <div className="w-full h-full flex items-center justify-center p-0 md:p-4 lg:p-8">
        <div className="w-full h-full md:max-w-screen-2xl md:h-full bg-white dark:bg-gray-900 flex md:rounded-2xl shadow-2xl overflow-hidden relative">
          <div className="flex-grow flex flex-col h-full">
            <Header 
              onClearChat={clearChat} 
              onToggleFavorites={() => setIsFavoritesOpen(true)} 
            />
            
            <main className="flex-grow p-4 md:p-6 overflow-y-auto chat-window">
              <ChatWindow
                messages={messages}
                isLoading={isLoading}
                favorites={favorites}
                onSelectRecipe={setSelectedRecipe}
                onToggleFavorite={toggleFavorite}
              />
            </main>

            <footer className="p-3 md:p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
              <CreativeInput
                availableIngredients={availableIngredients}
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
                onSearch={handleSearch}
                isLoading={isLoading}
              />
            </footer>
          </div>

          <FavoritesSidebar
            isOpen={isFavoritesOpen}
            favorites={favorites}
            onSelect={handleSelectFavorite}
            onRemove={toggleFavorite}
            onClose={() => setIsFavoritesOpen(false)}
          />

          <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        </div>
      </div>
    </div>
  );
}

export default App;