import React from 'react';
import { useStore } from '../../store/useStore';

const AddTestButton: React.FC = () => {
  const { addTest } = useStore();
  
  const handleAddTest = () => {
    addTest({
      icon: 'fas fa-plus',
      title: '新测试标题',
      prompt: '新建测试提示词...'
    });
  };
  
  return (
    <div 
      className="bg-gradient-to-br  from-gray-100 to-lime-100 rounded-2xl p-4 card-shadow cursor-pointer flex flex-col items-center justify-center min-h-24"
      onClick={handleAddTest}
    >
      <div className="text-3xl mb-2 text-gray-500">
        <i className="fas fa-plus-circle"></i>
      </div>
      <p className="text-sm text-gray-600">添加测试</p>
    </div>
  );
};

export default AddTestButton; 
