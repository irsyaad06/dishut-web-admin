import React, { useState } from "react";
import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineMap,
  HiOutlineGlobeAsiaAustralia,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import VerifikasiDonaturModal from "../DataDonatur/components/VerifikasiDonaturModal";
import type { DonaturData } from "@/utils/interface";

interface StatData {
  id: number;
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

interface VerificationData {
  id: number;
  companyName: string;
  detail: string;
}

interface ProgressData {
  id: number;
  title: string;
  collected: string;
  status: "Aktif" | "Selesai" | "Menunggu Verifikasi";
}

const STATS_DATA: StatData[] = [
  { id: 1, label: "Menunggu Verifikasi", value: 1, icon: HiOutlineExclamationCircle, iconColor: "text-amber-500", bgColor: "bg-amber-50" },
  { id: 2, label: "Bibit Siap Salur", value: 55, icon: HiOutlineCheckCircle, iconColor: "text-[#2E7D32]", bgColor: "bg-[#DCECE0]/50" },
  { id: 3, label: "Total Bibit Tertanam", value: 50, icon: HiOutlineGlobeAsiaAustralia, iconColor: "text-[#185325]", bgColor: "bg-[#DCECE0]/80" },
  { id: 4, label: "Program Aktif", value: 2, icon: HiOutlineMap, iconColor: "text-blue-600", bgColor: "bg-blue-50" },
];

const VERIFICATION_DATA: VerificationData[] = [
  { id: 1, companyName: "PT Hijau Bersama", detail: "500 Bibit - Pemulihan Lahan Kritis Cisadane" },
];

const PROGRESS_DATA: ProgressData[] = [
  { id: 1, title: "Penghijauan Hulu Citarum", collected: "8.500", status: "Aktif" },
  { id: 2, title: "Pemulihan Lahan Kritis Cisadane", collected: "2.000", status: "Aktif" },
  { id: 3, title: "Hutan Kota Ciliwung", collected: "2.000", status: "Selesai" },
  { id: 4, title: "Penanaman Mangrove Pesisir Utara", collected: "0", status: "Menunggu Verifikasi" },
];

const StatCard = ({ data }: { data: StatData }) => {
  const Icon = data.icon;
  return (
    <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div className={`w-12 h-12 rounded-lg ${data.bgColor} flex items-center justify-center mb-4 transition-colors`}>
        <Icon className={`w-7 h-7 ${data.iconColor}`} />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-1">{data.value}</h3>
        <p className="text-sm font-medium text-gray-500">{data.label}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: ProgressData["status"] }) => {
  const styles = {
    Aktif: "bg-[#2E7D32] text-white",
    Selesai: "bg-gray-200 text-gray-600",
    "Menunggu Verifikasi": "bg-[#F2C94C] text-gray-800",
  };
  return (
    <span className={`px-4 py-1.5 text-[11px] font-bold rounded-full whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
};

const DashboardProgram: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonatur, setSelectedDonatur] = useState<DonaturData | null>(null);

  const handleOpenVerifikasi = (item: VerificationData) => {
    const detailParts = item.detail.split(" - ");
    const jumlahBibitString = detailParts[0] ? detailParts[0].replace(/\D/g, "") : "0"; 
    const jumlahBibitNumber = parseInt(jumlahBibitString, 10); 
    const programName = detailParts[1] || "-";

    setSelectedDonatur({
      idTransaksi: `TRX-00${item.id}`,
      namaDonatur: item.companyName,
      program: programName,
      jumlahBibit: jumlahBibitNumber,
      status: "Menunggu Verifikasi"
    });
    
    setIsModalOpen(true);
  };

  const handleTerimaDonatur = () => {
    toast.success(`Donasi dari ${selectedDonatur?.namaDonatur} berhasil diverifikasi!`);
  };

  const handleTolakDonatur = () => {
    toast.error(`Donasi dari ${selectedDonatur?.namaDonatur} ditolak.`);
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto pb-8">
        <div className="mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Dashboard Realisasi Bibit dan Donasi
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Ringkasan performa program dan status verifikasi donatur.
          </p>
        </div>

        {/* STATISTIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS_DATA.map((stat) => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </div>

        {/* LIST SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pt-2">
          
          {/* DONATUR BUTUH VERIFIKASI */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#DCECE0]/20">
              <h2 className="font-bold text-gray-800">Donatur Butuh Verifikasi</h2>
              <span className="bg-[#F2C94C] text-gray-800 text-[11px] font-bold px-3 py-1 rounded-full">
                {VERIFICATION_DATA.length} Baru
              </span>
            </div>

            <div className="p-6 flex-1 bg-gray-50/50">
              {VERIFICATION_DATA.length > 0 ? (
                <div className="space-y-4">
                  {VERIFICATION_DATA.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#A5D6A7] transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-gray-800">{item.companyName}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                      </div>
                      
                      <button 
                        onClick={() => handleOpenVerifikasi(item)}
                        className="px-5 py-2 bg-[#185325] hover:bg-[#123d1c] text-white text-xs font-bold rounded-full cursor-pointer transition-colors active:scale-95 whitespace-nowrap shadow-sm"
                      >
                        Verifikasi Data
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  Tidak ada data verifikasi baru.
                </div>
              )}
            </div>
          </div>

          {/* PROGRESS PROGRAM */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-white">
              <h2 className="font-bold text-gray-800">Progress Program</h2>
            </div>

            <div className="p-0">
              <ul className="divide-y divide-gray-100">
                {PROGRESS_DATA.map((progress) => (
                  <li
                    key={progress.id}
                    className="p-6 hover:bg-gray-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-gray-800">{progress.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Total Terkumpul:{" "}
                        <span className="font-bold text-[#2E7D32]">
                          {progress.collected}
                        </span>{" "}
                        Bibit
                      </p>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={progress.status} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      <VerifikasiDonaturModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        donatur={selectedDonatur}
        onTerima={handleTerimaDonatur}
        onTolak={handleTolakDonatur}
      />
    </>
  );
};

export default DashboardProgram;