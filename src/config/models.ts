import type { AIModelConfig } from '../types';

export const AI_MODELS: Array<AIModelConfig> = [
  {
    modelKey: 'gemini',
    name: 'Gemini 2.5 Pro',
    icon: 'fas fa-magic',
    bgColorClass: 'from-bento-purple to-purple-100',
    iconColorClass: 'text-purple-600',
    provider: 'Google AI'
  },
  {
    modelKey: 'claude',
    name: 'Claude 4 Opus',
    icon: 'fas fa-brain',
    bgColorClass: 'from-bento-blue to-blue-100',
    iconColorClass: 'text-blue-600',
    provider: 'Anthropic'
  },
  {
    modelKey: 'chatgpt',
    name: 'ChatGPT o3',
    icon: 'fas fa-comments',
    bgColorClass: 'from-bento-green to-green-100',
    iconColorClass: 'text-green-600',
    provider: 'OpenAI'
  },
  {
    modelKey: 'grok',
    name: 'Grok 3',
    icon: 'fas fa-bolt',
    bgColorClass: 'from-bento-yellow to-yellow-100',
    iconColorClass: 'text-yellow-600',
    provider: 'xAI'
  }
]; 
