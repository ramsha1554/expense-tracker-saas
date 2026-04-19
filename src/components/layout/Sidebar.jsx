import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Settings, 
  HelpCircle,
  PieChart as ChartIcon,
  X
} from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { cn } from '../../utils/helpers';

const Sidebar = ({ isOpen, onClose }) => {
  const { setFilter } = useTransactions();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', value: 'dashboard' },
    { icon: Wallet, label: 'Transactions', value: 'transactions' },
    { icon: ChartIcon, label: 'Analytics', value: 'analytics' },
    { icon: ArrowUpRight, label: 'Income', value: 'income-section' },
    { icon: ArrowDownLeft, label: 'Expenses', value: 'expenses-section' },
  ];

  const secondaryItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Support' },
  ];

  const scrollToSection = (sectionId) => {
    // 1. Handle actual filtering if necessary
    if (sectionId === 'income-section') setFilter('income');
    else if (sectionId === 'expenses-section') setFilter('expense');
    else setFilter('ALL');

    // 2. Smooth Scroll Logic
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Section with ID ${sectionId} not found.`);
    }

    // 3. Close mobile sidebar
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 lg:z-30 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:flex lg:flex-col lg:h-screen sticky top-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-slate-900">
              ExTrack<span className="text-primary-600">.</span>
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.value)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
            >
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          {secondaryItems.map((item) => (
            <button key={item.label} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
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
    </>
  );
};

export default Sidebar;
