// constants/scenarios.ts

import { CsvScenario } from '../types/scenario';

/**
 * Preloaded scenarios covering various themes including GBV, Migration, and Government Services
 * These scenarios help users quickly access common use cases without uploading CSV files
 */
export const PRELOADED_SCENARIOS: CsvScenario[] = [
  {
    id: 1,
    context: "Gender-Based Violence (GBV) - Child Custody and Legal Aid",
    prompt: "I'm planning to leave my abusive spouse. We have young children. How do I find legal information about child custody, separation, and the protection of my children's rights? What steps do I need to take to file for custody, and can you link me to free legal aid services?"
  },
  {
    id: 2,
    context: "Migration - Deportation and Legal Protection",
    prompt: "The police took my husband because his asylum permit expired. Is it legal for them to deport him immediately? What legal laws, etc. can I use to show that I'm informed and he is protected by law? How can I contact legal aid or UNHCR?"
  },
  {
    id: 3,
    context: "Migration - Asylum Registration Process",
    prompt: "I just arrived in Germany as an asylum seeker. Where do I register officially, what documents do I need, what questions should I expect during the interview and what happens if I miss the appointment?"
  },
  {
    id: 4,
    context: "Government Services - Maternity Benefits Employment Rights",
    prompt: "I gave birth and my employer refuses to pay my maternity benefits. What does the Kenyan Employment Act say? How do I complain to the Labour Offices, and what is the contact number?"
  },
  {
    id: 5,
    context: "Government Services - Domestic Violence Leave California",
    prompt: "I need to take time off work because of domestic violence and mental trauma. Can I apply for Paid Family Leave or Safe Leave in California? What forms do I file with my employer and EDD? Will my employer know the reason?"
  },
  {
    id: 6,
    context: "Migration - Work Authorization Italy",
    prompt: "I applied for asylum in Italy two months ago. Am I allowed to work yet? If yes, what application or permit do I need?"
  },
  {
    id: 7,
    context: "Migration - Unemployment Benefits France",
    prompt: "I left my job to escape domestic violence — can I still qualify for unemployment benefits (Pôle emploi)? What documents do I need to prove 'legitimate resignation'? Can a social worker or shelter help me file?"
  },
  {
    id: 8,
    context: "Migration - Tax Filing Without SSN",
    prompt: "I received work authorization and I'm working. How do I file taxes without a Social Security Number? Should I apply for an ITIN? What IRS forms do I need, and are there free tax clinics that help immigrants?"
  },
  {
    id: 9,
    context: "GBV - Safety Planning and Shelter Resources",
    prompt: "I want to leave but I'm worried about retaliation, and I don't know where to go with my children and how to make sure I have documents and money. Could you help me create a safe exit checklist, tell me what local shelters or hotlines exist in my region, and what I should prepare in advance?"
  },
  {
    id: 10,
    context: "GBV - Migrant Survivor Immigration Status",
    prompt: "I'm a migrant in a country far from home, my partner uses my visa status to control me and threatens deportation. How can I find services that help migrant survivors of abuse, what are my rights, and where can I get help without risking exposure or deportation?"
  }
];

/**
 * Helper function to get a scenario by ID
 */
export const getPreloadedScenarioById = (id: number): CsvScenario | undefined => {
  return PRELOADED_SCENARIOS.find(scenario => scenario.id === id);
};

/**
 * Helper function to get all scenario contexts for display
 */
export const getScenarioContexts = (): string[] => {
  return PRELOADED_SCENARIOS.map(scenario => scenario.context);
};