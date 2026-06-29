import React, { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/authService'; 
import { HiOutlineUser, HiOutlineIdentification, HiOutlineCalendarDays } from 'react-icons/hi2';
import { MdOutlineMail } from "react-icons/md";
import type { UserProfile } from '@/utils/interface';

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfileData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat profil...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!profileData) return null;

  const formattedDate = new Date(profileData.dibuat_pada).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="p-4 md:p-6 lg:p-2 w-full mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profil Pengguna</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola informasi data diri Anda</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-primary h-32 w-full relative">
          <div className="absolute -bottom-12 left-8">
            <img 
              src={`https://ui-avatars.com/api/?name=${profileData.nama_pengguna}&background=D5F0DE&color=185325&size=128&bold=true`} 
              alt="Avatar" 
              className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white shadow-md"
            />
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {profileData.nama_pengguna.replace(/_/g, ' ')}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileData.peran && profileData.peran.length > 0 ? (
              profileData.peran.map((role) => (
                <span key={role.id}className="inline-block px-3 py-1 text-xs font-semibold text-black bg-secondary rounded-full uppercase tracking-wider">
                  {role.nama}
                </span>
              ))
            ) : (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full">
                Belum ada peran
              </span>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="p-2 bg-white rounded-md shadow-sm text-primary">
                <HiOutlineUser className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Username</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{profileData.nama_pengguna}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="p-2 bg-white rounded-md shadow-sm text-primary">
                <MdOutlineMail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Email Address</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{profileData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="p-2 bg-white rounded-md shadow-sm text-primary">
                <HiOutlineIdentification className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Nomor Induk Pegawai (NIP)</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{profileData.nip}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="p-2 bg-white rounded-md shadow-sm text-primary">
                <HiOutlineCalendarDays className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Terdaftar Sejak</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{formattedDate}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;