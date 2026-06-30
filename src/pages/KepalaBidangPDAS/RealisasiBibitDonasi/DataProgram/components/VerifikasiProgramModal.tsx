import type { ProgramData } from '@/utils/interface';
import React, { useEffect } from 'react';
import { HiOutlineXMark, HiCheckCircle, HiXCircle } from 'react-icons/hi2';

interface VerifikasiProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramData | null;
  onSetuju: (id: string) => void;
  onTolak: (id: string) => void;
}

const VerifikasiProgramModal: React.FC<VerifikasiProgramModalProps> = ({ 
  isOpen, onClose, program, onSetuju, onTolak 
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Verifikasi Program</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Validasi pengajuan program <span className="font-bold text-slate-900">"{program.nama}"</span> di lokasi <span className="font-semibold text-slate-800">{program.lokasi}</span>:
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => onSetuju(program.id)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#009262] hover:bg-[#007a52] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-[#009262]/20 active:scale-95"
            >
              <HiCheckCircle className="w-5 h-5" />
              Setujui (Program Sesuai Ketentuan)
            </button>

            <button 
              onClick={() => onTolak(program.id)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-sm font-bold rounded-xl transition-all active:scale-95"
            >
              <HiXCircle className="w-5 h-5" />
              Tolak (Program Tidak Sesuai Ketentuan)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerifikasiProgramModal;