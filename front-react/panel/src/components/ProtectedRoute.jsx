import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ children, isAuthenticate, redirectTo="/login" }) {
  
  if (!isAuthenticate) {
    return <Navigate to={redirectTo} />;
  }
  
  return children ? children : <Outlet />
}