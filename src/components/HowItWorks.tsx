import React from 'react';
import { Search, FileSearch, ShieldAlert, Stethoscope, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartChecking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartChecking }) => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Enter Medicine Names',
      icon: Search,
      iconBg: 'bg-blue-100 text-blue-600',
      description:
        'Input at least two medications by their generic or brand names (prescription drugs, over-the-counter pain relievers, or herbal supplements) with intelligent autocomplete assistance.',
    },
    {
      step: 'Step 2',
      title: 'Verify Medicine Information',
      icon: FileSearch,
      iconBg: 'bg-teal-100 text-teal-600',
      description:
        'Review individual monograph profile cards detailing pharmacological classes, therapeutic uses, metabolic clearance routes, and known Cytochrome P450 profiles.',
    },
    {
      step: 'Step 3',
      title: 'Check Documented Evidence',
      icon: ShieldAlert,
      iconBg: 'bg-purple-100 text-purple-600',
      description:
        'The clinical engine cross-evaluates each pairwise combination against documented clinical guidelines, evaluating metabolic bottlenecks and synergistic physiological hazards.',
    },
    {
      step: 'Step 4',
      title: 'Consult Healthcare Professional',
      icon: Stethoscope,
      iconBg: 'bg-emerald-100 text-emerald-600',
      description:
        'Read the simplified clinical summary, observe critical warning red flags, print or export the report, and consult your doctor or pharmacist before making any regimen changes.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <span>4-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How MediSafe AI Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A methodical, evidence-grounded sequence designed for student pharmacologists and patient empowerment.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-teal-700">
                  <span>Pharmacological protocol verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartChecking}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-100"
          >
            <span>Try It With Your Medicines</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
