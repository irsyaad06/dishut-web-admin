import React from 'react';
import SummaryCard from './components/SummaryCard'; 
import GrowthChart from './components/GrowthChart'; 
import RecentReportsTable from './components/RecentReportTable';

const DashboardProgramKabid: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
      
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">Dashboard Realisasi Bibit dan Donasi</h1>
        <p className="text-sm md:text-base text-slate-500">Ringkasan performa dan laporan realisasi penghijauan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <SummaryCard 
          title="Total Dana CSR/Donasi" 
          value="Rp 10.375.000" 
          subtext="+15% dari bulan lalu" 
        />
        <SummaryCard 
          title="Bibit Terealisasi" 
          value="50" 
          subtext="Pohon Ditanam" 
        />
        <SummaryCard 
          title="Lahan Menghijau" 
          value="85 Ha" 
          subtext="Total di 5 Kabupaten" 
        />
      </div>

      <GrowthChart />

      <RecentReportsTable />

    </div>
  );
}

export default DashboardProgramKabid;