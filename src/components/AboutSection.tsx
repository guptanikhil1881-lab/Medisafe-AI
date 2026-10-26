import React from 'react';
import { Info, GraduationCap, Award, BookCheck, ShieldCheck, HeartHandshake, FileCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Section 7.A: Academic Project Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About MediSafe AI
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            A B.Pharm Final-Year College Project dedicated to elevating pharmacovigilance, patient safety, and clinical decision awareness.
          </p>
        </div>

        {/* Main Project Story Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Project Purpose & Academic Rationale
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              <strong>MediSafe AI</strong> was conceived and developed as a <strong>Bachelor of Pharmacy (B.Pharm) final-year capstone project</strong>. In modern pharmacotherapy, polypharmacy is increasingly prevalent among aging populations and patients with multimorbid chronic illnesses (hypertension, diabetes, heart failure, depression). Adverse drug reactions resulting from preventable drug–drug interactions represent a major cause of emergency department admissions and therapeutic failures.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              The purpose of this platform is to bridge clinical pharmacology textbooks with modern computational intelligence: enabling pharmacy students, community pharmacists, nursing staff, and curious patients to explore molecular mechanisms, Cytochrome P450 isoenzyme interactions, and evidence-grounded safety advisories in accessible language.
            </p>
          </div>

          {/* Core Academic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-base">Educational Objective</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enhance student understanding of pharmacokinetic (PK) and pharmacodynamic (PD) mechanisms behind major clinical contraindications.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-base">Zero-Hallucination Protocol</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interactions are strictly mapped to peer-reviewed clinical references (FDA package inserts, BNF, Stockley's) to prevent erroneous medical claims.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-base">Patient Advocacy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equips consumers with actionable, safe questions to present to their dispensing pharmacists, fostering collaborative clinical care.
              </p>
            </div>
          </div>

          {/* Academic Citations & Supervision */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <BookCheck className="w-4 h-4 text-teal-600" />
              <span>Standard Reference Compendia Utilized</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>FDA Center for Drug Evaluation and Research (CDER)</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>British National Formulary (BNF 86/87)</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Stockley’s Drug Interactions (12th Edition)</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Goodman & Gilman’s Pharmacological Basis of Therapeutics</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
