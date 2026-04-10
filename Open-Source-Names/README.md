# Open Source Names

A culturally diverse name generator using open source and public domain data sources for the Cepheus Engine Character Generator. Features sophisticated **language drift** simulation — names evolve across cultures based on phonological rules.

## Data Sources

Names are compiled from:
- **US Census Bureau** - Public domain surname data (1990 & 2010 censuses)
- **UK Office for National Statistics** - Baby name statistics (Open Government License)
- **Wikimedia Commons** - Public domain name lists
- **SSA (Social Security Administration)** - US baby name data (public domain)
- **Various government open data portals** - Cultural name datasets

## Language Drift System

The language drift system simulates how names evolve when exposed to different cultures over time — perfect for a sci-fi setting where populations migrate and mix across worlds.

### Drift Concepts

- **Drift Value** (0-100): How much the name has diverged from its original form
- **Target Culture**: The culture the name is drifting toward
- **Exposure Generations**: Number of generations of cultural exposure
- **Chaos Factor** (0-1): Randomness in drift — higher = more unpredictable
- **Phonological Distance**: How different the source and target cultures' sound systems are

### Phonological Rules

Each culture has:
- **Strong sounds**: Vowels and consonants preferred by the culture
- **Weak sounds**: Sounds that tend to be replaced
- **Substitutions**: Sound mappings (e.g., English "ph" → "f")
- **Syllable structures**: Preferred patterns (CV, CVC, etc.)
- **Common endings**: Characteristic name endings

## Usage

### Basic Name Generation

```typescript
import { generateName, Culture, Gender } from './Open-Source-Names';

// Generate a random name
const name = generateName();

// Generate with specific culture
const japaneseName = generateName({ culture: Culture.JAPANESE });

// Generate with culture and gender
const femaleArabicName = generateName({ 
  culture: Culture.ARABIC, 
  gender: Gender.FEMALE 
});
```

### Language Drift

```typescript
import { generateDriftedName, Culture, driftName } from './Open-Source-Names';

// Generate a name with random drift
const driftedName = generateDriftedName({ culture: Culture.ENGLISH });
console.log(driftedName.full); // "Jameston"
console.log(driftedName.driftInfo.description); 
// "65% drift toward Japanese over 3 generation(s)"

// Manual drift with specific configuration
import { DriftConfig, driftName, describeDrift } from './Open-Source-Names';

const config: DriftConfig = {
  driftValue: 75,              // Heavy drift
  targetCulture: Culture.ARABIC,
  exposureGenerations: 4,      // 4 generations
  chaosFactor: 0.3             // Moderate randomness
};

const drifted = driftName("Christopher", Culture.ENGLISH, config);
console.log(describeDrift(drifted));
// "significant drift toward arabic (distantly related phonology) over 4 generation(s)"
console.log(drifted.driftHistory); 
// ["Christopher", "Kristofar", "Qristafar", "Qristafad", "Qristafad"]
```

### Mixed-Culture Names

```typescript
import { generateMixedName, Culture } from './Open-Source-Names';

// Child of Japanese and German parents
const mixedName = generateMixedName(Culture.JAPANESE, Culture.GERMAN, Gender.MALE);
```

## Structure

```
Open-Source-Names/
├── README.md              # This file
├── index.ts               # Main exports and generators
├── types.ts               # TypeScript interfaces
├── phonology.ts           # Phonological rules per culture
├── drift.ts               # Language drift engine
├── data/
│   └── english.ts         # English/Western names (expandable)
│   └── [more cultures]    # Additional culture data files
└── utils/                 # Utility functions
```

## Supported Cultures

### Western
- English, American, British

### European
- French, German, Italian, Spanish, Portuguese, Russian, Polish, Greek, Scandinavian, Dutch

### Asian
- Chinese, Japanese, Korean, Vietnamese, Thai, Filipino

### South Asian
- Hindi, Tamil, Bengali, Punjabi

### Middle Eastern
- Arabic, Persian, Hebrew, Turkish

### African
- Swahili, Yoruba, Zulu, Amharic, Hausa

### Pacific
- Polynesian, Maori, Indonesian

### Sci-Fi
- Science Fiction (generic sci-fi sounds)

## Drift Examples

| Original | Culture | Drift Target | Drift Value | Result | Explanation |
|----------|---------|--------------|-------------|--------|-------------|
| Christopher | English | Japanese | 60% | Kristōfā | 'Ch'→'K', 'r' softened, ending → Japanese '-ō' |
| Maria | Italian | Arabic | 45% | Mariam | 'a' → 'am' ending characteristic of Arabic |
| Kenji | Japanese | English | 50% | Kenj | 'ji' → 'j', syllable reduction |
| Fatima | Arabic | Russian | 70% | Fátima | Stress shift, 't' → hard 't' |
| Wolfgang | German | Chinese | 55% | Wòlfāng | 'o' → 'ò', 'g' → 'ng' ending |

## Phonological Distance

Cultures with similar sound systems have lower drift:
- English ↔ German: Low distance (Germanic roots)
- English ↔ Japanese: High distance (very different phonology)
- Arabic ↔ Persian: Low distance (Semitic influences)

Higher phonological distance = more dramatic drift at same drift value.

## License

All name data is sourced from public domain or open licensed datasets.

The language drift system is original work for the Cepheus Engine Character Generator.
