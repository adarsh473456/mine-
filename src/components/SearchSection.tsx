'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  Filter, 
  MapPin, 
  Award, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Clock, 
  ArrowRight,
  Boxes,
  Microchip,
  Layers
} from 'lucide-react';
import { POPULAR_AI_PROMPTS } from '../data/defaultCategories';
import { parseNaturalLanguageQuery } from '../lib/aiSearchEngine';

interface SearchSectionProps {
  query: string;
  setQuery: (query: string) => void;
  onClear: () => void;
  resultCount: number;
  onOpenSupplierAuth: () => void;
}

export function SearchSection({
  query,
  setQuery,
  onClear,
  resultCount,
  onOpenSupplierAuth,
}: SearchSectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const parsed = query ? parseNaturalLanguageQuery(query) : null;
  const hasParsedEntities = parsed && (
    parsed.detectedCategories.length > 0 ||
    parsed.detectedCertifications.length > 0 ||
    parsed.detectedMaterials.length > 0 ||
    parsed.detectedLocation !== null ||
    parsed.wantsFiveAxis
  );

  return (
    <div className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-navy-800 overflow-hidden">
      {/* 3D Background Decorative Grid & Glow Spheres */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-5xl mx-auto text-center space-y-5">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-850/90 border border-brand-500/30 text-brand-300 text-xs font-semibold shadow-lg backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin-slow" />
          <span>Strategic Sourcing Operating System • Verification with Teeth</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Find & Evaluate <span className="shimmer-text">Verified Suppliers</span> in Seconds
        </h1>
        <p className="text-xs sm:text-base text-navy-300 max-w-2xl mx-auto font-normal">
          Type your exact technical requirements in plain English. Our AI analyzes certified machine envelopes, tolerances, and physical plant audit records.
        </p>

        {/* Natural Language Search Bar with 3D Glow */}
        <div className="mt-8 relative max-w-3xl mx-auto perspective-1000">
          <div
            className={`relative flex items-center bg-white rounded-2xl shadow-2xl border-2 transition-all duration-300 ${
              isFocused
                ? 'border-brand-400 ring-4 ring-brand-500/30 shadow-[0_0_35px_rgba(2,132,199,0.3)] scale-[1.01]'
                : 'border-navy-200/90 hover:border-brand-400/80 shadow-xl'
            }`}
          >
            <div className="pl-4 pr-2 text-brand-600 flex items-center">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="e.g. ISO 9001 certified CNC machine shop in Bangalore with 5-axis milling..."
              className="w-full py-4 pr-10 text-sm sm:text-base text-navy-950 placeholder-navy-400 bg-transparent focus:outline-none font-medium"
            />

            {query && (
              <button
                onClick={onClear}
                className="p-2 text-navy-400 hover:text-navy-700 mr-2 rounded-full hover:bg-navy-100 transition"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => {}}
              className="m-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition flex items-center space-x-2 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search Suppliers</span>
            </button>
          </div>

          {/* Real-time AI Extracted Intent Tags */}
          {hasParsedEntities && (
            <div className="mt-3.5 p-3.5 glass-panel rounded-xl text-left text-xs flex flex-wrap items-center gap-2 animate-fadeIn shadow-lg">
              <span className="text-brand-300 font-bold flex items-center space-x-1.5 mr-1">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>AI Extracted Intent:</span>
              </span>

              {parsed.detectedCategories.map(cat => (
                <span key={cat} className="px-2.5 py-1 rounded-lg bg-brand-900/90 text-brand-200 border border-brand-500/50 flex items-center space-x-1.5 font-bold shadow-xs">
                  <Wrench className="w-3 h-3 text-brand-400" />
                  <span>{cat}</span>
                </span>
              ))}

              {parsed.wantsFiveAxis && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-900/90 text-purple-200 border border-purple-500/50 font-bold shadow-xs flex items-center space-x-1">
                  <Cpu className="w-3 h-3 text-purple-400" />
                  <span>5-Axis CNC Metrology</span>
                </span>
              )}

              {parsed.detectedCertifications.map(cert => (
                <span key={cert} className="px-2.5 py-1 rounded-lg bg-emerald-900/90 text-emerald-200 border border-emerald-500/50 flex items-center space-x-1.5 font-bold shadow-xs">
                  <Award className="w-3 h-3 text-emerald-400" />
                  <span>{cert}</span>
                </span>
              ))}

              {parsed.detectedLocation && (
                <span key={parsed.detectedLocation} className="px-2.5 py-1 rounded-lg bg-amber-900/90 text-amber-200 border border-amber-500/50 flex items-center space-x-1.5 font-bold shadow-xs">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{parsed.detectedLocation}</span>
                </span>
              )}

              {parsed.detectedMaterials.map(mat => (
                <span key={mat} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-600 font-semibold">
                  {mat}
                </span>
              ))}
            </div>
          )}

          {/* Popular Prompt Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-navy-300">
            <span className="font-bold text-navy-400 mr-1 flex items-center space-x-1">
              <span>Try Prompts:</span>
            </span>
            {POPULAR_AI_PROMPTS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(prompt)}
                className="px-3 py-1.5 rounded-lg bg-navy-850/90 hover:bg-navy-750 text-navy-200 border border-navy-700 hover:border-brand-400 hover:text-white transition duration-150 text-left truncate max-w-xs sm:max-w-md shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Category Highlights with Floating Dynamics */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div
            onClick={() => setQuery('5-axis CNC machining titanium')}
            className="p-4 glass-panel rounded-2xl hover:border-brand-400 cursor-pointer card-3d-hover group"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-600/30 border border-brand-500/40 text-brand-400 flex items-center justify-center group-hover:scale-110 transition">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-xs mt-2.5 group-hover:text-brand-300 transition">5-Axis CNC Machining</h4>
            <p className="text-[11px] text-navy-400 mt-0.5">Titanium & Inconel tolerances to ±0.002 mm</p>
          </div>

          <div
            onClick={() => setQuery('sheet metal laser cutting powder coating')}
            className="p-4 glass-panel rounded-2xl hover:border-brand-400 cursor-pointer card-3d-hover group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-xs mt-2.5 group-hover:text-emerald-300 transition">Sheet Metal & Enclosures</h4>
            <p className="text-[11px] text-navy-400 mt-0.5">10kW fiber laser & robotic bending</p>
          </div>

          <div
            onClick={() => setQuery('medical cleanroom injection molding ISO 13485')}
            className="p-4 glass-panel rounded-2xl hover:border-brand-400 cursor-pointer card-3d-hover group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
              <Boxes className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-xs mt-2.5 group-hover:text-purple-300 transition">Cleanroom Molding</h4>
            <p className="text-[11px] text-navy-400 mt-0.5">ISO Class 7/8 medical disposables</p>
          </div>

          <div
            onClick={() => setQuery('turnkey PCB assembly SMT BGA')}
            className="p-4 glass-panel rounded-2xl hover:border-brand-400 cursor-pointer card-3d-hover group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-600/30 border border-amber-500/40 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
              <Microchip className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-xs mt-2.5 group-hover:text-amber-300 transition">SMT PCBA Electronics</h4>
            <p className="text-[11px] text-navy-400 mt-0.5">High-speed Yamaha SMT & 3D AOI</p>
          </div>
        </div>

        {/* Global Live Trust Metric Ticker */}
        <div className="mt-8 pt-6 border-t border-navy-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-navy-300">GST/Tax ID Verified: <strong className="text-white">100%</strong></span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-brand-400" />
              <span className="text-navy-300">Avg Quote Response: <strong className="text-white">&lt; 2.4 Hours</strong></span>
            </div>

            <div className="hidden sm:flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span className="text-navy-300">Physical Plant Audited: <strong className="text-white">Yes</strong></span>
            </div>
          </div>

          {/* Callout to Onboard as Global Supplier */}
          <button
            onClick={onOpenSupplierAuth}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-300 hover:text-white bg-navy-800/80 hover:bg-brand-600 px-3.5 py-1.5 rounded-lg border border-brand-500/40 transition shadow-sm"
          >
            <span>Are you a manufacturer? Register Facility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
