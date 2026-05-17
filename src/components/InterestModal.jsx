import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

const InterestModal = ({ product, isOpen, onClose }) => {
  const { settings, currency } = useShop();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = language === 'ar'
      ? `مرحباً،\nالاسم: ${formData.name}\nالهاتف: ${formData.phone}\n\nأنا مهتم بالمنتج: ${product.name}\nالسعر: ${product.price} ${currency}\n\nرسالة: ${formData.message}`
      : `Bonjour,\nNom: ${formData.name}\nTéléphone: ${formData.phone}\n\nJe suis intéressé par le produit: ${product.name}\nPrix: ${product.price} ${currency}\n\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{t('requestProduct')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            aria-label={t('close')}
          >
            <X size={24} />
          </button>
        </div>

        {/* Product Summary */}
        <div className="p-4 bg-emerald-50 border-b">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-emerald-600 font-bold text-lg">
                {product.price.toLocaleString()} {currency}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('fullName')}
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
              placeholder={language === 'ar' ? 'أدخل اسمك' : 'Entrez votre nom'}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('phoneNumber')}
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
              placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Entrez votre numéro de téléphone'}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {t('additionalMessage')}
            </label>
            <textarea
              id="message"
              rows="3"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 resize-none"
              placeholder={t('addDetails')}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <Send size={20} />
            <span>{t('sendViaWhatsApp')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterestModal;
