import { Trash2, Heart } from 'lucide-react';

interface Props {
  onClearChat: () => void;
  onToggleFavorites: () => void;
}

export const Header = ({ onClearChat, onToggleFavorites }: Props) => (
  <header className="p-2 md:p-4 h-[70px] flex-shrink-0 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm z-10 w-full">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
        <span className="text-2xl" aria-hidden="true">🧑‍🍳</span>
      </div>
      <div className="overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">Creative Food Bot</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Online
        </p>
      </div>
    </div>

    <div className="flex items-center gap-1 md:gap-2">
      <button 
        onClick={onToggleFavorites} 
        className="h-10 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        title="View favorites"
        aria-label="View favorites"
      >
        <Heart size={20} className="text-gray-500 dark:text-gray-400" />
        <span className="hidden md:inline text-sm font-medium text-gray-900 dark:text-white">Favorites</span>
      </button>

      <button 
        onClick={onClearChat} 
        className="h-10 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        title="Clear chat"
        aria-label="Clear chat"
      >
        <Trash2 size={20} className="text-gray-500 dark:text-gray-400" />
        <span className="hidden md:inline text-sm font-medium text-gray-900 dark:text-white">Clear</span>
      </button>
    </div>
  </header>
);