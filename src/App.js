import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Lazy load pages for code splitting
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const WhoWeArePage = lazy(() => import('./pages/WhoWeArePage'));
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="services/:categorySlug" element={<CategoryPage />} />
                  <Route path="service/:serviceSlug" element={<ServiceDetailPage />} />
                  <Route path="who-we-are" element={<WhoWeArePage />} />
                  <Route path="success-stories" element={<SuccessStoriesPage />} />
                  <Route path="blogs" element={<BlogsPage />} />
                  <Route path="resources" element={<ResourcesPage />} />
                  <Route path="careers" element={<CareersPage />} />
                  <Route path="contact" element={<ContactPage />} />
                </Route>
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                </Route>
                
                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Toaster position="top-right" />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
