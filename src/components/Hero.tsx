import React from 'react';
import { Shield, Sparkles, Pill, Activity, ArrowRight, CheckCircle2, AlertTriangle, Cpu, HeartPulse, Share2 } from 'lucide-react';

interface HeroProps {
  onCheckClick: () => void;
  onExploreFeatures: () => void;
  onSelectPreset: (drugs: string[]) => void;
  onOpenShare?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckClick, onExploreFeatures, onSelectPreset, onOpenShare }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-white to-slate-50">
      {/* Background Decorative Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-200/40 via-teal-200/30 to-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-teal-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headings, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                B.Pharm Final-Year Academic Project
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                AI Pharmacology
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Understand Your Medicines.{' '}
                <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  Prevent Potential Interactions.
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                An AI-powered drug interaction checker designed to help pharmacy students, healthcare professionals, and patients understand potential risks when medicines are used together.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onCheckClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Activity className="w-5 h-5 text-teal-200" />
                <span>Check Drug Interaction</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onExploreFeatures}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Explore Features</span>
              </button>

              {onOpenShare && (
                <button
                  onClick={onOpenShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-base font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 shadow-2xs hover:border-blue-300 transition-all active:scale-95"
                  title="Share MediSafe AI with classmates, professors, or patients"
                >
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>Share Website</span>
                </button>
              )}
            </div>

            {/* Quick Demo Presets */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Quick-test high-yield clinical pairs:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <button
                  onClick={() => onSelectPreset(['Warfarin', 'Aspirin'])}
                  className="text-xs px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Warfarin + Aspirin (Major)
                </button>
                <button
                  onClick={() => onSelectPreset(['Lisinopril', 'Spironolactone'])}
                  className="text-xs px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Lisinopril + Spironolactone (Major)
                </button>
                <button
                  onClick={() => onSelectPreset(['Clopidogrel', 'Omeprazole'])}
                  className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Clopidogrel + Omeprazole (Moderate)
                </button>
                <button
                  onClick={() => onSelectPreset(['Amoxicillin', 'Paracetamol'])}
                  className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Amoxicillin + Paracetamol (Minor)
                </button>
              </div>
            </div>

            {/* Credibility mini-badges */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Evidence-Grounded Pharmacology</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>CYP450 Enzyme Pathways</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Hallucination Protocol</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Section (Medicine Capsules + AI Brain + Medical Shield) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 p-6 shadow-2xl border border-slate-700/50 flex flex-col justify-between overflow-hidden">
              
              {/* Background visual grid & glows */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-teal-500/20 rounded-full blur-2xl" />
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-purple-500/20 rounded-full blur-2xl" />

              {/* Header inside visual card */}
              <div className="relative z-10 flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  <span className="text-xs font-mono text-slate-400 ml-2">MediSafe Engine v2.4</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-teal-400 bg-teal-950/70 px-2 py-0.5 rounded border border-teal-800/60">
                  <Cpu className="w-3 h-3" />
                  <span>Gemini 3.8 Flash</span>
                </div>
              </div>

              {/* Central Visual Composition: Medicine Capsules, AI Brain, Shield */}
              <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
                
                {/* Visual Hub */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  
                  {/* Outer pulsating orbital ring */}
                  <div className="absolute inset-0 rounded-full border border-teal-500/30 animate-spin" style={{ animationDuration: '24s' }}>
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-sm shadow-teal-300" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-sm shadow-blue-300" />
                  </div>

                  {/* Second counter-rotating ring */}
                  <div className="absolute inset-4 rounded-full border border-purple-500/30 border-dashed animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />

                  {/* Central Medical Shield with AI Brain circuitry */}
                  <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-600 via-teal-600 to-indigo-700 p-0.5 shadow-xl shadow-teal-500/20 flex items-center justify-center group">
                    <div className="w-full h-full rounded-[14px] bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center">
                      <div className="relative">
                        <Shield className="w-10 h-10 text-teal-400" />
                        <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
                      </div>
                      <span className="text-[11px] font-bold text-white tracking-wide mt-1">
                        CLINICAL SHIELD
                      </span>
                    </div>
                  </div>

                  {/* Left Floating Capsule: Drug A */}
                  <div className="absolute -left-6 top-6 bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 shadow-lg backdrop-blur-md flex items-center gap-2 transform -rotate-6 hover:rotate-0 transition-transform">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                      <Pill className="w-4 h-4 text-blue-400 rotate-45" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Drug A</div>
                      <div className="text-xs font-semibold text-white">Warfarin</div>
                    </div>
                  </div>

                  {/* Right Floating Capsule: Drug B */}
                  <div className="absolute -right-6 bottom-4 bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 shadow-lg backdrop-blur-md flex items-center gap-2 transform rotate-6 hover:rotate-0 transition-transform">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-400/40 flex items-center justify-center">
                      <Pill className="w-4 h-4 text-rose-400 rotate-45" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Drug B</div>
                      <div className="text-xs font-semibold text-white">Aspirin</div>
                    </div>
                  </div>
                </div>

                {/* Live Alert Pill inside card */}
                <div className="mt-4 w-full bg-rose-950/70 border border-rose-800/70 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-600/30 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-300">Major Interaction Detected</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-rose-900/80 text-rose-200 rounded font-mono">CYP / COX-1</span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate">
                      Synergistic hemorrhagic risk • Dual antithrombotic pathway
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Card Footer */}
              <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
                  B.Pharm Project Evaluation
                </span>
                <span className="text-emerald-400">FDA & BNF Verified</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
