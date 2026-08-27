'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  MapPin, 
  Award, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  ArrowRight,
  Boxes,
  Microchip,
  Layers
} from 'lucide-react';
import { POPULAR_AI_PROMPTS } from '../data/defaultCategories';
import { parseNaturalLanguageQuery } from '../lib/aiSearchEngine';
import { GlassEffect, GlassFilter, GlassButton, GlassDock } from './ui/liquid-glass';

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

  const categoryIcons = [
    {
      query: '5-axis CNC machining titanium',
      icon: <Cpu className="w-5 h-5" />,
      label: '5-Axis CNC Machining',
      sub: 'Titanium & Inconel ±0.002 mm',
      color: 'brand',
    },
    {
      query: 'sheet metal laser cutting powder coating',
      icon: <Layers className="w-5 h-5" />,
      label: 'Sheet Metal & Enclosures',
      sub: '10kW fiber laser & robotic bending',
      color: 'emerald',
    },
    {
      query: 'medical cleanroom injection molding ISO 13485',
      icon: <Boxes className="w-5 h-5" />,
      label: 'Cleanroom Molding',
      sub: 'ISO Class 7/8 medical disposables',
      color: 'purple',
    },
    {
      query: 'turnkey PCB assembly SMT BGA',
      icon: <Microchip className="w-5 h-5" />,
      label: 'SMT PCBA Electronics',
      sub: 'High-speed Yamaha SMT & 3D AOI',
      color: 'amber',
    },
  ];

  return (
    <div
      className="relative text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        animation: 'moveBackground 90s linear infinite',
      }}
    >
      {/* GlassFilter SVG (rendered once) */}
      <GlassFilter />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-navy-950/65 backdrop-blur-[1px]" />

      {/* Glow orbs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">

        {/* Trust Badge — Liquid Glass pill */}
        <GlassEffect className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold text-white">
          <Sparkles className="w-3.5 h-3.5 text-brand-300" />
          <span>Strategic Sourcing OS · Verification with Teeth · 100% GST Audited</span>
        </GlassEffect>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-xl">
          Find & Evaluate{' '}
          <span className="shimmer-text">Verified Suppliers</span>{' '}
          in Seconds
        </h1>
        <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto font-normal drop-shadow">
          Type your exact technical requirements in plain English. Our AI analyzes certified machine envelopes, tolerances, and physical plant audit records.
        </p>

        {/* Liquid Glass Search Bar */}
        <div className="mt-6 relative max-w-3xl mx-auto">
          <GlassEffect
            className={`flex items-center rounded-2xl transition-all duration-300 ${
              isFocused ? 'ring-2 ring-brand-400/60 shadow-[0_0_35px_rgba(2,132,199,0.3)]' : ''
            }`}
          >
            <div className="pl-4 pr-2 text-brand-300 flex items-center">
              <Sparkles className="w-6 h-6" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="e.g. ISO 9001 certified CNC machine shop in Bangalore with 5-axis milling..."
              className="w-full py-4 pr-3 text-sm sm:text-base text-white placeholder-white/50 bg-transparent focus:outline-none font-medium"
            />

            {query && (
              <button
                onClick={onClear}
                className="p-2 text-white/60 hover:text-white mr-1 transition"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              className="m-2 px-5 py-2.5 bg-brand-600/90 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition flex items-center space-x-2 flex-shrink-0 border border-brand-400/40"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search Suppliers</span>
            </button>
          </GlassEffect>

          {/* AI Intent Tags */}
          {hasParsedEntities && (
            <GlassEffect className="mt-3 p-3.5 rounded-xl text-left text-xs flex flex-wrap items-center gap-2">
              <span className="text-brand-200 font-bold flex items-center space-x-1.5 mr-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI Extracted Intent:</span>
              </span>

              {parsed!.detectedCategories.map(cat => (
                <span key={cat} className="px-2.5 py-1 rounded-lg bg-brand-900/80 text-brand-200 border border-brand-500/50 flex items-center space-x-1.5 font-bold">
                  <Wrench className="w-3 h-3" />
                  <span>{cat}</span>
                </span>
              ))}
              {parsed!.wantsFiveAxis && (
                <span className="px-2.5 py-1 rounded-lg bg-purple-900/80 text-purple-200 border border-purple-500/50 font-bold flex items-center space-x-1">
                  <Cpu className="w-3 h-3" />
                  <span>5-Axis CNC Metrology</span>
                </span>
              )}
              {parsed!.detectedCertifications.map(cert => (
                <span key={cert} className="px-2.5 py-1 rounded-lg bg-emerald-900/80 text-emerald-200 border border-emerald-500/50 flex items-center space-x-1.5 font-bold">
                  <Award className="w-3 h-3" />
                  <span>{cert}</span>
                </span>
              ))}
              {parsed!.detectedLocation && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-900/80 text-amber-200 border border-amber-500/50 flex items-center space-x-1.5 font-bold">
                  <MapPin className="w-3 h-3" />
                  <span>{parsed!.detectedLocation}</span>
                </span>
              )}
              {parsed!.detectedMaterials.map(mat => (
                <span key={mat} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-600 font-semibold">
                  {mat}
                </span>
              ))}
            </GlassEffect>
          )}

          {/* Popular Prompt Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
            <span className="font-bold text-white/50 mr-1">Try:</span>
            {POPULAR_AI_PROMPTS.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(prompt)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 hover:border-brand-300/60 transition truncate max-w-xs sm:max-w-sm shadow backdrop-blur-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Liquid Glass Category Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          {categoryIcons.map((cat) => (
            <GlassEffect
              key={cat.label}
              className="p-4 rounded-2xl cursor-pointer card-3d-hover group"
              style={{ cursor: 'pointer' }}
            >
              <div
                onClick={() => setQuery(cat.query)}
                className="flex flex-col"
              >
                <div className={`w-9 h-9 rounded-lg bg-${cat.color}-600/30 border border-${cat.color}-500/40 text-${cat.color}-300 flex items-center justify-center group-hover:scale-110 transition`}>
                  {cat.icon}
                </div>
                <h4 className="font-bold text-white text-xs mt-2.5 group-hover:text-brand-200 transition">{cat.label}</h4>
                <p className="text-[11px] text-white/55 mt-0.5">{cat.sub}</p>
              </div>
            </GlassEffect>
          ))}
        </div>

        {/* Trust Ticker & Manufacturer CTA */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white/75">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>GST/Tax ID Verified: <strong className="text-white">100%</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-white/75">
              <Clock className="w-4 h-4 text-brand-300" />
              <span>Avg Quote: <strong className="text-white">&lt; 2.4 Hrs</strong></span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-white/75">
              <CheckCircle2 className="w-4 h-4 text-purple-300" />
              <span>Physical Audit: <strong className="text-white">Yes</strong></span>
            </div>
          </div>

          {/* Liquid Glass CTA for Suppliers */}
          <GlassEffect className="rounded-xl overflow-hidden">
            <button
              onClick={onOpenSupplierAuth}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-white px-3.5 py-2 transition"
            >
              <span>Are you a manufacturer? Register Facility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </GlassEffect>
        </div>
      </div>
    </div>
  );
}
