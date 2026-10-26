import React, { useState, useEffect, useRef } from 'react';
import { Pill, Plus, Trash2, RotateCcw, Sparkles, AlertCircle, Search, ShieldCheck, Activity, Check } from 'lucide-react';
import { PRESET_PAIRS, VERIFIED_DRUGS } from '../data/drugDatabase';
import { DrugItem } from '../types/pharmacy';

interface CheckerFormProps {
  onAnalyze: (medicines: string[]) => void;
  isLoading: boolean;
  loadingStep: string;
  initialMedicines?: string[];
}

export const CheckerForm: React.FC<CheckerFormProps> = ({
  onAnalyze,
  isLoading,
  loadingStep,
  initialMedicines
}) => {
  const [medicines, setMedicines] = useState<string[]>(
    initialMedicines && initialMedicines.length >= 2 ? initialMedicines : ['', '']
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeInputIndex, setActiveInputIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<DrugItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync when initialMedicines changes from outside (e.g. preset clicked from Hero or Library)
  useEffect(() => {
    if (initialMedicines && initialMedicines.length >= 2) {
      setMedicines(initialMedicines);
      setValidationError(null);
    }
  }, [initialMedicines]);

  // Handle clicking outside to dismiss autocomplete
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveInputIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...medicines];
    updated[index] = value;
    setMedicines(updated);
    setValidationError(null);

    // Filter autocomplete suggestions
    if (value.trim().length > 0) {
      const q = value.trim().toLowerCase();
      const matched = VERIFIED_DRUGS.filter((d) => {
        return (
          d.name.toLowerCase().includes(q) ||
          d.genericName.toLowerCase().includes(q) ||
          d.drugClass.toLowerCase().includes(q) ||
          d.brandNames.some((b) => b.toLowerCase().includes(q))
        );
      });
      setSuggestions(matched.slice(0, 5));
    } else {
      setSuggestions(VERIFIED_DRUGS.slice(0, 5));
    }
  };

  const handleFocus = (index: number) => {
    setActiveInputIndex(index);
    const currentVal = medicines[index].trim().toLowerCase();
    if (currentVal.length > 0) {
      const matched = VERIFIED_DRUGS.filter(
        (d) =>
          d.name.toLowerCase().includes(currentVal) ||
          d.genericName.toLowerCase().includes(currentVal)
      );
      setSuggestions(matched.slice(0, 5));
    } else {
      setSuggestions(VERIFIED_DRUGS.slice(0, 5));
    }
  };

  const selectSuggestion = (index: number, drug: DrugItem) => {
    const updated = [...medicines];
    updated[index] = drug.name;
    setMedicines(updated);
    setActiveInputIndex(null);
    setValidationError(null);
  };

  const addMedicineField = () => {
    if (medicines.length >= 6) {
      setValidationError('You can analyze up to 6 medicines simultaneously in this tool.');
      return;
    }
    setMedicines([...medicines, '']);
    setValidationError(null);
  };

  const removeMedicineField = (indexToRemove: number) => {
    if (medicines.length <= 2) {
      setValidationError('At least two medicine fields are required to analyze drug interactions.');
      return;
    }
    const updated = medicines.filter((_, idx) => idx !== indexToRemove);
    setMedicines(updated);
    setValidationError(null);
  };

  const clearAll = () => {
    setMedicines(['', '']);
    setValidationError(null);
    setActiveInputIndex(null);
  };

  const handleApplyPreset = (drugs: string[]) => {
    setMedicines([...drugs]);
    setValidationError(null);
    setActiveInputIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate empty inputs
    const trimmed = medicines.map((m) => m.trim());
    const emptyCount = trimmed.filter((m) => m === '').length;
    if (emptyCount > 0) {
      setValidationError('Please enter a medicine name in each field, or remove unnecessary fields.');
      return;
    }

    // 2. Validate at least 2
    if (trimmed.length < 2) {
      setValidationError('Please enter at least two medicine names to check for interactions.');
      return;
    }

    // 3. Validate duplicate entries
    const lowercased = trimmed.map((m) => m.toLowerCase());
    const uniqueSet = new Set(lowercased);
    if (uniqueSet.size !== lowercased.length) {
      setValidationError('Duplicate medicine detected. Please enter two or more distinct medicines.');
      return;
    }

    setValidationError(null);
    onAnalyze(trimmed);
  };

  return (
    <section id="checker" className="py-12 sm:py-20 bg-slate-50 relative" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Core Interactive Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Drug–Drug Interaction Checker
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Enter two or more prescription medications, over-the-counter drugs, or herbal supplements to examine potential metabolic and pharmacological conflicts.
          </p>
        </div>

        {/* Checker Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600" />

          {/* Quick Preset Selector */}
          <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Preset Clinical Pairs (1-Click Load)</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">B.Pharm College Evaluation</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {PRESET_PAIRS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset.drugs)}
                  className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    preset.severity === 'major'
                      ? 'bg-rose-50/70 hover:bg-rose-100/80 border-rose-200 text-rose-900'
                      : preset.severity === 'moderate'
                      ? 'bg-amber-50/70 hover:bg-amber-100/80 border-amber-200 text-amber-900'
                      : 'bg-teal-50/70 hover:bg-teal-100/80 border-teal-200 text-teal-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold">{preset.title}</span>
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-bold ${
                        preset.severity === 'major'
                          ? 'bg-rose-200 text-rose-800'
                          : preset.severity === 'moderate'
                          ? 'bg-amber-200 text-amber-800'
                          : 'bg-teal-200 text-teal-800'
                      }`}
                    >
                      {preset.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{preset.clinicalTag}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interaction Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-3.5">
              {medicines.map((med, index) => {
                const label = `Medicine ${index + 1}`;
                const isFieldActive = activeInputIndex === index;

                return (
                  <div key={index} className="relative">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {label} {index < 2 && <span className="text-rose-500">*</span>}
                    </label>

                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                        <Pill className={`w-5 h-5 ${index === 0 ? 'text-blue-500' : index === 1 ? 'text-teal-500' : 'text-purple-500'}`} />
                      </div>

                      <input
                        type="text"
                        value={med}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onFocus={() => handleFocus(index)}
                        placeholder={`e.g., ${index === 0 ? 'Warfarin' : index === 1 ? 'Aspirin' : 'Lisinopril'} (Generic or Brand)`}
                        disabled={isLoading}
                        className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs disabled:bg-slate-100 disabled:cursor-not-allowed"
                      />

                      {/* Remove Button (for field 3 and above) */}
                      {medicines.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeMedicineField(index)}
                          disabled={isLoading}
                          className="absolute right-3 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove this medicine"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Autocomplete Dropdown */}
                    {isFieldActive && suggestions.length > 0 && (
                      <div className="absolute z-30 left-0 right-0 mt-1 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
                        <div className="px-3.5 py-1.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Search className="w-3 h-3 text-slate-400" />
                            Verified Reference Database Suggestions
                          </span>
                          <span>Click to insert</span>
                        </div>
                        <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                          {suggestions.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onMouseDown={() => selectSuggestion(index, item)}
                              className="w-full text-left px-4 py-2.5 hover:bg-blue-50/70 transition-colors flex items-center justify-between group"
                            >
                              <div>
                                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                                  {item.name}
                                  <span className="text-xs font-normal text-slate-500 ml-2">
                                    ({item.genericName})
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500 line-clamp-1">
                                  Class: {item.drugClass}
                                </div>
                              </div>
                              <div className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                {item.brandNames[0]}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Form Actions: Add more medicine & Clear all */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={addMedicineField}
                disabled={isLoading || medicines.length >= 6}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Additional Medicine ({medicines.length}/6)</span>
              </button>

              <button
                type="button"
                onClick={clearAll}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Main Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 hover:from-blue-700 hover:to-teal-700 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Pairwise Interactions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Analyze Interaction</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading Animation & Step Indicator */}
          {isLoading && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-xl animate-fadeIn space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    Clinical Pharmacology Analysis in Progress
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">Gemini 3.8 Flash</span>
              </div>

              {/* Dynamic Step Text */}
              <div className="space-y-2 py-2">
                <p className="text-base font-semibold text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
                  {loadingStep || 'Querying clinical pharmacology monographs...'}
                </p>
                <p className="text-xs text-slate-400">
                  Checking CYP450 isoenzymes, renal clearance, receptor affinities, and cross-referencing FDA safety warnings.
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 animate-pulse w-3/4 rounded-full" />
              </div>
            </div>
          )}

          {/* Bottom Trust Indicators */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Evaluated against FDA, BNF & Stockley’s monographs
            </span>
            <span className="text-[11px] text-slate-400">
              Never change doses without doctor approval
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
