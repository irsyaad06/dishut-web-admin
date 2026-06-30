import React from 'react';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlinePresentationChartLine,
  HiOutlineExclamationCircle,
  HiOutlineClock
} from 'react-icons/hi2';
import StatCard from '@/components/StatCard'; 

const DashboardMonitoring: React.FC = () => {
  const statsData = [
    {
      title: 'Jumlah Kegiatan',
      value: '6',
      colorTheme: 'blue' as const,
      icon: <HiOutlineClipboardDocumentList className="w-6 h-6" />
    },
    {
      title: 'Kegiatan Selesai',
      value: '1',
      colorTheme: 'green' as const,
      icon: <HiOutlineCheckCircle className="w-6 h-6" />
    },
    {
      title: 'Kegiatan Berjalan',
      value: '4',
      colorTheme: 'orange' as const,
      icon: <HiOutlinePresentationChartLine className="w-6 h-6" />
    },
    {
      title: 'Kegiatan Bermasalah',
      value: '1',
      colorTheme: 'red' as const,
      icon: <HiOutlineExclamationCircle className="w-6 h-6" />
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Dashboard Monitoring
          </h1>
          <p className="text-gray-500 text-sm">
            Ringkasan status kegiatan monitoring berbasis bukti
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-600 whitespace-nowrap w-fit">
          <HiOutlineClock className="w-4 h-4 text-gray-400" />
          <span>Update terakhir: 28 April 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            colorTheme={stat.colorTheme}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Peta Sebaran Kegiatan</h2>
          <p className="text-sm text-gray-500">Visualisasi lokasi kegiatan berdasarkan koordinat laporan</p>
        </div>
        
        <div className="relative w-full h-100 md:h-125 lg:h-150 bg-[#EBF3FA]">
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 p-3 z-10 flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-4 h-2.5 rounded-sm bg-green-500"></span>
              Berjalan
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-2.5 rounded-sm bg-orange-400"></span>
              Selesai
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-2.5 rounded-sm bg-red-500"></span>
              Bermasalah
            </div>
          </div>

          <div className="w-full h-full flex items-center justify-center">
             <span className="text-gray-400 text-sm border-2 border-dashed border-gray-300 px-6 py-3 rounded-xl">
               [Integrasi Komponen Peta GIS di Sini]
             </span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default DashboardMonitoring;