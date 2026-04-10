# Open Source Names

A culturally diverse name generator using open source and public domain data sources for the Cepheus Engine Character Generator.

## Data Sources

Names are compiled from:
- **US Census Bureau** - Public domain surname data (1990 & 2010 censuses)
- **UK Office for National Statistics** - Baby name statistics (Open Government License)
- **Wikimedia Commons** - Public domain name lists
- **SSA (Social Security Administration)** - US baby name data (public domain)
- **Various government open data portals** - Cultural name datasets

## Structure

```
Open-Source-Names/
├── README.md
├── index.ts              # Main name generator export
├── types.ts              # TypeScript interfaces
├── data/
│   ├── english.ts        # English/Western names
│   ├── asian.ts          # Chinese, Japanese, Korean, Vietnamese
│   ├── european.ts       # French, German, Italian, Spanish, Nordic, Slavic
│   ├── middle-eastern.ts # Arabic, Persian, Hebrew, Turkish
│   ├── african.ts        # Swahili, Yoruba, Zulu, Amharic
│   ├── south-asian.ts    # Hindi, Tamil, Bengali, Punjabi
│   ├── pacific.ts        # Polynesian, Maori, Filipino
│   └── science-fiction.ts # Sci-fi themed names for CE setting
└── utils/
    └── name-combiner.ts  # Logic for combining names
```

## Usage

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

## License

All name data is sourced from public domain or open licensed datasets.
