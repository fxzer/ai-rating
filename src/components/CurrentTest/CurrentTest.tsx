import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Test } from '../../store/useStore';

interface EditModeState {
  isEditing: boolean;
  title: string;
  prompt: string;
  icon: string;
}

const CurrentTest: React.FC = () => {
  const { tests, currentTestIndex, scores, setCurrentTestIndex } = useStore();
  const [editMode, setEditMode] = useState<EditModeState>({
    isEditing: false,
    title: '',
    prompt: '',
    icon: ''
  });
  
  const prevTestsLengthRef = useRef<number>(tests.length);
  
  // 监听tests数组变化，当添加新题目时自动聚焦并进入编辑模式
  useEffect(() => {
    if (tests.length > prevTestsLengthRef.current) {
      // 设置当前索引为最后一个（新添加的题目）
      setCurrentTestIndex(tests.length - 1);
      // 进入编辑模式
      setEditMode({
        isEditing: true,
        title: tests[tests.length - 1].title,
        prompt: tests[tests.length - 1].prompt,
        icon: tests[tests.length - 1].icon
      });
    }
    // 更新记录的长度
    prevTestsLengthRef.current = tests.length;
  }, [tests, setCurrentTestIndex]);
  
  // 当当前测试变化时更新编辑状态
  useEffect(() => {
    if (tests.length > 0 && tests[currentTestIndex]) {
      setEditMode(prev => ({
        ...prev,
        title: tests[currentTestIndex].title,
        prompt: tests[currentTestIndex].prompt,
        icon: tests[currentTestIndex].icon
      }));
    }
  }, [currentTestIndex, tests]);
  
  if (tests.length === 0) {
    return (
      <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-2xl p-8 bento-card">
        <p className="text-center text-gray-500 mt-8">请添加测试题目</p>
      </div>
    );
  }
  
  const currentTest = tests[currentTestIndex];
  
  // 计算当前测试完成度
  const calculateCurrentTestProgress = () => {
    let completedCount = 0;
    Object.keys(scores).forEach(model => {
      if (scores[model as keyof typeof scores][currentTestIndex] !== null) {
        completedCount++;
      }
    });
    return { completed: completedCount, total: 4 }; // 4个模型
  };
  
  const progress = calculateCurrentTestProgress();
  
  // 复制提示词到剪贴板
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(currentTest.prompt);
      alert('提示词已复制到剪贴板');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };
  
  // 导航到上一题
  const goToPrevTest = () => {
    if (currentTestIndex > 0) {
      setCurrentTestIndex(currentTestIndex - 1);
    }
  };
  
  // 导航到下一题
  const goToNextTest = () => {
    if (currentTestIndex < tests.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
    }
  };
  
  // 进入编辑模式
  const enterEditMode = () => {
    setEditMode({
      isEditing: true,
      title: currentTest.title,
      prompt: currentTest.prompt,
      icon: currentTest.icon
    });
  };
  
  // 保存编辑
  const saveEdit = () => {
    // 创建新的测试对象，保留原ID
    const updatedTest: Test = {
      id: currentTest.id,
      title: editMode.title,
      prompt: editMode.prompt,
      icon: editMode.icon || 'fas fa-puzzle-piece' // 使用默认图标如果未提供
    };
    
    // 更新测试列表
    const newTests = [...tests];
    newTests[currentTestIndex] = updatedTest;
    
    // 更新Store
    useStore.setState({ tests: newTests });
    
    // 退出编辑模式
    setEditMode(prev => ({ ...prev, isEditing: false }));
  };
  
  return (
    <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-2xl p-8 bento-card">
      {editMode.isEditing ? (
        // 编辑模式
        <div className="flex flex-col gap-5">
            <div className="flex items-center w-full">
              <div className="min-w-12 h-12 bg-bento-purple rounded-xl flex items-center justify-center mr-4 ">
                <i className={`${currentTest.icon} text-2xl text-purple-600`}></i>
              </div>
              <div className="w-full">
                <input 
                  className="font-bold text-slate-800 border border-slate-300 rounded-lg px-3 h-11 w-full focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={editMode.title}
                  onChange={e => setEditMode(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="输入测试标题"
                />
              </div>
            </div>
          
            <textarea 
              className="w-full h-55 bg-transparent border  border-slate-300 text-slate-800 resize-none focus:outline-none p-2 rounded-lg focus:ring-1 focus:ring-purple-500"
              value={editMode.prompt}
              onChange={e => setEditMode(prev => ({ ...prev, prompt: e.target.value }))}
              placeholder="输入测试提示词..."
            ></textarea>
          
          <div className="flex space-x-3  ">
            <button 
              className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all flex items-center justify-center"
              onClick={() => setEditMode(prev => ({ ...prev, isEditing: false }))}
            >
              <i className="fas fa-times mr-2"></i>
              取消
            </button>
            <button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl hover:transition-all flex items-center justify-center"
              onClick={saveEdit}
            >
              <i className="fas fa-save mr-2"></i>
              保存
            </button>
          </div>
        </div>
      ) : (
        // 查看模式
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-bento-purple rounded-2xl flex items-center justify-center mr-4">
                <i className={`${currentTest.icon} text-2xl text-purple-600`}></i>
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{currentTest.title}</h3>
                <p className="text-sm text-slate-500">第 {currentTestIndex + 1} 题 / 共 {tests.length} 题</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                className="bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors w-10 h-10" 
                onClick={enterEditMode}
              >
                <i className="fas fa-edit text-slate-600 "></i>
              </button>
              <button 
                className="bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors w-10 h-10" 
                onClick={copyPrompt}
              >
                <i className="fas fa-copy text-slate-600 "></i>
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-6 h-40 overflow-y-auto">
            <p className="text-slate-700 leading-relaxed">
              {currentTest.prompt}
            </p>
          </div>
          
          {/* 统计信息区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* 当前题目完成统计 */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-chart-bar text-white text-sm"></i>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700">本题完成度</div>
                  <div className="text-lg font-bold text-blue-600">
                    {progress.completed}/{progress.total} 已评分
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 快捷操作区域 - 替换成上一题和下一题按钮 */}
          <div className="flex space-x-3">
            <button 
              className={`flex-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all flex items-center justify-center ${currentTestIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={goToPrevTest}
              disabled={currentTestIndex === 0}
            >
              <i className="fas fa-arrow-left mr-2"></i>
              上一题
            </button>
            
            <button 
              className={`flex-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all flex items-center justify-center ${currentTestIndex === tests.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={goToNextTest}
              disabled={currentTestIndex === tests.length - 1}
            >
              <i className="fas fa-arrow-right mr-2"></i>
              下一题
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentTest; 
