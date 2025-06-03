import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

interface ModelResult {
  model: keyof typeof modelNames;
  name: string;
  totalScore: number;
  avgScore: string;
}

// 模型名称映射
const modelNames = {
  'gemini': 'Gemini 2.5 Pro',
  'claude': 'Claude 4 Opus',
  'chatgpt': 'ChatGPT o3',
  'grok': 'Grok 3'
};

// 排名评语
const comments = {
  1: "太棒了！你是当之无愧的冠军！ 👑",
  2: "表现不错，继续加油！ 💪",
  3: "还可以做得更好，再接再厉！ 🌟",
  4: "别灰心，下次一定会更好！ 💫"
};

const ResultsModal: React.FC = () => {
  const { tests, scores, resetAllScores, showResultsModal, setShowResultsModal } = useStore();
  const [results, setResults] = useState<Array<ModelResult>>([]);
  
  // 监听showResultsModal变化，当打开时计算结果
  useEffect(() => {
    if (showResultsModal) {
      calculateResults();
      // 延迟500ms后触发彩带效果
      setTimeout(() => {
        createConfetti();
      }, 500);
    }
  }, [showResultsModal, scores, tests]);
  
  // 计算是否所有评分已完成
  const calculateCompletion = () => {
    let allCompleted = true;
    
    Object.values(scores).forEach(modelScores => {
      if (modelScores.some(score => score === null)) {
        allCompleted = false;
      }
    });
    
    return allCompleted;
  };
  
  // 计算各模型总分并排名
  const calculateResults = () => {
    const newResults: Array<ModelResult> = [];
    
    Object.keys(scores).forEach((model) => {
      const modelKey = model as keyof typeof modelNames;
      const totalScore = scores[modelKey].reduce((sum, score) => sum + (score ?? 0), 0);
      
      newResults.push({
        model: modelKey,
        name: modelNames[modelKey],
        totalScore,
        avgScore: (totalScore / tests.length).toFixed(1)
      });
    });
    
    // 按总分排序
    newResults.sort((a, b) => b.totalScore - a.totalScore);
    setResults(newResults);
  };
  
  // 关闭模态框
  const closeModal = () => {
    setShowResultsModal(false);
    
    // 移除彩带
    const confettiContainer = document.getElementById('confetti-container');
    if (confettiContainer) {
      confettiContainer.remove();
    }
  };
  
  // 重新开始
  const restartTest = () => {
    resetAllScores();
    closeModal();
  };
  
  // 彩带效果
  const createConfetti = () => {
    // 创建彩带容器
    const existingContainer = document.getElementById('confetti-container');
    if (existingContainer) existingContainer.remove();
    
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // 创建彩带
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      
      const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#ec4899'];
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      confettiContainer.appendChild(confetti);
    }
    
    // 3秒后清除彩带
    setTimeout(() => {
      if (confettiContainer) {
        confettiContainer.remove();
      }
    }, 3000);
  };
  
  return (
    <>
      {/* 显示结果按钮 */}
      {/* {calculateCompletion() && (
        <div className="flex justify-center mb-8">
          <button 
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-2xl hover:shadow-xl transition-all"
            onClick={() => setShowResultsModal(true)}
          >
            <i className="fas fa-trophy mr-2"></i>查看结果
          </button>
        </div>
      )}
       */}
      {/* 模态框 */}
      {showResultsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative">
            {/* 关闭按钮 */}
            <button 
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={closeModal}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <h2 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              <i className="fas fa-trophy mr-3"></i>最终排名
            </h2>
            
            {/* 排名列表 */}
            <div>
              {results.map((result, index) => {
                const rank = index + 1;
                const colors = [
                  'from-yellow-400 to-yellow-600', 
                  'from-gray-300 to-gray-500', 
                  'from-amber-600 to-amber-800', 
                  'from-red-400 to-red-600'
                ];
                
                // 为第一名添加特殊样式
                const extraClasses = rank === 1 ? 'champion-card' : '';
                const crownIcon = rank === 1 ? <span className="ml-3 crown-animation">👑</span> : null;
                const comment = comments[rank as keyof typeof comments] || '';
                
                return (
                  <div 
                    key={result.model}
                    className={`flex items-center p-4 mb-4 bg-gradient-to-r ${colors[index]} rounded-2xl text-white ${extraClasses}`}
                  >
                    <div className="text-3xl font-black mr-4">#{rank}</div>
                    <div className="flex-1">
                      <div className="text-xl font-bold flex items-center">
                        {result.name} {crownIcon}
                      </div>
                      <div className="text-sm opacity-90">平均: {result.avgScore}分</div>
                      {comment && <div className="text-sm mt-1 italic">{comment}</div>}
                    </div>
                    <div className="text-2xl font-black">{result.totalScore}/{tests.length * 5}</div>
                  </div>
                );
              })}
            </div>
            
            <button 
              className="w-full bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-2xl mt-8"
              onClick={restartTest}
            >
              <i className="fas fa-redo mr-2"></i>重新开始测试
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsModal; 
