import { useState } from 'react';
import { mockReports } from './data';
import ReportCard from './components/ReportCard';
import EmptyStateDetail from './components/EmptyStateDetail';
import ActiveDetail from './components/ActiveDetail';

const VerifikasiMonitoring = () => {
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  const activeReport = mockReports.find(report => report.id === activeReportId);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Verifikasi Monitoring
        </h1>
        <p className="text-gray-500 text-sm">
          Otorisasi dan validasi data lapangan berbasis koordinat
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <h2 className="text-xs font-bold text-gray-400 tracking-wider mb-1">DATA MONITORING MASUK</h2>
          <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar lg:max-h-200 pr-1">
            {mockReports.map((report) => (
              <ReportCard 
                key={report.id} 
                report={report} 
                isActive={activeReportId === report.id}
                onClick={() => setActiveReportId(report.id)}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/3 sticky top-6">
          {activeReport ? (
            <ActiveDetail report={activeReport} />
          ) : (
            <EmptyStateDetail />
          )}
        </div>

      </div>
    </div>
  );
};

export default VerifikasiMonitoring;