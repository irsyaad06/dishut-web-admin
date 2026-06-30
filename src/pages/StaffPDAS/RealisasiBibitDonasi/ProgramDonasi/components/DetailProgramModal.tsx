import React, { useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

// Sesuaikan interface dengan yang ada di ProgramDonasi
type StatusProgram = 'Aktif' | 'Selesai' | 'Menunggu Verifikasi';

export interface ProgramData {
  id: string;
  nama: string;
  lokasi: string;
  terkumpul: string;
  status: StatusProgram;
}

interface DetailProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramData | null;
}

const DetailProgramModal: React.FC<DetailProgramModalProps> = ({ 
  isOpen, 
  onClose, 
  program 
}) => {
  // Cegah scroll pada body ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      <div className="w-full max-w-125 bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-[22px] font-bold text-gray-800">
            Detail Program
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-8 space-y-6">
          
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1.5">Nama Program</h3>
            <p className="text-[15px] text-gray-600">{program.nama}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1.5">Lokasi</h3>
            <p className="text-[15px] text-gray-600">{program.lokasi}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1.5">Terkumpul</h3>
            <p className="text-[15px] font-bold text-[#34A853]">
              {program.terkumpul} Bibit
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Status</h3>
            <span className="inline-block px-5 py-1.5 bg-[#81C784] text-white text-sm font-semibold rounded-full">
              {program.status}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailProgramModal;