import { MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

const FloatingWhatsApp = () => {
  const { settings } = useShop();
  const { t, language } = useLanguage();

  const handleClick = () => {
    const message = language === 'ar' 
      ? `مرحباً، أريد الاستفسار عن منتجاتكم`
      : `Bonjour, je voudrais vous renseigner sur vos produits`;
    const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-bounce"
      aria-label={t('whatsapp')}
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default FloatingWhatsApp;
