export interface RegisterPayload {
  nama_pengguna: string;
  email: string;
  nip: string;
  kata_sandi: string;
  peran: string;
}

export interface LoginPayload {
  login: string; 
  kata_sandi: string;
}

export interface UpdateUserPayload {
  nama_pengguna: string;
  email: string;
  nip: string;
  kata_sandi?: string; 
  peran: string;
}

export interface PermissionType {
  id: number;
  nama: string;
  nama_penjaga: string;
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface RoleType {
  id: number;
  nama: string;
  nama_penjaga: string;
  izin?: PermissionType[];
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface UserProfile {
  id: number;
  nama_pengguna: string;
  email: string;
  nip: string;
  peran: RoleType[];
  dibuat_pada: string;
  diperbarui_pada: string;
}