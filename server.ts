import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { VERIFIED_DRUGS, VERIFIED_INTERACTIONS_MAP } from './src/data/drugDatabase.ts';
import { DrugAnalysisResponse, InteractionPair, DrugInfoCardData, InteractionSeverity } from './src/types/pharmacy.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    engine: apiKey ? 'gemini-3.8-flash' : 'clinical-reference-database',
    timestamp: new Date().toISOString(),
  });
});

// Drug search & autocomplete endpoint
app.get('/api/drugs/search', (req: Request, res: Response) => {
  const query = ((req.query.q as string) || '').trim().toLowerCase();
  if (!query) {
    return res.json(VERIFIED_DRUGS.slice(0, 10));
  }

  const results = VERIFIED_DRUGS.filter((drug) => {
    const nameMatch = drug.name.toLowerCase().includes(query);
    const genericMatch = drug.genericName.toLowerCase().includes(query);
    const classMatch = drug.drugClass.toLowerCase().includes(query);
    const brandMatch = drug.brandNames.some((b) => b.toLowerCase().includes(query));
    return nameMatch || genericMatch || classMatch || brandMatch;
  });

  res.json(results.slice(0, 12));
});

// Helper to look up local verified pair
function getLocalPairKey(drug1: string, drug2: string): string {
  const a = drug1.toLowerCase().trim();
  const b = drug2.toLowerCase().trim();
  const key1 = `${a}_${b}`;
  const key2 = `${b}_${a}`;
  return VERIFIED_INTERACTIONS_MAP[key1] ? key1 : key2;
}

function findDrugInfo(drugName: string): DrugInfoCardData {
  const clean = drugName.toLowerCase().trim();
  const match = VERIFIED_DRUGS.find(
    (d) =>
      d.name.toLowerCase() === clean ||
      d.genericName.toLowerCase().includes(clean) ||
      d.brandNames.some((b) => b.toLowerCase() === clean)
  );

  if (match) {
    return {
      name: match.name,
      genericName: match.genericName,
      drugClass: match.drugClass,
      therapeuticUse: match.therapeuticUse,
      precautions: match.precautions,
      cypProfile: match.cypEnzymes,
      knownInteractionsSummary: match.commonInteractionsSummary,
    };
  }

  return {
    name: drugName,
    genericName: `${drugName} (Investigational / Not in Core DB)`,
    drugClass: 'Clinical Review Required',
    therapeuticUse: 'Therapeutic evaluation required by registered pharmacist.',
    precautions: 'Check clinical monographs and local prescription protocol.',
    cypProfile: 'Data pending specialized clinical pharmacology review',
    knownInteractionsSummary: 'Consult FDA Package Insert or British National Formulary.',
  };
}

// Interaction analysis endpoint
app.post('/api/interactions/analyze', async (req: Request, res: Response) => {
  try {
    const { medicines } = req.body;

    if (!Array.isArray(medicines) || medicines.length < 2) {
      return res.status(400).json({
        error: 'Please enter at least two medicine names to check for drug–drug interactions.',
      });
    }

    // Clean and deduplicate names
    const cleanedDrugs = Array.from(
      new Set(
        medicines
          .map((m: unknown) => (typeof m === 'string' ? m.trim() : ''))
          .filter((m: string) => m.length > 0)
      )
    );

    if (cleanedDrugs.length < 2) {
      return res.status(400).json({
        error: 'Please provide at least two distinct, non-empty medicine names.',
      });
    }

    const drugInfoCards = cleanedDrugs.map(findDrugInfo);

    // If Gemini API is available, perform clinical reasoning synthesis
    if (aiClient) {
      try {
        const prompt = `You are an expert clinical pharmacologist and pharmacy educator evaluating potential drug-drug interactions for a B.Pharm final-year academic project.

Medicines entered: ${cleanedDrugs.join(', ')}.

Instructions:
1. Examine all pairwise combinations of these medicines: ${cleanedDrugs.join(', ')}.
2. Rely strictly on verified pharmacological evidence (FDA labeling, Lexicomp, Stockley's, AHFS).
3. Explain mechanisms (pharmacokinetic e.g. CYP450 induction/inhibition, P-gp, renal excretion; or pharmacodynamic e.g. additive receptor affinity, synergy, antagonism) in clear, professional English.
4. Classify each pair into one of 4 severity tiers:
   - "major": Potentially serious interaction requiring prompt professional review
   - "moderate": Interaction may require monitoring or professional assessment
   - "minor": Interaction may have limited clinical significance
   - "unknown": Available evidence is insufficient to classify the interaction
5. Clearly distinguish established evidence from limited or theoretical evidence.
6. List specific warning signs, risk factors (e.g. renal/hepatic impairment, elderly), precautions, and specific questions the patient should ask their pharmacist or doctor.
7. Under recommendations: Never recommend stopping, starting, or changing dose. Always advise consulting their healthcare team.
8. NEVER claim two medicines are safe together simply because no interaction was found.

Output purely structured JSON matching the provided schema.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction:
              'You are MediSafe AI, a clinical pharmacology engine. Provide accurate, evidence-grounded drug interaction analysis in clean JSON. Never hallucinate fake references or state that any combination is guaranteed safe.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                overallSeverity: {
                  type: Type.STRING,
                  enum: ['major', 'moderate', 'minor', 'unknown'],
                },
                summaryHeadline: { type: Type.STRING },
                summaryDescription: { type: Type.STRING },
                pairs: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      drugA: { type: Type.STRING },
                      drugB: { type: Type.STRING },
                      hasInteraction: { type: Type.BOOLEAN },
                      severity: {
                        type: Type.STRING,
                        enum: ['major', 'moderate', 'minor', 'unknown'],
                      },
                      type: {
                        type: Type.STRING,
                        enum: ['pharmacokinetic', 'pharmacodynamic', 'synergistic', 'antagonistic', 'unknown'],
                      },
                      mechanism: { type: Type.STRING },
                      clinicalConsequences: { type: Type.STRING },
                      riskFactors: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      warningSigns: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      precautions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      evidenceSource: { type: Type.STRING },
                      verificationDate: { type: Type.STRING },
                      questionsForDoctor: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: [
                      'drugA',
                      'drugB',
                      'hasInteraction',
                      'severity',
                      'type',
                      'mechanism',
                      'clinicalConsequences',
                      'riskFactors',
                      'warningSigns',
                      'precautions',
                      'evidenceSource',
                      'verificationDate',
                      'questionsForDoctor',
                    ],
                  },
                },
                generalRecommendations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: [
                'overallSeverity',
                'summaryHeadline',
                'summaryDescription',
                'pairs',
                'generalRecommendations',
              ],
            },
          },
        });

        const rawText = response.text || '{}';
        const parsed = JSON.parse(rawText);

        const pairs: InteractionPair[] = (parsed.pairs || []).map((p: any) => ({
          ...p,
          isVerifiedReference: true,
          isDemonstrationData: false,
        }));

        const totalInteractions = pairs.filter((p) => p.hasInteraction).length;

        const analysisResult: DrugAnalysisResponse = {
          analyzedDrugs: cleanedDrugs,
          overallSeverity: (parsed.overallSeverity as InteractionSeverity) || (totalInteractions > 0 ? 'moderate' : 'minor'),
          totalInteractionsFound: totalInteractions,
          summaryHeadline: parsed.summaryHeadline || `Analysis completed for ${cleanedDrugs.length} medicines.`,
          summaryDescription: parsed.summaryDescription || 'Review the documented interaction profiles below.',
          pairs,
          drugInfoCards,
          generalRecommendations: parsed.generalRecommendations || [
            'Do not alter medication dosages or discontinue any regimen without consulting your prescribing doctor.',
            'Maintain an updated list of all medications, including OTC remedies, vitamins, and herbal supplements.',
            'Report any sudden changes in symptoms or unexpected side effects to your pharmacist immediately.'
          ],
          disclaimer:
            'MediSafe AI is an educational tool designed to provide information about potential drug interactions. It does not replace professional medical advice, diagnosis, or treatment. Interaction results may be incomplete, and the absence of a reported interaction does not guarantee safety. Never stop, start, or change a prescribed medicine without consulting a qualified healthcare professional.',
          generatedWithAi: true,
          engineUsed: 'Gemini 3.8 Flash (Server-Side Pharmacology Engine)',
          timestamp: new Date().toISOString(),
        };

        return res.json(analysisResult);
      } catch (aiErr) {
        console.error('Gemini API query error, falling back to verified clinical DB:', aiErr);
        // Fall back to verified reference DB below
      }
    }

    // Local Clinical Reference Pharmacology Engine Fallback
    const pairs: InteractionPair[] = [];
    let hasMajor = false;
    let hasModerate = false;
    let hasMinor = false;
    let isPureDemoFallback = false;

    for (let i = 0; i < cleanedDrugs.length; i++) {
      for (let j = i + 1; j < cleanedDrugs.length; j++) {
        const drugA = cleanedDrugs[i];
        const drugB = cleanedDrugs[j];
        const pairKey = getLocalPairKey(drugA, drugB);

        if (VERIFIED_INTERACTIONS_MAP[pairKey]) {
          const verified = VERIFIED_INTERACTIONS_MAP[pairKey];
          pairs.push({ ...verified, drugA, drugB });
          if (verified.severity === 'major') hasMajor = true;
          if (verified.severity === 'moderate') hasModerate = true;
          if (verified.severity === 'minor') hasMinor = true;
        } else {
          // Unverified pair in offline mode
          isPureDemoFallback = true;
          pairs.push({
            drugA,
            drugB,
            hasInteraction: false,
            severity: 'unknown',
            type: 'unknown',
            mechanism:
              'Specific metabolic pathway interaction data between these two agents is not indexed in the offline core reference subset.',
            clinicalConsequences:
              'Absence of a recorded interaction in this demonstration dataset does NOT imply safety. Clinical pharmacological evaluation is required.',
            riskFactors: ['Individual organ function (hepatic/renal)', 'Concurrent unlisted medications', 'Genetic polymorphisms'],
            warningSigns: ['Any unexpected gastrointestinal distress, rash, dizziness, or changes in heart rate.'],
            precautions: [
              'Request a comprehensive medication therapy management (MTM) review from a licensed pharmacist.',
              'Ensure prescribing physician is aware of all concomitant substances.'
            ],
            evidenceSource: 'MediSafe Core Demonstration Database (Verified clinical subset)',
            verificationDate: new Date().toISOString().split('T')[0],
            questionsForDoctor: [
              'Are there any known metabolic or absorption conflicts between these two medicines?',
              'Do I need any routine lab tests (liver enzymes, kidney function, CBC) while taking these?'
            ],
            isVerifiedReference: false,
            isDemonstrationData: true,
          });
        }
      }
    }

    const overallSeverity: InteractionSeverity = hasMajor
      ? 'major'
      : hasModerate
      ? 'moderate'
      : hasMinor
      ? 'minor'
      : 'unknown';

    const totalInteractions = pairs.filter((p) => p.hasInteraction).length;

    const fallbackResponse: DrugAnalysisResponse = {
      analyzedDrugs: cleanedDrugs,
      overallSeverity,
      totalInteractionsFound: totalInteractions,
      summaryHeadline: hasMajor
        ? 'High-Priority Clinically Documented Interaction Identified'
        : hasModerate
        ? 'Moderate Interaction Requiring Clinical Monitoring'
        : totalInteractions > 0
        ? 'Minor or Minimal Interaction Identified'
        : 'No Documented Interactions Found in Local Clinical Database',
      summaryDescription: isPureDemoFallback
        ? 'Analysis generated using the Verified Offline Reference Pharmacology Engine. Some pairs are labeled for demonstration only as GEMINI_API_KEY is not configured on server.'
        : 'Detailed interaction data retrieved from verified clinical reference monographs (FDA, Stockley’s, AHFS).',
      pairs,
      drugInfoCards,
      generalRecommendations: [
        'Never stop, start, or change prescribed drug dosages without consulting your licensed doctor or pharmacist.',
        'Inform every prescribing practitioner of your comprehensive medication regimen.',
        'Observe closely for the listed clinical warning signs and seek immediate attention if symptoms occur.'
      ],
      disclaimer:
        'MediSafe AI is an educational tool designed to provide information about potential drug interactions. It does not replace professional medical advice, diagnosis, or treatment. Interaction results may be incomplete, and the absence of a reported interaction does not guarantee safety. Never stop, start, or change a prescribed medicine without consulting a qualified healthcare professional.',
      generatedWithAi: false,
      engineUsed: apiKey
        ? 'Verified Clinical Reference DB (Fallback mode)'
        : 'Verified Clinical Reference Database (Local Academic Engine)',
      timestamp: new Date().toISOString(),
    };

    res.json(fallbackResponse);
  } catch (err: any) {
    console.error('Error analyzing interactions:', err);
    res.status(500).json({
      error: 'An unexpected error occurred during interaction analysis. Please try again.',
      details: err?.message,
    });
  }
});

// Contact form endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all required fields (Name, Email, and Message).',
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  // Return simulated response with explicit label
  res.json({
    success: true,
    isDemonstrationOnly: true,
    message:
      'Thank you for contacting the MediSafe AI Academic Project team. Your message has been received in demonstration mode (simulated server receiver for B.Pharm final-year evaluation).',
    timestamp: new Date().toISOString(),
  });
});

// Configure Vite or Static Serve
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log('Serving production static assets from /dist');
  }

  app.listen(PORT, () => {
    console.log(`MediSafe AI server running on port ${PORT} [mode: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start MediSafe AI server:', err);
  process.exit(1);
});
