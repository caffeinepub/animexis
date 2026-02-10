import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  const [currentRoute, setCurrentRoute] = useState<'/' | '/gallery'>('/');

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  const navigate = (path: '/' | '/gallery') => {
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentRoute === '/' && <LandingPage onNavigate={() => navigate('/gallery')} />}
      {currentRoute === '/gallery' && <GalleryPage />}
    </div>
  );
}

export default App;
