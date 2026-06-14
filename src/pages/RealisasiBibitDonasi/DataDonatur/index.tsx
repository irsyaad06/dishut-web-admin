import { useState } from 'react';
import { Search } from 'lucide-react';

type StatusType = 'Terealisasi' | 'Disalurkan' | 'Terkumpul' | 'Menunggu Verifikasi';

interface DonaturData {
  idTransaksi: string;
  namaDonatur: string;
  program: string;
  jumlahBibit: number;
  status: StatusType;
}

const mockData: DonaturData[] = [
  { idTransaksi: 'TRX-101', namaDonatur: 'Ahmad Rifai', program: 'Penghijauan Hulu Citarum', jumlahBibit: 50, status: 'Terealisasi' },
  { idTransaksi: 'TRX-101', namaDonatur: 'Ahmad Rifai', program: 'Penghijauan Hulu Citarum', jumlahBibit: 50, status: 'Disalurkan' },
  { idTransaksi: 'TRX-101', namaDonatur: 'Ahmad Rifai', program: 'Penghijauan Hulu Citarum', jumlahBibit: 50, status: 'Terkumpul' },
  { idTransaksi: 'TRX-101', namaDonatur: 'Ahmad Rifai', program: 'Penghijauan Hulu Citarum', jumlahBibit: 50, status: 'Menunggu Verifikasi' },
];

const StatusBadge = ({ status }: { status: StatusType }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Menunggu Verifikasi':
        return 'bg-[#F2C94C] text-gray-800';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <span className={`px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const DataDonatur = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-customBlack mb-1">
            Data Donatur
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Lakukan pengecekan bukti transfer dan validasi data donatur.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari ID transaksi/nama"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder:text-sm text-sm text-gray-700"
          />
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#DCECE0] text-gray-700 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold whitespace-nowrap">ID Transaksi</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Nama Donatur</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Program</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-center">Jumlah (Bibit)</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap text-center">Aksi (Verifikasi)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{row.idTransaksi}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{row.namaDonatur}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{row.program}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] text-center whitespace-nowrap">
                    {row.jumlahBibit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                    {row.status === 'Menunggu Verifikasi' && (
                      <button className="px-3 py-1 bg-[#DCECE0] text-[#2E7D32] text-xs font-semibold rounded-md hover:bg-[#C8E0CD] transition-colors">
                        Proses Verifikasi
                      </button>
                    )}
                    <button className="text-[#2E7D32] text-sm font-bold hover:underline underline-offset-2">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DataDonatur;