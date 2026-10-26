import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <section className="bg-amber-50/90 border-y border-amber-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-800" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span>Official Medical Disclaimer (Section 9)</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              &ldquo;MediSafe AI is an educational tool designed to provide information about potential drug interactions. It does not replace professional medical advice, diagnosis, or treatment. Interaction results may be incomplete, and the absence of a reported interaction does not guarantee safety. Never stop, start, or change a prescribed medicine without consulting a qualified healthcare professional.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
