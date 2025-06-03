import type { AIModelConfig } from '../types';

// 初始模型数据
export const initialModels: Array<AIModelConfig> = [
  {
    id: '1',
    modelKey: 'gemini',
    name: 'Gemini 2.5 Pro',
    icon: 'fas fa-magic',
    bgColorClass: 'from-bento-purple to-purple-100',
    iconColorClass: 'text-purple-600',
    provider: 'Google AI'
  },
  {
    id: '2',
    modelKey: 'claude',
    name: 'Claude 4 Opus',
    icon: 'fas fa-brain',
    bgColorClass: 'from-bento-blue to-blue-100',
    iconColorClass: 'text-blue-600',
    provider: 'Anthropic'
  },
  {
    id: '3',
    modelKey: 'chatgpt',
    name: 'ChatGPT o3',
    icon: 'fas fa-comments',
    bgColorClass: 'from-bento-green to-green-100',
    iconColorClass: 'text-green-600',
    provider: 'OpenAI'
  },
  {
    id: '4',
    modelKey: 'grok',
    name: 'Grok 3',
    icon: 'fas fa-bolt',
    bgColorClass: 'from-bento-yellow to-yellow-100',
    iconColorClass: 'text-yellow-600',
    provider: 'xAI'
  }
];

// 背景颜色和图标颜色的预设
export const colorPresets = [
  {
    bgColorClass: 'from-bento-purple to-purple-100',
    iconColorClass: 'text-purple-600'
  },
  {
    bgColorClass: 'from-bento-blue to-blue-100',
    iconColorClass: 'text-blue-600'
  },
  {
    bgColorClass: 'from-bento-green to-green-100',
    iconColorClass: 'text-green-600'
  },
  {
    bgColorClass: 'from-bento-yellow to-yellow-100',
    iconColorClass: 'text-yellow-600'
  },
  {
    bgColorClass: 'from-bento-orange to-orange-100',
    iconColorClass: 'text-orange-600'
  },
  {
    bgColorClass: 'from-bento-pink to-pink-100',
    iconColorClass: 'text-pink-600'
  },
  {
    bgColorClass: 'from-red-100 to-red-200',
    iconColorClass: 'text-red-600'
  }
];

// 模型相关操作
export interface ModelsSlice {
  models: Array<AIModelConfig>;
  addModel: (model: Omit<AIModelConfig, 'id'>) => void;
  updateModel: (id: string, updates: Partial<AIModelConfig>) => void;
  deleteModel: (id: string) => void;
  reorderModels: (activeId: string, overId: string) => void;
}

export const createModelsSlice = (set: any, get: any): ModelsSlice => ({
  models: initialModels,
  
  // 添加新模型
  addModel: (model) => set((state: { models: Array<AIModelConfig>; scores: Record<string, Array<number | null>> }) => {
    const newModel = { ...model, id: Date.now().toString() };
    const newModels = [...state.models, newModel];
    
    // 为新模型在scores中创建空评分
    const newScores = { ...state.scores };
    newScores[newModel.modelKey] = Array(get().tests.length).fill(null);
    
    return { 
      models: newModels,
      scores: newScores
    };
  }),
  
  // 更新现有模型
  updateModel: (id, updates) => set((state: { models: Array<AIModelConfig>; scores: Record<string, Array<number | null>> }) => {
    const modelIndex = state.models.findIndex(model => model.id === id);
    if (modelIndex === -1) return state;
    
    const oldModel = state.models[modelIndex];
    const newModels = [...state.models];
    newModels[modelIndex] = { ...oldModel, ...updates };
    
    // 如果modelKey发生变化，需要更新scores中的键
    const newScores = { ...state.scores };
    if (updates.modelKey && oldModel.modelKey !== updates.modelKey) {
      newScores[updates.modelKey] = newScores[oldModel.modelKey];
      delete newScores[oldModel.modelKey];
    }
    
    return {
      models: newModels,
      scores: newScores
    };
  }),
  
  // 删除模型
  deleteModel: (id) => set((state: { models: Array<AIModelConfig>; scores: Record<string, Array<number | null>> }) => {
    const modelIndex = state.models.findIndex(model => model.id === id);
    if (modelIndex === -1) return state;
    
    const modelKey = state.models[modelIndex].modelKey;
    const newModels = state.models.filter(model => model.id !== id);
    
    // 从scores中删除对应模型的评分
    const newScores = { ...state.scores };
    delete newScores[modelKey];
    
    return {
      models: newModels,
      scores: newScores
    };
  }),
  
  // 重新排序模型
  reorderModels: (activeId, overId) => set((state: { models: Array<AIModelConfig> }) => {
    const oldIndex = state.models.findIndex(model => model.id === activeId);
    const newIndex = state.models.findIndex(model => model.id === overId);
    
    if (oldIndex === -1 || newIndex === -1) return state;
    
    const newModels = [...state.models];
    const [movedModel] = newModels.splice(oldIndex, 1);
    newModels.splice(newIndex, 0, movedModel);
    
    return { models: newModels };
  })
}); 
