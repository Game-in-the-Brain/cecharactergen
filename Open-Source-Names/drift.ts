/**
 * Language Drift Engine
 * Simulates how names evolve across cultural boundaries
 */

import { Culture, Gender, GeneratedName, NameGeneratorOptions } from './types';
import { PHONOLOGY, SOUND_SIMILARITY, calculatePhonologicalDistance } from './phonology';

export interface DriftConfig {
  // Base drift value (0-100): how much the name has diverged
  driftValue: number;
  
  // Which culture the name is drifting toward
  targetCulture: Culture;
  
  // Number of "exposure events" (generations of drift)
  exposureGenerations: number;
  
  // Randomness factor (0-1): higher = more unpredictable drift
  chaosFactor: number;
}

export interface DriftedName extends GeneratedName {
  originalName: string;
  driftConfig: DriftConfig;
  driftHistory: string[]; // Track transformations
  phonologicalDistance: number; // Distance from original culture to target
}

// Vowel and consonant detection
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'ü', 'å', 'æ', 'ø']);

function isVowel(char: string): boolean {
  return VOWELS.has(char.toLowerCase());
}

function isConsonant(char: string): boolean {
  return !isVowel(char) && /[a-zäöüåæø]/i.test(char);
}

// Get syllable boundaries
function getSyllables(name: string): string[] {
  const syllables: string[] = [];
  let current = '';
  
  for (let i = 0; i < name.length; i++) {
    current += name[i];
    
    // Simple syllable detection: vowel + following consonant(s) or end
    if (isVowel(name[i]) && i < name.length - 1) {
      // Look ahead for consonant cluster
      let j = i + 1;
      while (j < name.length && isConsonant(name[j]) && j - i <= 2) {
        current += name[j];
        j++;
      }
      
      // Check if we should split here
      if (j < name.length && isVowel(name[j])) {
        syllables.push(current);
        current = '';
        i = j - 1;
      }
    }
  }
  
  if (current) {
    syllables.push(current);
  }
  
  return syllables.length > 0 ? syllables : [name];
}

// Apply sound substitution based on target culture
function applySubstitution(
  name: string, 
  targetPhonology: typeof PHONOLOGY['english'],
  intensity: number
): string {
  let result = name.toLowerCase();
  
  // Sort substitutions by length (longest first) to avoid partial replacements
  const subs = Array.from(targetPhonology.substitutions.entries())
    .sort((a, b) => b[0].length - a[0].length);
  
  for (const [original, replacements] of subs) {
    if (result.includes(original)) {
      // Probability of substitution based on drift intensity
      if (Math.random() < intensity) {
        const replacement = replacements[Math.floor(Math.random() * replacements.length)];
        result = result.replace(new RegExp(original, 'g'), replacement);
      }
    }
  }
  
  return result;
}

// Apply vowel shift toward target culture preferences
function applyVowelShift(
  name: string,
  targetPhonology: typeof PHONOLOGY['english'],
  intensity: number
): string {
  let result = '';
  
  for (let i = 0; i < name.length; i++) {
    const char = name[i].toLowerCase();
    
    if (isVowel(char)) {
      // Chance to shift vowel
      if (Math.random() < intensity * 0.5) {
        // Prefer strong vowels from target culture
        if (targetPhonology.strongVowels.length > 0 && Math.random() < 0.7) {
          result += targetPhonology.strongVowels[
            Math.floor(Math.random() * targetPhonology.strongVowels.length)
          ];
        } else if (targetPhonology.weakVowels.length > 0) {
          result += targetPhonology.weakVowels[
            Math.floor(Math.random() * targetPhonology.weakVowels.length)
          ];
        } else {
          result += char;
        }
      } else {
        result += char;
      }
    } else {
      result += char;
    }
  }
  
  return result;
}

// Apply consonant shifts
function applyConsonantShift(
  name: string,
  targetPhonology: typeof PHONOLOGY['english'],
  intensity: number
): string {
  let result = '';
  
  for (let i = 0; i < name.length; i++) {
    const char = name[i].toLowerCase();
    
    if (isConsonant(char)) {
      // Chance to shift consonant
      if (Math.random() < intensity * 0.4) {
        // Check if there's a similar sound we can substitute
        const similar = SOUND_SIMILARITY.get(char);
        if (similar && Math.random() < 0.5) {
          // Use similar sound
          result += similar[Math.floor(Math.random() * similar.length)];
        } else if (targetPhonology.strongConsonants.length > 0) {
          // Use target culture's strong consonant
          result += targetPhonology.strongConsonants[
            Math.floor(Math.random() * targetPhonology.strongConsonants.length)
          ];
        } else {
          result += char;
        }
      } else {
        result += char;
      }
    } else {
      result += char;
    }
  }
  
  return result;
}

// Apply ending transformation
function applyEndingShift(
  name: string,
  targetPhonology: typeof PHONOLOGY['english'],
  intensity: number
): string {
  if (targetPhonology.commonEndings.length === 0 || Math.random() > intensity * 0.3) {
    return name;
  }
  
  // Remove common endings from original
  let result = name;
  const commonEndings = ['son', 'ton', 'berg', 'stein', 'ford', 'ham', 'ov', 'ski', 'ko'];
  for (const ending of commonEndings) {
    if (result.toLowerCase().endsWith(ending)) {
      result = result.slice(0, -ending.length);
      break;
    }
  }
  
  // Add target culture ending
  const newEnding = targetPhonology.commonEndings[
    Math.floor(Math.random() * targetPhonology.commonEndings.length)
  ];
  
  return result + newEnding;
}

// Apply syllable structure changes
function applySyllableShift(
  name: string,
  targetPhonology: typeof PHONOLOGY['english'],
  intensity: number
): string {
  if (Math.random() > intensity * 0.2) {
    return name;
  }
  
  const syllables = getSyllables(name);
  if (syllables.length < 2) return name;
  
  // Occasionally drop a syllable in high drift
  if (intensity > 0.6 && Math.random() < 0.3 && syllables.length > 2) {
    const dropIndex = Math.floor(Math.random() * (syllables.length - 1)) + 1;
    syllables.splice(dropIndex, 1);
  }
  
  // Occasionally merge syllables
  if (intensity > 0.5 && Math.random() < 0.2 && syllables.length > 1) {
    const mergeIndex = Math.floor(Math.random() * (syllables.length - 1));
    syllables[mergeIndex] = syllables[mergeIndex] + syllables[mergeIndex + 1];
    syllables.splice(mergeIndex + 1, 1);
  }
  
  return syllables.join('');
}

// Main drift function
export function driftName(
  originalName: string,
  sourceCulture: Culture,
  config: DriftConfig
): DriftedName {
  const targetPhonology = PHONOLOGY[config.targetCulture] || PHONOLOGY.generic;
  const sourcePhonology = PHONOLOGY[sourceCulture] || PHONOLOGY.generic;
  
  const intensity = config.driftValue / 100;
  const phonologicalDistance = calculatePhonologicalDistance(
    sourceCulture,
    config.targetCulture
  );
  
  const driftHistory: string[] = [originalName];
  let currentName = originalName;
  
  // Apply drift across generations
  for (let gen = 0; gen < config.exposureGenerations; gen++) {
    const genIntensity = intensity * ((gen + 1) / config.exposureGenerations);
    
    // Apply transformations in order
    currentName = applySubstitution(currentName, targetPhonology, genIntensity);
    currentName = applyVowelShift(currentName, targetPhonology, genIntensity);
    currentName = applyConsonantShift(currentName, targetPhonology, genIntensity);
    currentName = applyEndingShift(currentName, targetPhonology, genIntensity);
    currentName = applySyllableShift(currentName, targetPhonology, genIntensity);
    
    // Add chaos/randomness
    if (config.chaosFactor > 0 && Math.random() < config.chaosFactor * 0.1) {
      // Random character mutation
      const pos = Math.floor(Math.random() * currentName.length);
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      const randomChar = chars[Math.floor(Math.random() * chars.length)];
      currentName = currentName.slice(0, pos) + randomChar + currentName.slice(pos + 1);
    }
    
    driftHistory.push(currentName);
  }
  
  // Capitalize properly
  currentName = currentName.charAt(0).toUpperCase() + currentName.slice(1).toLowerCase();
  
  return {
    given: currentName,
    surname: '', // Will be set by caller if needed
    full: currentName,
    culture: config.targetCulture,
    gender: Gender.ANY,
    originalName: originalName,
    driftConfig: config,
    driftHistory: driftHistory,
    phonologicalDistance: phonologicalDistance
  };
}

// Generate a random drift configuration
export function generateRandomDrift(
  availableCultures: Culture[],
  excludeCulture?: Culture
): DriftConfig {
  const targetCultures = excludeCulture 
    ? availableCultures.filter(c => c !== excludeCulture)
    : availableCultures;
  
  const targetCulture = targetCultures[Math.floor(Math.random() * targetCultures.length)];
  
  return {
    driftValue: Math.floor(Math.random() * 100),
    targetCulture: targetCulture,
    exposureGenerations: Math.floor(Math.random() * 5) + 1,
    chaosFactor: Math.random() * 0.5 + 0.1 // 0.1 - 0.6
  };
}

// Describe the drift in natural language
export function describeDrift(driftedName: DriftedName): string {
  const { driftConfig, phonologicalDistance } = driftedName;
  const intensity = driftConfig.driftValue < 30 ? 'slight' : 
                    driftConfig.driftValue < 60 ? 'moderate' : 
                    driftConfig.driftValue < 85 ? 'significant' : 'extreme';
  
  const distance = phonologicalDistance < 0.3 ? 'closely related' :
                   phonologicalDistance < 0.6 ? 'distantly related' : 'unrelated';
  
  return `${intensity} drift toward ${driftConfig.targetCulture} ` +
         `(${distance} phonology) over ${driftConfig.exposureGenerations} generation(s)`;
}
