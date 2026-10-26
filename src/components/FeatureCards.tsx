import React from 'react';
import { Activity, AlertTriangle, Sparkles, ShieldCheck, Microscope, Database, ArrowRight } from 'lucide-react';

interface FeatureCardsProps {
  onLearnMore?: (feature: string) => void;
  onCheckNow: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onCheckNow }) => {
  const features = [
    {
      id: 'analysis',
      title: '1. Drug Interaction Analysis',
      badge: 'Pairwise Pharmacology',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Activity,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50/50',
      borderColor: 'border-blue-100 hover:border-blue-300',
      accentGlow: 'from-blue-600/10 to-transparent',
      description:
        'Analyzes multi-drug combinations to pinpoint both pharmacokinetic clashes (CYP450 enzyme inhibition, induction, clearance competition) and pharmacodynamic synergies (additive receptor effects).',
      bullets: [
        'Detailed molecular mechanisms & pathways',
        'Standardized 4-tier severity classifications',
        'Clear differentiation of clinical evidence'
      ]
    },
    {
      id: 'side-effects',
      title: '2. Potential Side Effect Awareness',
      badge: 'Patient Safety First',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: AlertTriangle,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50/50',
      borderColor: 'border-teal-100 hover:border-teal-300',
      accentGlow: 'from-teal-600/10 to-transparent',
      description:
        'Highlights critical symptoms and warning signs requiring immediate medical intervention, alongside specific vulnerability factors like renal impairment, age, or metabolic genetic traits.',
      bullets: [
        'Hallmark clinical warning signs & red flags',
        'Stratified patient risk factors (renal, hepatic, age)',
        'Evidence-backed preventative precautions'
      ]
    },
    {
      id: 'ai-information',
      title: '3. AI-Powered Medical Information',
      badge: 'Zero Hallucination',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Sparkles,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50/50',
      borderColor: 'border-purple-100 hover:border-purple-300',
      accentGlow: 'from-purple-600/10 to-transparent',
      description:
        'Synthesizes verified clinical monographs (FDA, BNF, Stockley’s) into plain-English educational guidance, empowering patients and pharmacy students with questions to ask doctors.',
      bullets: [
        'Structured questions for pharmacists & prescribers',
        'Verified clinical reference citations & dates',
        'Ethical safeguards: never advises unsupervised changes'
      ]
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase border border-slate-200">
            <Microscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Academic Clinical Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Medication Safety at a Glance
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Built as a B.Pharm final-year flagship project, MediSafe AI combines rigorous pharmacological principles with intuitive clinical safety communication.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`relative group bg-white rounded-3xl p-8 border ${feature.borderColor} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle top corner gradient */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${feature.accentGlow} rounded-bl-full pointer-events-none`} />

                <div>
                  {/* Top Header Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5 border-t border-slate-100 pt-5 mb-6">
                    {feature.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Action */}
                <button
                  onClick={onCheckNow}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5 transition-colors group-hover:text-blue-600"
                >
                  <span>Test in Checker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Pharmacological Architecture Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-teal-300 text-xs font-mono font-semibold uppercase">
              <Database className="w-4 h-4" />
              <span>Multi-Source Pharmacology Reference Layer</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold">
              Rigorous Cross-Verification Against Clinical Gold Standards
            </h4>
            <p className="text-sm text-slate-300 max-w-2xl">
              MediSafe AI references FDA Package Inserts, British National Formulary (BNF), and Stockley’s Drug Interactions to ensure no fabricated mechanisms or ungrounded statistics.
            </p>
          </div>
          <button
            onClick={onCheckNow}
            className="shrink-0 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Launch Interaction Checker
          </button>
        </div>

      </div>
    </section>
  );
};
