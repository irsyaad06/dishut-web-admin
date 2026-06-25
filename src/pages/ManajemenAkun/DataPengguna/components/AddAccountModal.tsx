import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { registerAccount } from "@/services/authService";
import { getAllRoles } from "@/services/rbac.service";
import type { RegisterPayload, RoleType } from "@/utils/interface";
import ConfirmAlert from "@/components/ConfirmAlert";
import { ToastError, ToastLoading, ToastSuccess } from "@/utils/toastHelper";

interface AddAkunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddAkunModal: React.FC<AddAkunModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<RegisterPayload>({
    nama_pengguna: "", email: "", nip: "", kata_sandi: "", peran: "",
  });
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchRoles = async () => {
        setIsLoadingRoles(true);
        try {
          const data = await getAllRoles();
          setRoles(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingRoles(false);
        }
      };
      fetchRoles();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlertOpen(true);
  };

  const executeSubmit = async () => {
    setIsAlertOpen(false);
    setIsLoading(true);
    const loadingId = ToastLoading("Menyimpan akun baru...");

    try {
      await registerAccount(formData);
      ToastSuccess("Akun berhasil ditambahkan!", loadingId);
      onSuccess();
      onClose();
      setFormData({ nama_pengguna: "", email: "", nip: "", kata_sandi: "", peran: "" });
    } catch (err: any) {
      ToastError(err.message || "Gagal menyimpan akun", loadingId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
          <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Tambah Akun Baru</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Pengguna</label>
              <input type="text" name="nama_pengguna" value={formData.nama_pengguna} onChange={handleChange} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325]" placeholder="budi_santoso" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325]" placeholder="budi.santoso@contoh.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">NIP</label>
              <input type="text" name="nip" value={formData.nip} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325]" placeholder="198505152010011023" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Peran (Role)</label>
              <select name="peran" value={formData.peran} onChange={handleChange} required disabled={isLoadingRoles} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] disabled:opacity-60 cursor-pointer">
                <option value="" disabled>{isLoadingRoles ? "Memuat role..." : "Pilih peran akun"}</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nama}>{role.nama.replace(/_/g, " ").toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kata Sandi</label>
              <input type="password" name="kata_sandi" value={formData.kata_sandi} onChange={handleChange} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325]" placeholder="Masukkan kata sandi" />
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-slate-100">
              <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 active:scale-95 transition-all">Batal</button>
              <button type="submit" disabled={isLoading} className="px-5 py-2.5 text-sm font-semibold text-white bg-[#185325] rounded-xl hover:bg-[#123d1c] shadow-lg shadow-[#185325]/30 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center min-w-30">
                {isLoading ? "Memproses..." : "Simpan Akun"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmAlert
        isOpen={isAlertOpen}
        title="Simpan Akun?"
        message={`Apakah data untuk pengguna "${formData.nama_pengguna}" sudah benar?`}
        isDanger={false}
        isLoading={isLoading}
        onConfirm={executeSubmit}
        onCancel={() => setIsAlertOpen(false)}
      />
    </>
  );
};

export default AddAkunModal;