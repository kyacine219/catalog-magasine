import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { ShopProvider } from './context/ShopContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <LanguageProvider>
      <ShopProvider>
        {currentPage === 'home' ? (
          <div className="min-h-screen" dir="rtl">
            <Header setCurrentPage={setCurrentPage} />
            <Home />
            <FloatingWhatsApp />
          </div>
        ) : (
          <Admin setCurrentPage={setCurrentPage} />
        )}
      </ShopProvider>
    </LanguageProvider>
  );
}

export default App;
