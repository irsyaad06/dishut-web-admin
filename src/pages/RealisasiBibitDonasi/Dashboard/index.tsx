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
  { id: 1, label: "Menunggu Verifikasi", value: 1, icon: HiOutlineExclamationCircle, iconColor: "text-orange-500" },
  { id: 2, label: "Bibit Siap Salur", value: 55, icon: HiOutlineCheckCircle, iconColor: "text-emerald-500" },
  { id: 3, label: "Total Bibit Tertanam", value: 50, icon: HiOutlineGlobeAsiaAustralia, iconColor: "text-emerald-600" },
  { id: 4, label: "Program Aktif", value: 2, icon: HiOutlineMap, iconColor: "text-blue-500" },
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
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <Icon className={`w-7 h-7 mb-4 ${data.iconColor}`} />
      <div>
        <h3 className="text-3xl font-bold text-slate-800 mb-1">{data.value}</h3>
        <p className="text-sm font-medium text-slate-500">{data.label}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: ProgressData["status"] }) => {
  const styles = {
    Aktif: "bg-[#009262] text-white",
    Selesai: "bg-slate-100 text-slate-600",
    "Menunggu Verifikasi": "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

const DashboardProgram: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonatur, setSelectedDonatur] = useState<DonaturData | null>(null);

const handleOpenVerifikasi = (item: VerificationData) => {
    const detailParts = item.detail.split(" - ");
    
    // Ekstrak string angka ("500")
    const jumlahBibitString = detailParts[0] ? detailParts[0].replace(/\D/g, "") : "0"; 
    
    // Ubah "500" menjadi angka nyata 500
    const jumlahBibitNumber = parseInt(jumlahBibitString, 10); 
    
    const programName = detailParts[1] || "-";

    setSelectedDonatur({
      idTransaksi: `TRX-00${item.id}`,
      namaDonatur: item.companyName,
      program: programName,
      jumlahBibit: jumlahBibitNumber, // <-- Masukkan variabel yang sudah jadi number
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
      <div className="flex flex-col gap-6 w-full max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-2">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Dashboard Realisasi Bibit dan Donasi
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS_DATA.map((stat) => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pt-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Donatur Butuh Verifikasi</h2>
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {VERIFICATION_DATA.length} Baru
              </span>
            </div>

            <div className="p-6 flex-1 bg-slate-50/50">
              {VERIFICATION_DATA.length > 0 ? (
                <div className="space-y-4">
                  {VERIFICATION_DATA.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800">{item.companyName}</h4>
                        <p className="text-sm text-slate-500 mt-1">{item.detail}</p>
                      </div>
                      
                      <button 
                        onClick={() => handleOpenVerifikasi(item)}
                        className="px-5 py-2.5 bg-[#009262] hover:bg-[#007a52] text-white text-sm font-semibold rounded-full cursor-pointer transition-colors active:scale-95 whitespace-nowrap shadow-sm shadow-[#009262]/20"
                      >
                        Verifikasi
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  Tidak ada data verifikasi baru.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Progress Program</h2>
            </div>

            <div className="p-0">
              <ul className="divide-y divide-slate-100">
                {PROGRESS_DATA.map((progress) => (
                  <li
                    key={progress.id}
                    className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-slate-800">{progress.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Total Terkumpul:{" "}
                        <span className="font-semibold text-[#009262]">
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