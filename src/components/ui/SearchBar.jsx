import React from 'react';
import { Search } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useTransactions();

  return (
    <div className="relative group w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 py-2.5 pl-10 pr-4 rounded-xl text-sm transition-all"
      />
    </div>
  );
};

export default SearchBar;
