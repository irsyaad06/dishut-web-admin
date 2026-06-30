import React, { useState } from 'react';
import { 
  HiOutlineEye, 
  HiOutlinePlus, 
  HiOutlineMagnifyingGlass,
  HiOutlineTrash
} from 'react-icons/hi2';

interface EvaluasiData {
  id: string;
  tglEvaluasi: string;
  blok: string;
  perusahaan: string;
  lokasi: string;
  target: number;
  tumbuh: number;
  rerataTinggi: number;
  persentase: number;
  status: 'Berhasil' | 'Tidak Berhasil';
  rekomendasi: string;
}

const mockDataEvaluasi: EvaluasiData[] = [
  {
    id: '1',
    tglEvaluasi: '2026-03-13',
    blok: 'PU 1',
    perusahaan: 'PT. Jawa Satu Power',
    lokasi: 'Desa Sudalarang, Kec. Sukawening, Garut',
    target: 110,
    tumbuh: 69,
    rerataTinggi: 98.11,
    persentase: 62.73,
    status: 'Tidak Berhasil',
    rekomendasi: 'Tidak berhasil. Direkomendasikan penyulaman kembali di lokasi yang merana/mati.'
  },
  {
    id: '2',
    tglEvaluasi: '2026-03-13',
    blok: 'PU 3',
    perusahaan: 'PT. Jawa Satu Power',
    lokasi: 'Desa Sudalarang, Kec. Sukawening, Garut',
    target: 110,
    tumbuh: 113,
    rerataTinggi: 101.94,
    persentase: 102.73,
    status: 'Berhasil',
    rekomendasi: 'Memenuhi standar permen (≥ 75%). Lanjutkan pemeliharaan rutin terukur.'
  },
  {
    id: '3',
    tglEvaluasi: '2026-03-13',
    blok: 'PU 10',
    perusahaan: 'PT. Jawa Satu Power',
    lokasi: 'Desa Sudalarang, Kec. Sukawening, Garut',
    target: 64,
    tumbuh: 49,
    rerataTinggi: 90.58,
    persentase: 76.56,
    status: 'Berhasil',
    rekomendasi: 'Memenuhi standar permen (≥ 75%). Lanjutkan pemeliharaan rutin terukur.'
  }
];

const DataEvaluasi: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockDataEvaluasi.filter((item) =>
    item.blok.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.perusahaan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Data Evaluasi Penanaman
          </h1>
          <p className="text-gray-500 text-sm">
            Rekapitulasi persentase komparasi target dan bibit hidup.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-[#009262] hover:bg-[#007a52] text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
            <HiOutlinePlus className="w-5 h-5" strokeWidth={2.5} />
            Buat Data Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <HiOutlineMagnifyingGlass className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Cari Petak, KTH, Desa, atau Jenis..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#009262] focus:border-[#009262] transition-all text-gray-700 placeholder-gray-400"
          />
        </div>
        
        <div className="text-sm text-gray-600">
          Ditemukan: <span className="font-bold text-gray-800">{filteredData.length} Petak Ukur (PU)</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full min-w-250 text-sm text-left">
            <thead className="text-gray-700 bg-[#D5F0DE]">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Tanggal Evaluasi</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Blok/Petak & KTH</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Rencana / Target</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Tumbuh / Hidup</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Rerata Tinggi (cm)</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Persentase Tumbuh</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap text-center">Status / Kategori</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold w-64">Rekomendasi Tindak Lanjut</th>
                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((data) => (
                  <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                      {data.tglEvaluasi}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <p className="font-bold text-gray-800">{data.blok}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{data.perusahaan}</p>
                      <p className="text-gray-400 text-xs truncate max-w-50">{data.lokasi}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                      {data.target} btg
                    </td>
                    <td className="px-4 md:px-6 py-4 font-bold text-[#009262] whitespace-nowrap">
                      {data.tumbuh} btg
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                      {data.rerataTinggi} cm
                    </td>
                    <td className="px-4 md:px-6 py-4 font-bold text-gray-800 whitespace-nowrap">
                      {data.persentase}%
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center whitespace-nowrap">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold ${
                        data.status === 'Berhasil' 
                          ? 'bg-[#D5F0DE] text-[#009262]' 
                          : 'bg-[#FDE2D3] text-[#D85B1A]'
                      }`}>
                        {data.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-500 text-xs leading-relaxed">
                      {data.rekomendasi}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          title="Lihat Detail"
                          className="p-2 text-gray-400 hover:text-[#009262] hover:bg-[#EBF3E8] rounded-lg transition-colors"
                        >
                          <HiOutlineEye className="w-5 h-5" />
                        </button>
                        <button 
                          title="Hapus Data"
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada Data!
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

export default DataEvaluasi;