import React from 'react';
import { Trash2, Edit2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { formatCurrency, formatDate, CATEGORIES, cn } from '../../utils/helpers';

const TransactionItem = ({ transaction, onEdit }) => {
  const { deleteTransaction } = useTransactions();
  const category = CATEGORIES.find(c => c.value === transaction.category) || CATEGORIES[CATEGORIES.length - 1];

  return (
    <div className="p-4 md:p-6 hover:bg-slate-50 transition-all group flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
          transaction.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {transaction.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
        </div>
        
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 truncate">{transaction.title || 'Untitled Transaction'}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-md",
              category.color
            )}>
              {category.label}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">{transaction.date ? formatDate(transaction.date) : 'No date'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={cn(
            "text-sm font-bold",
            transaction.type === 'income' ? "text-emerald-600" : "text-rose-600"
          )}>
            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteTransaction(transaction.id)}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
