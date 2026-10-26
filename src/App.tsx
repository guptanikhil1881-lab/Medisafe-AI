import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MedicalDisclaimer } from './components/MedicalDisclaimer';
import { FeatureCards } from './components/FeatureCards';
import { CheckerForm } from './components/CheckerForm';
import { AnalysisResults } from './components/AnalysisResults';
import { DrugInfoCards } from './components/DrugInfoCards';
import { HowItWorks } from './components/HowItWorks';
import { DrugLibrary } from './components/DrugLibrary';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { DrugAnalysisResponse } from './types/pharmacy';
import { AlertCircle, RefreshCw, Share2, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('checker');
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>(['Warfarin', 'Aspirin']);
  const [analysisData, setAnalysisData] = useState<DrugAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareConfig, setShareConfig] = useState<{
    title: string;
    text: string;
  }>({
    title: 'MediSafe AI – Drug Interaction Checker',
    text: 'Explore potential drug-drug interactions, CYP450 pathways, and patient safety precautions with MediSafe AI (B.Pharm Academic Project):',
  });

  // Check health on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHasGeminiKey(Boolean(data.hasGeminiKey));
      })
      .catch((err) => {
        console.warn('Health check notice:', err);
      });
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPreset = (drugs: string[]) => {
    setSelectedMedicines([...drugs]);
    setApiError(null);
    handleNavigate('checker');
  };

  const handleAnalyze = async (medicines: string[]) => {
    setIsLoading(true);
    setApiError(null);
    setSelectedMedicines(medicines);

    // Progressive step indicator
    setLoadingStep('Accessing verified clinical pharmacology compendia...');
    const t1 = setTimeout(() => {
      setLoadingStep('Evaluating Cytochrome P450 pathways & clearance...');
    }, 900);
    const t2 = setTimeout(() => {
      setLoadingStep('Synthesizing severity, risk factors & red flags...');
    }, 1800);

    try {
      const response = await fetch('/api/interactions/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicines }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze drug interactions.');
      }

      setAnalysisData(data);

      // Scroll down to results smoothly
      setTimeout(() => {
        const resultsElem = document.getElementById('results');
        if (resultsElem) {
          resultsElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setApiError(err.message || 'An error occurred while analyzing interactions. Please verify your connection.');
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setApiError(null);
    const checkerElem = document.getElementById('checker');
    if (checkerElem) {
      checkerElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open general share modal
  const handleOpenGeneralShare = () => {
    setShareConfig({
      title: 'MediSafe AI – Drug Interaction Checker',
      text: 'Check potential drug-drug interactions and medication safety on MediSafe AI (B.Pharm Capstone Project):',
    });
    setIsShareModalOpen(true);
  };

  // Open specific result share modal
  const handleOpenResultShare = () => {
    if (!analysisData) {
      handleOpenGeneralShare();
      return;
    }
    const drugs = analysisData.analyzedDrugs.join(' + ');
    const severityText = analysisData.overallSeverity.toUpperCase();
    setShareConfig({
      title: `MediSafe AI: ${drugs} Interaction Analysis [${severityText} SEVERITY]`,
      text: `Review the documented pharmacology analysis for ${drugs} (${analysisData.totalInteractionsFound} interaction found) on MediSafe AI:`,
    });
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900 relative">
      
      {/* Navigation Header with Share Button */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        hasGeminiKey={hasGeminiKey}
        onOpenShare={handleOpenGeneralShare}
      />

      {/* Hero Section */}
      <Hero
        onCheckClick={() => handleNavigate('checker')}
        onExploreFeatures={() => handleNavigate('features')}
        onSelectPreset={handleSelectPreset}
        onOpenShare={handleOpenGeneralShare}
      />

      {/* Mandatory Medical Disclaimer Prominent Banner */}
      <MedicalDisclaimer />

      {/* Feature Cards (Section 2) */}
      <FeatureCards
        onCheckNow={() => handleNavigate('checker')}
      />

      {/* Main Interactive Tool (Section 3 & 4) */}
      <CheckerForm
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
        loadingStep={loadingStep}
        initialMedicines={selectedMedicines}
      />

      {/* Error Banner if any */}
      {apiError && (
        <div className="max-w-4xl mx-auto px-4 py-4 w-full">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Analysis Warning</p>
                <p className="text-xs text-rose-700 mt-0.5">{apiError}</p>
              </div>
            </div>
            <button
              onClick={() => handleAnalyze(selectedMedicines)}
              className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-xs font-bold text-rose-900 flex items-center gap-1 shrink-0 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Section (Parts A, B, C, D) */}
      {analysisData && (
        <>
          <AnalysisResults
            data={analysisData}
            onReset={handleReset}
            onShareResult={handleOpenResultShare}
          />

          {/* Section 6: Individual Medicine Information Cards */}
          <DrugInfoCards
            cards={analysisData.drugInfoCards}
          />
        </>
      )}

      {/* Section 7.B: How It Works */}
      <HowItWorks
        onStartChecking={() => handleNavigate('checker')}
      />

      {/* Section 7.C: Drug Interaction Library */}
      <DrugLibrary
        onLoadPair={handleSelectPreset}
      />

      {/* Section 7.D: Frequently Asked Questions */}
      <FaqSection />

      {/* Section 7.A: About Project */}
      <AboutSection />

      {/* Section 7.E: Contact Form */}
      <ContactSection />

      {/* Secondary Reminder Disclaimer */}
      <MedicalDisclaimer />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Share Button on Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={handleOpenGeneralShare}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0"
          title="Share MediSafe AI Website"
          aria-label="Share MediSafe AI Website"
        >
          <div className="relative">
            <Share2 className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-300 animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide pr-1">
            Share Website
          </span>
        </button>
      </div>

      {/* Interactive Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={shareConfig.title}
        text={shareConfig.text}
      />

    </div>
  );
}
