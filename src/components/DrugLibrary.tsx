import React, { useState } from 'react';
import { BookOpen, Search, AlertOctagon, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { PRESET_PAIRS, VERIFIED_INTERACTIONS_MAP } from '../data/drugDatabase';
import { InteractionSeverity } from '../types/pharmacy';

interface DrugLibraryProps {
  onLoadPair: (drugs: string[]) => void;
}

export const DrugLibrary: React.FC<DrugLibraryProps> = ({ onLoadPair }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  // Convert map into display items
  const libraryEntries = Object.entries(VERIFIED_INTERACTIONS_MAP).map(([key, pair]) => ({
    key,
    drugA: pair.drugA,
    drugB: pair.drugB,
    severity: pair.severity,
    type: pair.type,
    mechanism: pair.mechanism,
    consequences: pair.clinicalConsequences,
    evidenceSource: pair.evidenceSource,
    isVerified: pair.isVerifiedReference,
    isDemo: pair.isDemonstrationData,
  }));

  const filteredEntries = libraryEntries.filter((item) => {
    const matchesSearch =
      item.drugA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.drugB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mechanism.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.evidenceSource.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'all' ? true : item.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  const getSeverityStyle = (severity: InteractionSeverity) => {
    switch (severity) {
      case 'major':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: AlertOctagon,
          iconColor: 'text-rose-600',
        };
      case 'moderate':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
        };
      case 'minor':
      default:
        return {
          bg: 'bg-teal-50 text-teal-800 border-teal-200',
          icon: CheckCircle2,
          iconColor: 'text-teal-600',
        };
    }
  };

  return (
    <section id="library" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Section 7.C: Reference Monograph Library</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Clinical Drug Interaction Library
            </h2>
            <p className="text-base text-slate-600 max-w-2xl">
              Educational database of clinically documented drug interactions verified against FDA Prescribing Information, British National Formulary (BNF), and Stockley’s.
            </p>
          </div>

          {/* Search Input & Severity Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drug names or mechanisms..."
                className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="major">Major Severity Only</option>
              <option value="moderate">Moderate Severity Only</option>
              <option value="minor">Minor / Compatible Only</option>
            </select>
          </div>
        </div>

        {/* Interaction Library Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((item, idx) => {
            const style = getSeverityStyle(item.severity);
            const Icon = style.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${style.bg}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span className="capitalize">{item.severity} Severity</span>
                    </span>

                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.isVerified ? 'Verified Reference' : 'Demonstration'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.drugA} + {item.drugB}
                  </h3>

                  {/* Type badge */}
                  <div className="text-[11px] text-slate-500 font-medium">
                    Interaction Type: <span className="font-semibold text-slate-700 capitalize">{item.type}</span>
                  </div>

                  {/* Mechanism Preview */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {item.mechanism}
                  </p>

                  {/* Evidence Source */}
                  <div className="text-[11px] text-slate-400 font-medium line-clamp-1">
                    Source: {item.evidenceSource}
                  </div>
                </div>

                {/* Card Action: Load Into Checker */}
                <button
                  onClick={() => onLoadPair([item.drugA, item.drugB])}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                  <span>Load Into Interactive Checker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {filteredEntries.length === 0 && (
          <div className="p-10 rounded-3xl bg-white border border-slate-200 text-center space-y-2">
            <p className="text-base font-semibold text-slate-700">No matching interactions found in library filter.</p>
            <p className="text-xs text-slate-500">Try a different search term or reset your severity filter.</p>
          </div>
        )}

      </div>
    </section>
  );
};
