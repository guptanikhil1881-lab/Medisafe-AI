/**
 * MediSafe AI - Clinical Pharmacology Type Definitions
 * Designed for B.Pharm Final Year Project
 */

export type InteractionSeverity = 'major' | 'moderate' | 'minor' | 'unknown';

export type InteractionType = 
  | 'pharmacokinetic' 
  | 'pharmacodynamic' 
  | 'synergistic' 
  | 'antagonistic' 
  | 'unknown';

export interface DrugItem {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  therapeuticUse: string;
  precautions: string;
  metabolismInfo?: string;
  cypEnzymes?: string;
  commonInteractionsSummary?: string;
}

export interface InteractionPair {
  drugA: string;
  drugB: string;
  hasInteraction: boolean;
  severity: InteractionSeverity;
  type: InteractionType;
  mechanism: string;
  clinicalConsequences: string;
  riskFactors: string[];
  warningSigns: string[];
  precautions: string[];
  evidenceSource: string;
  verificationDate: string;
  questionsForDoctor: string[];
  isVerifiedReference: boolean;
  isDemonstrationData?: boolean;
}

export interface DrugInfoCardData {
  name: string;
  genericName: string;
  drugClass: string;
  therapeuticUse: string;
  precautions: string;
  cypProfile?: string;
  knownInteractionsSummary?: string;
}

export interface DrugAnalysisResponse {
  analyzedDrugs: string[];
  overallSeverity: InteractionSeverity;
  totalInteractionsFound: number;
  summaryHeadline: string;
  summaryDescription: string;
  pairs: InteractionPair[];
  drugInfoCards: DrugInfoCardData[];
  generalRecommendations: string[];
  disclaimer: string;
  generatedWithAi: boolean;
  engineUsed: string;
  timestamp: string;
}

export interface PresetPair {
  id: string;
  title: string;
  drugs: string[];
  severity: InteractionSeverity;
  clinicalTag: string;
  briefExplanation: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Clinical' | 'Herbals' | 'Safety';
}
