import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { updateUser } from "@/services/authService";
import type { RoleType, UpdateUserPayload, UserProfile } from "@/utils/interface";
import ConfirmAlert from "@/components/ConfirmAlert";
import { ToastError, ToastLoading, ToastSuccess } from "@/utils/toastHelper";
import { getAllRoles } from "@/services/rbac.service";

interface EditAkunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userData: UserProfile | null;
}

const EditAkunModal: React.FC<EditAkunModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  userData,
}) => {
  const [formData, setFormData] = useState<UpdateUserPayload>({
    nama_pengguna: "",
    email: "",
    nip: "",
    kata_sandi: "",
    peran: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

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

  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        nama_pengguna: userData.nama_pengguna || "",
        email: userData.email || "",
        nip: userData.nip || "",
        kata_sandi: "",
        peran: userData.peran && userData.peran.length > 0 ? userData.peran[0].nama : "" 
      });
    }
  }, [isOpen, userData]);

  if (!isOpen || !userData) return null;

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
    const loadingId = ToastLoading("Memperbarui akun...");

    try {
      const payload = { ...formData };
      if (!payload.kata_sandi) delete payload.kata_sandi;

      await updateUser(userData.id, payload);
      ToastSuccess("Akun berhasil diperbarui!", loadingId);
      onSuccess();
      onClose();
    } catch (err: any) {
      ToastError(err.message || "Gagal memperbarui akun", loadingId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
          <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Edit Pengguna</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nama Pengguna
              </label>
              <input
                type="text"
                name="nama_pengguna"
                value={formData.nama_pengguna}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                NIP
              </label>
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Peran (Role)
              </label>
              <select
                name="peran"
                value={formData.peran}
                onChange={handleChange}
                required
                disabled={isLoadingRoles}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#185325]/20 focus:border-[#185325] disabled:opacity-60 cursor-pointer"
              >
                <option value="" disabled>
                  {isLoadingRoles ? "Memuat role..." : "Pilih peran akun"}
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nama}>
                    {role.nama.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Kata Sandi Baru{" "}
                <span className="font-normal text-slate-400">(Opsional)</span>
              </label>
              <input
                type="password"
                name="kata_sandi"
                value={formData.kata_sandi}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Kosongkan jika tidak diubah"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary shadow-lg shadow-blue-600/30 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : "Perbarui Akun"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmAlert
        isOpen={isAlertOpen}
        title="Perbarui Akun?"
        message={`Simpan perubahan untuk pengguna "${userData.nama_pengguna}"?`}
        isDanger={false}
        isLoading={isLoading}
        onConfirm={executeSubmit}
        onCancel={() => setIsAlertOpen(false)}
      />
    </>
  );
};

export default EditAkunModal;
