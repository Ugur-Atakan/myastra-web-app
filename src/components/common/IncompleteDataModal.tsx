import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingFields: string[];
}

const IncompleteDataModal: React.FC<ModalProps> = ({ isOpen, onClose, missingFields }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Eksik Bilgiler</h2>
        <p className="text-gray-600 mb-4">Aşağıdaki bilgileri tamamlamanız gerekiyor:</p>
        <ul className="list-disc list-inside mb-4">
          {missingFields.map((field, index) => (
            <li key={index} className="text-red-600">{field}</li>
          ))}
        </ul>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Tamamla
        </button>
      </div>
    </div>
  );
};

export default IncompleteDataModal;
