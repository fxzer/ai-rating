import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { colorPresets } from '../../store/modelsSlice';
import type { EditModelModeState } from '../../types';

interface ModelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editModel?: {
    id: string;
    name: string;
    modelKey: string;
    icon: string;
    provider: string;
    bgColorClass: string;
    iconColorClass: string;
  };
}

const ModelFormModal: React.FC<ModelFormModalProps> = ({ isOpen, onClose, editModel }) => {
  const { addModel, updateModel } = useStore();
  const [formData, setFormData] = useState<EditModelModeState>({
    isEditing: false,
    name: '',
    modelKey: '',
    icon: 'fas fa-robot',
    provider: '',
    bgColorClass: colorPresets[0].bgColorClass,
    iconColorClass: colorPresets[0].iconColorClass
  });

  // 当编辑模型数据变化时，更新表单
  useEffect(() => {
    if (editModel) {
      setFormData({
        isEditing: true,
        name: editModel.name,
        modelKey: editModel.modelKey,
        icon: editModel.icon,
        provider: editModel.provider,
        bgColorClass: editModel.bgColorClass,
        iconColorClass: editModel.iconColorClass
      });
    } else {
      // 重置表单
      setFormData({
        isEditing: false,
        name: '',
        modelKey: '',
        icon: 'fas fa-robot',
        provider: '',
        bgColorClass: colorPresets[0].bgColorClass,
        iconColorClass: colorPresets[0].iconColorClass
      });
    }
  }, [editModel, isOpen]);

  // 图标选项
  const iconOptions = [
    { value: 'fas fa-robot', label: '机器人' },
    { value: 'fas fa-brain', label: '大脑' },
    { value: 'fas fa-magic', label: '魔法' },
    { value: 'fas fa-bolt', label: '闪电' },
    { value: 'fas fa-comments', label: '对话' },
    { value: 'fas fa-microchip', label: '芯片' },
    { value: 'fas fa-star', label: '星星' },
    { value: 'fas fa-atom', label: '原子' },
    { value: 'fas fa-lightbulb', label: '灯泡' },
    { value: 'fas fa-cogs', label: '齿轮' }
  ];

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.provider.trim()) {
      return;
    }

    // 根据名称生成modelKey
    const generatedKey = formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editModel) {
      // 更新现有模型
      updateModel(editModel.id, {
        name: formData.name,
        modelKey: generatedKey !== editModel.modelKey ? generatedKey : editModel.modelKey,
        icon: formData.icon,
        provider: formData.provider,
        bgColorClass: formData.bgColorClass,
        iconColorClass: formData.iconColorClass
      });
    } else {
      // 添加新模型
      addModel({
        modelKey: generatedKey,
        name: formData.name,
        icon: formData.icon,
        provider: formData.provider,
        bgColorClass: formData.bgColorClass,
        iconColorClass: formData.iconColorClass
      });
    }

    // 关闭弹窗
    onClose();
  };

  // 选择颜色主题
  const handleColorPresetSelect = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bgColorClass: colorPresets[index].bgColorClass,
      iconColorClass: colorPresets[index].iconColorClass
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 className="font-bold text-xl text-slate-800 mb-6">
          {editModel ? '编辑模型' : '添加新模型'}
        </h3>
        
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="model-name" className="block text-sm font-medium text-gray-700 mb-2">
              模型名称
            </label>
            <input
              id="model-name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="例如: GPT-4o"
            />
          </div>
          
          <div>
            <label htmlFor="model-provider" className="block text-sm font-medium text-gray-700 mb-2">
              提供商
            </label>
            <input
              id="model-provider"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={formData.provider}
              onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
              placeholder="例如: OpenAI"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              图标
            </label>
            <div className="grid grid-cols-5 gap-2 justify-around justify-items-center">
              {iconOptions.map((option) => (
                <button
                  key={option.value}
                  className={`p-2 w-12 h-12 rounded-md flex items-center justify-center ${
                    formData.icon === option.value
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                  type="button"
                  title={option.label}
                >
                  <i className={`${option.value} text-lg`}></i>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              颜色主题
            </label>
            <div className="grid grid-cols-5 gap-2 justify-items-center">
              {colorPresets.map((preset, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 rounded-md bg-gradient-to-br border-1 border-slate-100  ${preset.bgColorClass} flex items-center justify-center  ${
                    formData.bgColorClass === preset.bgColorClass
                      ? 'ring-2 ring-purple-500 ring-offset-2'
                      : ''
                  }`}
                  onClick={() => handleColorPresetSelect(index)}
                  type="button"
                >
                  <i className={`${formData.icon} text-xl ${preset.iconColorClass}`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button 
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-all"
              onClick={onClose}
            >
              取消
            </button>
            <button 
              className={`flex-1 bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition-all
                ${!formData.name || !formData.provider ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSubmit}
              disabled={!formData.name || !formData.provider}
            >
              {editModel ? '保存' : '添加'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelFormModal; 
