import React, { useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

interface RincianDanaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RincianDanaModal: React.FC<RincianDanaModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-125 bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl font-bold text-gray-800">Rincian Alokasi Dana</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          <div className="bg-[#F8F9FA] rounded-xl p-4 flex justify-between items-center border border-gray-100">
            <span className="text-gray-600 text-[15px]">Donatur</span>
            <span className="font-bold text-gray-800 text-[15px]">Budi Santoso</span>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-4 flex justify-between items-center border border-gray-100">
            <span className="text-gray-600 text-[15px]">Jumlah Bibit</span>
            <span className="font-bold text-[#2E7D32] text-[15px]">100 Bibit</span>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-[15px]">Alokasi Dana (100% Pembelian Bibit)</h3>
            
            <div className="flex justify-between items-center mb-4 text-[15px]">
              <span className="text-gray-600">Total Donasi Terkumpul:</span>
              <span className="text-gray-800 font-medium">Rp 1.200.000</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center text-gray-800">
                <span className="font-bold">1. Pembelanjaan Bibit Sengon (100%)</span>
                <span className="font-bold">Rp 1.200.000</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span className="line-through">2. Operasional Platform / BPDAS (0%)</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span className="line-through">3. Biaya Perawatan oleh KTH (0%)</span>
                <span>Ditanggung Pemerintah</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 pt-2">
            Dana ini dijamin tersalurkan 100% untuk program tanpa potongan platform.
          </p>

        </div>

      </div>
    </div>
  );
};

export default RincianDanaModal;