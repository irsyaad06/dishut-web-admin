import type { DonaturData } from '@/utils/interface';
import React, { useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

interface VerifikasiDonaturModalProps {
  isOpen: boolean;
  onClose: () => void;
  donatur: DonaturData | null;
  onTerima?: () => void; 
  onTolak?: () => void; 
}

const VerifikasiDonaturModal: React.FC<VerifikasiDonaturModalProps> = ({ 
  isOpen, 
  onClose, 
  donatur,
  onTerima,
  onTolak
}) => {
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

  if (!isOpen || !donatur) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-112.5 bg-white rounded-[20px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Verifikasi Donatur</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-8 space-y-6">
          <div className="bg-[#EEEEEE] rounded-xl p-5 flex flex-col gap-3">
            <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
              <span className="text-[15px] font-semibold text-gray-500">Nama</span>
              <span className="text-[15px] font-bold text-gray-800">{donatur.namaDonatur}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-2 items-start">
              <span className="text-[15px] font-semibold text-gray-500">Program</span>
              <span className="text-[15px] font-bold text-gray-800 leading-tight">{donatur.program}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
              <span className="text-[15px] font-semibold text-gray-500">Jumlah</span>
              <span className="text-[15px] font-bold text-primary">{donatur.jumlahBibit} Bibit</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button 
              onClick={() => {
                  onTerima && onTerima();
                  onClose();
              }}
              className="w-full py-3.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-[#144a18] transition-colors"
            >
              Terima (Bibit Ada)
            </button>
            <button 
               onClick={() => {
                onTolak && onTolak();
                onClose();
            }}
              className="w-full py-3.5 bg-[#FFCDD2] text-[#B71C1C] text-sm font-semibold rounded-full hover:bg-[#ef9a9a] transition-colors"
            >
              Tolak (Bibit Tidak Ada)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VerifikasiDonaturModal;