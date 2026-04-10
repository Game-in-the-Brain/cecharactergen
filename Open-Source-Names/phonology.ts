/**
 * Phonological rules for language drift
 * Each culture has sound preferences, substitutions, and syllable patterns
 */

export interface PhonemeSet {
  // Vowels and consonants this culture prefers
  strongVowels: string[];
  weakVowels: string[];
  strongConsonants: string[];
  weakConsonants: string[];
  
  // Sound substitutions - what sounds tend to become
  substitutions: Map<string, string[]>;
  
  // Syllable structure preferences (CV = consonant-vowel, CVC, etc.)
  preferredSyllableStructures: string[];
  
  // Stress patterns (0 = first syllable, 1 = second, etc. or -1 for variable)
  stressPattern: number;
  
  // Characteristic endings
  commonEndings: string[];
  
  // Sound clusters this culture avoids
  avoidedClusters: string[];
  
  // Sound clusters this culture favors
  favoredClusters: string[];
}

// International Phonetic Alphabet-inspired sound mappings
export const PHONOLOGY: Record<string, PhonemeSet> = {
  english: {
    strongVowels: ['e', 'i', 'a', 'o'],
    weakVowels: ['u', 'y'],
    strongConsonants: ['r', 't', 'n', 's', 'l', 'd'],
    weakConsonants: ['q', 'x', 'z'],
    substitutions: new Map([
      ['k', ['c', 'ck']],
      ['c', ['k', 's']],
      ['ph', ['f']],
      ['gh', ['', 'f']],
      ['x', ['ks', 'z']],
      ['q', ['qu', 'k', 'kw']],
    ]),
    preferredSyllableStructures: ['CV', 'CVC', 'CCV', 'CVCC'],
    stressPattern: 0, // Usually first syllable
    commonEndings: ['son', 'ton', 'ford', 'ham', 'ley', 'wood', 'field'],
    avoidedClusters: ['kh', 'gh', 'bh'],
    favoredClusters: ['st', 'tr', 'nd', 'ld', 'rn'],
  },
  
  japanese: {
    strongVowels: ['a', 'i', 'u', 'e', 'o'],
    weakVowels: [],
    strongConsonants: ['k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'],
    weakConsonants: ['g', 'z', 'd', 'b', 'p'],
    substitutions: new Map([
      ['l', ['r']],
      ['v', ['b']],
      ['f', ['h', 'fu']],
      ['th', ['s', 'z']],
      ['r', ['ru', 'ra', 'ri']],
      ['c', ['ku', 'ka', 'ke']],
    ]),
    preferredSyllableStructures: ['CV', 'V', 'CVn', 'CVN'],
    stressPattern: -1, // Pitch accent, variable
    commonEndings: ['ko', 'ro', 'shi', 'to', 'ya', 'ka', 'na'],
    avoidedClusters: ['str', 'spl', 'scr', 'l', 'v'],
    favoredClusters: ['sh', 'ch', 'ts'],
  },
  
  chinese: {
    strongVowels: ['a', 'o', 'i', 'e'],
    weakVowels: ['u', 'ü'],
    strongConsonants: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h'],
    weakConsonants: ['r', 'v', 'z'],
    substitutions: new Map([
      ['r', ['l', '']],
      ['v', ['w']],
      ['th', ['t', 'd']],
      ['j', ['zh', 'z']],
      ['sh', ['x', 's']],
      ['f', ['h', 'fu']],
    ]),
    preferredSyllableStructures: ['CV', 'CVC', 'CVn', 'CVng'],
    stressPattern: 0,
    commonEndings: ['wei', 'ming', 'hong', 'fang', 'lan', 'ping', 'tao'],
    avoidedClusters: ['st', 'sp', 'sk', 'r'],
    favoredClusters: ['zh', 'ch', 'sh', 'ng'],
  },
  
  arabic: {
    strongVowels: ['a', 'i', 'u'],
    weakVowels: ['e', 'o'],
    strongConsonants: ['b', 't', 'th', 'j', 'h', 'kh', 'd', 'dh', 'r', 'z', 's', 'sh'],
    weakConsonants: ['p', 'g', 'v'],
    substitutions: new Map([
      ['p', ['b']],
      ['g', ['gh', 'j']],
      ['v', ['f', 'w']],
      ['ee', ['i', 'iy']],
      ['oo', ['u', 'uw']],
      ['ch', ['sh', 'j']],
    ]),
    preferredSyllableStructures: ['CVC', 'CV', 'CVCC', 'CCVC'],
    stressPattern: -1,
    commonEndings: ['ad', 'id', 'ir', 'an', 'in', 'ar', 'ur'],
    avoidedClusters: ['ps', 'ks', 'gz'],
    favoredClusters: ['kh', 'gh', 'sh', 'th', 'dh'],
  },
  
  german: {
    strongVowels: ['a', 'e', 'i', 'o', 'u'],
    weakVowels: ['y'],
    strongConsonants: ['b', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'],
    weakConsonants: ['c', 'q', 'x'],
    substitutions: new Map([
      ['c', ['k', 'z']],
      ['q', ['k', 'kw']],
      ['x', ['ks']],
      ['th', ['t', 'd']],
      ['w', ['v']],
      ['j', ['y', 'i']],
    ]),
    preferredSyllableStructures: ['CVC', 'CVCC', 'CCVC', 'CCVCC'],
    stressPattern: 0,
    commonEndings: ['berg', 'stein', 'bach', 'mann', 'hardt', 'wald', 'feld'],
    avoidedClusters: ['kn', 'gn', 'ps', 'pt'],
    favoredClusters: ['sch', 'ch', 'ck', 'st', 'sp'],
  },
  
  russian: {
    strongVowels: ['a', 'o', 'e', 'i', 'u', 'y'],
    weakVowels: [],
    strongConsonants: ['b', 'v', 'g', 'd', 'zh', 'z', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'f', 'kh'],
    weakConsonants: ['h', 'w', 'th'],
    substitutions: new Map([
      ['h', ['kh', 'g']],
      ['w', ['v']],
      ['th', ['t', 'f']],
      ['j', ['y', 'zh']],
      ['c', ['k', 'ts']],
      ['sh', ['shch', 's']],
    ]),
    preferredSyllableStructures: ['CVC', 'CV', 'CCVC', 'CVCV'],
    stressPattern: -1, // Variable stress
    commonEndings: ['ov', 'ev', 'sky', 'ski', 'in', 'an', 'uk', 'ko'],
    avoidedClusters: ['th', 'shp', 'sht'],
    favoredClusters: ['shch', 'zh', 'ts', 'kh', 'stv', 'sk'],
  },
  
  // Sci-fi cultures
  scienceFiction: {
    strongVowels: ['a', 'e', 'i', 'o', 'u', 'ae', 'ei', 'ou'],
    weakVowels: ['y', 'x'],
    strongConsonants: ['k', 't', 'r', 'n', 's', 'x', 'z', 'v', 'th', 'ph'],
    weakConsonants: ['b', 'd', 'g', 'p'],
    substitutions: new Map([
      ['c', ['k', 'x', 's']],
      ['ph', ['f', 'v']],
      ['th', ['t', 'd', 'z']],
      ['j', ['zh', 'y']],
      ['q', ['k', 'kw', 'x']],
      ['w', ['v', 'u']],
    ]),
    preferredSyllableStructures: ['CV', 'CVC', 'CCV', 'VCC', 'CVCC'],
    stressPattern: 0,
    commonEndings: ['ax', 'on', 'ar', 'is', 'ex', 'or', 'an', 'us', 'ix'],
    avoidedClusters: ['ng', 'mb', 'nd'],
    favoredClusters: ['kr', 'tr', 'xr', 'th', 'ph', 'sk', 'nx'],
  },
  
  // Generic fallback
  generic: {
    strongVowels: ['a', 'e', 'i', 'o', 'u'],
    weakVowels: ['y'],
    strongConsonants: ['r', 't', 'n', 's', 'l', 'd'],
    weakConsonants: ['q', 'x', 'z'],
    substitutions: new Map([
      ['ph', ['f']],
      ['gh', ['g', '']],
      ['x', ['ks', 'z']],
    ]),
    preferredSyllableStructures: ['CV', 'CVC'],
    stressPattern: 0,
    commonEndings: ['an', 'on', 'in', 'er', 'or'],
    avoidedClusters: ['xx', 'qq'],
    favoredClusters: ['st', 'tr', 'nd'],
  }
};

// Sound similarity matrix - how likely sounds are to influence each other
export const SOUND_SIMILARITY: Map<string, string[]> = new Map([
  ['b', ['p', 'v', 'f']],
  ['p', ['b', 'f', 'ph']],
  ['d', ['t', 'th', 'dh']],
  ['t', ['d', 'th', 'tt']],
  ['g', ['k', 'gh', 'kh']],
  ['k', ['g', 'c', 'q', 'ck', 'kh']],
  ['v', ['f', 'w', 'ph']],
  ['f', ['v', 'ph', 'h']],
  ['s', ['z', 'sh', 'c', 'ss']],
  ['z', ['s', 'sh', 'zh']],
  ['sh', ['s', 'zh', 'ch']],
  ['ch', ['sh', 'tch', 'ts']],
  ['l', ['r', 'll']],
  ['r', ['l', 'rr']],
  ['m', ['n', 'mm']],
  ['n', ['m', 'nn', 'ng']],
  ['th', ['t', 'd', 'f']],
  ['w', ['v', 'u', 'wh']],
]);

// Calculate phonological distance between two cultures
export function calculatePhonologicalDistance(culture1: string, culture2: string): number {
  const p1 = PHONOLOGY[culture1] || PHONOLOGY.generic;
  const p2 = PHONOLOGY[culture2] || PHONOLOGY.generic;
  
  let distance = 0;
  
  // Compare vowel preferences
  const vowelOverlap = p1.strongVowels.filter(v => p2.strongVowels.includes(v)).length;
  distance += (Math.max(p1.strongVowels.length, p2.strongVowels.length) - vowelOverlap) * 2;
  
  // Compare consonant preferences  
  const consonantOverlap = p1.strongConsonants.filter(c => p2.strongConsonants.includes(c)).length;
  distance += (Math.max(p1.strongConsonants.length, p2.strongConsonants.length) - consonantOverlap);
  
  // Compare syllable structure preferences
  const structureOverlap = p1.preferredSyllableStructures.filter(s => 
    p2.preferredSyllableStructures.includes(s)
  ).length;
  distance += (Math.max(p1.preferredSyllableStructures.length, p2.preferredSyllableStructures.length) - structureOverlap);
  
  return Math.min(distance / 10, 1); // Normalize to 0-1
}
