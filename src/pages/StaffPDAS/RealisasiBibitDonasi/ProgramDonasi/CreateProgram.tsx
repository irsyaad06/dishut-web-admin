import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlinePhoto } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const BIBIT_OPTIONS = [
  'Mahoni', 'Sengon', 'Trembesi', 'Mangrove', 'Pucuk Merah', 'Beringin'
];

const CreateProgram: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBibit, setSelectedBibit] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCheckboxChange = (bibit: string) => {
    setSelectedBibit(prev => 
      prev.includes(bibit)
        ? prev.filter(item => item !== bibit) 
        : [...prev, bibit] 
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedBibit.length === 0) {
      toast.error('Silakan pilih minimal satu jenis bibit.');
      return;
    }

    console.log("Submitting...", { selectedBibit, selectedImage });
    
    toast.success('Program berhasil diajukan!');
    navigate(-1); 
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Buat Program Baru</h1>
          <p className="text-sm text-slate-500 mt-1">Isi formulir di bawah ini untuk mengajukan program penanaman baru.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <label className="block text-base font-bold text-slate-800 mb-3">
                Foto Program / Lokasi <span className="text-red-500">*</span>
              </label>
              <label className="relative flex flex-col items-center justify-center w-full h-56 md:h-72 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer hover:bg-emerald-50 hover:border-[#009262] transition-colors group overflow-hidden bg-slate-50">
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <div className="p-4 bg-white shadow-sm border border-slate-100 text-[#009262] rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <HiOutlinePhoto className="w-10 h-10" />
                    </div>
                    <p className="mb-2 text-base font-bold text-slate-700">
                      Klik untuk mengunggah foto
                    </p>
                    <p className="text-sm text-slate-500">Mendukung format PNG, JPG, atau WEBP (Maks. 2MB)</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Nama Program <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Penanaman Hutan Lindung..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all shadow-sm"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Pilih Lahan Kritis (Tervalidasi) <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009262]/20 focus:border-[#009262] transition-all cursor-pointer shadow-sm"
                  defaultValue=""
                >
                  <option value="" disabled>-- Pilih Area Lahan --</option>
                  <option value="blok1">Blok 1 Kertasari - 15.5 Ha (Proses Tanam)</option>
                  <option value="cisurupan">Blok Cisurupan - 8 Ha (Survei)</option>
                  <option value="ciliwung">Hulu Ciliwung Tugu - 12.2 Ha (Hijau)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <div className="mb-4">
                <label className="block text-base font-bold text-slate-800">
                  Jenis Bibit <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-slate-500 mt-1">Anda dapat memilih lebih dari satu jenis bibit untuk program ini.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BIBIT_OPTIONS.map((bibit) => (
                  <label 
                    key={bibit} 
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedBibit.includes(bibit) 
                        ? 'border-[#009262] bg-emerald-50/50 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 border-2 border-slate-300 rounded text-[#009262] focus:ring-[#009262]/20 focus:ring-offset-0 cursor-pointer"
                      checked={selectedBibit.includes(bibit)}
                      onChange={() => handleCheckboxChange(bibit)}
                    />
                    <span className={`ml-3 font-semibold ${selectedBibit.includes(bibit) ? 'text-[#009262]' : 'text-slate-700'}`}>
                      {bibit}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 md:gap-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors active:scale-95 shadow-sm"
            >
              Batalkan
            </button>
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#185325] hover:bg-[#123d1c] text-white font-bold transition-all shadow-md shadow-[#185325]/20 active:scale-95"
            >
              Ajukan Program Sekarang
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateProgram;