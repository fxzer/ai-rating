import React from 'react';
import { useStore } from '../../store/useStore';
import type { ModelKey } from '../../types';

interface AIModelCardProps {
  modelKey: ModelKey;
  name: string;
  icon: string;
  bgColorClass: string;
  iconColorClass: string;
  provider: string;
}

const AIModelCard: React.FC<AIModelCardProps> = ({
  modelKey,
  name,
  icon,
  bgColorClass,
  iconColorClass,
  provider
}) => {
  // 使用选择器函数优化状态选择，避免全局重渲染
  const currentTestIndex = useStore(state => state.currentTestIndex);
  const currentScore = useStore(state => state.scores[modelKey][state.currentTestIndex]);
  const setRating = useStore(state => state.setRating);
  
  const handleRatingClick = (score: number) => {
    setRating(modelKey, currentTestIndex, score);
  };
  
  return (
    <div className={`bg-gradient-to-br ${bgColorClass} rounded-2xl p-6 card-shadow bento-card`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center" aria-hidden="true">
          <i className={`${icon} text-xl ${iconColorClass}`}></i>
        </div>
        <div className="flex space-x-1" aria-hidden="true">
          <div className={`w-2 h-2 ${iconColorClass} bg-opacity-80 rounded-full`}></div>
          <div className={`w-2 h-2 ${iconColorClass} bg-opacity-40 rounded-full`}></div>
        </div>
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{name}</h3>
      <p className="text-sm text-slate-600 mb-4">{provider}</p>
      <div className="flex space-x-1" role="group" aria-label={`给${name}评分`}>
        {[1, 2, 3, 4, 5].map(score => (
          <button
            key={score}
            className={`w-7 h-7 rounded-full text-xs cursor-pointer font-bold transition-all ${
              currentScore === score
                ? `bg-purple-500 text-white border-2 border-purple-500`
                : `border-2 border-slate-300 hover:border-purple-400`
            }`}
            onClick={() => handleRatingClick(score)}
            aria-pressed={currentScore === score}
            aria-label={`${score}分`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
};

// 使用React.memo优化渲染性能
export default React.memo(AIModelCard); 
