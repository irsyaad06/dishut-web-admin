import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Authentication/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import AnalisisLahanKritis from './pages/AnalisisLahanKritis';
import DashboardMonitoring from './pages/PelaksanaanDanMonitoring/DashboardMonitoring';
import DaftarKegiatan from './pages/PelaksanaanDanMonitoring/DaftarKegiatan';
import VerifikasiMonitoring from './pages/PelaksanaanDanMonitoring/VerifikasiMonitoring';
import NotFound from './pages/NotFound';
import DataEvaluasi from './pages/EvaluasiPenanamanBibit/DataEvaluasi';
import DashboardEvaluasi from './pages/EvaluasiPenanamanBibit/DashboardEvaluasi';
import RekapMonitoring from './pages/PelaksanaanDanMonitoring/RekapMonitoring';
import ProgramDonasi from './pages/RealisasiBibitDonasi/ProgramDonasi';
import DataDonatur from './pages/RealisasiBibitDonasi/DataDonatur';
import PelaksanaanKegiatan from './pages/RealisasiBibitDonasi/PelaksanaanKegiatan';
import Profile from './pages/Profile';
import DataPengguna from './pages/ManajemenAkun/DataPengguna';
import DetailPengguna from './pages/ManajemenAkun/DataPengguna/DetailPengguna';
import DataPeranPengguna from './pages/ManajemenAkun/DataPeranPengguna';
import DataHakAkses from './pages/ManajemenAkun/DataHakAkses';
import DetailRole from './pages/ManajemenAkun/DataPeranPengguna/components/DetailRole';
import DetailHakAkses from './pages/ManajemenAkun/DataHakAkses/components/DetailHakAkses';
import CustomToaster from './components/CustomToaster';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="analisis-cpi" replace />} />
          <Route path="profile" element={<Profile />} />
          
          {/* START OF MODUL 1 (ANALISIS LAHAN KRITIS)*/}
          <Route path="analisis-cpi" element={<AnalisisLahanKritis />} />
          {/* END OF MODUL 1 */}

          {/* START OF MODUL 2 (PELAKSANAAN DAN MONITORING) */}
          <Route path="monitoring/dashboard" element={<DashboardMonitoring />} />
          <Route path="monitoring/kegiatan" element={<DaftarKegiatan />} />
          <Route path="monitoring/verifikasi" element={<VerifikasiMonitoring />} />
          <Route path="monitoring/rekap" element={<RekapMonitoring />} />
          {/* ENF OF MODUL 2 (PELAKSANAAN DAN MONITORING) */}
          
          {/* START OF MODUL 3 (EVALUASI PENANAMAN BIBIT) */}
          <Route path="evaluasi/dashboard" element={<DashboardEvaluasi />} />
          <Route path="evaluasi/data" element={<DataEvaluasi />} />
          {/* END OF MODUL 3 (EVALUASI PENANAMAN BIBIT) */}
          
          {/* START OF MODUL 4 (REALISASI BIBIT DAN DONASI) */}
          <Route path="donasi/program" element={<ProgramDonasi />} />
          <Route path="donasi/donatur" element={<DataDonatur />} />
          <Route path="donasi/pelaksanaan-kegiatan" element={<PelaksanaanKegiatan />} />
          {/* END OF MODUL 4 (REALISASI BIBIT DAN DONASI) */}
          
          {/* START OF MANAJEMEN AKUN */}
          <Route path="manajemen-akun/data-pengguna" element={<DataPengguna />} />
          <Route path="manajemen-akun/data-pengguna/detail/:id" element={<DetailPengguna />} />
          <Route path="manajemen-akun/data-peran-pengguna" element={<DataPeranPengguna />} />
          <Route path="manajemen-akun/data-peran-pengguna/detail/:id" element={<DetailRole />} />
          <Route path="manajemen-akun/data-hak-akses" element={<DataHakAkses />} />
          <Route path="manajemen-akun/data-hak-akses/detail/:id" element={<DetailHakAkses />} />
          {/* END OF MANAJEMEN AKUN */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <CustomToaster />
    </BrowserRouter>
  );
}

export default App;