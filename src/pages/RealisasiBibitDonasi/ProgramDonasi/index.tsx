import React, { useState } from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlinePlus, 
  HiOutlineEye, 
  HiOutlinePencil 
} from 'react-icons/hi2';
import CreateProgramModal from './components/CreateProgramModal';
import DetailProgramModal from './components/DetailProgramModal'; // Asumsi ProgramData dipindahkan ke sini atau disinkronkan

type StatusProgram = 'Aktif' | 'Selesai' | 'Menunggu Verifikasi';

export interface ProgramData {
  id: string;
  nama: string;
  lokasi: string;
  jenisBibit: string[]; // Penambahan tipe data untuk jenis bibit
  terkumpul: string;
  status: StatusProgram;
}

const mockDataProgram: ProgramData[] = [
  {
    id: '1',
    nama: 'Penghijauan Hulu Citarum',
    lokasi: 'Kab. Bandung',
    jenisBibit: ['Mahoni', 'Sengon', 'Trembesi'],
    terkumpul: '8.500',
    status: 'Aktif'
  },
  {
    id: '2',
    nama: 'Pemulihan Lahan Kritis Cisadane',
    lokasi: 'Kab. Bogor',
    jenisBibit: ['Mangrove', 'Pucuk Merah'],
    terkumpul: '2.000',
    status: 'Aktif'
  },
  {
    id: '3',
    nama: 'Hutan Kota Ciliwung',
    lokasi: 'Jakarta Selatan',
    jenisBibit: ['Trembesi', 'Beringin'],
    terkumpul: '2.000',
    status: 'Selesai'
  },
  {
    id: '4',
    nama: 'Penanaman Mangrove Pesisir Utara',
    lokasi: 'Kab. Bekasi',
    jenisBibit: ['Mangrove'],
    terkumpul: '0',
    status: 'Menunggu Verifikasi'
  }
];

const getStatusBadge = (status: StatusProgram) => {
  const baseStyle = "px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap";
  
  switch (status) {
    case 'Aktif':
      return <span className={`${baseStyle} bg-[#009262] text-white`}>Aktif</span>;
    case 'Selesai':
      return <span className={`${baseStyle} bg-slate-100 text-slate-600`}>Selesai</span>;
    case 'Menunggu Verifikasi':
      return <span className={`${baseStyle} bg-amber-500 text-white`}>Menunggu Verifikasi</span>;
    default:
      return null;
  }
};

const ProgramDonasi: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramData | null>(null);

  const filteredData = mockDataProgram.filter(program => 
    program.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDetail = (program: ProgramData) => {
    setSelectedProgram(program);
  };

  const handleCloseDetail = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="relative flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
            Data Program
          </h1>
          <p className="text-sm md:text-base text-slate-500">
            Membuka program dan menyesuaikan ketersediaan donasi bibit.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari program/lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009262] focus:border-transparent transition-all placeholder:text-sm text-sm text-slate-700 shadow-sm"
            />
          </div>
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#185325] hover:bg-[#123d1c] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap active:scale-95"
          >
            <HiOutlinePlus className="w-5 h-5" strokeWidth={2.5} />
            Buat Program
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Jenis Bibit</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Terkumpul</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((program) => (
                  <tr key={program.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 text-sm font-bold text-slate-800 whitespace-nowrap">
                      {program.nama}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 whitespace-nowrap">
                      {program.lokasi}
                    </td>
                    
                    <td className="px-6 py-5 max-w-62.5">
                      <div className="flex flex-wrap gap-1.5">
                        {program.jenisBibit.map((bibit, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-[11px] font-medium whitespace-nowrap shadow-sm"
                          >
                            {bibit}
                          </span>
                        ))}
                      </div>
                    </td>
                    
                    <td className="px-6 py-5 text-sm font-bold text-[#009262] text-center whitespace-nowrap">
                      {program.terkumpul}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      {getStatusBadge(program.status)}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenDetail(program)} 
                          title="Lihat Detail"
                          className="p-2 text-slate-400 hover:text-[#009262] hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        <button 
                          title="Edit Program"
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <HiOutlinePencil className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500">
                    Program tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateProgramModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      <DetailProgramModal 
        isOpen={selectedProgram !== null} 
        onClose={handleCloseDetail} 
        program={selectedProgram}
      />

    </div>
  );
}

export default ProgramDonasi;