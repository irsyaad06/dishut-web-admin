import React from "react";
import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "@/utils/interface";

interface AkunTableProps {
  data: UserProfile[];
  isLoading?: boolean;
  onEdit: (user: UserProfile) => void;
  // onDelete: (user: UserProfile) => void;
}

const AkunTable: React.FC<AkunTableProps> = ({ data, isLoading = false, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-100">
      <table className="w-full min-w-200 text-sm text-left">
        <thead className="text-slate-700 bg-[#D5F0DE] border-b border-slate-100">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">No</th>
            <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Nama Pengguna</th>
            <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Email</th>
            <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">NIP</th>
            <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">Peran Pengguna (Role)</th>
            <th scope="col" className="px-6 py-4 font-semibold whitespace-nowrap text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-slate-500">Memuat data...</td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-bold text-slate-800">{item.nama_pengguna}</p>
                </td>
                <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                  {item.nip ? <span className="text-xs font-medium">{item.nip}</span> : <span className="text-slate-400 italic">Tidak ada NIP</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.peran && item.peran.length > 0 && item.peran[0] ? (
                    <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
                      {item.peran[0].nama?.replace(/_/g, " ")}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Tidak ada peran</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      title="Lihat Detail"
                      onClick={() => navigate(`/admin/manajemen-akun/detail/${item.id}`)}
                      className="p-2 text-slate-400 hover:text-[#009262] hover:bg-[#EBF3E8] rounded-xl transition-colors"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                    <button
                      title="Edit Data"
                      onClick={() => onEdit(item)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      <HiOutlinePencilSquare className="w-5 h-5" />
                    </button>
                    <button
                      title="Hapus Data"
                      // onClick={() => onDelete(item)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-slate-500">Belum ada data akun.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AkunTable;