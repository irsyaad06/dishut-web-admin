import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HiOutlineHome, 
  HiOutlineChartBar, 
  HiOutlineComputerDesktop, 
  HiOutlineGlobeAlt,
  HiOutlineArchiveBox, 
  HiOutlineBookmark,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiXMark, 
  HiOutlineUser
} from 'react-icons/hi2';
import LOGO from "@/assets/images/LogoSigapFull2.png";
import { useAuth } from '@/context/AuthContext';
import { canManageAccounts } from '@/utils/rbac';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const userStr = localStorage.getItem("user");
  let userRole = "staff"; 
  
  if (userStr) {
    const userData = JSON.parse(userStr);
    userRole = userData?.peran?.[0]?.nama || "staff";
  }
  
  const basePath = userRole === "Kepala Bidang PDAS" ? "/admin/kabid" : "/admin/staff";

  useEffect(() => {
    if (location.pathname.includes('/donasi')) setOpenMenu('donasi');
    else if (location.pathname.includes('/monitoring')) setOpenMenu('monitoring');
    else if (location.pathname.includes('/evaluasi')) setOpenMenu('evaluasi');
    else if (location.pathname.includes('/investasi')) setOpenMenu('investasi');
    else if (location.pathname.includes('/manajemen-akun')) setOpenMenu('manajemen-akun');
  }, [location.pathname]);

  const toggleMenu = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const navItems = [
    { name: 'Dashboard', path: `${basePath}/dashboard`, icon: <HiOutlineHome className="w-5 h-5" /> },
    { name: 'Analisis CPI', path: `${basePath}/analisis-cpi`, icon: <HiOutlineChartBar className="w-5 h-5" /> },
  ];

  const accordionMenus = [
    {
      id: 'donasi',
      title: 'Realisasi Bibit dan Donasi',
      icon: <HiOutlineArchiveBox className="w-5 h-5" />,
      items: [
        { name: 'Dashboard Program', path: `${basePath}/donasi/dashboard` },
        { name: 'Data Program', path: `${basePath}/donasi/program` },
        
        ...(userRole !== "kepala_bidang" ? [
          { name: 'Data Donatur', path: `${basePath}/donasi/donatur` },
          { name: 'Pelaksanaan Kegiatan', path: `${basePath}/donasi/pelaksanaan-kegiatan` },
          { name: 'Pelaporan Data', path: `${basePath}/donasi/pelaporan-data` },
        ] : [])
      ],
    },
    {
      id: 'investasi',
      title: 'Transparansi Investasi',
      icon: <HiOutlineBookmark className="w-5 h-5" />,
      items: [
        { name: 'Dashboard Transparansi', path: `${basePath}/investasi/dashboard` },
        { name: 'Persetujuan Investor', path: `${basePath}/investasi/persetujuan` },
        { name: 'Data Investor', path: `${basePath}/investasi/data` },
      ],
    },    
    {
      id: 'monitoring',
      title: 'Monitoring',
      icon: <HiOutlineComputerDesktop className="w-5 h-5" />,
      items: [
        { name: 'Dashboard Monitoring', path: `${basePath}/monitoring/dashboard` },
        { name: 'Daftar Kegiatan', path: `${basePath}/monitoring/kegiatan` },
        { name: 'Verifikasi Monitoring', path: `${basePath}/monitoring/verifikasi` },
        { name: 'Rekap Monitoring', path: `${basePath}/monitoring/rekap` },
      ],
    },
    {
      id: 'evaluasi',
      title: 'Evaluasi Penanaman',
      icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
      items: [
        { name: 'Dashboard Evaluasi', path: `${basePath}/evaluasi/dashboard` },
        { name: 'Data Evaluasi', path: `${basePath}/evaluasi/data` },
      ],
    },
    {
      id: 'manajemen-akun',
      title: 'Manajemen Akun',
      icon: <HiOutlineUser className="w-5 h-5" />,
      items: [
        { name: 'Data Pengguna', path: `${basePath}/manajemen-akun/data-pengguna` },
        { name: 'Data Peran Pengguna', path: `${basePath}/manajemen-akun/data-peran-pengguna` },
        { name: 'Data Hak Akses', path: `${basePath}/manajemen-akun/data-hak-akses` },
      ],
    },    
  ];

  const filteredAccordionMenus = accordionMenus.filter((menu) => {
    if(menu.id === "manajemen-akun") {
      return canManageAccounts(user) || userRole === "Kepala Bidang PDAS"; 
    }
    return true;
  });

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-greenAdmin flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 md:justify-center mt-4 mb-6 shrink-0">
          <div className="font-bold text-2xl text-white tracking-widest px-4 py-1 rounded-md">
            <img src={LOGO} alt="SIGAP Logo" />
          </div>
          <button 
            className="md:hidden text-gray-700 hover:bg-[#c4ebd0] p-1 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pb-4 custom-scrollbar">
          
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-white text-[#185325] shadow-sm' 
                    : 'text-gray-700 hover:bg-[#c4ebd0]'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          
          {filteredAccordionMenus.map((menu) => (
            <div key={menu.id} className="flex flex-col">
              <div 
                onClick={() => toggleMenu(menu.id)}
                className="px-4 py-3 text-sm font-medium text-gray-700 flex justify-between items-center cursor-pointer hover:bg-[#c4ebd0] rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  {menu.icon}
                  {menu.title}
                </div>
                {openMenu === menu.id ? (
                  <HiOutlineChevronUp className="w-4 h-4" />
                ) : (
                  <HiOutlineChevronDown className="w-4 h-4" />
                )}
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMenu === menu.id ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex flex-col gap-1 py-1">
                  {menu.items.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setIsOpen(false)} 
                      className={({ isActive }) =>
                        `pl-12 pr-4 py-2 rounded-md transition-colors text-sm font-medium ${
                          isActive 
                            ? 'bg-white text-[#185325] shadow-sm' 
                            : 'text-gray-600 hover:text-[#185325] hover:bg-[#c4ebd0]'
                        }`
                      }
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;