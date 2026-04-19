import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { cn } from '../../utils/helpers';

const Insights = () => {
  const { insights } = useTransactions();

  if (!insights || insights.length === 0) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-3">
          <Lightbulb className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-500 font-medium">Add more transactions to unlock AI-powered insights.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
          <Lightbulb className="w-5 h-5 fill-amber-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-none">Smart Insights</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div 
            key={idx} 
            className={cn(
              "p-4 rounded-xl border flex gap-3 transition-all hover:scale-[1.01]",
              insight.type === 'success' && "bg-emerald-50 border-emerald-100 text-emerald-800",
              insight.type === 'warning' && "bg-rose-50 border-rose-100 text-rose-800",
              insight.type === 'info' && "bg-blue-50 border-blue-100 text-blue-800",
              insight.type === 'trend' && "bg-purple-50 border-purple-100 text-purple-800"
            )}
          >
            <div className="shrink-0 mt-0.5">
              {insight.type === 'success' && <TrendingUp className="w-5 h-5" />}
              {insight.type === 'warning' && <AlertCircle className="w-5 h-5" />}
              {insight.type === 'info' && <Info className="w-5 h-5" />}
              {insight.type === 'trend' && <TrendingUp className="w-5 h-5" />}
            </div>
            <p className="text-sm font-medium leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
