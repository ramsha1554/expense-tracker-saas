import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">ET</span>
          </div>
          <p className="text-slate-900 font-bold tracking-tight">
            ExTrack<span className="text-primary-600">.</span>
          </p>
        </div>
        
        <p className="text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} Syed Ramsha. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors">Privacy</a>
          <a href="#" className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors">Terms</a>
          <a href="#" className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
