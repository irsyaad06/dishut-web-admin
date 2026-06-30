import React from 'react';

interface Report {
  id: number;
  title: string;
  date: string;
  author: string;
}

const reportsData: Report[] = [
  { id: 1, title: 'Laporan Dampak: Penanaman Ciliwung Tahap 1', date: '15 Mei 2026', author: 'Staff PDAS - Andi' },
  { id: 2, title: 'Laporan Dampak: Distribusi Bibit Citarum Hulu', date: '14 Mei 2026', author: 'Staff PDAS - Sari' },
  { id: 3, title: 'Laporan Evaluasi Penghijauan Cisarua', date: '24 Mei 2026', author: 'Staff PDAS - Rani' },
];

const RecentReportsTable: React.FC = () => {
  return (
    <div className="mt-4">
      <h3 className="text-base font-bold text-gray-800 mb-4">Laporan Terbaru</h3>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#DCECE0] text-[#3A4D3F] text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4 whitespace-nowrap">Laporan</th>
                <th className="px-6 py-4 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4 whitespace-nowrap">Penyusun</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportsData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {report.author}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#2E7D32] cursor-pointer hover:underline text-center whitespace-nowrap">
                    Lihat Laporan
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

export default RecentReportsTable;