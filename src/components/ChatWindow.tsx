import { useEffect, useRef } from 'react';
import type { ChatMessage, Recipe } from '../lib/types';
import { RecipeCard } from './RecipeCard';
import { LoadingSkeleton } from './Skeletons';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
  favorites: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
}

export const ChatWindow = ({ messages, isLoading, favorites, onSelectRecipe, onToggleFavorite }: Props) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div key={msg.id} layout initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: -20, scale: 0.95 }} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-3 rounded-xl shadow-sm flex flex-col max-w-[85%] md:max-w-2xl text-left ${msg.role === 'user' ? 'bg-accent text-surface-0 rounded-br-none' : 'bg-surface-2 text-ink-primary rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.recipes && msg.recipes.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {msg.recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.some(fav => fav.id === recipe.id)} onSelect={() => onSelectRecipe(recipe)} onToggleFavorite={(e) => { e.stopPropagation(); onToggleFavorite(recipe); }} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {isLoading && <LoadingSkeleton />}
      <div ref={chatEndRef} />
    </div>
  );
};