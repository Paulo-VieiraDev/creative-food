import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

interface Props {
  onSendMessage: (input: string) => void;
  isLoading: boolean;
}

export const MessageInput = ({ onSendMessage, isLoading }: Props) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type ingredients separated by commas..."
        disabled={isLoading}
        className="flex-grow bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        aria-label="Send"
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
      >
        <SendHorizontal size={24} />
      </button>
    </div>
  );
};