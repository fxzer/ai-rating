import React from 'react';
import Header from '../components/Header/Header';
import CurrentTest from '../components/CurrentTest/CurrentTest';
import AIModels from '../components/AIModels/AIModels';
import TestGrid from '../components/TestGrid/TestGrid';
import ResultsModal from '../components/ResultsModal/ResultsModal';
import { useStore } from '../store/useStore';

export const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 顶部标题区域 */}
        <Header />
        
        {/* Bento网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="bentoGrid">
          {/* 当前测试卡片 (大卡片) */}
          <CurrentTest />
          
          {/* AI模型卡片们 */}
          <AIModels />
        </div>

        {/* 测试题目网格 */}
        <TestGrid />
        
        {/* 结果模态框 */}
        <ResultsModal />
      </div>
    </div>
  );
};

export default App; 
