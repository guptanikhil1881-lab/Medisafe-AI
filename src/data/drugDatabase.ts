import { DrugItem, InteractionPair, PresetPair, FaqItem } from '../types/pharmacy';

export const VERIFIED_DRUGS: DrugItem[] = [
  {
    id: 'warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin Sodium',
    brandNames: ['Coumadin', 'Jantoven', 'Marevan'],
    drugClass: 'Vitamin K Antagonist (Oral Anticoagulant)',
    therapeuticUse: 'Prophylaxis and treatment of venous thromboembolism, pulmonary embolism, and thromboembolic complications associated with atrial fibrillation or cardiac valve replacement.',
    precautions: 'Narrow therapeutic index. Requires routine INR monitoring. High susceptibility to dietary Vitamin K changes and cytochrome P450 enzyme inhibitors/inducers.',
    metabolismInfo: 'Hepatic metabolism primarily via CYP2C9 (S-enantiomer, more potent) and CYP3A4, CYP1A2 (R-enantiomer).',
    cypEnzymes: 'Substrate of CYP2C9, CYP3A4, CYP1A2',
    commonInteractionsSummary: 'Significantly potentiated by NSAIDs, aspirin, macrolides, azole antifungals; diminished by rifampin, carbamazepine, and high Vitamin K intake.'
  },
  {
    id: 'aspirin',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid (ASA)',
    brandNames: ['Bayer', 'Bufferin', 'Ecotrin', 'Disprin'],
    drugClass: 'Salicylate / Antiplatelet / Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    therapeuticUse: 'Cardiovascular risk reduction (secondary prevention of MI and ischemic stroke), mild-to-moderate analgesia, antipyresis, and anti-inflammatory therapy.',
    precautions: 'Risk of gastrointestinal mucosal ulceration and hemorrhage. Contraindicated in children with viral illness (Reye syndrome). Use with caution in asthma.',
    metabolismInfo: 'Rapidly hydrolyzed to salicylic acid in gastrointestinal tract and liver; renal elimination.',
    cypEnzymes: 'Minimal CYP involvement; renal glucuronidation and clearance',
    commonInteractionsSummary: 'Synergistic bleeding risk with anticoagulants, other antiplatelets, SSRIs; attenuates antihypertensive effects of ACE inhibitors.'
  },
  {
    id: 'lisinopril',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril', 'Qbrelis'],
    drugClass: 'Angiotensin-Converting Enzyme (ACE) Inhibitor',
    therapeuticUse: 'Management of hypertension, adjunct therapy in heart failure with reduced ejection fraction, and improvement of survival post-myocardial infarction.',
    precautions: 'Risk of hyperkalemia, acute kidney injury, dry persistent cough, and angioedema. Teratogenic (fetal toxicity in pregnancy).',
    metabolismInfo: 'Excreted unchanged entirely in urine; does not undergo hepatic metabolism.',
    cypEnzymes: 'Non-CYP dependent; primarily renally eliminated',
    commonInteractionsSummary: 'Severe hyperkalemia risk with potassium-sparing diuretics (spironolactone), potassium supplements, and trimethoprim; acute renal risk with NSAIDs.'
  },
  {
    id: 'spironolactone',
    name: 'Spironolactone',
    genericName: 'Spironolactone',
    brandNames: ['Aldactone', 'CaroSpir'],
    drugClass: 'Aldosterone Receptor Antagonist (Potassium-Sparing Diuretic)',
    therapeuticUse: 'Heart failure with reduced ejection fraction (HFrEF), primary aldosteronism, refractory hypertension, and management of edema secondary to cirrhosis.',
    precautions: 'Risk of profound hyperkalemia, especially in renal dysfunction or concurrent renin-angiotensin-aldosterone system (RAAS) blockade. Gynecomastia in long-term therapy.',
    metabolismInfo: 'Extensively metabolized hepatically to active sulfur-containing metabolites including canrenone.',
    cypEnzymes: 'Weak CYP3A4 substrate and mild inhibitor',
    commonInteractionsSummary: 'Additive hyperkalemic effect when combined with ACE inhibitors, ARBs, and NSAIDs. May increase digoxin serum concentrations.'
  },
  {
    id: 'atorvastatin',
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandNames: ['Lipitor', 'Atorvalip', 'Storvas'],
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    therapeuticUse: 'Primary and secondary prevention of atherosclerotic cardiovascular disease, hypercholesterolemia, and dyslipidemia.',
    precautions: 'Monitor for myopathy, unexplained muscle pain, tenderness or weakness (rhabdomyolysis risk). Monitor baseline hepatic transaminases.',
    metabolismInfo: 'Extensively metabolized by hepatic Cytochrome P450 3A4 (CYP3A4) to active ortho- and parahydroxylated metabolites.',
    cypEnzymes: 'Major substrate of CYP3A4 and OATP1B1 transporter',
    commonInteractionsSummary: 'Markedly increased plasma concentrations and severe myopathy/rhabdomyolysis risk when paired with potent CYP3A4 inhibitors (clarithromycin, itraconazole, protease inhibitors).'
  },
  {
    id: 'clarithromycin',
    name: 'Clarithromycin',
    genericName: 'Clarithromycin',
    brandNames: ['Biaxin', 'Klacid', 'Clariwin'],
    drugClass: 'Macrolide Antibiotic',
    therapeuticUse: 'Treatment of respiratory tract infections, skin infections, and eradication of Helicobacter pylori in peptic ulcer disease.',
    precautions: 'QT interval prolongation and ventricular arrhythmia risk. Potent mechanism-based inactivator (suicide inhibitor) of hepatic and intestinal CYP3A4.',
    metabolismInfo: 'Extensively metabolized hepatically; also converted to active 14-hydroxyclarithromycin.',
    cypEnzymes: 'Potent CYP3A4 inhibitor; substrate of CYP3A4 and P-glycoprotein',
    commonInteractionsSummary: 'Substantially elevates serum levels of CYP3A4 substrates including statins (atorvastatin, simvastatin), digoxin, carbamazepine, and warfarin.'
  },
  {
    id: 'fluoxetine',
    name: 'Fluoxetine',
    genericName: 'Fluoxetine Hydrochloride',
    brandNames: ['Prozac', 'Sarafem'],
    drugClass: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    therapeuticUse: 'Major depressive disorder, obsessive-compulsive disorder (OCD), bulimia nervosa, panic disorder.',
    precautions: 'Risk of Serotonin Syndrome when combined with other serotonergic agents. Long elimination half-life (active metabolite norfluoxetine persists for weeks).',
    metabolismInfo: 'Hepatic metabolism via CYP2D6 to active metabolite norfluoxetine; potent inhibitor of CYP2D6.',
    cypEnzymes: 'Potent inhibitor of CYP2D6; moderate inhibitor of CYP2C19 and CYP3A4',
    commonInteractionsSummary: 'Dangerous interaction with MAO inhibitors, linezolid, triptans, and tramadol (Serotonin Syndrome). Inhibits conversion of codeine and tramadol to active analgesics via CYP2D6.'
  },
  {
    id: 'tramadol',
    name: 'Tramadol',
    genericName: 'Tramadol Hydrochloride',
    brandNames: ['Ultram', 'ConZip', 'Tramazac'],
    drugClass: 'Opioid Agonist / Central Analgesic (SNRI properties)',
    therapeuticUse: 'Management of moderate to severe pain in adults.',
    precautions: 'Dose-dependent seizure risk, central nervous system depression, respiratory depression, and dependence potential.',
    metabolismInfo: 'Bioactivated in the liver to active M1 metabolite (O-desmethyltramadol) via CYP2D6; deactivated via CYP3A4.',
    cypEnzymes: 'Substrate of CYP2D6 (activation) and CYP3A4',
    commonInteractionsSummary: 'Combining with SSRIs (fluoxetine) substantially elevates risk of life-threatening Serotonin Syndrome and seizures, while impairing analgesic efficacy.'
  },
  {
    id: 'clopidogrel',
    name: 'Clopidogrel',
    genericName: 'Clopidogrel Bisulfate',
    brandNames: ['Plavix', 'Clopilet'],
    drugClass: 'P2Y12 Platelet Inhibitor (Thienopyridine Antiplatelet)',
    therapeuticUse: 'Reduction of atherothrombotic events in acute coronary syndrome, recent myocardial infarction, stroke, or peripheral arterial disease.',
    precautions: 'Prodrug requiring two-step bioactivation. Bleeding risk. Poor metabolizers of CYP2C19 have diminished antiplatelet response.',
    metabolismInfo: 'Prodrug: ~85% deactivated by blood esterases; remaining 15% bioactivated by CYP2C19, CYP3A4, CYP1A2.',
    cypEnzymes: 'Major substrate for bioactivation via CYP2C19',
    commonInteractionsSummary: 'CYP2C19 inhibitors like omeprazole inhibit clopidogrel bioactivation, lowering active antiplatelet levels and increasing stent thrombosis / ischemic risk.'
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec', 'Omez', 'Losec'],
    drugClass: 'Proton Pump Inhibitor (PPI)',
    therapeuticUse: 'Gastroesophageal reflux disease (GERD), erosive esophagitis, duodenal and gastric ulcers, Zollinger-Ellison syndrome.',
    precautions: 'Hypomagnesemia with prolonged use, increased bone fracture risk, Clostridioides difficile infection. Alters gastric pH affecting drug absorption.',
    metabolismInfo: 'Metabolized predominantly by CYP2C19 and to a lesser extent by CYP3A4.',
    cypEnzymes: 'Competitive inhibitor of CYP2C19; substrate of CYP2C19 and CYP3A4',
    commonInteractionsSummary: 'Reduces efficacy of clopidogrel by blocking CYP2C19 activation. Reduces absorption of pH-dependent medications (ketoconazole, iron salts).'
  },
  {
    id: 'metformin',
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    brandNames: ['Glucophage', 'Fortamet', 'Glycomet'],
    drugClass: 'Biguanide Antihyperglycemic Agent',
    therapeuticUse: 'First-line pharmacological management of type 2 diabetes mellitus and polycystic ovary syndrome (off-label).',
    precautions: 'Lactic acidosis risk, especially in renal insufficiency, tissue hypoperfusion, acute illness, or heavy alcohol consumption. Monitor eGFR regularly.',
    metabolismInfo: 'Not metabolized by liver enzymes; excreted unchanged in urine via organic cation transporters (OCT1/OCT2).',
    cypEnzymes: 'Non-CYP dependent; substrate of OCT1, OCT2, MATE1 transporters',
    commonInteractionsSummary: 'Alcohol markedly enhances risk of lactic acidosis and hypoglycemia. Iodinated radiocontrast agents can induce acute renal failure, precipitating metformin accumulation.'
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin', 'Brufen', 'Nurofen'],
    drugClass: 'Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    therapeuticUse: 'Relief of mild to moderate pain, headache, dental pain, primary dysmenorrhea, fever, and osteoarthritis.',
    precautions: 'Cardiovascular thrombotic risk, gastrointestinal bleeding/ulceration, renal impairment with reduced fluid intake. Blunts cardioprotective low-dose aspirin.',
    metabolismInfo: 'Metabolized via hepatic CYP2C9 and CYP2C8 to inactive metabolites; renal excretion.',
    cypEnzymes: 'Substrate and mild inhibitor of CYP2C9',
    commonInteractionsSummary: 'Competes with cardioprotective aspirin at COX-1 binding site. Elevates serum lithium and methotrexate levels. Causes acute renal decompensation with ACE inhibitors.'
  },
  {
    id: 'digoxin',
    name: 'Digoxin',
    genericName: 'Digoxin',
    brandNames: ['Lanoxin', 'Digitek'],
    drugClass: 'Cardiac Glycoside',
    therapeuticUse: 'Rate control in chronic atrial fibrillation and flutter, adjunct in symptomatic heart failure with reduced ejection fraction.',
    precautions: 'Narrow therapeutic window (0.5 - 0.9 ng/mL target in heart failure). Toxicity manifested as arrhythmias, nausea, yellow-green visual halos. Sensitive to potassium/magnesium levels.',
    metabolismInfo: 'Minor hepatic metabolism; mostly eliminated renally via P-glycoprotein transport.',
    cypEnzymes: 'Substrate of P-glycoprotein (P-gp/ABCB1); minor CYP involvement',
    commonInteractionsSummary: 'P-glycoprotein inhibitors (amiodarone, verapamil, quinidine) reduce digoxin clearance by 50-100%, causing severe digoxin toxicity. Diuretics causing hypokalemia precipitate arrhythmias.'
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    genericName: 'Amiodarone Hydrochloride',
    brandNames: ['Cordarone', 'Pacerone', 'Nexterone'],
    drugClass: 'Class III Antiarrhythmic Agent',
    therapeuticUse: 'Treatment and prophylaxis of frequently recurring ventricular fibrillation, hemodynamically unstable ventricular tachycardia, and supraventricular arrhythmias.',
    precautions: 'Pulmonary toxicity (fibrosis), hepatotoxicity, thyroid dysfunction (hypo- and hyperthyroidism), corneal microdeposits, and extreme half-life (up to 58 days).',
    metabolismInfo: 'Hepatic metabolism via CYP3A4 and CYP2C8 to active desethylamiodarone.',
    cypEnzymes: 'Broad-spectrum inhibitor: CYP2C9, CYP2D6, CYP3A4, and P-glycoprotein',
    commonInteractionsSummary: 'Inhibits clearance of digoxin, warfarin (doubles INR), and statins (atorvastatin, simvastatin), requiring proactive 50% dose reductions upon amiodarone initiation.'
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    brandNames: ['Amoxil', 'Moxatag', 'Moxikind'],
    drugClass: 'Aminopenicillin Antibiotic (Beta-Lactam)',
    therapeuticUse: 'Infections of ear, nose, throat, lower respiratory tract, urinary tract, and skin caused by susceptible strains of gram-positive and gram-negative bacteria.',
    precautions: 'Hypersensitivity reactions (anaphylaxis) in penicillin-allergic patients. Superinfection with C. difficile diarrhea.',
    metabolismInfo: 'Minimal hepatic metabolism (~10-25%); excreted unchanged in urine primarily by tubular secretion.',
    cypEnzymes: 'Non-CYP dependent',
    commonInteractionsSummary: 'Generally favorable interaction safety profile. Concomitant probenecid prolongs amoxicillin half-life by inhibiting renal excretion (often used therapeutically).'
  },
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    genericName: 'Acetaminophen (APAP)',
    brandNames: ['Tylenol', 'Panadol', 'Calpol', 'Crocin'],
    drugClass: 'Central Analgesic and Antipyretic',
    therapeuticUse: 'First-line agent for mild-to-moderate pain and antipyresis in adults and pediatric patients.',
    precautions: 'Dose-dependent hepatotoxicity. Maximum daily dose 4000 mg in healthy adults (lower in chronic alcoholism, cirrhosis, or malnutrition).',
    metabolismInfo: 'Hepatic glucuronidation and sulfation (~90%); minor pathway via CYP2E1 generates toxic NAPQI, detoxified by glutathione.',
    cypEnzymes: 'Substrate of CYP2E1, CYP1A2, CYP3A4',
    commonInteractionsSummary: 'Safe with most antibiotics including amoxicillin. Chronic high-dose paracetamol (>2g/day) may mildly potentiate warfarin INR. Heavy alcohol induces CYP2E1 increasing NAPQI hepatotoxicity.'
  },
  {
    id: 'simvastatin',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    brandNames: ['Zocor', 'Simvotin'],
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    therapeuticUse: 'Reduction of cardiovascular morbidity and mortality in hypercholesterolemia and coronary heart disease.',
    precautions: 'Dose limitations: high doses (80mg) associated with elevated rhabdomyolysis risks. Highly CYP3A4-dependent.',
    metabolismInfo: 'Inactive lactone prodrug hydrolyzed to active beta-hydroxyacid form; extensively cleared via CYP3A4.',
    cypEnzymes: 'Major sensitive CYP3A4 substrate and OATP1B1 substrate',
    commonInteractionsSummary: 'Severe contraindication with potent CYP3A4 inhibitors (clarithromycin, ketoconazole) and gemfibrozil (inhibits glucuronidation), leading to massive statin buildup.'
  },
  {
    id: 'sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline Hydrochloride',
    brandNames: ['Zoloft', 'Daxid', 'Sertima'],
    drugClass: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    therapeuticUse: 'Major depressive disorder, obsessive-compulsive disorder, panic disorder, PTSD, social anxiety disorder.',
    precautions: 'Suicidality warning in adolescents and young adults; risk of serotonin syndrome; bleeding tendencies with antiplatelets.',
    metabolismInfo: 'Hepatic N-demethylation primarily by CYP2B6, CYP2C19, CYP2C9, CYP3A4, and CYP2D6.',
    cypEnzymes: 'Substrate of multiple CYPs; mild-to-moderate inhibitor of CYP2D6',
    commonInteractionsSummary: 'Serotonergic toxicity when combined with MAOIs, tramadol, or triptans. Moderate bleeding hazard with NSAIDs or anticoagulants.'
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin Hydrochloride',
    brandNames: ['Cipro', 'Ciplox'],
    drugClass: 'Fluoroquinolone Antibacterial',
    therapeuticUse: 'Complicated urinary tract infections, pyelonephritis, infectious diarrhea, bone and joint infections.',
    precautions: 'Black box warnings for tendon rupture, peripheral neuropathy, CNS toxicities, and QT prolongation.',
    metabolismInfo: 'Moderate hepatic metabolism; moderate-to-potent inhibitor of CYP1A2.',
    cypEnzymes: 'Potent CYP1A2 inhibitor; weak CYP3A4 inhibitor',
    commonInteractionsSummary: 'Dramatically increases theophylline and tizanidine serum concentrations via CYP1A2 inhibition. Multivalent cations (antacids, calcium, iron) chelate and block ciprofloxacin absorption.'
  },
  {
    id: 'st-johns-wort',
    name: "St. John's Wort",
    genericName: 'Hypericum perforatum Extract',
    brandNames: ['Kira', 'Mood Aid', 'Hyperiforce'],
    drugClass: 'Herbal Dietary Supplement / Phytomedicine',
    therapeuticUse: 'Traditionally used in complementary medicine for mild-to-moderate depressive symptoms.',
    precautions: 'Potent inducer of Cytochrome P450 enzymes and P-glycoprotein efflux transporter. Serotonergic activity.',
    metabolismInfo: 'Active constituent hyperforin binds to Pregnane X Receptor (PXR) triggering massive enzyme transcription.',
    cypEnzymes: 'Potent inducer of CYP3A4, CYP2C9, CYP2C19, and P-glycoprotein transporter',
    commonInteractionsSummary: 'Causes catastrophic therapeutic failure by accelerating elimination of oral contraceptives, cyclosporine, warfarin, digoxin, and HIV protease inhibitors.'
  }
];

export const PRESET_PAIRS: PresetPair[] = [
  {
    id: 'preset-warfarin-aspirin',
    title: 'Warfarin + Aspirin',
    drugs: ['Warfarin', 'Aspirin'],
    severity: 'major',
    clinicalTag: 'Dual Antithrombotic Hemorrhage Risk',
    briefExplanation: 'Synergistic pharmacodynamic interaction: Vitamin K antagonism coupled with irreversible platelet inhibition severely increases gastrointestinal and intracranial bleeding risk.'
  },
  {
    id: 'preset-lisinopril-spironolactone',
    title: 'Lisinopril + Spironolactone',
    drugs: ['Lisinopril', 'Spironolactone'],
    severity: 'major',
    clinicalTag: 'Potassium Additivity / Fatal Arrhythmia Risk',
    briefExplanation: 'Pharmacodynamic dual renin-angiotensin-aldosterone blockade severely limits renal potassium excretion, risking life-threatening hyperkalemia.'
  },
  {
    id: 'preset-fluoxetine-tramadol',
    title: 'Fluoxetine + Tramadol',
    drugs: ['Fluoxetine', 'Tramadol'],
    severity: 'major',
    clinicalTag: 'Serotonin Syndrome & Seizure Risk',
    briefExplanation: 'Dual pharmacodynamic and pharmacokinetic clash: potent CYP2D6 inhibition elevates parent tramadol levels, combining with SSRI reuptake blockade to trigger hyperthermia and clonus.'
  },
  {
    id: 'preset-atorvastatin-clarithromycin',
    title: 'Atorvastatin + Clarithromycin',
    drugs: ['Atorvastatin', 'Clarithromycin'],
    severity: 'major',
    clinicalTag: 'CYP3A4 Inhibition / Severe Rhabdomyolysis',
    briefExplanation: 'Mechanism-based suicide inhibition of CYP3A4 by clarithromycin spikes atorvastatin systemic AUC by up to 400%, precipitating acute myopathy and acute kidney injury.'
  },
  {
    id: 'preset-clopidogrel-omeprazole',
    title: 'Clopidogrel + Omeprazole',
    drugs: ['Clopidogrel', 'Omeprazole'],
    severity: 'moderate',
    clinicalTag: 'CYP2C19 Bioactivation Impairment',
    briefExplanation: 'Competitive inhibition of CYP2C19 by omeprazole blunts metabolic activation of clopidogrel prodrug, leaving patients underprotected against coronary stent thrombosis.'
  },
  {
    id: 'preset-amoxicillin-paracetamol',
    title: 'Amoxicillin + Paracetamol',
    drugs: ['Amoxicillin', 'Paracetamol'],
    severity: 'minor',
    clinicalTag: 'Clinically Compatible / No Significant Interaction',
    briefExplanation: 'Independent metabolic and excretory routes. Amoxicillin does not interfere with paracetamol hepatic glucuronidation or CYP2E1 metabolism.'
  }
];

export const VERIFIED_INTERACTIONS_MAP: Record<string, InteractionPair> = {
  'aspirin_warfarin': {
    drugA: 'Warfarin',
    drugB: 'Aspirin',
    hasInteraction: true,
    severity: 'major',
    type: 'pharmacodynamic',
    mechanism: 'Dual antithrombotic pharmacodynamic synergism. Warfarin reduces hepatic synthesis of functional Vitamin K-dependent coagulation factors (II, VII, IX, X), while aspirin irreversibly acetylates platelet cyclooxygenase-1 (COX-1), extinguishing thromboxane A2-mediated platelet aggregation and causing gastric mucosal micro-damage.',
    clinicalConsequences: 'Substantially amplified risk of major hemorrhagic events, including upper gastrointestinal bleeding, peptic ulcer perforation, retroperitoneal hemorrhage, and intracranial hemorrhage.',
    riskFactors: [
      'Age > 65 years',
      'History of peptic ulcer disease or gastrointestinal bleeding',
      'Concurrent use of NSAIDs or corticosteroids',
      'High baseline INR (> 3.0)',
      'Renal insufficiency or uncontrolled hypertension'
    ],
    warningSigns: [
      'Unusual or prolonged bruising without obvious trauma',
      'Melena (black, tarry stools) or hematochezia (bright red blood in stool)',
      'Hematemesis (vomiting blood or coffee-ground material)',
      'Persistent epistaxis (nosebleeds) lasting longer than 15 minutes',
      'Hematuria (pink, red, or dark brown urine)',
      'Sudden severe headache, dizziness, or weakness indicating intracranial bleed'
    ],
    precautions: [
      'Avoid concurrent over-the-counter aspirin or salicylate products without explicit cardiological/hematological direction.',
      'If dual therapy is clinically mandated (e.g. recent drug-eluting coronary stent + mechanical heart valve), maintain rigorous INR surveillance.',
      'Gastroprotective co-therapy with a proton pump inhibitor (e.g., pantoprazole) should be considered under medical supervision.'
    ],
    evidenceSource: 'FDA Drug Safety Communication, Stockley’s Drug Interactions 12th Ed., CHEST Antithrombotic Guidelines',
    verificationDate: '2026-04-15',
    questionsForDoctor: [
      'Is aspirin strictly necessary in addition to my blood thinner, or can it be safely discontinued?',
      'Should I be taking an acid-reducing stomach protective medication while taking both?',
      'What target INR range should I maintain while taking these together?',
      'What should I do if I accidentally take a dose of headache medicine containing aspirin?'
    ],
    isVerifiedReference: true,
    isDemonstrationData: false
  },
  'lisinopril_spironolactone': {
    drugA: 'Lisinopril',
    drugB: 'Spironolactone',
    hasInteraction: true,
    severity: 'major',
    type: 'pharmacodynamic',
    mechanism: 'Additive potassium retention through complementary inhibition of the Renin-Angiotensin-Aldosterone System (RAAS). Lisinopril inhibits angiotensin-converting enzyme, decreasing aldosterone synthesis; spironolactone directly antagonizes aldosterone mineralocorticoid receptors in the renal distal convoluted tubule and collecting duct, terminating potassium excretion.',
    clinicalConsequences: 'Severe, life-threatening hyperkalemia (serum potassium > 5.5 to 6.5 mEq/L) capable of precipitating ventricular tachycardia, ventricular fibrillation, heart block, muscle paralysis, and cardiac arrest.',
    riskFactors: [
      'Pre-existing Chronic Kidney Disease (eGFR < 45 mL/min/1.73m²)',
      'Diabetic nephropathy',
      'Concurrent potassium supplements or salt substitutes containing potassium chloride',
      'Elderly patients or hypovolemic dehydration states',
      'Co-administration with NSAIDs which blunt renal prostaglandin synthesis'
    ],
    warningSigns: [
      'Muscle weakness, heaviness, or numbness in the legs and arms',
      'Paresthesias (tingling or prickling sensations around mouth or extremities)',
      'Palpitations, irregular heart rhythms, or bradycardia (slow pulse)',
      'Severe fatigue, chest discomfort, or unexpected nausea'
    ],
    precautions: [
      'Mandatory baseline and frequent follow-up checks of serum electrolytes (potassium) and renal function (serum creatinine, eGFR).',
      'Strictly avoid potassium supplements and potassium-based dietary salt substitutes (Lo-Salt).',
      'Maintain appropriate hydration and report sudden illness with vomiting or diarrhea immediately.'
    ],
    evidenceSource: 'AHA/ACC Heart Failure Guidelines, AHFS Drug Information, Kidney Disease: Improving Global Outcomes (KDIGO)',
    verificationDate: '2026-03-20',
    questionsForDoctor: [
      'How frequently do I need my blood potassium and kidney function checked?',
      'Are there foods, salt alternatives, or beverages high in potassium I must avoid?',
      'What should I do if I develop muscle weakness or an unusually slow pulse?',
      'If I develop diarrhea or vomiting, should I pause either medicine temporarily?'
    ],
    isVerifiedReference: true,
    isDemonstrationData: false
  },
  'fluoxetine_tramadol': {
    drugA: 'Fluoxetine',
    drugB: 'Tramadol',
    hasInteraction: true,
    severity: 'major',
    type: 'pharmacokinetic',
    mechanism: 'Dual pharmacokinetic-pharmacodynamic conflict. Fluoxetine is a potent CYP2D6 inhibitor that blocks tramadol bioactivation into its primary mu-opioid active metabolite (M1 / O-desmethyltramadol), causing accumulation of parent tramadol. Simultaneously, both agents promote central serotonergic neurotransmission (fluoxetine blocks 5-HT reuptake; tramadol inhibits 5-HT and NE reuptake and stimulates 5-HT release).',
    clinicalConsequences: 'Markedly heightened risk of Serotonin Syndrome (autonomic instability, hyperthermia, neuromuscular clonus, altered mental status) and lower seizure threshold, alongside diminished analgesic relief.',
    riskFactors: [
      'Higher or escalating doses of tramadol (> 200 mg/day)',
      'Concurrent use of other serotonergic agents (triptans, St. John\'s Wort, TCAs, dextromethorphan)',
      'History of seizures or structural brain lesions',
      'Elderly or debilitated status'
    ],
    warningSigns: [
      'Agitation, restlessness, confusion, or delirium',
      'Hyperreflexia (exaggerated reflexes) and spontaneous or ocular clonus (rhythmic muscle jerking)',
      'Diaphoresis (drenching sweat), shivering, or unexplained high fever',
      'Tachycardia (racing heartbeat) and fluctuating blood pressure',
      'Tremors, muscle rigidity, and dilated pupils'
    ],
    precautions: [
      'Avoid combination whenever clinically feasible; alternate non-serotonergic analgesics should be considered.',
      'Educate patient and caregivers on the hallmark symptoms of Serotonin Toxicity.',
      'Emergency medical evaluation is required immediately if tremors, high fever, or confusion develop.'
    ],
    evidenceSource: 'Hunter Serotonin Toxicity Criteria, FDA Warning on Serotonergic Opioids, British National Formulary',
    verificationDate: '2026-05-10',
    questionsForDoctor: [
      'Is there an alternative pain medication that does not interact with my antidepressant?',
      'What are the emergency signs of serotonin syndrome that I should watch out for?',
      'Could this combination be why my pain is not being relieved as expected?'
    ],
    isVerifiedReference: true,
    isDemonstrationData: false
  },
  'atorvastatin_clarithromycin': {
    drugA: 'Atorvastatin',
    drugB: 'Clarithromycin',
    hasInteraction: true,
    severity: 'major',
    type: 'pharmacokinetic',
    mechanism: 'Potent mechanism-based inhibition of hepatic and intestinal Cytochrome P450 3A4 (CYP3A4) and OATP1B1 hepatic uptake transporter by clarithromycin. Atorvastatin is heavily dependent on CYP3A4 for first-pass and systemic clearance; co-administration increases atorvastatin AUC by 3.5 to 5-fold.',
    clinicalConsequences: 'Severe statin-induced myotoxicity, ranging from profound myalgia and elevated serum creatine kinase (CK) to fulminant rhabdomyolysis, myoglobinuria, and acute renal failure.',
    riskFactors: [
      'High baseline atorvastatin dose (40 mg or 80 mg daily)',
      'Advanced age (> 70 years) or female sex',
      'Renal insufficiency or untreated hypothyroidism',
      'Concomitant gemfibrozil or calcium channel blockers'
    ],
    warningSigns: [
      'Unexplained severe muscle aches, cramps, tenderness, or weakness (especially in thighs, back, shoulders)',
      'Tea-colored, cola-colored, or dark brownish-red urine (myoglobinuria)',
      'Profound fatigue, malaise, or fever accompanying muscle soreness',
      'Oliguria (dramatically reduced urination frequency or volume)'
    ],
    precautions: [
      'Temporary suspension of atorvastatin during the short antibiotic course of clarithromycin is standard clinical practice.',
      'Alternatively, select an antibiotic that does not inhibit CYP3A4 (e.g., azithromycin or amoxicillin).',
      'Never ignore muscle pain when taking this combination.'
    ],
    evidenceSource: 'FDA Drug Safety Communication on Statins and Strong CYP3A4 Inhibitors, European Heart Journal',
    verificationDate: '2026-02-18',
    questionsForDoctor: [
      'Can I temporarily pause my atorvastatin while I take this antibiotic course?',
      'Is there an alternative antibiotic (like azithromycin) that will treat my infection without interacting?',
      'What should I do if I notice dark urine or muscle weakness?'
    ],
    isVerifiedReference: true,
    isDemonstrationData: false
  },
  'clopidogrel_omeprazole': {
    drugA: 'Clopidogrel',
    drugB: 'Omeprazole',
    hasInteraction: true,
    severity: 'moderate',
    type: 'pharmacokinetic',
    mechanism: 'Competitive inhibition of hepatic Cytochrome P450 2C19 (CYP2C19) by omeprazole. Clopidogrel is an inactive prodrug requiring two sequential bioactivation steps mediated by CYP2C19 into its active thiol metabolite. Omeprazole blunts this pathway, reducing the circulating active antiplatelet moiety by approximately 45%.',
    clinicalConsequences: 'Diminished platelet inhibition leading to increased vulnerability to acute cardiovascular events, including stent thrombosis, recurrent myocardial infarction, and ischemic stroke in high-risk coronary patients.',
    riskFactors: [
      'Recent percutaneous coronary intervention (PCI) with stent placement',
      'Known CYP2C19 intermediate or poor metabolizer genotype (*2, *3 alleles)',
      'High baseline cardiovascular risk profile or acute coronary syndrome'
    ],
    warningSigns: [
      'Recurrent angina, chest pressure, heaviness, or shortness of breath',
      'Sudden neurological symptoms (transient numbness, slurred speech, facial droop)'
    ],
    precautions: [
      'If gastroprotection is essential, consider substituting omeprazole with pantoprazole (which possesses minimal CYP2C19 inhibitory affinity) or an H2-receptor antagonist (famotidine).',
      'Do not discontinue antiplatelet therapy abruptly without cardiologist guidance.'
    ],
    evidenceSource: 'FDA Drug Safety Communication: Ongoing Review of Clopidogrel and Omeprazole, ACC/AHA Guidelines',
    verificationDate: '2026-01-25',
    questionsForDoctor: [
      'Can I switch from omeprazole to pantoprazole or famotidine to protect my stent while managing acid reflux?',
      'Is my current antiplatelet protection adequate?'
    ],
    isVerifiedReference: true,
    isDemonstrationData: false
  },
  'amoxicillin_paracetamol': {
    drugA: 'Amoxicillin',
    drugB: 'Paracetamol',
    hasInteraction: false,
    severity: 'minor',
    type: 'unknown',
    mechanism: 'No documented metabolic or receptor-level conflict. Amoxicillin is cleared almost entirely renally via tubular secretion without hepatic CYP induction or inhibition. Paracetamol is cleared via hepatic glucuronidation, sulfation, and minor CYP2E1 oxidation. Their pharmacokinetic and pharmacodynamic profiles do not collide.',
    clinicalConsequences: 'No adverse clinical interaction anticipated. Commonly co-prescribed in clinical practice for respiratory and bacterial infections with fever or pain.',
    riskFactors: [
      'Severe preexisting liver disease (pertaining to paracetamol limits)',
      'Severe renal impairment (requiring amoxicillin dose interval adjustment)'
    ],
    warningSigns: [
      'Normal medication-specific adverse effects only (e.g. mild rash or GI upset from antibiotic)'
    ],
    precautions: [
      'Ensure paracetamol dose does not exceed 4000 mg/day (or 2000-3000 mg in chronic liver disease).',
      'Complete the full course of antibiotics as directed by your prescriber.'
    ],
    evidenceSource: 'British National Formulary (BNF), Lexicomp Drug Interactions Reference',
    verificationDate: '2026-04-01',
    questionsForDoctor: [
      'What is the appropriate dosing schedule so I remember to take both on time?'
    ],
    isVerifiedReference: true,
    isDemonstrationData: false
  }
};

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'General',
    question: 'What is a drug–drug interaction?',
    answer: 'A drug–drug interaction occurs when the pharmacological or clinical effect of one medication is altered by the co-administration of another. This can result in increased toxicity (amplified side effects), diminished therapeutic efficacy (drug failure), or unexpected clinical reactions that neither drug would cause on its own.'
  },
  {
    category: 'Clinical',
    question: 'Why and how can medicines interact?',
    answer: 'Interactions generally occur via two main mechanisms: (1) Pharmacokinetic interactions, where one drug alters the absorption, distribution, metabolism (often through liver enzymes like Cytochrome P450), or renal excretion of another; and (2) Pharmacodynamic interactions, where drugs act synergistically (e.g., two blood thinners multiplying bleeding risk) or antagonistically (e.g., an NSAID blunting an antihypertensive).'
  },
  {
    category: 'Herbals',
    question: 'Can herbal products, vitamins, and OTC supplements interact with medicines?',
    answer: "Yes, significantly. Natural products contain active pharmacological compounds. For example, St. John's Wort strongly induces the CYP3A4 liver enzyme and P-glycoprotein, dramatically accelerating the breakdown of oral contraceptives, heart medications, and immunosuppressants. Always disclose all dietary supplements to your pharmacist."
  },
  {
    category: 'Safety',
    question: 'Does a negative interaction result guarantee safety?',
    answer: 'No. A negative result only signifies that no clinically documented interaction is recorded in the checked reference data for those specific names. It does not account for individualized factors like kidney/liver impairment, genetic enzyme variations, rare adverse effects, allergies, or emerging clinical interactions.'
  },
  {
    category: 'Safety',
    question: 'When should I consult a pharmacist or doctor?',
    answer: 'You should consult a healthcare professional whenever starting, stopping, or altering any medication (prescription, OTC, or supplement), before surgery or dental procedures, or immediately if you experience unexpected symptoms such as unusual bruising, dizziness, irregular heartbeat, or severe muscle weakness.'
  },
  {
    category: 'Clinical',
    question: 'How do interaction severity categories (Major, Moderate, Minor) differ?',
    answer: 'Major interactions are potentially life-threatening or cause permanent organ damage, usually requiring avoidance or immediate medical intervention. Moderate interactions may reduce therapeutic efficacy or cause discomfort requiring monitoring or dose modification. Minor interactions have minimal clinical significance and rarely require altered therapy.'
  }
];
