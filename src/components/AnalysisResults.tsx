import React, { useRef } from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert, 
  Pill, 
  FileText, 
  Printer, 
  ArrowLeft, 
  Info, 
  Stethoscope, 
  Flame, 
  Calendar, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Share2
} from 'lucide-react';
import { DrugAnalysisResponse, InteractionSeverity } from '../types/pharmacy';

interface AnalysisResultsProps {
  data: DrugAnalysisResponse;
  onReset: () => void;
  onShareResult?: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, onReset, onShareResult }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const getSeverityBadge = (severity: InteractionSeverity) => {
    switch (severity) {
      case 'major':
        return {
          label: 'Major Severity',
          desc: 'Potentially serious interaction requiring prompt professional review.',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
          cardBorder: 'border-rose-300 ring-1 ring-rose-300/40',
          icon: AlertOctagon,
          iconColor: 'text-rose-600',
          bgHeader: 'bg-rose-50/70',
        };
      case 'moderate':
        return {
          label: 'Moderate Severity',
          desc: 'Interaction may require monitoring or professional assessment.',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          cardBorder: 'border-amber-300 ring-1 ring-amber-300/40',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          bgHeader: 'bg-amber-50/70',
        };
      case 'minor':
        return {
          label: 'Minor / Minimal Significance',
          desc: 'Interaction may have limited clinical significance under normal dosing.',
          badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
          cardBorder: 'border-teal-200',
          icon: CheckCircle2,
          iconColor: 'text-teal-600',
          bgHeader: 'bg-teal-50/70',
        };
      case 'unknown':
      default:
        return {
          label: 'Unknown / Insufficient Data',
          desc: 'Available clinical evidence is insufficient to classify this interaction.',
          badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
          cardBorder: 'border-slate-200',
          icon: HelpCircle,
          iconColor: 'text-slate-600',
          bgHeader: 'bg-slate-50',
        };
    }
  };

  const overallBadge = getSeverityBadge(data.overallSeverity);
  const OverallIcon = overallBadge.icon;

  return (
    <section id="results" className="py-12 sm:py-20 bg-white" ref={printRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Action Header: Back + Print Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Medicines / New Check</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Analyzed {new Date(data.timestamp).toLocaleDateString()} at{' '}
              {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {onShareResult && (
              <button
                onClick={onShareResult}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                title="Share this interaction analysis"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Share Result</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Clinical Summary</span>
            </button>
          </div>
        </div>

        {/* SECTION A: INTERACTION SUMMARY */}
        <div className={`rounded-3xl border ${overallBadge.cardBorder} p-6 sm:p-8 bg-white shadow-lg relative overflow-hidden`}>
          
          {/* Top highlight ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
                PART A: INTERACTION SUMMARY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {data.summaryHeadline}
              </h3>
            </div>

            {/* Severity Category Badge (Color + Text Label + Icon) */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-bold shadow-xs ${overallBadge.badgeClass}`}>
              <OverallIcon className="w-5 h-5 shrink-0" />
              <span>{overallBadge.label}</span>
            </div>
          </div>

          {/* Medicines Analyzed Chips */}
          <div className="py-5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Medicines Analyzed ({data.analyzedDrugs.length}):
            </span>
            <div className="flex flex-wrap gap-2.5">
              {data.analyzedDrugs.map((drug, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/80 text-sm font-semibold shadow-2xs"
                >
                  <Pill className="w-4 h-4 text-blue-600" />
                  <span>{drug}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary description & Documented Finding */}
          <div className="pt-5 space-y-4">
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              {data.summaryDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  Documented Interaction Status
                </span>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  {data.totalInteractionsFound > 0 ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>{data.totalInteractionsFound} documented interaction pair(s) found</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>No clinically documented interaction found in tested pairs</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Note: Absence of a documented interaction does not guarantee safety.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  Clinical Evidence Engine
                </span>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>{data.engineUsed}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Severity classifications may vary between clinical reference databases.
                </p>
              </div>
            </div>

            {/* Explanatory note banner required */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-2.5 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Clinical Note:</strong> Severity ratings (Major, Moderate, Minor) are standardized according to clinical consensus (FDA, Lexicomp, Stockley’s), but individual patient response depends on organ function, genetics, and dosing.
              </span>
            </div>
          </div>

        </div>

        {/* SECTION B: PAIRWISE INTERACTION DETAILS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
                PART B: PAIRWISE INTERACTION DETAILS
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Detailed Interaction Analysis by Drug Pair
              </h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {data.pairs.length} Pair{data.pairs.length > 1 ? 's' : ''} Analyzed
            </span>
          </div>

          <div className="space-y-8">
            {data.pairs.map((pair, pIdx) => {
              const pairBadge = getSeverityBadge(pair.severity);
              const PairIcon = pairBadge.icon;

              return (
                <div
                  key={pIdx}
                  className={`rounded-3xl border ${pairBadge.cardBorder} bg-white shadow-md overflow-hidden transition-all`}
                >
                  {/* Pair Card Header */}
                  <div className={`p-6 border-b border-slate-200/80 ${pairBadge.bgHeader} flex flex-wrap items-center justify-between gap-4`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                        <PairIcon className={`w-5 h-5 ${pairBadge.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <span>{pair.drugA}</span>
                          <span className="text-slate-400 font-normal">+</span>
                          <span>{pair.drugB}</span>
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-md bg-white/90 text-slate-700 border border-slate-200">
                            Type: {pair.type}
                          </span>
                          {pair.isDemonstrationData && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                              Demonstration Record
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${pairBadge.badgeClass}`}>
                      <PairIcon className="w-4 h-4" />
                      <span>{pairBadge.label}</span>
                    </div>
                  </div>

                  {/* Pair Card Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* Mechanism */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Possible Mechanism of Interaction</span>
                      </h5>
                      <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                        {pair.mechanism}
                      </p>
                    </div>

                    {/* Potential Clinical Consequences */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                        <span>Potential Clinical Consequences</span>
                      </h5>
                      <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-sm text-slate-800 leading-relaxed">
                        {pair.clinicalConsequences}
                      </div>
                    </div>

                    {/* Relevant Risk Factors */}
                    {pair.riskFactors && pair.riskFactors.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                          <span>Relevant Risk Factors</span>
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pair.riskFactors.map((rf, rIdx) => (
                            <li
                              key={rIdx}
                              className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <span>{rf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Evidence Source & Verification Date */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                      <div className="flex items-center gap-1.5 font-medium">
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        <span><strong>Evidence Source:</strong> {pair.evidenceSource}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Verified: {pair.verificationDate}</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION C: SAFETY INFORMATION */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/30 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-800">
              PART C: SAFETY INFORMATION & CLINICAL ADVISORIES
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Warning Signs, Precautions & Questions to Ask
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Warning signs requiring medical attention */}
            <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-rose-800">
                <Flame className="w-5 h-5 text-rose-600 shrink-0" />
                <h4 className="text-base font-bold">
                  Warning Signs Requiring Medical Attention
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                Seek prompt medical care if any of these symptoms manifest while taking these medicines:
              </p>
              <ul className="space-y-2.5">
                {Array.from(new Set(data.pairs.flatMap((p) => p.warningSigns))).map((sign, sIdx) => (
                  <li key={sIdx} className="text-xs text-slate-800 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0 animate-ping" />
                    <span className="font-medium">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* General Precautions */}
            <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-teal-800">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <h4 className="text-base font-bold">
                  General Precautions for Users
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                Best practices to minimize risk when taking complex regimens:
              </p>
              <ul className="space-y-2.5">
                {Array.from(new Set(data.pairs.flatMap((p) => p.precautions))).map((prec, pIdx) => (
                  <li key={pIdx} className="text-xs text-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Questions to Ask Doctor or Pharmacist */}
          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-blue-900">
              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
              <h4 className="text-base font-bold">
                Questions You May Wish to Ask Your Pharmacist or Doctor
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              Bring these practical questions to your next pharmacy visit or medical consultation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from(new Set(data.pairs.flatMap((p) => p.questionsForDoctor))).map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-950 flex items-start gap-2"
                >
                  <span className="font-bold text-blue-600 shrink-0">Q{qIdx + 1}:</span>
                  <span className="font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SECTION D: EVIDENCE-BASED RECOMMENDATIONS */}
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-blue-900">
            <Stethoscope className="w-6 h-6 text-blue-700" />
            <h3 className="text-xl font-bold">
              PART D: CLINICAL RECOMMENDATIONS & HEALTHCARE GUIDANCE
            </h3>
          </div>

          <div className="space-y-3">
            {data.generalRecommendations.map((rec, rIdx) => (
              <div
                key={rIdx}
                className="p-4 rounded-2xl bg-white/90 border border-blue-200/80 text-sm font-medium text-slate-800 flex items-start gap-3 shadow-2xs"
              >
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {rIdx + 1}
                </span>
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>

          {/* Strict Medical Warning rule */}
          <div className="p-4 rounded-2xl bg-amber-100/80 border border-amber-300 text-amber-950 text-xs sm:text-sm font-semibold flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>
              <strong>Crucial Safety Rule:</strong> MediSafe AI strictly provides educational information. Never automatically stop, start, or change a prescribed medicine or its dose without direct consultation with a qualified physician or clinical pharmacist.
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 print:hidden">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
          >
            Check Another Drug Combination
          </button>
          
          <div className="flex items-center gap-3">
            {onShareResult && (
              <button
                onClick={onShareResult}
                className="px-5 py-3 rounded-xl text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 shadow-xs transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Share Findings</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-xs transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report for Pharmacist</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
