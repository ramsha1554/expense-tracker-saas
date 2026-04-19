import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h4 className="text-slate-900 font-bold mb-1">No transactions found</h4>
      <p className="text-slate-500 text-sm max-w-[200px]">
        Try adjusting your filters or search to find what you're looking for.
      </p>
    </div>
  );
};

export default EmptyState;
