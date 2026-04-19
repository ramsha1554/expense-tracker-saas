import React, { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <TransactionProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Dashboard / Summary Section */}
              <section id="dashboard" className="scroll-mt-24">
                <SummaryCards />
              </section>
              
              {/* Insights Section */}
              <section id="insights">
                <Insights />
              </section>

              {/* Middle Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">
                  {/* Analytics Section */}
                  <div id="analytics" className="scroll-mt-24">
                    <Charts />
                  </div>
                  
                  {/* Transactions Section */}
                  <div id="transactions" className="scroll-mt-24">
                    <TransactionList />
                  </div>

                  {/* Specific Income/Expenses targeted wrappers for smoother scrolling */}
                  <div id="income-section" className="sr-only">Income Filter Target</div>
                  <div id="expenses-section" className="sr-only">Expenses Filter Target</div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-24">
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
