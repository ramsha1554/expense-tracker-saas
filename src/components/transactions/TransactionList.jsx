import React, { useState } from 'react';
import { useTransactions } from '../../context/TransactionContext';
import TransactionItem from './TransactionItem';
import Filter from '../ui/Filter';
import EmptyState from '../ui/EmptyState';
import EditTransactionModal from './EditTransactionModal';
import { AnimatePresence, motion } from 'framer-motion';

const TransactionList = () => {
  const { filteredTransactions } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState(null);

  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-none">Recent Transactions</h3>
          <p className="text-sm text-slate-500 mt-1">Showing {filteredTransactions.length} items</p>
        </div>
        <Filter />
      </div>

      <div className="divide-y divide-slate-100">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <TransactionItem 
                  transaction={transaction} 
                  onEdit={() => setEditingTransaction(transaction)}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </div>

      <EditTransactionModal 
        transaction={editingTransaction}
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
      />
    </div>
  );
};

export default TransactionList;
