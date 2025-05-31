import React from 'react';
import { AI_MODELS } from '../../config/models';
import AIModelCard from './AIModelCard';

const AIModels: React.FC = () => {
  return (
    <>
      {AI_MODELS.map(model => (
        <AIModelCard
          key={model.modelKey}
          modelKey={model.modelKey}
          name={model.name}
          icon={model.icon}
          bgColorClass={model.bgColorClass}
          iconColorClass={model.iconColorClass}
          provider={model.provider}
        />
      ))}
    </>
  );
};

export default AIModels; 
