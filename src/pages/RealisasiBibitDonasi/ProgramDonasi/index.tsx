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

// Fungsi untuk menentukan warna badge berdasarkan status
const getStatusBadge = (status: StatusProgram) => {
  switch (status) {
    case 'Aktif':
      return <span className="bg-[#34A853] text-white px-3 py-1 rounded-full text-xs font-semibold">Aktif</span>;
    case 'Selesai':
      return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">Selesai</span>;
    case 'Menunggu Verifikasi':
      return <span className="bg-[#F4B400] text-white px-3 py-1 rounded-full text-xs font-semibold">Menunggu Verifikasi</span>;
    default:
      return null;
  }
};

const ProgramDonasi: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fitur pencarian sederhana
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
          <p className="text-greyadmin text-sm">
            Membuka program dan menyesuaikan ketersediaan donasi bibit.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <HiOutlineMagnifyingGlass className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="Cari program/lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-customWhite border border-gray-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-customBlack placeholder-gray-400"
            />
          </div>
          
          {/* Button Buat Program */}
          <button className="bg-[#34A853] hover:bg-[#2b8c45] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
            <HiOutlinePlus className="w-5 h-5" strokeWidth={2.5} />
            Buat Program
          </button>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-customWhite rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full min-w-200 text-sm text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Program</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Terkumpul</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-customBlack">
                      {program.nama}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {program.lokasi}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#34A853]">
                      {program.terkumpul}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(program.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button 
                          title="Lihat Detail"
                          className="p-1.5 text-gray-500 hover:text-primary hover:bg-greenAdmin rounded-md transition-colors"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        <button 
                          title="Edit Program"
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <HiOutlinePencil className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
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