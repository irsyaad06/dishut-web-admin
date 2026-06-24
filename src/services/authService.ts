export interface RegisterPayload {
  nama_pengguna: string;
  email: string;
  nip: string;
  kata_sandi: string;
}

export interface LoginPayload {
  login: string; 
  kata_sandi: string;
}

export interface UserProfile {
  id: number;
  nama_pengguna: string;
  email: string;
  nip: string;
  peran: any[];
  dibuat_pada: string;
  diperbarui_pada: string;
}

export const registerAccount = async (data: RegisterPayload) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseText = await response.text();
    if (responseText.trim().startsWith('<')) {
      console.error("Respons dari server berupa HTML, bukan JSON:", responseText);
      throw new Error("Gagal terhubung ke API: Server mengembalikan halaman HTML. Cek terminal Vite Anda atau pastikan URL API sudah benar.");
    }
    const responseData = JSON.parse(responseText);

    if (!response.ok) {
      throw new Error(responseData?.message || 'Gagal menambahkan akun. Silakan coba lagi.');
    }

    return responseData;
  } catch (error: any) {
    throw new Error(error.message || 'Terjadi kesalahan pada sistem');
  }
};

export const loginAccount = async (data: LoginPayload) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();

    if (responseText.trim().startsWith('<')) {
      throw new Error("Gagal terhubung ke API: Server mengembalikan halaman HTML. Pastikan proxy Vite berjalan.");
    }

    const responseData = JSON.parse(responseText);

    if (!response.ok || responseData.code !== 200) {
      throw new Error(responseData?.message || 'Login gagal. Periksa kembali data Anda.');
    }

    return responseData; 
  } catch (error: any) {
    throw new Error(error.message || 'Terjadi kesalahan pada sistem');
  }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Sesi telah habis, silakan login kembali.");
    }

    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const responseText = await response.text();

    if (responseText.trim().startsWith('<')) {
      throw new Error("Server mengembalikan HTML, cek proxy Vite.");
    }

    const responseData = JSON.parse(responseText);

    if (!response.ok || responseData.code !== 200) {
      throw new Error(responseData?.message || 'Gagal mengambil data user.');
    }

    return responseData.payload;
  } catch (error: any) {
    throw new Error(error.message || 'Terjadi kesalahan pada sistem');
  }
};

export const logoutAccount = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return; 
    await fetch('/api/auth/logout', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  } catch (error) {
    console.error("Gagal melakukan logout di sisi server:", error);
  }
};