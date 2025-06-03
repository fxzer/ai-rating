// 类型已移动到src/types/index.ts
// 模型数据已移动到src/store/modelsSlice.ts
// 此文件仅为向后兼容保留

import { initialModels } from '../store/modelsSlice';
import type { AIModelConfig } from '../types';

// 导出初始模型数据，保证向后兼容性
export const AI_MODELS: Array<AIModelConfig> = initialModels; 
