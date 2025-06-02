import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Test } from '../../types';

interface TestItemProps {
  test: Test;
  isSelected: boolean;
  isDragging?: boolean;
  dragHandleProps?: any;
}

const TestItem: React.FC<TestItemProps> = ({ 
  test, 
  isSelected,
  isDragging,
  dragHandleProps
}) => {
  // 使用选择器函数优化状态选择，避免全局重渲染
  const setCurrentTestIndex = useStore(state => state.setCurrentTestIndex);
  const deleteTest = useStore(state => state.deleteTest);
  const tests = useStore(state => state.tests);
  // 添加确认框显示状态
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // 阻止事件冒泡，确保上层组件不会接收到点击事件
    e.stopPropagation();
    
    // 如果正在拖拽，不触发点击
    if (isDragging) return;
    
    // 查找当前测试的索引
    const index = tests.findIndex(t => t.id === test.id);
    if (index !== -1) {
      // 设置当前测试索引
      setCurrentTestIndex(index);
      
      // 滚动到页面顶部，使用平滑滚动效果
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 显示确认框而不是调用系统confirm
    setShowConfirm(true);
  };

  // 处理确认删除
  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTest(test.id);
    setShowConfirm(false);
  };

  // 处理取消删除
  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <div 
      className={`
        bg-gradient-to-br ${getBgColor(test.icon)} rounded-2xl p-4 
        bento-card cursor-pointer relative group
        ${isSelected ? 'border-2 border-purple-500 transform scale-105 z-10' : 'hover:scale-102 hover:shadow-md'}
        ${isDragging ? 'opacity-50' : ''}
        transition-all duration-200 ease-in-out
        card-shadow
      `}
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e as any)}
      aria-label={`选择测试题目: ${test.title}`}
      {...dragHandleProps}
    >
      <div className="flex justify-between">
        <div className="text-2xl mb-2" aria-hidden="true">
          <i className={`${test.icon} ${getIconColor(test.icon)}`}></i>
          {isSelected && <span className="absolute top-2 left-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>}
        </div>
        <button 
          className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
          onClick={handleDelete}
          aria-label={`删除测试题目: ${test.title}`}
          tabIndex={0}
        >
          <i className="fas fa-times text-red-500 text-xs"></i>
        </button>
        
        {/* 自定义确认框 */}
        {showConfirm && (
          <div 
            className="absolute top-10 right-2 bg-white shadow-lg rounded-md p-2 z-20 w-32 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs mb-2 text-gray-700 text-left">确定要删除这个测试题目吗？</p>
            <div className="flex justify-between">
              <button 
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                onClick={cancelDelete}
              >
                取消
              </button>
              <button 
                className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                onClick={confirmDelete}
              >
                确定
              </button>
            </div>
          </div>
        )}
      </div>
      <h4 className="font-semibold text-slate-800 text-sm line-clamp-1">{test.title}</h4>
      <p className="text-xs text-slate-600 line-clamp-1">{getSubtitle(test.title)}</p>
    </div>
  );
};

// 辅助函数：根据图标获取背景色
const getBgColor = (icon: string): string => {
  if (icon.includes('puzzle') || icon.includes('camera') || icon.includes('edit')) {
    return 'from-bento-purple to-purple-100';
  } else if (icon.includes('calculator') || icon.includes('star')) {
    return 'from-bento-blue to-blue-100';
  } else if (icon.includes('gamepad') || icon.includes('dragon')) {
    return 'from-bento-green to-green-100';
  } else if (icon.includes('cube') || icon.includes('globe')) {
    return 'from-bento-yellow to-yellow-100';
  } else if (icon.includes('palette')) {
    return 'from-bento-pink to-pink-100';
  } else if (icon.includes('fire')) {
    return 'from-red-100 to-red-200';
  } else {
    return 'from-bento-orange to-orange-100';
  }
};

// 辅助函数：根据图标获取图标颜色
const getIconColor = (icon: string): string => {
  if (icon.includes('puzzle') || icon.includes('camera') || icon.includes('edit')) {
    return 'text-purple-600';
  } else if (icon.includes('calculator') || icon.includes('star')) {
    return 'text-blue-600';
  } else if (icon.includes('gamepad') || icon.includes('dragon')) {
    return 'text-green-600';
  } else if (icon.includes('cube') || icon.includes('globe')) {
    return 'text-yellow-600';
  } else if (icon.includes('palette')) {
    return 'text-pink-600';
  } else if (icon.includes('fire')) {
    return 'text-red-600';
  } else {
    return 'text-orange-600';
  }
};

// 辅助函数：从标题中提取副标题
const getSubtitle = (title: string): string => {
  const parts = title.split('-').map(part => part.trim());
  if (parts.length > 1) {
    return parts[1];
  }
  return parts[0];
};

// 使用React.memo优化渲染性能
export default React.memo(TestItem); 
