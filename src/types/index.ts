export interface Test {
  id: string;
  icon: string;
  title: string;
  prompt: string;
}

export interface ModelScore {
  gemini: Array<number | null>;
  claude: Array<number | null>;
  chatgpt: Array<number | null>;
  grok: Array<number | null>;
}

export type ModelKey = keyof ModelScore;

export interface AIModelConfig {
  modelKey: ModelKey;
  name: string;
  icon: string;
  bgColorClass: string;
  iconColorClass: string;
  provider: string;
} 
