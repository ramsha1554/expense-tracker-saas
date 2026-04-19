import React from 'react';
import { useTransactions } from '../../context/TransactionContext';
import { CATEGORIES, cn } from '../../utils/helpers';

const Filter = () => {
  const { filter, setFilter, categoryFilter, setCategoryFilter } = useTransactions();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex bg-slate-100 p-1 rounded-xl">
        {['ALL', 'income', 'expense'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all",
              filter === type
                ? "bg-white text-primary-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="bg-slate-50 border-transparent text-xs font-bold text-slate-600 px-3 py-1.5 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
      >
        <option value="ALL">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
