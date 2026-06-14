import React, { useState } from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlinePlus, 
  HiOutlineEye, 
  HiOutlinePencil 
} from 'react-icons/hi2';

type StatusProgram = 'Aktif' | 'Selesai' | 'Menunggu Verifikasi';

interface ProgramData {
  id: string;
  nama: string;
  lokasi: string;
  terkumpul: string;
  status: StatusProgram;
}

const mockDataProgram: ProgramData[] = [
  {
    id: '1',
    nama: 'Penghijauan Hulu Citarum',
    lokasi: 'Kab. Bandung',
    terkumpul: '8.500',
    status: 'Aktif'
  },
  {
    id: '2',
    nama: 'Pemulihan Lahan Kritis Cisadane',
    lokasi: 'Kab. Bogor',
    terkumpul: '2.000',
    status: 'Aktif'
  },
  {
    id: '3',
    nama: 'Hutan Kota Ciliwung',
    lokasi: 'Jakarta Selatan',
    terkumpul: '2.000',
    status: 'Selesai'
  },
  {
    id: '4',
    nama: 'Penanaman Mangrove Pesisir Utara',
    lokasi: 'Kab. Bekasi',
    terkumpul: '0',
    status: 'Menunggu Verifikasi'
  }
];

// Disesuaikan agar style padding, font, dan warna senada dengan DataDonatur
const getStatusBadge = (status: StatusProgram) => {
  const baseStyle = "px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap";
  
  switch (status) {
    case 'Aktif':
      return <span className={`${baseStyle} bg-[#DCECE0] text-[#2E7D32]`}>Aktif</span>;
    case 'Selesai':
      return <span className={`${baseStyle} bg-gray-200 text-gray-600`}>Selesai</span>;
    case 'Menunggu Verifikasi':
      return <span className={`${baseStyle} bg-[#F2C94C] text-gray-800`}>Menunggu Verifikasi</span>;
    default:
      return null;
  }
};

const ProgramDonasi: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockDataProgram.filter(program => 
    program.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-customBlack mb-1">
            Data Program
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Membuka program dan menyesuaikan ketersediaan donasi bibit.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari program/lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-sm text-sm text-gray-700"
            />
          </div>
          
          {/* Button Buat Program */}
          <button className="bg-[#2E7D32] hover:bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
            <HiOutlinePlus className="w-5 h-5" strokeWidth={2.5} />
            Buat Program
          </button>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Header tabel disamakan dengan DataDonatur */}
              <tr className="bg-[#DCECE0] text-gray-700 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Nama Program</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Lokasi</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-center">Terkumpul</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {program.nama}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {program.lokasi}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] text-center whitespace-nowrap">
                      {program.terkumpul}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(program.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                      <button 
                        title="Lihat Detail"
                        className="text-gray-400 hover:text-[#2E7D32] transition-colors"
                      >
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                      <button 
                        title="Edit Program"
                        className="text-gray-400 hover:text-[#2E7D32] transition-colors"
                      >
                        <HiOutlinePencil className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    Program tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default ProgramDonasi;