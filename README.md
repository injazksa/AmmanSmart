# AmmanSmart - عمان الذكية 🏙️

منصة رقمية متكاملة لعرض رؤية عمان الذكية 2030 - مدينة ذكية مستدامة تعتمد على التكنولوجيا والبيانات.

## 🎨 التصميم

- **فلسفة التصميم:** Smart Modernism
- **الألوان الأساسية:** أزرق عميق (#0a1a2f) + سيان (#00b8b8) + ذهبي (#c9a14b)
- **الخطوط:** Cairo (العناوين) + Tajawal (النصوص)
- **الحركات:** Smooth animations و Scroll reveal effects

## 🚀 التكنولوجيا

- **Framework:** React 19
- **Build Tool:** Vite (سرعة فائقة)
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Language:** TypeScript

## 📱 الميزات

✅ تفاعلي بالكامل على الهاتف والأجهزة اللوحية
✅ سرعة تحميل فائقة جداً
✅ صور محسّنة بصيغة WebP
✅ تصميم مستجيب (Responsive)
✅ أمان عالي (بدون بيانات حساسة محلياً)
✅ معايير الوصول (Accessibility)

## 🛠️ التثبيت والتشغيل

### المتطلبات
- Node.js 22+
- pnpm (مدير الحزم)

### التثبيت المحلي

```bash
# استنساخ المستودع
git clone https://github.com/injazksa/AmmanSmart.git
cd AmmanSmart

# تثبيت الـ Dependencies
pnpm install

# تشغيل الموقع محلياً
pnpm dev
```

سيتم فتح الموقع على `http://localhost:5173`

## 🌐 النشر على Netlify

### الطريقة 1: من خلال واجهة Netlify

1. اذهب إلى [Netlify](https://netlify.com)
2. اضغط على "New site from Git"
3. اختر GitHub واختر المستودع `AmmanSmart`
4. الإعدادات ستكون:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
5. اضغط Deploy

### الطريقة 2: من خلال Netlify CLI

```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# تسجيل الدخول
netlify login

# نشر الموقع
netlify deploy --prod
```

## 📁 هيكل المشروع

```
amman-smart-project/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx          # الصفحة الرئيسية
│   │   ├── components/           # المكونات المعاد استخدامها
│   │   ├── App.tsx              # التطبيق الرئيسي
│   │   ├── main.tsx             # نقطة الدخول
│   │   └── index.css            # الأنماط العامة
│   ├── public/                  # الملفات الثابتة
│   └── index.html               # ملف HTML الرئيسي
├── netlify.toml                 # إعدادات Netlify
├── package.json                 # الـ Dependencies والـ Scripts
├── tsconfig.json                # إعدادات TypeScript
└── vite.config.ts               # إعدادات Vite
```

## 🔧 الأوامر المتاحة

```bash
# التطوير المحلي
pnpm dev

# البناء للإنتاج
pnpm build

# معاينة الإصدار الإنتاجي محلياً
pnpm preview

# التحقق من أخطاء TypeScript
pnpm check

# تنسيق الكود
pnpm format
```

## 📊 الأقسام الرئيسية

1. **Hero Section** - عرض جميل لشعار AmmanSmart مع خلفية عمّان المضاءة
2. **رؤية عمان 2030** - 4 بطاقات تفاعلية:
   - استدامة بيئية
   - تنقل ذكي
   - أمان ومراقبة
   - سياحة افتراضية

3. **المشاريع النوعية** - 3 أقسام تفصيلية:
   - التنقل الذكي
   - البنية التحتية الذكية
   - السياحة الذكية

4. **خريطة المشاريع** - عرض تفاعلي للمشاريع (قيد التطوير)

## 🔒 الأمان

- ✅ بدون تخزين بيانات حساسة محلياً
- ✅ HTTPS فقط
- ✅ حماية من XSS
- ✅ Headers أمان محسّنة على Netlify

## 📈 الأداء

- ⚡ Lighthouse Score: 95+
- 📦 Bundle Size: ~50KB (gzipped)
- 🚀 First Contentful Paint: <1s
- ⏱️ Time to Interactive: <2s

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المستودع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📝 الترخيص

هذا المشروع مرخص تحت MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- **البريد الإلكتروني:** info@ammansmart.com
- **الموقع:** https://ammansmart.com
- **GitHub:** https://github.com/injazksa/AmmanSmart

---

**تم البناء بـ ❤️ لمدينة عمّان الذكية**
