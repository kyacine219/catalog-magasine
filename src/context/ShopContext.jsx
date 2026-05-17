import { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

const defaultSettings = {
  shopName: "متجري",
  tagline: "أفضل المنتجات بأفضل الأسعار",
  currency: "دج",
  whatsapp: "213xxxxxxxxx",
  address: "الجزائر العاصمة",
  facebook: "#",
  instagram: "#",
  tiktok: "#",
  snapchat: "#",
  mapsUrl: "#",
  logoUrl: "",
  adminPassword: "admin123"
};

const defaultProducts = [
  {
    id: 1,
    name: "منتج مميز 1",
    price: 2500,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "منتج عالي الجودة",
    category: "إلكترونيات",
    available: true
  },
  {
    id: 2,
    name: "منتج مميز 2",
    price: 3500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "منتج فريد من نوعه",
    category: "ملابس",
    available: true
  },
  {
    id: 3,
    name: "منتج مميز 3",
    price: 4200,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    description: "تصميم أنيق",
    category: "إكسسوارات",
    available: true
  },
  {
    id: 4,
    name: "منتج مميز 4",
    price: 1800,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
    description: "سعر مناسب",
    category: "منزل",
    available: true
  },
  {
    id: 5,
    name: "منتج مميز 5",
    price: 5500,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
    description: "جودة عالية",
    category: "إلكترونيات",
    available: true
  },
  {
    id: 6,
    name: "منتج مميز 6",
    price: 2900,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    description: "منتج شائع",
    category: "ملابس",
    available: true
  }
];

export const ShopProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('shopSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shopProducts');
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  const [interestRequests, setInterestRequests] = useState(() => {
    const saved = localStorage.getItem('interestRequests');
    return saved ? JSON.parse(saved) : [];
  });
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('visitorCount');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('shopSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('shopProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('interestRequests', JSON.stringify(interestRequests));
  }, [interestRequests]);

  useEffect(() => {
    localStorage.setItem('visitorCount', visitorCount.toString());
  }, [visitorCount]);

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const toggleProductAvailability = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  const addInterestRequest = (request) => {
    const newRequest = { ...request, id: Date.now(), date: new Date().toISOString(), seen: false };
    setInterestRequests([...interestRequests, newRequest]);
  };

  const markRequestAsSeen = (id) => {
    setInterestRequests(interestRequests.map(r => r.id === id ? { ...r, seen: true } : r));
  };

  const deleteInterestRequest = (id) => {
    setInterestRequests(interestRequests.filter(r => r.id !== id));
  };

  const deleteAllInterestRequests = () => {
    setInterestRequests([]);
  };

  const incrementVisitorCount = () => {
    setVisitorCount(prev => prev + 1);
  };

  const unseenRequestCount = interestRequests.filter(r => !r.seen).length;

  return (
    <ShopContext.Provider value={{
      settings,
      products,
      interestRequests,
      visitorCount,
      unseenRequestCount,
      updateSettings,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductAvailability,
      addInterestRequest,
      markRequestAsSeen,
      deleteInterestRequest,
      deleteAllInterestRequests,
      incrementVisitorCount
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
