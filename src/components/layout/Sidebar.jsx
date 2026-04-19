import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Settings, 
  HelpCircle,
  PieChart as ChartIcon
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Wallet, label: 'Transactions', active: false },
    { icon: ChartIcon, label: 'Analytics', active: false },
    { icon: ArrowUpRight, label: 'Income', active: false },
    { icon: ArrowDownLeft, label: 'Expenses', active: false },
  ];

  const secondaryItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Support' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-slate-900">
            ExTrack<span className="text-primary-600">.</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all group",
              item.active 
                ? "bg-primary-50 text-primary-600" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              item.active ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-1">
        {secondaryItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <item.icon className="w-5 h-5 text-slate-400" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-2xl p-4 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-white font-semibold text-sm mb-1">Upgrade to Pro</h4>
            <p className="text-slate-400 text-xs mb-3">Get advanced analytics and insights.</p>
            <button className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
