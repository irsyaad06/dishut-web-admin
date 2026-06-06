import { useState, useMemo } from 'react';
import { HiOutlinePlus, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import ActivityCard, { type Activity } from '../components/ActivityCard';
import InputKegiatanModal from '../components/RencanaProgramModal';

const DaftarKegiatan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [searchQuery, setSearchQuery] = useState('');

  const dummyData: Activity[] = [
    {
      id: 1,
      title: 'Penanaman Mangrove Pesisir',
      location: 'Pantai Pondok Bali, Subang',
      date: '15/3/2024',
      time: '09.00 WIB',
      progress: 75,
      author: 'Bpk Daffa Mahendra',
      status: 'Berjalan'
    },
    {
      id: 2,
      title: 'Pemeliharaan Pohon Pelindung',
      location: 'Hutan Kota, Bandung',
      date: '20/4/2024',
      time: '10.00 WIB',
      progress: 100,
      author: 'Bpk Daffa Mahendra',
      status: 'Selesai'
    },
    {
      id: 3,
      title: 'Rehabilitasi Lahan Kritis',
      location: 'Gunung Puntang, Kabupaten Bandung',
      date: '05/5/2024',
      time: '08.30 WIB',
      progress: 40,
      author: 'Ibu Rina Marlina',
      status: 'Bermasalah'
    },
    {
      id: 4,
      title: 'Penanaman Bibit Mahoni',
      location: 'Lembang, Bandung Barat',
      date: '10/6/2024',
      time: '09.00 WIB',
      progress: 100,
      author: 'Bpk Daffa Mahendra',
      status: 'Selesai'
    },
  ];

  const filters = ['All', 'Berjalan', 'Selesai', 'Bermasalah'];

  const filteredData = useMemo(() => {
    return dummyData.filter((kegiatan) => {
      const matchesFilter = activeFilter === 'All' || kegiatan.status === activeFilter;
      
      const matchesSearch = 
        kegiatan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kegiatan.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [dummyData, activeFilter, searchQuery]);

  return (
    <div className="flex flex-col gap-6 w-full">
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Daftar Kegiatan
          </h1>
          <p className="text-gray-500 text-sm">
            Kelola dan monitor detail seluruh kegiatan lapangan
          </p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#185325] hover:bg-[#113d1b] text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm w-full md:w-auto"
        >
          <HiOutlinePlus className="w-5 h-5" strokeWidth={2.5} />
          Input Kegiatan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 md:p-3 flex flex-col xl:flex-row gap-4 justify-between items-center w-full">
        <div className="relative w-full xl:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <HiOutlineMagnifyingGlass className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Cari nama kegiatan atau lokasi..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Menyimpan input pencarian ke state
            className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#185325] focus:bg-white transition-all text-gray-700"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 custom-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                activeFilter === filter
                  ? 'bg-[#185325] text-white border-[#185325]'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((kegiatan) => (
            <ActivityCard key={kegiatan.id} data={kegiatan} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Tidak ada kegiatan yang ditemukan.</p>
          </div>
        )}
      </div>

      <InputKegiatanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}

export default DaftarKegiatan;