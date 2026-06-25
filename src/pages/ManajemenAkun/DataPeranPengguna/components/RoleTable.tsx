import React from "react";
import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"; 
import type { RoleType } from "@/utils/interface";

interface RoleTableProps {
  data: RoleType[];
  isLoading?: boolean;
  onEdit: (role: RoleType) => void;
  onDelete: (role: RoleType) => void; 
}

const RoleTable: React.FC<RoleTableProps> = ({ data, isLoading = false, onEdit, onDelete }) => {
  const navigate = useNavigate(); 

  const capitalizeWords = (text: string) => {
    return text
      .replace(/-/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full min-w-200 text-sm text-left">
        <thead className="text-gray-700 bg-[#D5F0DE]">
          <tr>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">No</th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Nama Peran (Role)</th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Nama Penjaga (Guard)</th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Daftar Izin (Permissions)</th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Memuat data peran...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-gray-800 uppercase">
                    {item.nama.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600">
                    {capitalizeWords(item.nama_penjaga)}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 max-w-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {item.izin && item.izin.length > 0 ? (
                      item.izin.map((izinItem) => (
                        <span
                          key={izinItem.id}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100"
                        >
                          {capitalizeWords(izinItem.nama)}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic text-xs">
                        Tidak ada izin spesifik
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      title="Lihat Detail"
                      onClick={() => navigate(`/admin/manajemen-akun/data-peran-pengguna/detail/${item.id}`)}
                      className="p-2 text-gray-400 hover:text-[#009262] hover:bg-[#EBF3E8] rounded-lg transition-colors"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>

                    <button
                      title="Edit Peran"
                      onClick={() => onEdit(item)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <HiOutlinePencilSquare className="w-5 h-5" />
                    </button>
                    
                    <button
                      title="Hapus Peran"
                      onClick={() => onDelete(item)}
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
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Belum ada data peran.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;