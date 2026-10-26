import React from 'react';
import { Pill, Sparkles, Shield, HeartPulse, GraduationCap, Github } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-teal-500 to-indigo-600 flex items-center justify-center shadow-md">
                <Pill className="w-5 h-5 text-white rotate-45" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">
                  MediSafe<span className="text-teal-400"> AI</span>
                </span>
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-blue-900 text-blue-200 rounded">
                  B.Pharm Project
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An evidence-grounded clinical pharmacology tool designed to evaluate drug–drug interactions, metabolic pathways, and patient safety precautions for pharmacy students and healthcare consumers.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              <span>Bachelor of Pharmacy Capstone Evaluation</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Clinical Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('checker')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Drug Interaction Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Core Features & Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Drug Interaction Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-teal-400 transition-colors"
                >
                  4-Step Clinical Workflow
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Pharmacology FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Academic References */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Clinical References
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• FDA Prescribing Information & CDER</li>
              <li>• British National Formulary (BNF)</li>
              <li>• Stockley’s Drug Interactions 12th Ed.</li>
              <li>• Cytochrome P450 Drug Interaction Tables</li>
              <li>• AHFS Drug Information</li>
            </ul>
            <div className="pt-2 text-xs text-slate-500">
              Department of Pharmacy Practice & Pharmacology
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} MediSafe AI – Academic College Project. For educational and research purposes only.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300">
              About Project
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">
              Contact Team
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
