import type { DonaturData, StatusType } from '@/utils/interface';
import React, { useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

interface DetailDonaturModalProps {
  isOpen: boolean;
  onClose: () => void;
  donatur: DonaturData | null;
}

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const StatusBadgeModal = ({ status }: { status: StatusType }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Menunggu Verifikasi':
        return 'bg-[#F2C94C] text-gray-800';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const DetailDonaturModal: React.FC<DetailDonaturModalProps> = ({ 
  isOpen, 
  onClose, 
  donatur 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !donatur) return null;

  const tanggal = donatur.tanggalDonasi || "2026-05-10";
  const nominal = donatur.totalNominal || (donatur.jumlahBibit * 15000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-112.5 bg-white rounded-[20px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl font-bold text-gray-800">Detail Donatur</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-8 space-y-5">
          
          <div className="flex gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800 mb-1">ID Transaksi</h3>
              <p className="text-sm text-gray-500">{donatur.idTransaksi}</p>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Tanggal Donasi</h3>
              <p className="text-sm text-gray-500">{tanggal}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Nama Donatur</h3>
              <p className="text-sm text-gray-500">{donatur.namaDonatur}</p>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-gray-800 mb-2">Status</h3>
              <div className="self-start">
                  <StatusBadgeModal status={donatur.status} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">Program Tujuan</h3>
            <p className="text-sm font-medium text-[#2E7D32]">{donatur.program}</p>
          </div>

          <div className="bg-[#DCECE0] rounded-xl p-4 flex flex-col gap-1 mt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3A4D3F]">Jumlah Bibit:</span>
              <span className="font-bold text-primary">{donatur.jumlahBibit} Bibit</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3A4D3F]">Total Nominal:</span>
              <span className="font-bold text-primary">{formatRupiah(nominal)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Bukti Pembayaran</h3>
            <div className="w-full h-32 bg-[#EAEAEA] rounded-xl flex items-center justify-center">
               {/* Ganti div kosong ini dengan tag <img src={urlBuktiBayar} /> jika sudah ada URL */}
               <span className="text-gray-400 text-sm">Preview Bukti</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailDonaturModal;