import { Trash2, Heart } from 'lucide-react';

interface Props {
  onClearChat: () => void;
  onToggleFavorites: () => void;
}

export const Header = ({ onClearChat, onToggleFavorites }: Props) => (
  <div className="p-4 h-[70px] flex-shrink-0 flex items-center justify-between border-b border-surface-2 bg-surface-1 shadow-sm z-10 w-full">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">🧑‍🍳</span>
      </div>
      <div className="overflow-hidden">
        <h2 className="text-lg font-semibold text-ink-primary truncate">Creative Food Bot</h2>
        <p className="text-sm text-ink-secondary flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          Online
        </p>
      </div>
    </div>
    <div className="flex items-center gap-1 md:gap-2">
      <button onClick={onToggleFavorites} className="p-2 rounded-full hover:bg-surface-2 transition-colors flex" title="View favorites">
        <Heart size={20} className="text-ink-subtle" />
      </button>
      <button onClick={onClearChat} className="p-2 rounded-full hover:bg-surface-2 transition-colors flex" title="Clear chat">
        <Trash2 size={20} className="text-ink-subtle" />
      </button>
    </div>
  </div>
);