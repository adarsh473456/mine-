'use client';

import React from 'react';
import { Supplier, RFQ } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Building2, 
  FileText, 
  Users, 
  Award, 
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardProps {
  suppliers: Supplier[];
  rfqs: RFQ[];
  onToggleVerification: (supplierId: string) => void;
}

export function AdminDashboard({
  suppliers,
  rfqs,
  onToggleVerification,
}: AdminDashboardProps) {
  const verifiedCount = suppliers.filter(s => s.verified).length;
  const pendingCount = suppliers.length - verifiedCount;
  const quotedCount = rfqs.filter(r => r.status === 'quoted' || r.status === 'accepted').length;
  const quoteResponseRate = rfqs.length > 0 ? Math.round((quotedCount / rfqs.length) * 100) : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-navy-900 to-navy-950 rounded-2xl p-6 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-amber-900/40">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-900/80 text-amber-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Platform Operations & Trust Audit Hub</span>
          </div>
          <h1 className="text-2xl font-extrabold">Admin Verification & Quality Control</h1>
          <p className="text-xs sm:text-sm text-navy-300 mt-1 max-w-2xl">
            Audit supplier registrations, enforce GST and ISO certification compliance, and issue authentic &quot;Verified Supplier Badges&quot;.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
            {verifiedCount} Verified Live
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-500/50 text-amber-300 font-bold">
            {pendingCount} Pending Audit
          </span>
        </div>
      </div>

      {/* 90-Day Pilot KPIs Section (from Technical Report Section 14) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-brand-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-600">
              90-Day Strategic Launch Metrics
            </h2>
          </div>
          <span className="text-xs text-navy-400">Real-time Platform Health</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-card">
            <span className="text-xs text-navy-500 font-medium block">Verified Supplier Base</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-extrabold text-navy-950">{verifiedCount}</span>
              <span className="text-xs text-emerald-600 font-bold">+{suppliers.length} in catalog</span>
            </div>
            <p className="text-[10px] text-navy-400 mt-1">Supply side trust signal</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-card">
            <span className="text-xs text-navy-500 font-medium block">RFQs Initiated</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-extrabold text-brand-600">{rfqs.length}</span>
              <span className="text-xs text-brand-700 font-bold">{quotedCount} Quoted</span>
            </div>
            <p className="text-[10px] text-navy-400 mt-1">Demand discovery activity</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-card">
            <span className="text-xs text-navy-500 font-medium block">RFQ Response Rate</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-extrabold text-emerald-600">{quoteResponseRate}%</span>
              <span className="text-xs text-navy-500 font-medium">avg 2.2 hrs</span>
            </div>
            <p className="text-[10px] text-navy-400 mt-1">Direct value metric to buyers</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-navy-200 shadow-card">
            <span className="text-xs text-navy-500 font-medium block">AI Ranking CTR</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-extrabold text-purple-600">84.2%</span>
              <span className="text-xs text-purple-600 font-bold">Top 3 matches</span>
            </div>
            <p className="text-[10px] text-navy-400 mt-1">Ranking formula precision</p>
          </div>
        </div>
      </section>

      {/* Supplier Verification Queue Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-extrabold text-navy-950">Supplier Verification Queue</h2>
          </div>
          <span className="text-xs text-navy-500">Toggle badges to simulate manual & automated audits</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-navy-200 bg-white shadow-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Company Name & Hub</th>
                <th className="p-3.5">GST / Legal Name</th>
                <th className="p-3.5">Certifications</th>
                <th className="p-3.5">Audit Status</th>
                <th className="p-3.5">Verification Badge Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-200">
              {suppliers.map((s, idx) => (
                <tr key={s.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-navy-50/40'}>
                  <td className="p-3.5">
                    <div className="font-bold text-navy-950 text-sm">{s.name}</div>
                    <div className="text-navy-500 text-[11px] mt-0.5">{s.category} • {s.location.city}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="font-mono font-bold text-navy-800">{s.verificationDetails.gstNumber}</div>
                    <div className="text-navy-500 text-[11px] mt-0.5">{s.verificationDetails.registeredLegalName}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {s.certifications.map(c => (
                        <span key={c.code} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-navy-100 text-navy-800">
                          {c.code}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3.5">
                    {s.verified ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Audit Pending</span>
                      </span>
                    )}
                  </td>

                  <td className="p-3.5">
                    <button
                      onClick={() => onToggleVerification(s.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-xs ${
                        s.verified
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {s.verified ? (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Revoke Verified Badge</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Issue Badge</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
