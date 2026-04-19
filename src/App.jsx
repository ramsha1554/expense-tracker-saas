import React from 'react';
import { TransactionProvider } from './context/TransactionContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import SummaryCards from './components/dashboard/SummaryCards';
import Charts from './components/dashboard/Charts';
import TransactionList from './components/transactions/TransactionList';
import TransactionForm from './components/transactions/TransactionForm';
import Insights from './components/dashboard/Insights';
import Footer from './components/layout/Footer';

function App() {
  return (
    <TransactionProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Top Section: Summary */}
              <SummaryCards />
              
              {/* Middle Section: Insights & Form */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Insights />
                  <Charts />
                  <TransactionList />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <TransactionForm />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
