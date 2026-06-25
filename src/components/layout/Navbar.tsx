import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineBars3, 
  HiOutlineMagnifyingGlass, 
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineCog8Tooth,
  HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2';
import { getUserProfile, logoutAccount } from '@/services/authService'; 
import ConfirmAlert from '@/components/ConfirmAlert'; 
import { ToastError, ToastLoading, ToastSuccess } from "@/utils/toastHelper";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userName, setUserName] = useState<string>("Loading...");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        const formattedName = data.nama_pengguna
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
        setUserName(formattedName);
      } catch (error) {
        setUserName("Guest"); 
      }
    };
    fetchUserData();
  }, []);

  const executeLogout = async () => {
    setIsLogoutLoading(true);
    const loadingId = ToastLoading("Sedang keluar dari sistem...");

    try {
      await logoutAccount();
      ToastSuccess("Anda berhasil keluar", loadingId);
    } catch (error: any) {
      ToastError("Terjadi kesalahan saat keluar", loadingId);
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogoutLoading(false);
      setIsLogoutAlertOpen(false);
      navigate("/login"); 
    }
  };

  return (
    <>
      <header className="h-16 bg-white flex items-center justify-between px-4 md:px-6 border-b border-gray-100 shrink-0 z-10 relative">
        <div className="flex items-center flex-1 gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <HiOutlineBars3 className="w-6 h-6" />
          </button>

          <div className="hidden sm:block flex-1 max-w-md">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-[#185325] transition-colors">
                <HiOutlineMagnifyingGlass className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                placeholder="Cari.." 
                className="w-full bg-gray-50 text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none border border-transparent focus:border-[#185325] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <HiOutlineBell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 md:pr-2 md:pl-3 rounded-full md:rounded-lg transition-colors border border-transparent hover:border-gray-100"
            >
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-medium text-gray-700 capitalize">{userName}</span>
              </div>
              <img src="https://ui-avatars.com/api/?name=Admin&background=185325&color=fff" alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
              <HiOutlineChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#185325] hover:bg-[#D5F0DE]/40 transition-colors"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/admin/profile'); 
                  }}
                >
                  <HiOutlineUser className="w-5 h-5" /> Profile
                </button>
                
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#185325] hover:bg-[#D5F0DE]/40 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <HiOutlineCog8Tooth className="w-5 h-5" /> Pengaturan
                </button>
                
                <div className="my-1 border-t border-gray-100"></div>
                
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#185325] hover:bg-red-50 hover:text-red-600 transition-colors group"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsLogoutAlertOpen(true); 
                  }}
                >
                  <HiOutlineArrowRightOnRectangle className="w-5 h-5 group-hover:text-red-600" /> Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ConfirmAlert
        isOpen={isLogoutAlertOpen}
        title="Keluar Sistem?"
        message="Sesi Anda akan diakhiri dan Anda harus masuk kembali untuk mengakses sistem."
        isDanger={true}
        confirmText="Ya, Keluar"
        isLoading={isLogoutLoading}
        onConfirm={executeLogout}
        onCancel={() => setIsLogoutAlertOpen(false)}
      />
    </>
  );
};

export default Navbar;