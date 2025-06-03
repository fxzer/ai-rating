import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import ModelFormModal from './ModelFormModal';

interface AIModelCardProps {
  id: string;
  modelKey: string;
  name: string;
  icon: string;
  bgColorClass: string;
  iconColorClass: string;
  provider: string;
  isDragging?: boolean;
  dragHandleProps?: any;
}

const AIModelCard: React.FC<AIModelCardProps> = ({
  id,
  modelKey,
  name,
  icon,
  bgColorClass,
  iconColorClass,
  provider,
  isDragging,
  dragHandleProps
}) => {
  // 使用选择器函数优化状态选择，避免全局重渲染
  const currentTestIndex = useStore(state => state.currentTestIndex);
  const currentScore = useStore(state => {
    // 使用可选链和空值合并操作符简化代码
    const scores = state.scores[modelKey] ?? [];
    return scores[currentTestIndex] ?? null;
  });
  const setRating = useStore(state => state.setRating);
  const deleteModel = useStore(state => state.deleteModel);
  
  // 编辑模态框状态
  const [showEditModal, setShowEditModal] = useState(false);
  // 确认删除对话框状态
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const handleRatingClick = (score: number) => {
    setRating(modelKey, currentTestIndex, score);
  };
  
  // 打开编辑模态框
  const openEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };
  
  // 关闭编辑模态框
  const closeEditModal = () => {
    setShowEditModal(false);
  };
  
  // 删除模型
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmDelete(true);
  };
  
  // 确认删除
  const confirmDelete = () => {
    deleteModel(id);
    setShowConfirmDelete(false);
  };
  
  // 取消删除
  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };
  
  return (
    <>
      <div 
        className={`bg-gradient-to-br ${bgColorClass} rounded-2xl p-6 card-shadow bento-card relative group
          ${isDragging ? 'opacity-50' : ''}
        `}
        {...dragHandleProps}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center" aria-hidden="true">
            <i className={`${icon} text-xl ${iconColorClass}`}></i>
          </div>
          <div className="flex space-x-1" aria-hidden="true">
            <div className={`w-2 h-2 ${iconColorClass} bg-opacity-80 rounded-full`}></div>
            <div className={`w-2 h-2 ${iconColorClass} bg-opacity-40 rounded-full`}></div>
          </div>
        </div>
        
        {/* 编辑和删除按钮 */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="bg-white bg-opacity-70 rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-100"
            onClick={openEditModal}
            title="编辑模型"
          >
            <i className="fas fa-edit text-blue-500 text-xs"></i>
          </button>
          <button 
            className="bg-white bg-opacity-70 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-100"
            onClick={handleDelete}
            title="删除模型"
          >
            <i className="fas fa-trash text-red-500 text-xs"></i>
          </button>
        </div>
        
        {/* 确认删除对话框 */}
        {showConfirmDelete && (
          <div className="absolute top-10 right-2 bg-white shadow-lg rounded-md p-3 z-20 w-40">
            <p className="text-xs mb-2 text-gray-700">确定要删除这个模型吗？</p>
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
      
      {/* 编辑模型模态框 */}
      <ModelFormModal 
        isOpen={showEditModal}
        onClose={closeEditModal}
        editModel={{
          id,
          name,
          modelKey,
          icon,
          provider,
          bgColorClass,
          iconColorClass
        }}
      />
    </>
  );
};

// 使用React.memo优化渲染性能
export default React.memo(AIModelCard); 
