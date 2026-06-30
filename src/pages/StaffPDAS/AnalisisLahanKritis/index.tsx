import { useState } from 'react';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import InputDataModal from './components/InputDataModal';

const AnalisisLahanKritis = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4 md:gap-6 relative">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                Analisis Conservation Priority Index (CPI)
            </h1>

            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
                    <div>
                        <h2 className="text-base md:text-lg font-bold text-gray-800">
                            Peta Prioritas Rehabilitasi Jawa Barat:
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500">
                            Conservation Priority Index (CPI)
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full cursor-pointer sm:w-auto bg-[#185325] hover:bg-[#113d1b] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        Input File <HiOutlineDocumentPlus className="w-5 h-5" />
                    </button>
                </div>

                <div className="w-full h-75 md:h-100 lg:h-125 bg-blue-50/50 rounded-lg border border-blue-100 overflow-hidden relative flex items-center justify-center">
                    <span className="text-gray-400 text-sm md:text-base text-center px-4">
                        [Area Integrasi Peta GIS]
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-200 text-sm text-left">
                        <thead className="text-gray-700 bg-[#D5F0DE]">
                            <tr>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Kabupaten/Kota</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Kecamatan</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Desa</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Status</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Skor CPI</th>
                                <th className="px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap">Rekomendasi Intervensi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    Tidak ada Data!
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <InputDataModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default AnalisisLahanKritis;