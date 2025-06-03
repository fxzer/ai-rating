import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createScoresSlice } from './scoresSlice';
import { createTestsSlice } from './testsSlice';
import { createModelsSlice } from './modelsSlice';
import type { ScoresSlice } from './scoresSlice';
import type { TestsSlice } from './testsSlice';
import type { ModelsSlice } from './modelsSlice';

// UI状态切片
export interface UISlice {
  showResultsModal: boolean;
  setShowResultsModal: (show: boolean) => void;
}

// 创建UI状态切片
const createUISlice = (set: any) => ({
  showResultsModal: false,
  setShowResultsModal: (show: boolean) => set({ showResultsModal: show }),
});

// 导出类型，保持向后兼容
export type { ModelScore, Test, AIModelConfig } from '../types';

// 应用状态类型，使用交叉类型而不是继承
type AppState = TestsSlice & ScoresSlice & ModelsSlice & UISlice;

// 创建存储，合并各个切片
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...createTestsSlice(set, get),
      ...createScoresSlice(set, get),
      ...createModelsSlice(set, get),
      ...createUISlice(set),
    }),
    {
      name: 'ai-rating-storage',
      // 只持久化部分状态，避免序列化太多数据
      partialize: (state) => ({
        tests: state.tests,
        scores: state.scores,
        currentTestIndex: state.currentTestIndex,
        models: state.models,
      }),
    }
  )
); 
