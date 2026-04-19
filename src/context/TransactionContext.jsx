import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateInsights } from '../utils/insights';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [filter, setFilter] = useState('ALL'); // ALL, income, expense
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [
      {
        ...transaction,
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, [setTransactions]);

  const updateTransaction = useCallback((updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  }, [setTransactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        if (filter === 'ALL') return true;
        return t.type === filter;
      })
      .filter((t) => {
        if (categoryFilter === 'ALL') return true;
        return t.category === categoryFilter;
      })
      .filter((t) => {
        const title = t.title || '';
        const search = searchQuery || '';
        return title.toLowerCase().includes(search.toLowerCase());
      });
  }, [transactions, filter, categoryFilter, searchQuery]);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t?.type === 'income')
      .reduce((acc, t) => acc + Number(t?.amount || 0), 0);
    const expense = transactions
      .filter((t) => t?.type === 'expense')
      .reduce((acc, t) => acc + Number(t?.amount || 0), 0);
    const balance = income - expense;

    return { income, expense, balance };
  }, [transactions]);

  const insights = useMemo(() => generateInsights(transactions), [transactions]);

  const value = {
    transactions,
    filteredTransactions,
    insights,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    stats,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
