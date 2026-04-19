import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { CATEGORIES, cn } from '../../utils/helpers';

const TransactionForm = () => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'other',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Valid amount is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: 'other',
    });
    setErrors({});
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 font-display">Add Transaction</h3>
        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
          <Plus className="w-5 h-5" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Transaction Title</label>
          <input
            type="text"
            placeholder="e.g. Monthly Grocery"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={cn(
              "input",
              errors.title && "border-red-300 focus:ring-red-500/20 focus:border-red-500"
            )}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={cn(
                  "input pl-7",
                  errors.amount && "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                )}
              />
            </div>
            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2em] bg-[right_0.5rem_center] bg-no-repeat"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat.value })}
                className={cn(
                  "flex items-center justify-center p-2 rounded-xl text-xs font-semibold border transition-all",
                  formData.category === cat.value
                    ? cn("bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-200")
                    : "bg-white border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-600"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary py-3 mt-4"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
