import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastError } from '@/utils/toastHelper';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    ToastError("Sesi Anda telah berakhir. Silakan masuk kembali.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;