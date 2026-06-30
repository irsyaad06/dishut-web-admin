import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

interface InputDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InputDataModal: React.FC<InputDataModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const formFields = [
    { id: 'das', label: 'Input Data Daerah Aliran Sungai (DAS)' }, 
    { id: 'dem', label: 'Input Data Elevation Model (DEM)' },
    { id: 'tutupan_lahan', label: 'Input Data Tutupan Lahan' },
    { id: 'curah_hujan', label: 'Input Data Curah Hujan' },
    { id: 'zonasi', label: 'Input Data Zonasi' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose} 
      ></div>

      <div className="relative bg-customWhite rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <div className="absolute right-4 top-4 z-10">
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiXMark className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5 mt-2">
            
            {formFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id} className="text-sm font-semibold text-gray-800">
                  {field.label}
                </label>
                <input 
                  type="file" 
                  id={field.id}
                  className="w-full text-sm text-gray-600 
                    border border-gray-300 rounded-lg cursor-pointer bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#185325] focus:border-transparent
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-l-lg file:border-0
                    file:text-sm file:font-medium
                    file:bg-gray-50 file:text-gray-700
                    hover:file:bg-gray-100 file:cursor-pointer transition-all"
                />
              </div>
            ))}

            <button 
              type="submit"
              className="mt-4 w-full cursor-pointer bg-[#185325] hover:bg-[#113d1b] text-white font-semibold rounded-full py-3.5 transition-colors shadow-sm"
            >
              Simpan Data
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default InputDataModal;