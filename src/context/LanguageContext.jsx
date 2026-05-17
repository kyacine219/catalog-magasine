import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    contact: "اتصل بنا",
    available: "متوفر",
    unavailable: "غير متوفر",
    interested: "أنا مهتم",
    visitors: "زيارة",
    search: "بحث عن منتج...",
    allCategories: "الكل",
    browseProducts: "تصفح المنتجات",
    featuredProducts: "منتجاتنا المميزة",
    contactUs: "تواصل معنا",
    address: "العنوان",
    phone: "الهاتف",
    whatsapp: "واتساب",
    viewOnMap: "عرض الموقع على الخريطة",
    allRights: "جميع الحقوق محفوظة",
    addToFavorites: "أضف للمفضلة",
    orderNow: "اطلب الآن",
    price: "السعر",
    requestProduct: "طلب المنتج",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    additionalMessage: "رسالة إضافية (اختياري)",
    addDetails: "أضف أي تفاصيل إضافية",
    sendViaWhatsApp: "إرسال عبر واتساب",
    close: "إغلاق",
    menu: "القائمة",
    admin: "إدارة",
    adminPanel: "لوحة الإدارة",
    login: "تسجيل الدخول",
    password: "كلمة المرور",
    enterPassword: "أدخل كلمة المرور",
    dashboard: "لوحة التحكم",
    products: "المنتجات",
    settings: "الإعدادات",
    requests: "الطلبات",
    addProduct: "إضافة منتج",
    editProduct: "تعديل المنتج",
    deleteProduct: "حذف المنتج",
    productName: "اسم المنتج",
    productPrice: "السعر",
    productCategory: "الفئة",
    productDescription: "الوصف",
    productImage: "رابط الصورة",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    shopName: "اسم المتجر",
    shopTagline: "الشعار",
    shopCurrency: "العملة",
    shopWhatsApp: "واتساب",
    shopAddress: "العنوان",
    shopLogo: "رابط الشعار",
    socialLinks: "روابط التواصل الاجتماعي",
    facebook: "فيسبوك",
    instagram: "انستغرام",
    tiktok: "تيك توك",
    snapchat: "سناب شات",
    mapsUrl: "رابط الخريطة",
    changePassword: "تغيير كلمة المرور",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور",
    logout: "تسجيل الخروج",
    noRequests: "لا توجد طلبات",
    requestDate: "التاريخ",
    requestStatus: "الحالة",
    seen: "تمت المشاهدة",
    notSeen: "لم يتم المشاهدة",
    markAsSeen: "تحديد كمشاهدة",
    deleteAll: "حذف الكل",
    visitorCount: "عدد الزوار",
    totalProducts: "إجمالي المنتجات",
    totalRequests: "إجمالي الطلبات"
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    contact: "Contact",
    available: "Disponible",
    unavailable: "Indisponible",
    interested: "Je suis intéressé",
    visitors: "visites",
    search: "Rechercher un produit...",
    allCategories: "Tout",
    browseProducts: "Voir les produits",
    featuredProducts: "Nos produits vedettes",
    contactUs: "Contactez-nous",
    address: "Adresse",
    phone: "Téléphone",
    whatsapp: "WhatsApp",
    viewOnMap: "Voir sur la carte",
    allRights: "Tous droits réservés",
    addToFavorites: "Ajouter aux favoris",
    orderNow: "Commander maintenant",
    price: "Prix",
    requestProduct: "Demander le produit",
    fullName: "Nom complet",
    phoneNumber: "Numéro de téléphone",
    additionalMessage: "Message additionnel (optionnel)",
    addDetails: "Ajoutez des détails supplémentaires",
    sendViaWhatsApp: "Envoyer via WhatsApp",
    close: "Fermer",
    menu: "Menu",
    admin: "Admin",
    adminPanel: "Panel Admin",
    login: "Connexion",
    password: "Mot de passe",
    enterPassword: "Entrez le mot de passe",
    dashboard: "Tableau de bord",
    products: "Produits",
    settings: "Paramètres",
    requests: "Demandes",
    addProduct: "Ajouter un produit",
    editProduct: "Modifier le produit",
    deleteProduct: "Supprimer le produit",
    productName: "Nom du produit",
    productPrice: "Prix",
    productCategory: "Catégorie",
    productDescription: "Description",
    productImage: "URL de l'image",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    shopName: "Nom de la boutique",
    shopTagline: "Slogan",
    shopCurrency: "Devise",
    shopWhatsApp: "WhatsApp",
    shopAddress: "Adresse",
    shopLogo: "URL du logo",
    socialLinks: "Réseaux sociaux",
    facebook: "Facebook",
    instagram: "Instagram",
    tiktok: "TikTok",
    snapchat: "Snapchat",
    mapsUrl: "URL de la carte",
    changePassword: "Changer le mot de passe",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    logout: "Déconnexion",
    noRequests: "Aucune demande",
    requestDate: "Date",
    requestStatus: "Statut",
    seen: "Vu",
    notSeen: "Non vu",
    markAsSeen: "Marquer comme vu",
    deleteAll: "Tout supprimer",
    visitorCount: "Nombre de visiteurs",
    totalProducts: "Total des produits",
    totalRequests: "Total des demandes"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'ar';
  });

  useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
      setLanguage(prev => prev === 'ar' ? 'fr' : 'ar');
    };

    const t = (key) => {
      return translations[language][key] || translations['ar'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};