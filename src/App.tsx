import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import VacationDetails from './pages/VacationDetails';
import VacationRegistry from './pages/VacationRegistry';
import TravelDetails from './pages/TravelDetails';
import LaptopInventory from './pages/LaptopInventory';
import HiringBoard from './pages/HiringBoard';
import Login from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('hr_news_auth') === 'ok';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Feed />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed/vacaciones"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <VacationDetails />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vacaciones/registro"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <VacationRegistry />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed/viajes"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <TravelDetails />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/equipos-ti/inventario"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <LaptopInventory />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/hr/hiring"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <HiringBoard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;