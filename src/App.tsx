
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import VideoAnalyzer from './pages/VideoAnalyzer';
import TitleGenerator from './pages/TitleGenerator';
import ScriptGenerator from './pages/ScriptGenerator';
import SubnicheValidator from './pages/SubnicheValidator';
import MicroSubnicheAnalyzer from './pages/MicroSubnicheAnalyzer';
import FAQ from './pages/FAQ';
import Tutorial from './pages/Tutorial';
import ScriptTutorial from './pages/ScriptTutorial';
import ImportantLinks from './pages/ImportantLinks';
import LandingPage from './pages/LandingPage';
import Subscribe from './pages/Subscribe';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import ApiKeyDialog from './components/ApiKeyDialog';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen w-screen max-w-none">
        <div className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="*" element={<NotFound />} />
            
            {/* Routes that require login */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/script-tutorial" element={<ScriptTutorial />} />
              <Route path="/important-links" element={<ImportantLinks />} />
              <Route path="/search" element={<Search />} />
            </Route>
            
            {/* Routes that require subscription */}
            <Route element={<PrivateRoute requireSubscription={true} />}>
              <Route path="/video-analyzer" element={<VideoAnalyzer />} />
              <Route path="/title-generator" element={<TitleGenerator />} />
              <Route path="/script-generator" element={<ScriptGenerator />} />
              <Route path="/subnicho-validator" element={<SubnicheValidator />} />
              <Route path="/micro-subnicho-analyzer" element={<MicroSubnicheAnalyzer />} />
            </Route>
          </Routes>
        </div>
        <ApiKeyDialog />
      </div>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
