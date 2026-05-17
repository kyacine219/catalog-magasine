import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { settings, currency } = useShop();
  const { t, language } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const handleInterest = () => {
    const message = language === 'ar'
      ? `مرحباً، أنا مهتم بالمنتج: ${product.name} السعر: ${product.price} ${currency}`
      : `Bonjour, je suis intéressé par le produit: ${product.name} Prix: ${product.price} ${currency}`;
    const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 hover:scale-110"
            aria-label={t('addToFavorites')}
          >
            <Heart
              size={20}
              className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              fill={isLiked ? 'currentColor' : 'none'}
            />
          </button>
          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handleInterest}
              className="bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>{t('orderNow')}</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-emerald-600">
              {product.price.toLocaleString()} {currency}
            </span>
            <button
              onClick={handleInterest}
              className="md:hidden bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors duration-300"
              aria-label={t('orderNow')}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
