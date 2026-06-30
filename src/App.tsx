import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import CustomToaster from "./components/CustomToaster";
import PageLoader from "./components/PageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import DashboardStaffPDAS from "./pages/StaffPDAS/DashboardStaffPDAS";

const Login = lazy(() => import("./pages/Authentication/Login"));
const DashboardLayout = lazy(
  () => import("./components/layout/DashboardLayout"),
);
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AnalisisLahanKritis = lazy(
  () => import("./pages/StaffPDAS/AnalisisLahanKritis"),
);
const DashboardMonitoring = lazy(
  () =>
    import("./pages/StaffPDAS/PelaksanaanDanMonitoring/DashboardMonitoring"),
);
const DaftarKegiatan = lazy(
  () => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/DaftarKegiatan"),
);
const VerifikasiMonitoring = lazy(
  () =>
    import("./pages/StaffPDAS/PelaksanaanDanMonitoring/VerifikasiMonitoring"),
);
const RekapMonitoring = lazy(
  () => import("./pages/StaffPDAS/PelaksanaanDanMonitoring/RekapMonitoring"),
);
const DashboardEvaluasi = lazy(
  () => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DashboardEvaluasi"),
);
const DataEvaluasi = lazy(
  () => import("./pages/StaffPDAS/EvaluasiPenanamanBibit/DataEvaluasi"),
);
const DashboardProgramStaff = lazy(
  () => import("./pages/StaffPDAS/RealisasiBibitDonasi/Dashboard"),
);
const ProgramDonasiStaff = lazy(
  () => import("./pages/StaffPDAS/RealisasiBibitDonasi/ProgramDonasi"),
);
const CreateProgram = lazy(
  () =>
    import("./pages/StaffPDAS/RealisasiBibitDonasi/ProgramDonasi/CreateProgram"),
);
const DataDonatur = lazy(
  () => import("./pages/StaffPDAS/RealisasiBibitDonasi/DataDonatur"),
);
const PelaksanaanKegiatan = lazy(
  () => import("./pages/StaffPDAS/RealisasiBibitDonasi/PelaksanaanKegiatan"),
);
const PelaporanData = lazy(
  () => import("./pages/StaffPDAS/RealisasiBibitDonasi/PelaporanData"),
);

const DashboardKabid = lazy(
  () => import("./pages/KepalaBidangPDAS/DashboardKABID"),
);
const DashhboardProgramKabid = lazy(
  () => import("./pages/KepalaBidangPDAS/RealisasiBibitDonasi/DashboardProgramKabid"),
);
const DataProgramKabid = lazy(
  () => import("./pages/KepalaBidangPDAS/RealisasiBibitDonasi/DataProgram"),
);
const DataPengguna = lazy(
  () => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPengguna"),
);
const DetailPengguna = lazy(
  () =>
    import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPengguna/DetailPengguna"),
);
const DataPeranPengguna = lazy(
  () => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPeranPengguna"),
);
const DetailRole = lazy(
  () =>
    import("./pages/KepalaBidangPDAS/ManajemenAkun/DataPeranPengguna/components/DetailRole"),
);
const DataHakAkses = lazy(
  () => import("./pages/KepalaBidangPDAS/ManajemenAkun/DataHakAkses"),
);
const DetailHakAkses = lazy(
  () =>
    import("./pages/KepalaBidangPDAS/ManajemenAkun/DataHakAkses/components/DetailHakAkses"),
);

const RoleBasedRedirect = () => {
  const userStr = localStorage.getItem("user");

  if (!userStr) return <Navigate to="/admin/login" replace />;

  try {
    const userData = JSON.parse(userStr);

    const peranArray = userData?.peran;
    const rawRoleName =
      Array.isArray(peranArray) && peranArray.length > 0
        ? peranArray[0]?.nama
        : null;

    console.log("Debug Role:", rawRoleName);

    if (!rawRoleName) return <Navigate to="/admin/login" replace />;

    const roleName = rawRoleName.trim().toLowerCase();

    if (roleName === "kepala bidang pdas" || roleName === "superadmin") {
      return <Navigate to="/admin/kabid/dashboard" replace />;
    }

    if (
      roleName === "pegawai" ||
      "staff pdas" ||
      roleName === "staff" ||
      roleName === "admin" ||
      ""
    ) {
      return <Navigate to="/admin/staff/dashboard" replace />;
    }

    return <Navigate to="/admin/login" replace />;
  } catch (e) {
    return <Navigate to="/admin/login" replace />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<RoleBasedRedirect />} />
              <Route path="profile" element={<Profile />} />

              <Route
                element={
                  <RoleGuard
                    allowedRoles={["pegawai", "Staff PDAS", "admin"]}
                  />
                }
              >
                <Route path="staff">
                  <Route
                    path="dashboard"
                    element={<DashboardStaffPDAS />}
                  />
                  <Route
                    path="analisis-cpi"
                    element={<AnalisisLahanKritis />}
                  />
                  <Route
                    path="monitoring/dashboard"
                    element={<DashboardMonitoring />}
                  />
                  <Route
                    path="monitoring/kegiatan"
                    element={<DaftarKegiatan />}
                  />
                  <Route
                    path="monitoring/verifikasi"
                    element={<VerifikasiMonitoring />}
                  />
                  <Route
                    path="monitoring/rekap"
                    element={<RekapMonitoring />}
                  />
                  <Route
                    path="evaluasi/dashboard"
                    element={<DashboardEvaluasi />}
                  />
                  <Route path="evaluasi/data" element={<DataEvaluasi />} />
                  <Route
                    path="donasi/dashboard"
                    element={<DashboardProgramStaff />}
                  />
                  <Route
                    path="donasi/program"
                    element={<ProgramDonasiStaff />}
                  />
                  <Route
                    path="donasi/program/create"
                    element={<CreateProgram />}
                  />
                  <Route path="donasi/donatur" element={<DataDonatur />} />
                  <Route
                    path="donasi/pelaksanaan-kegiatan"
                    element={<PelaksanaanKegiatan />}
                  />
                  <Route
                    path="donasi/pelaporan-data"
                    element={<PelaporanData />}
                  />
                </Route>
              </Route>

              <Route
                element={
                  <RoleGuard
                    allowedRoles={["Kepala Bidang PDAS", "superadmin"]}
                  />
                }
              >
                <Route path="kabid">
                  <Route path="dashboard" element={<DashboardKabid />} />
                  <Route path="donasi/dashboard" element={<DashhboardProgramKabid />} />
                  <Route path="donasi/program" element={<DataProgramKabid />} />
                  <Route
                    path="manajemen-akun/data-pengguna"
                    element={<DataPengguna />}
                  />
                  <Route
                    path="manajemen-akun/data-pengguna/detail/:id"
                    element={<DetailPengguna />}
                  />
                  <Route
                    path="manajemen-akun/data-peran-pengguna"
                    element={<DataPeranPengguna />}
                  />
                  <Route
                    path="manajemen-akun/data-peran-pengguna/detail/:id"
                    element={<DetailRole />}
                  />
                  <Route
                    path="manajemen-akun/data-hak-akses"
                    element={<DataHakAkses />}
                  />
                  <Route
                    path="manajemen-akun/data-hak-akses/detail/:id"
                    element={<DetailHakAkses />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <CustomToaster />
    </BrowserRouter>
  );
}

export default App;
