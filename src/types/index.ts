export interface Test {
  id: string;
  icon: string;
  title: string;
  prompt: string;
  category?: string;
  difficulty?: string;
  evaluationCriteria?: string;
}

export interface ModelScore {
  [key: string]: Array<number | null>;
}

export type ModelKey = string;

export interface AIModelConfig {
  id: string;
  modelKey: ModelKey;
  name: string;
  icon: string;
  bgColorClass: string;
  iconColorClass: string;
  provider: string;
}

export interface EditModeState {
  isEditing: boolean;
  title: string;
  prompt: string;
  icon: string;
}

export interface EditModelModeState {
  isEditing: boolean;
  name: string;
  modelKey: string;
  icon: string;
  provider: string;
  bgColorClass: string;
  iconColorClass: string;
} 
