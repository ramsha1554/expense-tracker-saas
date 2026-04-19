import React from 'react';
import { TrendingUp, TrendingDown, Wallet, CreditCard } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { formatCurrency, cn } from '../../utils/helpers';

const SummaryCards = () => {
  const { stats } = useTransactions();

  const cards = [
    {
      title: 'Current Balance',
      value: stats.balance,
      icon: Wallet,
      color: 'blue',
      trend: '+12.5%',
      isPositive: true,
    },
    {
      title: 'Total Income',
      value: stats.income,
      icon: TrendingUp,
      color: 'green',
      trend: '+8.2%',
      isPositive: true,
    },
    {
      title: 'Total Expenses',
      value: stats.expense,
      icon: TrendingDown,
      color: 'rose',
      trend: '-2.4%',
      isPositive: false,
    },
    {
      title: 'Active Budgets',
      value: 4,
      icon: CreditCard,
      color: 'amber',
      isText: true,
      text: '4 active',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, idx) => (
        <div key={card.title} className="card p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
              card.color === 'blue' && "bg-blue-50 text-blue-600",
              card.color === 'green' && "bg-emerald-50 text-emerald-600",
              card.color === 'rose' && "bg-rose-50 text-rose-600",
              card.color === 'amber' && "bg-amber-50 text-amber-600",
            )}>
              <card.icon className="w-6 h-6" />
            </div>
            {card.trend && (
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-lg",
                card.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {card.trend}
              </span>
            )}
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {card.isText ? card.text : formatCurrency(card.value)}
            </h3>
          </div>
          
          {/* Subtle background glow */}
          <div className={cn(
            "absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-3xl opacity-20",
            card.color === 'blue' && "bg-blue-500",
            card.color === 'green' && "bg-emerald-500",
            card.color === 'rose' && "bg-rose-500",
            card.color === 'amber' && "bg-amber-500",
          )} />
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
