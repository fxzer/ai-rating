import { initialTests } from './testsSlice';
import type { ModelKey, ModelScore } from '../types';

// 创建初始评分数据
const createEmptyScores = (testCount: number): ModelScore => ({
  gemini: Array(testCount).fill(null),
  claude: Array(testCount).fill(null),
  chatgpt: Array(testCount).fill(null),
  grok: Array(testCount).fill(null)
});

// 评分相关操作
export interface ScoresSlice {
  scores: ModelScore;
  setRating: (model: ModelKey, testIndex: number, score: number) => void;
  resetAllScores: () => void;
}

export const createScoresSlice = (set: any, get: any): ScoresSlice => ({
  scores: createEmptyScores(initialTests.length),
  
  setRating: (model: ModelKey, testIndex: number, score: number) => 
    set((state: { scores: ModelScore }) => {
      const newScores = { ...state.scores };
      const modelScores = [...newScores[model]];
      modelScores[testIndex] = score;
      newScores[model] = modelScores;
      
      return { scores: newScores };
    }),
  
  resetAllScores: () => 
    set((state: { tests: Array<unknown> }) => {
      return { scores: createEmptyScores(state.tests.length) };
    })
}); 
