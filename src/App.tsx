
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
import PaymentSuccess from './pages/PaymentSuccess';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from './components/ui/toaster';
import ApiKeyDialog from './components/ApiKeyDialog';
import './App.css';

// Import tutorial pages
import VideoAnalyzerTutorial from './pages/tutorials/VideoAnalyzerTutorial';
import TitleGeneratorTutorial from './pages/tutorials/TitleGeneratorTutorial';
import ScriptGeneratorTutorial from './pages/tutorials/ScriptGeneratorTutorial';
import SubnicheValidatorTutorial from './pages/tutorials/SubnicheValidatorTutorial';
import SearchTutorial from './pages/tutorials/SearchTutorial';
import MicroSubnicheAnalyzerTutorial from './pages/tutorials/MicroSubnicheAnalyzerTutorial';
import { LayoutProvider } from './providers/LayoutProvider';

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <div className="flex flex-col min-h-screen max-w-none">
          <div className="flex-grow">
            <Routes>
              {/* Public routes - Landing page is now the main route */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="*" element={<NotFound />} />
              
              {/* Routes that require login */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Index />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/script-tutorial" element={<ScriptTutorial />} />
                <Route path="/important-links" element={<ImportantLinks />} />
                <Route path="/search" element={<Search />} />
                
                {/* Páginas de ferramentas - disponíveis durante o período de trial */}
                <Route path="/video-analyzer" element={<VideoAnalyzer />} />
                <Route path="/title-generator" element={<TitleGenerator />} />
                <Route path="/script-generator" element={<ScriptGenerator />} />
                <Route path="/subnicho-validator" element={<SubnicheValidator />} />
                <Route path="/micro-subnicho-analyzer" element={<MicroSubnicheAnalyzer />} />
                
                {/* Tutorial pages - fixing the path to match the actual routes */}
                <Route path="/video-analyzer-tutorial" element={<VideoAnalyzerTutorial />} />
                <Route path="/title-generator-tutorial" element={<TitleGeneratorTutorial />} />
                <Route path="/script-generator-tutorial" element={<ScriptGeneratorTutorial />} />
                <Route path="/subnicho-validator-tutorial" element={<SubnicheValidatorTutorial />} />
                <Route path="/search-tutorial" element={<SearchTutorial />} />
                <Route path="/micro-subnicho-analyzer-tutorial" element={<MicroSubnicheAnalyzerTutorial />} />
              </Route>
            </Routes>
          </div>
          <Toaster />
        </div>
      </LayoutProvider>
    </AuthProvider>
  );
}

export default App;
