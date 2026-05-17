import { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { MapPin, Phone, Mail } from 'lucide-react';

const Home = () => {
  const { settings, products, incrementVisitorCount } = useShop();
  const { t } = useLanguage();

  useEffect(() => {
    incrementVisitorCount();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-emerald-600 to-teal-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {settings.shopName}
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-8">
            {settings.tagline}
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('browseProducts')}
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {t('featuredProducts')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {t('contactUs')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Address */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('address')}</h3>
              <p className="text-gray-600">{settings.address}</p>
            </div>

            {/* Phone */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('phone')}</h3>
              <p className="text-gray-600" dir="ltr">{settings.whatsapp}</p>
            </div>

            {/* WhatsApp */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('whatsapp')}</h3>
              <p className="text-gray-600" dir="ltr">{settings.whatsapp}</p>
            </div>
          </div>

          {/* Map Button */}
          {settings.mapsUrl !== '#' && (
            <div className="text-center mt-8">
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('viewOnMap')}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {settings.shopName}. {t('allRights')}.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
