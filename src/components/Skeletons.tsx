import { motion } from 'framer-motion';

const SkeletonBubble = () => (
  <div className="flex items-end gap-3 justify-start">
    <div className="bg-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm w-full max-w-sm h-32 animate-pulse" />
  </div>
);

export const LoadingSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <SkeletonBubble />
  </motion.div>
);