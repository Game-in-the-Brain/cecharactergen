/**
 * Open Source Names - Main Export
 * A culturally diverse name generator with language drift simulation
 */

export { Culture, Gender, NameGeneratorOptions, GeneratedName, NameData } from './types';
export { PHONOLOGY, PhonemeSet, calculatePhonologicalDistance } from './phonology';
export { 
  DriftConfig, 
  DriftedName, 
  driftName, 
  generateRandomDrift, 
  describeDrift 
} from './drift';

import { Culture, Gender, NameGeneratorOptions, GeneratedName } from './types';
import { englishNameData } from './data/english';
import { driftName, DriftConfig, generateRandomDrift } from './drift';

// All available cultures
export const AVAILABLE_CULTURES: Culture[] = [
  Culture.ENGLISH, Culture.AMERICAN, Culture.BRITISH,
  Culture.FRENCH, Culture.GERMAN, Culture.ITALIAN, Culture.SPANISH,
  Culture.PORTUGUESE, Culture.RUSSIAN, Culture.POLISH, Culture.GREEK,
  Culture.SCANDINAVIAN, Culture.DUTCH,
  Culture.CHINESE, Culture.JAPANESE, Culture.KOREAN, Culture.VIETNAMESE,
  Culture.THAI, Culture.FILIPINO,
  Culture.HINDI, Culture.TAMIL, Culture.BENGALI, Culture.PUNJABI,
  Culture.ARABIC, Culture.PERSIAN, Culture.HEBREW, Culture.TURKISH,
  Culture.SWAHILI, Culture.YORUBA, Culture.ZULU, Culture.AMHARIC, Culture.HAUSA,
  Culture.POLYNESIAN, Culture.MAORI, Culture.INDONESIAN,
  Culture.SCIENCE_FICTION
];

// Culture display names
export const CULTURE_NAMES: Record<Culture, string> = {
  [Culture.ENGLISH]: 'English',
  [Culture.AMERICAN]: 'American',
  [Culture.BRITISH]: 'British',
  [Culture.FRENCH]: 'French',
  [Culture.GERMAN]: 'German',
  [Culture.ITALIAN]: 'Italian',
  [Culture.SPANISH]: 'Spanish',
  [Culture.PORTUGUESE]: 'Portuguese',
  [Culture.RUSSIAN]: 'Russian',
  [Culture.POLISH]: 'Polish',
  [Culture.GREEK]: 'Greek',
  [Culture.SCANDINAVIAN]: 'Scandinavian',
  [Culture.DUTCH]: 'Dutch',
  [Culture.CHINESE]: 'Chinese',
  [Culture.JAPANESE]: 'Japanese',
  [Culture.KOREAN]: 'Korean',
  [Culture.VIETNAMESE]: 'Vietnamese',
  [Culture.THAI]: 'Thai',
  [Culture.FILIPINO]: 'Filipino',
  [Culture.HINDI]: 'Hindi',
  [Culture.TAMIL]: 'Tamil',
  [Culture.BENGALI]: 'Bengali',
  [Culture.PUNJABI]: 'Punjabi',
  [Culture.ARABIC]: 'Arabic',
  [Culture.PERSIAN]: 'Persian',
  [Culture.HEBREW]: 'Hebrew',
  [Culture.TURKISH]: 'Turkish',
  [Culture.SWAHILI]: 'Swahili',
  [Culture.YORUBA]: 'Yoruba',
  [Culture.ZULU]: 'Zulu',
  [Culture.AMHARIC]: 'Amharic',
  [Culture.HAUSA]: 'Hausa',
  [Culture.POLYNESIAN]: 'Polynesian',
  [Culture.MAORI]: 'Maori',
  [Culture.INDONESIAN]: 'Indonesian',
  [Culture.SCIENCE_FICTION]: 'Science Fiction',
  [Culture.GENERIC]: 'Generic'
};

// Name database by culture (will be expanded with more cultures)
const NAME_DATABASE: Record<string, { given: string[]; surnames: string[] }> = {
  [Culture.ENGLISH]: englishNameData,
  [Culture.AMERICAN]: englishNameData,
  [Culture.BRITISH]: englishNameData,
  // Fallback to English for now - other cultures will be added
};

// Helper to get random element
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to filter by gender
function filterByGender(names: string[], gender: Gender): string[] {
  if (gender === Gender.ANY) return names;
  
  // Simple heuristic: names ending in 'a', 'e', 'i' often feminine
  // This is a simplification - real implementation would have gendered lists
  const feminineIndicators = ['a', 'e', 'i', 'y', 'ah', 'ia'];
  const masculineIndicators = ['o', 'r', 'n', 's', 'd'];
  
  return names.filter(name => {
    const lower = name.toLowerCase();
    const endsWithFeminine = feminineIndicators.some(ind => lower.endsWith(ind));
    const endsWithMasculine = masculineIndicators.some(ind => lower.endsWith(ind));
    
    if (gender === Gender.FEMALE) {
      return endsWithFeminine || !endsWithMasculine;
    } else {
      return endsWithMasculine || !endsWithFeminine;
    }
  });
}

/**
 * Generate a name with optional drift
 */
export function generateName(options: NameGeneratorOptions = {}): GeneratedName {
  const culture = options.culture || getRandom(AVAILABLE_CULTURES);
  const gender = options.gender || Gender.ANY;
  const includeSurname = options.includeSurname !== false;
  
  const cultureData = NAME_DATABASE[culture] || NAME_DATABASE[Culture.ENGLISH];
  
  // Filter by gender
  const filteredGiven = filterByGender(cultureData.given, gender);
  
  // Select given name
  const given = getRandom(filteredGiven.length > 0 ? filteredGiven : cultureData.given);
  
  // Select surname
  const surname = includeSurname ? getRandom(cultureData.surnames) : '';
  
  const full = includeSurname ? `${given} ${surname}` : given;
  
  return {
    given,
    surname,
    full,
    culture,
    gender
  };
}

/**
 * Generate a name with language drift applied
 */
export function generateDriftedName(
  options: NameGeneratorOptions = {},
  driftConfig?: DriftConfig
): GeneratedName & { driftInfo: { original: string; config: DriftConfig; description: string } } {
  // Generate base name
  const baseName = generateName(options);
  
  // If no drift config provided, generate random one
  const config = driftConfig || generateRandomDrift(AVAILABLE_CULTURES, baseName.culture);
  
  // Apply drift to given name
  const drifted = driftName(baseName.given, baseName.culture, config);
  
  const full = baseName.surname 
    ? `${drifted.given} ${baseName.surname}`
    : drifted.given;
  
  return {
    given: drifted.given,
    surname: baseName.surname,
    full,
    culture: config.targetCulture,
    gender: baseName.gender,
    driftInfo: {
      original: baseName.given,
      config,
      description: `${config.driftValue}% drift toward ${CULTURE_NAMES[config.targetCulture]} over ${config.exposureGenerations} generation(s)`
    }
  };
}

/**
 * Generate multiple names with cultural mixing (parents from different cultures)
 */
export function generateMixedName(
  parent1Culture: Culture,
  parent2Culture: Culture,
  gender: Gender = Gender.ANY
): GeneratedName {
  const data1 = NAME_DATABASE[parent1Culture] || NAME_DATABASE[Culture.ENGLISH];
  const data2 = NAME_DATABASE[parent2Culture] || NAME_DATABASE[Culture.ENGLISH];
  
  // 50/50 chance for given name culture
  const givenData = Math.random() < 0.5 ? data1 : data2;
  const filteredGiven = filterByGender(givenData.given, gender);
  const given = getRandom(filteredGiven.length > 0 ? filteredGiven : givenData.given);
  
  // 50/50 chance for surname culture
  const surnameData = Math.random() < 0.5 ? data1 : data2;
  const surname = getRandom(surnameData.surnames);
  
  return {
    given,
    surname,
    full: `${given} ${surname}`,
    culture: Math.random() < 0.5 ? parent1Culture : parent2Culture,
    gender
  };
}

/**
 * Get available cultures
 */
export function getAvailableCultures(): Culture[] {
  return [...AVAILABLE_CULTURES];
}

/**
 * Get culture display name
 */
export function getCultureName(culture: Culture): string {
  return CULTURE_NAMES[culture] || culture;
}

// Default export
export default {
  generateName,
  generateDriftedName,
  generateMixedName,
  getAvailableCultures,
  getCultureName,
  AVAILABLE_CULTURES,
  CULTURE_NAMES,
  Culture,
  Gender
};
