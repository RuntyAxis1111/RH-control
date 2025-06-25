import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import VacationDetails from './pages/VacationDetails';
import TravelDetails from './pages/TravelDetails';
import TableView from './pages/TableView';
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-hybeDark to-hybeGray">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
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
            path="/table/:name"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <TableView />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;