import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { FAQ_DATA } from '../data/drugDatabase';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Section 7.D: Clinical Pharmacology Q&A</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Essential clinical guidelines to help pharmacy students and patients understand medication safety and interaction mechanics.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-300 bg-blue-50/20 shadow-md ring-1 ring-blue-200'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-700 text-sm leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p className="bg-white p-4 rounded-xl border border-slate-200/80">
                      {faq.answer}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Category: {faq.category}</span>
                      <span>B.Pharm Clinical Reference</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
