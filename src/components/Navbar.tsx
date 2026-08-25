'use client';

import React from 'react';
import { UserRole, AppTheme } from '../types';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  Bookmark, 
  Layers, 
  UserCircle2, 
  Building2, 
  ShieldAlert,
  ArrowRightLeft,
  Settings,
  Sun,
  Moon,
  ShoppingBag
} from 'lucide-react';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: 'discover' | 'my-rfqs' | 'bookmarks';
  setActiveTab: (tab: 'discover' | 'my-rfqs' | 'bookmarks') => void;
  savedCount: number;
  rfqCount: number;
  compareCount: number;
  ordersCount: number;
  theme: AppTheme;
  onToggleTheme: () => void;
  onOpenComparison: () => void;
  onOpenSupplierAuth: () => void;
  onOpenSettings: () => void;
  activeSupplierName?: string;
}

export function Navbar({
  role,
  setRole,
  activeTab,
  setActiveTab,
  savedCount,
  rfqCount,
  compareCount,
  ordersCount,
  theme,
  onToggleTheme,
  onOpenComparison,
  onOpenSupplierAuth,
  onOpenSettings,
  activeSupplierName,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-navy-950/95 dark:bg-navy-950/95 text-white border-b border-navy-800/90 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => { setRole('buyer'); setActiveTab('discover'); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 flex items-center justify-center shadow-[0_0_20px_rgba(2,132,199,0.35)]">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">SourceTrust</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-brand-950 text-brand-300 border border-brand-500/40 rounded-full">
                  OS Pilot
                </span>
              </div>
              <p className="text-[11px] text-navy-400 hidden sm:block">
                Strategic Sourcing & Verified Supplier Discovery
              </p>
            </div>
          </div>

          {/* Navigation Links for Buyer */}
          {role === 'buyer' && (
            <nav className="hidden md:flex items-center space-x-1 bg-navy-900/80 p-1 rounded-xl border border-navy-800/80">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition ${
                  activeTab === 'discover'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-navy-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Discover & Rank</span>
              </button>

              <button
                onClick={() => setActiveTab('my-rfqs')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition ${
                  activeTab === 'my-rfqs'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-navy-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>My RFQs</span>
                {rfqCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-navy-950 text-brand-300 border border-brand-400/40 rounded-full">
                    {rfqCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition ${
                  activeTab === 'bookmarks'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-navy-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Shortlist</span>
                {savedCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-navy-950 text-amber-300 rounded-full">
                    {savedCount}
                  </span>
                )}
              </button>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-2.5">
            {/* Compare Floating Button */}
            {role === 'buyer' && compareCount > 0 && (
              <button
                onClick={onOpenComparison}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white flex items-center space-x-1.5 shadow-md shadow-brand-500/20 animate-pulse"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Compare ({compareCount})</span>
              </button>
            )}

            {/* Quick Dark / Light Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-navy-700 text-navy-200 hover:text-amber-400 transition"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition transform hover:rotate-90" />
              ) : (
                <Moon className="w-4 h-4 text-brand-300 transition transform hover:-rotate-12" />
              )}
            </button>

            {/* Supplier Auth Button */}
            <button
              onClick={onOpenSupplierAuth}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 border border-navy-700 text-xs font-bold text-navy-200 hover:text-white transition"
              title="Supplier Login or Register Facility"
            >
              <Building2 className="w-3.5 h-3.5 text-brand-400" />
              <span>Supplier Portal</span>
            </button>

            {/* Settings & Orders Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-navy-700 text-navy-200 hover:text-white transition relative"
              title="Settings, Theme, & My Orders"
            >
              <Settings className="w-4 h-4" />
              {ordersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-[9px] font-black rounded-full flex items-center justify-center text-white">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center p-1 bg-navy-900 rounded-xl border border-navy-800 text-xs shadow-inner">
              <button
                onClick={() => setRole('buyer')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 ${
                  role === 'buyer'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-navy-400 hover:text-white'
                }`}
                title="Buyer View"
              >
                <UserCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buyer</span>
              </button>

              <button
                onClick={() => setRole('supplier')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 ${
                  role === 'supplier'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-navy-400 hover:text-white'
                }`}
                title="Supplier Portal"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Supplier</span>
              </button>

              <button
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 ${
                  role === 'admin'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-navy-400 hover:text-white'
                }`}
                title="Admin Ops"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
