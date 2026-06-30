import React, { useState } from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlinePlus, 
  HiOutlineEye, 
  HiOutlinePencil 
} from 'react-icons/hi2';
import DetailProgramModal from './components/DetailProgramModal';
import { useNavigate } from 'react-router-dom';
import type { ProgramData, StatusProgram } from '@/utils/interface';

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
  // Menyesuaikan sedikit ketebalan font dan padding agar sama dengan badge donatur
  const baseStyle = "px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap";
  
  switch (status) {
    case 'Aktif':
      return <span className={`${baseStyle} bg-[#2E7D32] text-white`}>Aktif</span>;
    case 'Selesai':
      return <span className={`${baseStyle} bg-gray-200 text-gray-600`}>Selesai</span>;
    case 'Menunggu Verifikasi':
      return <span className={`${baseStyle} bg-[#F2C94C] text-gray-800`}>Menunggu Verifikasi</span>;
    default:
      return null;
  }
};

const ProgramDonasi: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Data Program
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Membuka program dan menyesuaikan ketersediaan donasi bibit.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari program/lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#DCECE0]/30 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-sm text-sm text-gray-700"
            />
          </div>
          
          <button onClick={() => {navigate('/admin/donasi/program/create')}}
            className="bg-[#185325] hover:bg-[#123d1c] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap active:scale-95"
          >
            <HiOutlinePlus className="w-5 h-5" strokeWidth={2.5} />
            Buat Program
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4 whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 whitespace-nowrap">Jenis Bibit</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Terkumpul</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      {program.nama}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {program.lokasi}
                    </td>
                    
                    <td className="px-6 py-4 max-w-62.5">
                      <div className="flex flex-wrap gap-1.5">
                        {program.jenisBibit.map((bibit, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-md text-[11px] font-medium whitespace-nowrap shadow-sm"
                          >
                            {bibit}
                          </span>
                        ))}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] text-center whitespace-nowrap">
                      {program.terkumpul}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(program.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenDetail(program)} 
                          title="Lihat Detail"
                          className="p-1.5 text-gray-400 hover:text-[#2E7D32] transition-colors"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        <button 
                          title="Edit Program"
                          className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <HiOutlinePencil className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    Program tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DetailProgramModal 
        isOpen={selectedProgram !== null} 
        onClose={handleCloseDetail} 
        program={selectedProgram}
      />

    </div>
  );
}

export default ProgramDonasi;