'use client';

import React from 'react';
import { useAppStore } from '../lib/store';
import { Navbar } from '../components/Navbar';
import { SearchSection } from '../components/SearchSection';
import { FilterSidebar } from '../components/FilterSidebar';
import { SupplierCard } from '../components/SupplierCard';
import { SupplierProfileModal } from '../components/SupplierProfileModal';
import { RfqModal } from '../components/RfqModal';
import { ComparisonModal } from '../components/ComparisonModal';
import { SupplierAuthModal } from '../components/SupplierAuthModal';
import { SettingsModal } from '../components/SettingsModal';
import { BuyerDashboard } from '../components/BuyerDashboard';
import { SupplierDashboard } from '../components/SupplierDashboard';
import { AdminDashboard } from '../components/AdminDashboard';
import { Sparkles, Layers, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';

export default function Home() {
  const {
    role,
    setRole,
    theme,
    setTheme,
    suppliers,
    activeSupplierId,
    setActiveSupplierId,
    loginSupplier,
    registerNewSupplier,
    filters,
    setFilters,
    rankedResults,
    bookmarkedIds,
    toggleBookmark,
    comparedIds,
    toggleCompare,
    rfqs,
    orders,
    submitRfq,
    respondToRfq,
    acceptQuote,
    toggleSupplierVerification,
    updateSupplierProfile,
    logOut,
    selectedSupplierForProfile,
    setSelectedSupplierForProfile,
    selectedSupplierForRfq,
    setSelectedSupplierForRfq,
    isComparisonOpen,
    setIsComparisonOpen,
    isSupplierAuthOpen,
    setIsSupplierAuthOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    activeTab,
    setActiveTab,
  } = useAppStore();

  const bookmarkedSuppliers = suppliers.filter(s => bookmarkedIds.includes(s.id));
  const comparedSuppliers = suppliers.filter(s => comparedIds.includes(s.id));

  // Current supplier profile for supplier role view
  const currentSupplier = suppliers.find(s => s.id === activeSupplierId) || suppliers[0];

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-50 dark:bg-navy-950 text-navy-950 dark:text-navy-50 selection:bg-brand-500 selection:text-white transition-colors duration-200">
      {/* Top Sticky Enterprise Navbar */}
      <Navbar
        role={role}
        setRole={setRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={bookmarkedIds.length}
        rfqCount={rfqs.length}
        compareCount={comparedIds.length}
        ordersCount={orders.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenSupplierAuth={() => setIsSupplierAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeSupplierName={currentSupplier?.name}
      />

      {/* Main Content Area Based on Role & Tab */}
      <main className="flex-1">
        {/* BUYER VIEW */}
        {role === 'buyer' && (
          <>
            {activeTab === 'discover' && (
              <div>
                {/* 3D AI Natural Language Search Header */}
                <SearchSection
                  query={filters.query}
                  setQuery={(q) => setFilters(prev => ({ ...prev, query: q }))}
                  onClear={() => setFilters(prev => ({ ...prev, query: '' }))}
                  resultCount={rankedResults.length}
                  onOpenSupplierAuth={() => setIsSupplierAuthOpen(true)}
                />

                {/* Discovery Grid & Faceted Filters */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar Filter Column */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-24 space-y-4">
                        <FilterSidebar
                          filters={filters}
                          setFilters={setFilters}
                          totalResults={rankedResults.length}
                        />

                        {/* Global Supplier Registration Promo Card */}
                        <div className="p-4 bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl text-white border border-navy-800 shadow-card space-y-2.5">
                          <div className="flex items-center space-x-2 text-brand-400">
                            <Building2 className="w-4 h-4" />
                            <span className="font-bold text-xs uppercase tracking-wider">Manufacturer Onboarding</span>
                          </div>
                          <h4 className="font-extrabold text-sm text-white">Expand Your Global Sourcing Demand</h4>
                          <p className="text-[11px] text-navy-300 leading-relaxed">
                            List your 5-axis machines, cleanroom facilities, and ISO certificates.
                          </p>
                          <button
                            onClick={() => setIsSupplierAuthOpen(true)}
                            className="w-full py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5"
                          >
                            <span>Supplier Login / Register</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Results Column */}
                    <div className="lg:col-span-3 space-y-5">
                      {/* Results Header Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-navy-900 p-4 sm:p-5 rounded-2xl border border-navy-200/90 dark:border-navy-800 shadow-card">
                        <div className="flex items-center space-x-2.5">
                          <h2 className="text-base font-black text-navy-950 dark:text-white">
                            Verified Suppliers Ranked by AI Match Score
                          </h2>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                            {rankedResults.length} Available
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-xs text-navy-500 dark:text-navy-400">
                          <span className="font-semibold">Algorithm:</span>
                          <span className="font-bold text-brand-800 dark:text-brand-300 bg-navy-50 dark:bg-navy-800 px-2.5 py-1 rounded-lg border border-navy-200 dark:border-navy-700">
                            Cold-Start Formula (40% Relevance + 25% GST Audit + 20% Metrology + 15% SLA)
                          </span>
                        </div>
                      </div>

                      {/* Supplier Cards List */}
                      {rankedResults.length === 0 ? (
                        <div className="bg-white dark:bg-navy-900 rounded-2xl p-14 text-center border border-navy-200 dark:border-navy-800 shadow-card space-y-4">
                          <div className="w-14 h-14 rounded-2xl bg-navy-100 dark:bg-navy-800 flex items-center justify-center mx-auto text-navy-400">
                            <Layers className="w-7 h-7" />
                          </div>
                          <h3 className="text-lg font-bold text-navy-900 dark:text-white">No matching suppliers found</h3>
                          <p className="text-xs text-navy-500 dark:text-navy-400 max-w-md mx-auto">
                            Try expanding your search query or unchecking filters to browse all verified manufacturers.
                          </p>
                          <button
                            onClick={() => setFilters({
                              query: '',
                              isAiQuery: false,
                              categories: [],
                              certifications: [],
                              location: 'All Locations',
                              verifiedOnly: false,
                              materials: [],
                            })}
                            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition"
                          >
                            Reset All Filters
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {rankedResults.map(({ supplier }) => (
                            <SupplierCard
                              key={supplier.id}
                              supplier={supplier}
                              isBookmarked={bookmarkedIds.includes(supplier.id)}
                              onToggleBookmark={() => toggleBookmark(supplier.id)}
                              isCompared={comparedIds.includes(supplier.id)}
                              onToggleCompare={() => toggleCompare(supplier.id)}
                              onViewProfile={() => setSelectedSupplierForProfile(supplier)}
                              onRequestQuote={() => setSelectedSupplierForRfq(supplier)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'my-rfqs' || activeTab === 'bookmarks') && (
              <BuyerDashboard
                rfqs={rfqs}
                bookmarkedSuppliers={bookmarkedSuppliers}
                onAcceptQuote={acceptQuote}
                onViewSupplierProfile={(s) => setSelectedSupplierForProfile(s)}
                onRequestQuoteAgain={(s) => setSelectedSupplierForRfq(s)}
              />
            )}
          </>
        )}

        {/* SUPPLIER VIEW */}
        {role === 'supplier' && (
          <SupplierDashboard
            supplier={currentSupplier}
            rfqs={rfqs}
            onRespondToRfq={respondToRfq}
            onUpdateProfile={updateSupplierProfile}
          />
        )}

        {/* ADMIN VIEW */}
        {role === 'admin' && (
          <AdminDashboard
            suppliers={suppliers}
            rfqs={rfqs}
            onToggleVerification={toggleSupplierVerification}
          />
        )}
      </main>

      {/* Modals */}
      <SupplierProfileModal
        supplier={selectedSupplierForProfile}
        onClose={() => setSelectedSupplierForProfile(null)}
        onRequestQuote={(sup) => setSelectedSupplierForRfq(sup)}
      />

      <RfqModal
        supplier={selectedSupplierForRfq}
        onClose={() => setSelectedSupplierForRfq(null)}
        onSubmit={submitRfq}
      />

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        comparedSuppliers={comparedSuppliers}
        onRemoveSupplier={(id) => toggleCompare(id)}
        onRequestQuote={(sup) => setSelectedSupplierForRfq(sup)}
      />

      {/* Supplier Login & New Registration Wizard Modal */}
      <SupplierAuthModal
        isOpen={isSupplierAuthOpen}
        onClose={() => setIsSupplierAuthOpen(false)}
        suppliers={suppliers}
        onLoginSupplier={loginSupplier}
        onRegisterSupplier={registerNewSupplier}
      />

      {/* Settings Modal (Theme, Orders, Profile, Sign Out) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        orders={orders}
        role={role}
        onLogOut={logOut}
      />

      {/* Global Enterprise Footer */}
      <footer className="bg-navy-950 text-white border-t border-navy-800/80 py-10 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-navy-400">
          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
              ST
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">SourceTrust Discovery OS</span>
              <span className="mx-2 text-navy-600">•</span>
              <span className="text-navy-300">Verification with Teeth · Curation over Volume</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>GST & Audit Verified Registry</span>
            </span>
            <span className="text-navy-700">•</span>
            <span>Pilot Build v1.1 Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
