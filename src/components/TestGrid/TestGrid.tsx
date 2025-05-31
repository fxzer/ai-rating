import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import TestItem from './TestItem';
import AddTestButton from './AddTestButton';
import type { DragEndEvent } from '@dnd-kit/core';
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

// 可排序的测试项目包装器
const SortableTestItem = React.memo(({ test, currentTestIndex }: { 
  test: { id: string; icon: string; title: string; prompt: string };
  currentTestIndex: number;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: test.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = useStore(state => 
    state.tests.findIndex(t => t.id === test.id) === currentTestIndex
  );
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`${isDragging ? 'z-10' : ''}`}
    >
      <TestItem 
        test={test} 
        isSelected={isSelected} 
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
});

SortableTestItem.displayName = 'SortableTestItem';

const TestGrid: React.FC = () => {
  // 使用选择器函数优化状态选择
  const tests = useStore(state => state.tests);
  const currentTestIndex = useStore(state => state.currentTestIndex);
  const reorderTests = useStore(state => state.reorderTests);
  
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
  const sortableItems = useMemo(() => tests.map(test => ({ id: test.id })), [tests]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      reorderTests(String(active.id), String(over.id));
    }
  };

  return (
    <section className="my-8" aria-label="测试题目列表">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sortableItems}
          strategy={horizontalListSortingStrategy}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tests.map(test => (
              <SortableTestItem 
                key={test.id} 
                test={test} 
                currentTestIndex={currentTestIndex}
              />
            ))}
            <AddTestButton />
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
};

export default React.memo(TestGrid); 
