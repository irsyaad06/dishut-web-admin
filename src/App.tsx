import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import CustomToaster from './components/CustomToaster';
import PageLoader from './components/PageLoader';

const Login = lazy(() => import('./pages/Authentication/Login'));
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AnalisisLahanKritis = lazy(() => import('./pages/AnalisisLahanKritis'));
const DashboardMonitoring = lazy(() => import('./pages/PelaksanaanDanMonitoring/DashboardMonitoring'));
const DaftarKegiatan = lazy(() => import('./pages/PelaksanaanDanMonitoring/DaftarKegiatan'));
const VerifikasiMonitoring = lazy(() => import('./pages/PelaksanaanDanMonitoring/VerifikasiMonitoring'));
const RekapMonitoring = lazy(() => import('./pages/PelaksanaanDanMonitoring/RekapMonitoring'));
const DashboardEvaluasi = lazy(() => import('./pages/EvaluasiPenanamanBibit/DashboardEvaluasi'));
const DataEvaluasi = lazy(() => import('./pages/EvaluasiPenanamanBibit/DataEvaluasi'));
const ProgramDonasi = lazy(() => import('./pages/RealisasiBibitDonasi/ProgramDonasi'));
const DataDonatur = lazy(() => import('./pages/RealisasiBibitDonasi/DataDonatur'));
const PelaksanaanKegiatan = lazy(() => import('./pages/RealisasiBibitDonasi/PelaksanaanKegiatan'));
const DataPengguna = lazy(() => import('./pages/ManajemenAkun/DataPengguna'));
const DetailPengguna = lazy(() => import('./pages/ManajemenAkun/DataPengguna/DetailPengguna'));
const DataPeranPengguna = lazy(() => import('./pages/ManajemenAkun/DataPeranPengguna'));
const DetailRole = lazy(() => import('./pages/ManajemenAkun/DataPeranPengguna/components/DetailRole'));
const DataHakAkses = lazy(() => import('./pages/ManajemenAkun/DataHakAkses'));
const DetailHakAkses = lazy(() => import('./pages/ManajemenAkun/DataHakAkses/components/DetailHakAkses'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />

          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="analisis-cpi" replace />} />
            <Route path="profile" element={<Profile />} />
            
            {/* START OF MODUL 1 (ANALISIS LAHAN KRITIS) */}
            <Route path="analisis-cpi" element={<AnalisisLahanKritis />} />
            <Route path="loading" element={<PageLoader />} />
            {/* END OF MODUL 1 */}

            {/* START OF MODUL 2 (PELAKSANAAN DAN MONITORING) */}
            <Route path="monitoring/dashboard" element={<DashboardMonitoring />} />
            <Route path="monitoring/kegiatan" element={<DaftarKegiatan />} />
            <Route path="monitoring/verifikasi" element={<VerifikasiMonitoring />} />
            <Route path="monitoring/rekap" element={<RekapMonitoring />} />
            {/* END OF MODUL 2 */}
            
            {/* START OF MODUL 3 (EVALUASI PENANAMAN BIBIT) */}
            <Route path="evaluasi/dashboard" element={<DashboardEvaluasi />} />
            <Route path="evaluasi/data" element={<DataEvaluasi />} />
            {/* END OF MODUL 3 */}
            
            {/* START OF MODUL 4 (REALISASI BIBIT DAN DONASI) */}
            <Route path="donasi/program" element={<ProgramDonasi />} />
            <Route path="donasi/donatur" element={<DataDonatur />} />
            <Route path="donasi/pelaksanaan-kegiatan" element={<PelaksanaanKegiatan />} />
            {/* END OF MODUL 4 */}
            
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
      </Suspense>
      <CustomToaster />
    </BrowserRouter>
  );
}

export default App;