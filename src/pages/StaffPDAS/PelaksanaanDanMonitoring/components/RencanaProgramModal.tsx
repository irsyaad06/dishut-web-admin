import React, { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import MapPolygonDraw from './MapPolygonDraw'; // Import komponen peta

interface RencanaProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RencanaProgramModal: React.FC<RencanaProgramModalProps> = ({ isOpen, onClose }) => {
  // State untuk mengontrol form kondisional (Donasi / Investasi)
  const [jenisProgram, setJenisProgram] = useState('Program Mandiri');

  // Mencegah scroll pada background
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop Hitam Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Konten Modal */}
      <div className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header Modal (Warna Hijau Sesuai Desain) */}
        <div className="flex items-center justify-between px-6 py-4 bg-primary text-white shrink-0">
          <h2 className="text-lg font-bold">Rencana Program RURHL Baru</h2>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white transition-colors">
            <HiXMark className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Body Form (Bisa di-scroll) */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
            
            {/* Baris 1: Full Width */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Nama Program Rehabilitasi <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Contoh: Penghijauan Kembali Lereng Cimanuk Selatan" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" />
            </div>

            {/* Grid 2 Kolom untuk Inputan Sedang */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Pilih Wilayah Prioritas Terkait <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white cursor-pointer">
                  <option>-- Pilih Wilayah Valid --</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Jenis Program Rehabilitasi <span className="text-red-500">*</span></label>
                <select 
                  value={jenisProgram}
                  onChange={(e) => setJenisProgram(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white cursor-pointer"
                >
                  <option value="Program Mandiri">Program Mandiri</option>
                  <option value="Program Donasi">Program Donasi</option>
                  <option value="Program Investasi">Program Investasi</option>
                </select>
              </div>

              {/* RENDER KONDISIONAL: Jika Program Donasi */}
              {jenisProgram === 'Program Donasi' && (
                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm font-bold text-gray-700">List Program Donasi <span className="text-red-500">*</span></label>
                  <select className="w-full border border-green-300 bg-[#EBF3E8] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                    <option>-- Pilih Program Donasi --</option>
                  </select>
                </div>
              )}

              {/* RENDER KONDISIONAL: Jika Program Investasi */}
              {jenisProgram === 'Program Investasi' && (
                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2">
                  <label className="text-sm font-bold text-gray-700">List Program Investasi <span className="text-red-500">*</span></label>
                  <select className="w-full border border-blue-300 bg-blue-50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                    <option>-- Pilih Program Investasi --</option>
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Tipe Intervensi <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white cursor-pointer">
                  <option>Rehabilitasi (Reforestasi)</option>
                  <option>Agroforestri (Tumpang Sari Tradisional)</option>
                  <option>Konservasi (Sempadan Mata Air)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Kelompok Tani Hutan (KTH) Pelaksana <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Nama KTH Mitra Pelaksana" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>

            {/* Input Full Width */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Jenis Kegiatan Fisik Lapangan <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Mencangkul, membuat terasering, menanam, pembibitan..." className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Target Luas (Hektar) <span className="text-red-500">*</span></label>
                <input type="number" placeholder="10" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Target Bibit (Pohon) <span className="text-red-500">*</span></label>
                <input type="number" placeholder="1000" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Jenis Tanaman Komoditas <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Kopi Arabika, Sengon, Mahoni, Bambu" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Estimasi Anggaran (Rp) <span className="text-red-500">*</span></label>
                <input type="number" placeholder="10000000" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Sumber Pendanaan <span className="text-red-500">*</span></label>
                <input type="text" placeholder="APBN, APBD Provinsi, CSR Swasta, dll." className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              
              {/* Double Date Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Pasangan Jadwal Pelaksanaan (Mulai - Selesai) <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="text-gray-400">-</span>
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Deskripsi Tambahan Program</label>
              <textarea rows={3} placeholder="Keterangan sosiologis KTH, target jangka panjang, dll." className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Kebutuhan SDM Tambahan</label>
                <input type="text" placeholder="Tenaga ukur, Penyuluh Pembantu" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700">Kebutuhan Alat</label>
                <input type="text" placeholder="Cangkul, GPS, Truk tangki air" className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>

            {/* --- INTEGRASI PETA --- */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <MapPolygonDraw />
            </div>

          </form>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-100 transition-colors">
            Batal
          </button>
          <button type="submit" className="px-8 py-2 bg-primary text-white font-bold rounded-md hover:bg-[#113d1b] transition-colors shadow-sm">
            Simpan Rencana
          </button>
        </div>

      </div>
    </div>
  );
};

export default RencanaProgramModal;