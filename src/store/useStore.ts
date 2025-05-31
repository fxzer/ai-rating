import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createScoresSlice } from './scoresSlice';
import { createTestsSlice } from './testsSlice';
import type { ScoresSlice } from './scoresSlice';
import type { TestsSlice } from './testsSlice';

// 导出类型，保持向后兼容
export type { ModelScore, Test } from '../types';

// 应用状态类型
interface AppState extends TestsSlice, ScoresSlice {}

// 创建存储，合并各个切片
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...createTestsSlice(set, get),
      ...createScoresSlice(set, get),
    }),
    {
      name: 'ai-rating-storage',
      // 只持久化部分状态，避免序列化太多数据
      partialize: (state) => ({
        tests: state.tests,
        scores: state.scores,
        currentTestIndex: state.currentTestIndex,
      }),
    }
  )
); 
