import React, { useState } from 'react';
import AkunTable, { type AkunType } from './components/AkunTable';
import AddAkunModal from './components/AddAccountModal';

const ManajemenAkun: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [akunList, setAkunList] = useState<AkunType[]>([
    {
      nama_pengguna: 'admin_utama',
      email: 'admin@example.com',
      nip: '198001012005011001'
    }
  ]);

  const handleSuccessAdd = (newAkun: AkunType) => {
    setAkunList((prev) => [newAkun, ...prev]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-2 w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Akun</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola data pengguna sistem SIGAP</p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-[#123d1c] transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#185325]"
        >
          + Tambah Akun Baru
        </button>
      </div>

      <AkunTable data={akunList} />

      <AddAkunModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccessAdd} 
      />
    </div>
  );
};

export default ManajemenAkun;