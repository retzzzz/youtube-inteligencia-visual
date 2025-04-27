
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import VideoAnalyzer from './pages/VideoAnalyzer';
import TitleGenerator from './pages/TitleGenerator';
import ScriptGenerator from './pages/ScriptGenerator';
import SubnicheValidator from './pages/SubnicheValidator';
import FAQ from './pages/FAQ';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/video-analyzer" element={<VideoAnalyzer />} />
            <Route path="/title-generator" element={<TitleGenerator />} />
            <Route path="/script-generator" element={<ScriptGenerator />} />
            <Route path="/subnicho-validator" element={<SubnicheValidator />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
