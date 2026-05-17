# متجري - Catalog Magazine

متجر إلكتروني متجاوب بالكامل مع دعم RTL وتأثيرات حركية سلسة.

## المميزات

- ✅ تصميم متجاوب بالكامل (Mobile-first)
- ✅ دعم RTL كامل للغة العربية
- ✅ تأثيرات حركية سلسة على البطاقات
- ✅ تكامل مع واتساب للطلبات
- ✅ تصميم عصري باستخدام Tailwind CSS
- ✅ قائمة تنقل متجاوبة للموبايل
- ✅ أزرار وسائل التواصل الاجتماعي

## التثبيت والتشغيل

1. تثبيت المكتبات:
```bash
npm install
```

2. تشغيل خادم التطوير:
```bash
npm run dev
```

3. بناء للإنتاج:
```bash
npm run build
```

## هيكل المشروع

```
src/
  context/ShopContext.jsx    # إعدادات المتجر والبيانات
  components/
    Header.jsx               # رأس الصفحة والقائمة
    ProductCard.jsx          # بطاقة المنتج مع التأثيرات
    InterestModal.jsx        # نافذة طلب المنتج
    FloatingWhatsApp.jsx     # زر واتساب العائم
  pages/
    Home.jsx                 # الصفحة الرئيسية
  App.jsx                    # التطبيق الرئيسي
  main.jsx                   # نقطة الدخول
```

## الإعدادات

يمكنك تعديل الإعدادات الافتراضية في `src/context/ShopContext.jsx`:

```javascript
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
  logoUrl: ""
};
```

## التقنيات المستخدمة

- React 18
- Vite
- Tailwind CSS
- Lucide React (الأيقونات)
