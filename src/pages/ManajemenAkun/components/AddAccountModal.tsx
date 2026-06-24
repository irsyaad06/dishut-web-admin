import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { registerAccount, type RegisterPayload } from '@/services/authService';

interface AddAkunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAkun: Omit<RegisterPayload, 'kata_sandi'>) => void;
}

const AddAkunModal: React.FC<AddAkunModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<RegisterPayload>({
    nama_pengguna: '',
    email: '',
    nip: '',
    kata_sandi: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Panggil service API yang sudah dipisah
      await registerAccount(formData);

      // Keluarkan password sebelum dilempar ke tabel (keamanan)
      const { kata_sandi, ...akunData } = formData;
      
      onSuccess(akunData); 
      onClose();
      setFormData({ nama_pengguna: '', email: '', nip: '', kata_sandi: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Tambah Akun Baru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pengguna</label>
            <input
              type="text"
              name="nama_pengguna"
              value={formData.nama_pengguna}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-greenAdmin focus:border-greenAdmin"
              placeholder="budi_santoso"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-greenAdmin focus:border-greenAdmin"
              placeholder="budi.santoso@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIP</label>
            <input
              type="text"
              name="nip"
              value={formData.nip}
              onChange={handleChange}
            //   required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-greenAdmin focus:border-greenAdmin"
              placeholder="198505152010011023"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
            <input
              type="password"
              name="kata_sandi"
              value={formData.kata_sandi}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-greenAdmin focus:border-greenAdmin"
              placeholder="Masukkan kata sandi"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#185325] rounded-md hover:bg-[#123d1c] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan Akun'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAkunModal;