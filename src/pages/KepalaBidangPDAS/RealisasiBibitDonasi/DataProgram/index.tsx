import React, { useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineEye, HiOutlineCheckBadge } from 'react-icons/hi2';
import VerifikasiProgramModal from './components/VerifikasiProgramModal';
import toast from 'react-hot-toast';
import type { ProgramData } from '@/utils/interface';

const mockDataProgram: ProgramData[] = [
  { id: '1', nama: 'Penghijauan Hulu Citarum', lokasi: 'Kab. Bandung', jenisBibit: ['Mahoni', 'Sengon'], terkumpul: '8.500', status: 'Aktif' },
  { id: '4', nama: 'Penanaman Mangrove Pesisir Utara', lokasi: 'Kab. Bekasi', jenisBibit: ['Mangrove'], terkumpul: '0', status: 'Menunggu Verifikasi' }
];

const KabidProgramDonasi: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<ProgramData | null>(null);
  const [isVerifModalOpen, setIsVerifModalOpen] = useState(false);

  const filteredData = mockDataProgram.filter(program => 
    program.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenVerifikasi = (program: ProgramData) => {
    setSelectedProgram(program);
    setIsVerifModalOpen(true);
  };

  // ntar ini pakein id yeee di arrow functionnya
  const handleSetuju = () => {
    toast.success('Program berhasil disetujui!');
    setIsVerifModalOpen(false);
  };

  // ntar ini pakein id yeee di arrow functionnya
  const handleTolak = () => {
    toast.error('Pengajuan program ditolak.');
    setIsVerifModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Verifikasi Program Donasi</h1>
          <p className="text-sm md:text-base text-gray-500">Tinjau dan setujui pembukaan program donasi baru yang diajukan oleh Staff PDAS.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Cari program..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#DCECE0]/30 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-sm text-sm text-gray-700 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{program.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{program.lokasi}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                     <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${
                       program.status === 'Aktif' ? 'bg-[#2E7D32] text-white' : 
                       program.status === 'Selesai' ? 'bg-gray-200 text-gray-600' : 'bg-[#F2C94C] text-gray-800'
                     }`}>
                       {program.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    {program.status === 'Menunggu Verifikasi' ? (
                      <button 
                        onClick={() => handleOpenVerifikasi(program)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#185325] hover:bg-[#123d1c] text-white text-xs font-bold rounded-full transition-colors active:scale-95 shadow-sm"
                      >
                        <HiOutlineCheckBadge className="w-4 h-4" /> Verifikasi
                      </button>
                    ) : (
                      <button 
                        title="Lihat Detail"
                        className="p-1.5 text-gray-400 hover:text-[#2E7D32] transition-colors"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <VerifikasiProgramModal 
        isOpen={isVerifModalOpen} 
        onClose={() => setIsVerifModalOpen(false)} 
        program={selectedProgram}
        onSetuju={handleSetuju}
        onTolak={handleTolak}
      />
    </div>
  );
}

export default KabidProgramDonasi;