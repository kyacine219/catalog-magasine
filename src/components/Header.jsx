import { useState } from 'react';
import { Menu, X, Facebook, Instagram, Music, Camera, Globe, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

const Header = ({ setCurrentPage }) => {
  const { settings } = useShop();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-l from-emerald-600 to-teal-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Shop Name */}
          <div className="flex items-center gap-3">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.shopName} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{settings.shopName[0]}</span>
              </div>
            )}
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{settings.shopName}</h1>
              <p className="text-xs md:text-sm text-emerald-100">{settings.tagline}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="hover:text-emerald-200 transition-colors duration-300">{t('home')}</a>
            <a href="#products" className="hover:text-emerald-200 transition-colors duration-300">{t('products')}</a>
            <a href="#contact" className="hover:text-emerald-200 transition-colors duration-300">{t('contact')}</a>
            <button
              onClick={() => setCurrentPage('admin')}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300"
              aria-label={t('admin')}
            >
              <Lock size={18} />
              <span className="font-semibold">{t('admin')}</span>
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="font-semibold">{language === 'ar' ? 'AR' : 'FR'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            aria-label={t('menu')}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:text-emerald-200 transition-colors duration-300 py-2">{t('home')}</a>
              <a href="#products" className="hover:text-emerald-200 transition-colors duration-300 py-2">{t('products')}</a>
              <a href="#contact" className="hover:text-emerald-200 transition-colors duration-300 py-2">{t('contact')}</a>
              <button
                onClick={() => setCurrentPage('admin')}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 w-fit"
              >
                <Lock size={18} />
                <span className="font-semibold">{t('admin')}</span>
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 w-fit"
              >
                <Globe size={18} />
                <span className="font-semibold">{language === 'ar' ? 'AR' : 'FR'}</span>
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Social Links Bar */}
      <div className="bg-emerald-800/50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-200 transition-all duration-300 hover:scale-110"
              aria-label="فيسبوك"
            >
              <Facebook size={20} />
            </a>
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-200 transition-all duration-300 hover:scale-110"
              aria-label="انستغرام"
            >
              <Instagram size={20} />
            </a>
            <a
              href={settings.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-200 transition-all duration-300 hover:scale-110"
              aria-label="تيك توك"
            >
              <Music size={20} />
            </a>
            <a
              href={settings.snapchat}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-200 transition-all duration-300 hover:scale-110"
              aria-label="سناب شات"
            >
              <Camera size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
