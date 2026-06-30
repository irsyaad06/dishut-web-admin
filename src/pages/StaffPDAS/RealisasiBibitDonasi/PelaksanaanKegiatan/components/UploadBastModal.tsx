import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineXMark, HiOutlineCloudArrowUp } from 'react-icons/hi2';

interface UploadBastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadBastModal: React.FC<UploadBastModalProps> = ({ isOpen, onClose }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    if (!isOpen) setFileName(null); // Reset saat ditutup
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-112.5 bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl font-bold text-gray-800">Upload BAST</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-[#A5D6A7] bg-[#F4FFF6] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#E8F5E9] transition-colors"
          >
            <HiOutlineCloudArrowUp className="w-10 h-10 text-[#2E7D32] mb-3" />
            <p className="text-sm font-semibold text-[#2E7D32] text-center">
              {fileName ? fileName : 'Klik di sini untuk upload file PDF/Image'}
            </p>
            {!fileName && <p className="text-xs text-gray-500 mt-1">Maksimal ukuran file 5MB</p>}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.png,.jpg,.jpeg"
            />
          </div>

          <button 
            disabled={!fileName}
            className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
              fileName ? 'bg-primary hover:bg-[#144a18] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Simpan Dokumen
          </button>
        </div>

      </div>
    </div>
  );
};

export default UploadBastModal;