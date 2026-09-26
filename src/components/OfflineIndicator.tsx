import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Offline status"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600/95 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-white shadow-2xl border border-amber-400/40 animate-bounce"
    >
      <WifiOff className="w-4 h-4 text-amber-200" />
      <span>โหมดออฟไลน์ — สามารถเล่นแบบทดสอบต่อได้จากแคช</span>
    </aside>
  );
};
