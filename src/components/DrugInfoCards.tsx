import React from 'react';
import { Pill, ShieldAlert, Sparkles, BookOpen, Activity, AlertCircle, Info } from 'lucide-react';
import { DrugInfoCardData } from '../types/pharmacy';

interface DrugInfoCardsProps {
  cards: DrugInfoCardData[];
}

export const DrugInfoCards: React.FC<DrugInfoCardsProps> = ({ cards }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-1 rounded-full mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Section 6: Monograph Profiles</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Individual Medicine Information Cards
            </h3>
            <p className="text-sm text-slate-600">
              Pharmacological drug classes, verified therapeutic uses, and key precautions for each entered agent.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {cards.length} Drug Monograph{cards.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header with Drug Name & Class */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Pill className="w-6 h-6 rotate-45" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{card.name}</h4>
                      <p className="text-xs font-semibold text-teal-700">{card.genericName}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                    Agent {idx + 1}
                  </span>
                </div>

                {/* Drug Class */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-blue-500" />
                    Pharmacological Class
                  </span>
                  <div className="text-xs font-semibold text-slate-800 bg-blue-50/60 px-3 py-2 rounded-xl border border-blue-100">
                    {card.drugClass}
                  </div>
                </div>

                {/* Therapeutic Use */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-teal-500" />
                    General Therapeutic Use
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {card.therapeuticUse}
                  </p>
                </div>

                {/* Important Precautions */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-500" />
                    Important Clinical Precautions
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100/80">
                    {card.precautions}
                  </p>
                </div>

                {/* CYP Profile or Known Interaction Profile */}
                {card.cypProfile && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-purple-500" />
                      Metabolic Profile & Enzymes
                    </span>
                    <p className="text-xs font-mono text-purple-900 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                      {card.cypProfile}
                    </p>
                  </div>
                )}
              </div>

              {/* Monograph Footer Warning */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Does not provide personalized prescribing or dosing instructions.</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
