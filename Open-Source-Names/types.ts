export enum Culture {
  // Western
  ENGLISH = 'english',
  AMERICAN = 'american',
  BRITISH = 'british',
  
  // European
  FRENCH = 'french',
  GERMAN = 'german',
  ITALIAN = 'italian',
  SPANISH = 'spanish',
  PORTUGUESE = 'portuguese',
  RUSSIAN = 'russian',
  POLISH = 'polish',
  GREEK = 'greek',
  SCANDINAVIAN = 'scandinavian',
  DUTCH = 'dutch',
  
  // Asian
  CHINESE = 'chinese',
  JAPANESE = 'japanese',
  KOREAN = 'korean',
  VIETNAMESE = 'vietnamese',
  THAI = 'thai',
  FILIPINO = 'filipino',
  
  // South Asian
  HINDI = 'hindi',
  TAMIL = 'tamil',
  BENGALI = 'bengali',
  PUNJABI = 'punjabi',
  
  // Middle Eastern
  ARABIC = 'arabic',
  PERSIAN = 'persian',
  HEBREW = 'hebrew',
  TURKISH = 'turkish',
  
  // African
  SWAHILI = 'swahili',
  YORUBA = 'yoruba',
  ZULU = 'zulu',
  AMHARIC = 'amharic',
  HAUSA = 'hausa',
  
  // Pacific
  POLYNESIAN = 'polynesian',
  MAORI = 'maori',
  INDONESIAN = 'indonesian',
  
  // Sci-Fi (for CE setting)
  SCIENCE_FICTION = 'science-fiction',
  GENERIC = 'generic'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any'
}

export interface NameData {
  given: string[];
  surnames: string[];
  // Some cultures use patronymics or different naming conventions
  usePatronymic?: boolean;
  // Some cultures put surname first
  surnameFirst?: boolean;
  // Name prefixes/titles (optional)
  prefixes?: {
    male?: string[];
    female?: string[];
  };
}

export interface NameGeneratorOptions {
  culture?: Culture;
  gender?: Gender;
  includeSurname?: boolean;
}

export interface GeneratedName {
  given: string;
  surname: string;
  full: string;
  culture: Culture;
  gender: Gender;
}
