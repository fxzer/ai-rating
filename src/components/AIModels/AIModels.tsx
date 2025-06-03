import React, { useMemo } from 'react';
import AIModelCard from './AIModelCard';
import AddModelButton from './AddModelButton';
import { useStore } from '../../store/useStore';
import { 
  closestCenter,
  DndContext, 
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// 导入DragEndEvent类型
import type { DragEndEvent } from '@dnd-kit/core';

// 可排序的模型项目包装器
const SortableModelItem = React.memo(({ model }: {
  model: { id: string; modelKey: string; name: string; icon: string; bgColorClass: string; iconColorClass: string; provider: string; }
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: model.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`${isDragging ? 'z-10' : ''}`}
    >
      <AIModelCard 
        id={model.id}
        modelKey={model.modelKey}
        name={model.name}
        icon={model.icon}
        bgColorClass={model.bgColorClass}
        iconColorClass={model.iconColorClass}
        provider={model.provider}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
});

SortableModelItem.displayName = 'SortableModelItem';

const AIModels: React.FC = () => {
  // 使用选择器函数优化状态选择
  const models = useStore(state => state.models);
  const reorderModels = useStore(state => state.reorderModels);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 增加激活距离以减少误触发
      activationConstraint: {
        distance: 8, // 需要移动8像素才会被视为拖拽
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 使用useMemo优化排序项目ID列表
  const sortableItems = useMemo(() => models.map(model => ({ id: model.id })), [models]);

  // 拖拽结束处理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      reorderModels(String(active.id), String(over.id));
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={sortableItems}
        strategy={horizontalListSortingStrategy}
      >
        {models.map(model => (
          <SortableModelItem key={model.id} model={model} />
        ))}
        <AddModelButton />
      </SortableContext>
    </DndContext>
  );
};

export default AIModels; 
