import React from 'react';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2';

export interface AkunType {
  nama_pengguna: string;
  email: string;
  nip: string;
}

interface AkunTableProps {
  data: AkunType[];
}

const AkunTable: React.FC<AkunTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full min-w-200 text-sm text-left">
        <thead className="text-gray-700 bg-[#D5F0DE]">
          <tr>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">
              No
            </th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">
              Nama Pengguna
            </th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">
              Email
            </th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">
              NIP
            </th>
            <th scope="col" className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <p className="font-bold text-gray-800">{item.nama_pengguna}</p>
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                  {item.email}
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                  {item.nip}
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      title="Lihat Detail"
                      className="p-2 text-gray-400 hover:text-[#009262] hover:bg-[#EBF3E8] rounded-lg transition-colors"
                    >
                      <HiOutlineEye className="w-5 h-5" />
                    </button>
                    <button 
                      title="Hapus Data"
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
                Belum ada data akun.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AkunTable;