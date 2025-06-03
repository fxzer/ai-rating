import React, { useState } from 'react';
import ModelFormModal from './ModelFormModal';

const AddModelButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleAddClick = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <div 
        className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl  p-4 card-shadow cursor-pointer flex flex-col items-center justify-center"
        onClick={handleAddClick}
        style={{
         height: '208px',
        }}
      >
        <div className="text-3xl mb-2 text-purple-500">
          <i className="fas fa-plus-circle"></i>
        </div>
        <p className="text-lg text-purple-600 font-medium">添加模型</p>
      </div>
      
      <ModelFormModal 
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AddModelButton; 
