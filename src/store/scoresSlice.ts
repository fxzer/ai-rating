import { initialTests } from './testsSlice';
import { initialModels } from './modelsSlice';
import type { ModelKey, ModelScore } from '../types';

// 创建初始评分数据
const createEmptyScores = (testCount: number, models: Array<{ modelKey: string }>): ModelScore => {
  const scores: ModelScore = {};
  
  models.forEach(model => {
    scores[model.modelKey] = Array(testCount).fill(null);
  });
  
  return scores;
};

// 评分相关操作
export interface ScoresSlice {
  scores: ModelScore;
  setRating: (model: ModelKey, testIndex: number, score: number) => void;
  resetAllScores: () => void;
  // 添加用于测试删除后更新评分的方法
  updateScoresAfterTestDelete: (testIndex: number) => void;
}

export const createScoresSlice = (set: any, get: any): ScoresSlice => ({
  scores: createEmptyScores(initialTests.length, initialModels),
  
  setRating: (model: ModelKey, testIndex: number, score: number) => 
    set((state: { scores: ModelScore }) => {
      const newScores = { ...state.scores };
      // 确保模型在scores中有一个数组，如果没有，创建一个
      const modelScores = Array.isArray(newScores[model]) 
        ? [...newScores[model]] 
        : Array(get().tests.length).fill(null);
      modelScores[testIndex] = score;
      newScores[model] = modelScores;
      
      return { scores: newScores };
    }),
  
  resetAllScores: () => 
    set((state: { tests: Array<unknown>, models: Array<{ modelKey: string }> }) => {
      return { scores: createEmptyScores(state.tests.length, state.models) };
    }),
  
  // 从所有模型的评分中删除对应测试的评分
  updateScoresAfterTestDelete: (testIndex: number) => 
    set((state: { scores: ModelScore }) => {
      const newScores = { ...state.scores };
      
      Object.keys(newScores).forEach(modelKey => {
        const modelScores = [...newScores[modelKey]];
        modelScores.splice(testIndex, 1);
        newScores[modelKey] = modelScores;
      });
      
      return { scores: newScores };
    })
}); 
