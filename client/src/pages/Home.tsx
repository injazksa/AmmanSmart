import { useEffect, useRef, useState } from 'react';
import { MapPin, Bus, Leaf, Shield, Headphones, CheckCircle, MapPin as MapMarker, CreditCard, Droplet, Bike, Video, Search, BarChart3, TrendingUp, Users, Zap } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';

/**
 * AmmanSmart Home Page - Enhanced Version
 * 
 * Design Philosophy: Smart Modernism
 * - Clean geometric lines reflecting technological precision
 * - Smooth animations and scroll reveals
 * - Trust-building colors: Deep Blue + Cyan + Gold
 * - Arabic typography: Cairo (headers) + Tajawal (body)
 * 
 * Updates:
 * - Added transparent logo
 * - Integrated interactive map component
 * - Added Google Search and Analytics icons
 * - Removed all contact forms and communication methods
 */

const Home = () => {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      // Detect visible sections
      Object.entries(sectionRefs.current).forEach(([key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75;
          setVisibleSections(prev => ({
            ...prev,
            [key]: isVisible
          }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visionCards = [
    {
      icon: Leaf,
      title: 'استدامة بيئية',
      description: 'مسارات خضراء، دراجات هوائية، تخفيض الانبعاثات، واعتماد الطاقة النظيفة.',
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-2_1772062144000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtMQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTJfMTc3MjA2MjE0NDAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE1RLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Y8IbNmG6FCODifkPH2xhC3bg2AI2wIO3C3frS5-jKThFluY30S549naozw3DbSFPS7z8IUv6xMcPD~tf~YxGlIkLIpzihdroJvLi2ZyVIAnXAhoEyi-GcCmkNoscHTQsmbWs0IhSG5175gB6fEwsEHjOrRQyop34Yx6thempvN8-yLyy~Nm5oKql0jVE159SLa3jass5eWvaSHKpsg51wwn7nfPlu9pVBW5xzy2aQIAm6tB~EfSTaYyDObVTcxfo30Pg3o5ZA~5jZz6YbJbky~p4SmMMYdJcMc3mtUIasY1fslktebkkhOiuZIauKgYfdmK0Da6elAxOySEbo~TGoQ__'
    },
    {
      icon: Bus,
      title: 'تنقل ذكي',
      description: 'باص سريع كهربائي، محطات مكيفة، بطاقة مواصلات موحدة.',
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-3_1772062143000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtMg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTNfMTc3MjA2MjE0MzAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE1nLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=AXon5F5TiIvWyl~33QWMVShjFbVjT0ktpTiR~3EgzRNA3PPHjg4Ok129u3N3ZvUdgq6X6EeUJi-ABj~pOxiQooza8a-MdJajRTBkdcU83~RJOvTkOlKiXfqHnxCL1IVfrvW47imSAA22RcgTKy21icPwSk1ihKAYIePazjgVfS3sHVguz3WSCJTwJs4K0REG1wIjtY8Q24G~HLY-eDZonVkXIFQXDfps9jjSNhEou-3jTVZeUssibj2jfRbuMxBOg4dUXgKl9NzT037BgxurYhWUbfBUxh9hAiXEge8J9hyDCLkMQQbROXi0~fntmNxvc2tzhKMNEP8FJmr9sVTloQ__'
    },
    {
      icon: Shield,
      title: 'أمان ومراقبة',
      description: 'شبكة كاميرات ذكية لمراقبة المرور والسلامة العامة.',
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-4_1772062144000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtMw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTRfMTc3MjA2MjE0NDAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE13LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VCTzwyQR9zvSUDWkeonp0RuCoXBE5LkM-V9B4jA-RyT2sCnoGJXwf-cHLhCbT49SpineWGV1kMNNuzPAGZg00wKBooTZzI2NXtj9HVFEWSEl6I1Qx~D8~fzT3JLRuR1ZvXwkzJO4Wurr9JCoWT24gQU3uXoUC-JMUhgbTCD5fwSrUmBmewzvVNfV2C7vmSOX7lbQN61Sib-7uWYYZQ7HzXeV9O0ZbWaNjMgCfwTeoSMnE3WwK-ioMgu~2We~1ogidLSNBSncVHMtSlIYB3Jsjo1~kQQgomlZ1gSg05Go0BLbKBn1z7wI-q~JbMT5OCHjEM1N1-MJd7PDdjt~7Uiabg__'
    },
    {
      icon: Headphones,
      title: 'سياحة افتراضية',
      description: 'جولات VR في المواقع الأثرية وتجارب تفاعلية.',
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-5_1772062141000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtNA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTVfMTc3MjA2MjE0MTAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE5BLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=llI2CWwKEHsyZExw0DW6o9-V3Bm2mqAw9hLAX3lp47~HcZn666lKlwMeFt~Lo~foLTHQbpj0G4dJAQMy9FBx~pKIdzlHhnyGGi4uy4UX2-3beSUFv1kTXvzX7k7weoTdeGiKeClqrZ9Cu~nxsmZ42npp-DeEXOfX-GF-VXJuSIxVB1YXXR8O5GSv-x6BhhVEJrKJ4FImmNOl1AYV9oXaw~uNxiD3nlR-zbckOvk7AxWg9Km3xJ2ItO-SyKNpRXB3~DzPAdzBhqWQzc~bROq9uPnPseFC6kKy2RuVbILFgh9bu~xwHIrPW~8tLrOLY2jSVkMHHYUc40HQc0nj23Wqag__'
    }
  ];

  const projects = [
    {
      title: 'التنقل الذكي',
      items: [
        'باص سريع (BRT) كهربائي بالكامل',
        'محطات ذكية مكيفة',
        'بطاقة مواصلات موحدة',
        'مسارات مشاة ودراجات آمنة',
        'نقاط بيع وشحن ذكية',
        'حمامات عمومية ذكية'
      ]
    },
    {
      title: 'البنية التحتية الذكية',
      items: [
        '5500 كاميرا ذكية',
        'ذكاء اصطناعي للتحليل',
        'شبكة إعلانات رقمية',
        'مضلات مغلقة بـ Wi-Fi',
        'تكامل مع إشارات المرور',
        'مراقبة لحظية للحوادث'
      ]
    },
    {
      title: 'السياحة الذكية',
      items: [
        'منصة VR سياحية',
        'جولات افتراضية',
        'بيع تذاكر إلكترونية',
        'نقاط معلومات رقمية',
        'دليل سياحي ذكي',
        'تجارب تفاعلية عالمية'
      ]
    }
  ];

  const legendItems = [
    { icon: Bus, label: 'مسار الباص السريع', color: '#00b8b8' },
    { icon: MapMarker, label: 'محطات رئيسية', color: '#c9a14b' },
    { icon: CreditCard, label: 'نقاط بيع وشحن', color: '#0a1a2f' },
    { icon: Droplet, label: 'حمامات ذكية', color: '#102a43' },
    { icon: Bike, label: 'مواقف دراجات', color: '#2b6c6c' },
    { icon: Video, label: 'تغطية كاميرات', color: '#8b5f1c' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden" dir="rtl">
      {/* Hero Section with Logo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-1_1772062147000_na1fn_YW1tYW4tc21hcnQtaGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTFfMTc3MjA2MjE0NzAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0YUdWeWJ5MWlady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JjdezmUitPaELDJuza2Z6q7Sa9ab7IdU8yl80IB4APGVmWGWE1LjpmqXpE3aiSOvKh2JiWZEwYZS80gY1PYygRlTlHVZzwWdWljOCmujSFXl60h-AQwi21t6UmCNPN8gdcp20r9IX17xtyMipxA~HLPMrgNB4563RbU1dqwh5M3aeamRY6nvL889TxuzmO9wKi0l0mT30D28IQ7w1oytaC~mmhDtHzITIC3-0jK71wnXtQq4NNIEdtuoZ3nPHw738g3aC0qoi~3xGycugy9~~fLSV8EBmjn50TAmb8qzTchxGZPPsmcDZ-AkuXDSrnM4ByYRWPS3R7SzoNSubqQA5w__)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f]/85 via-[#102a43]/80 to-[#0a1a2f]/75"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo with Image */}
          <div 
            className="mb-8 animate-fade-in"
            style={{
              animation: 'fadeInScale 0.8s ease-out'
            }}
          >
            <img 
              src="/logo_transparent.png" 
              alt="AmmanSmart Logo" 
              className="h-32 md:h-48 mx-auto mb-6 drop-shadow-lg"
            />
            <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
              عمّان الذكية 2030
            </div>
          </div>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-2 mb-6 text-[#00b8b8] text-lg md:text-xl font-medium">
            <MapPin size={24} />
            <span>النطاق الرسمي لمبادرة عمان الذكية</span>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            منصة متكاملة لرسم ملامح مستقبل العاصمة، حيث تلتقي الرؤية الحضرية مع التكنولوجيا لخلق مدينة أكثر كفاءة واستدامة وجودة للحياة.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-[#c9a14b]/30 text-white hover:bg-white/15 transition-all duration-300">
            <span className="text-lg font-semibold">🎯 عمان الذكية 2030 · رؤية تواكب المستقبل</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-sm">اسحب للأسفل</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Integration Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0a1a2f] to-[#102a43] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">أدوات جوجل المتكاملة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Google Search Integration */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 hover:border-[#c9a14b]/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-lg flex items-center justify-center">
                  <Search size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">بحث جوجل</h3>
              </div>
              <p className="text-gray-200 mb-4">
                استخدم بحث جوجل المتقدم للعثور على معلومات حول مشروع عمان الذكية والخدمات المتاحة.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#4285F4] rounded-full"></div>
                  البحث عن المحطات الذكية القريبة
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#34A853] rounded-full"></div>
                  معلومات عن خدمات النقل العام
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FBBC04] rounded-full"></div>
                  الأخبار والتحديثات الأخيرة
                </li>
              </ul>
            </div>

            {/* Google Analytics Integration */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 hover:border-[#c9a14b]/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#EA4335] to-[#FBBC04] rounded-lg flex items-center justify-center">
                  <BarChart3 size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">إحصائيات جوجل</h3>
              </div>
              <p className="text-gray-200 mb-4">
                تتبع أداء المشروع والإحصائيات المهمة من خلال لوحة تحكم جوجل أناليتكس المتقدمة.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#EA4335] rounded-full"></div>
                  إحصائيات الزيارات والمستخدمين
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FBBC04] rounded-full"></div>
                  تحليل سلوك المستخدمين
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#4285F4] rounded-full"></div>
                  تقارير الأداء والتحسينات
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-0">
        <InteractiveMap />
      </section>

      {/* Vision 2030 Section */}
      <section 
        ref={(el: HTMLElement | null) => {
          if (el) sectionRefs.current['vision'] = el;
        }}
        className="py-20 md:py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0a1a2f] mb-4 relative inline-block">
              رؤية عمان 2030
              <div className="absolute -bottom-3 right-0 w-24 h-1 bg-[#c9a14b] rounded-full"></div>
            </h2>
            <p className="text-lg text-gray-600 mt-8 max-w-2xl">
              مدينة ذكية مستدامة، تنبض بالحياة، تضع المواطن في القلب وتعتمد على البيانات لاتخاذ القرار.
            </p>
          </div>

          {/* Vision Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                    visibleSections['vision'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${idx * 100}ms`
                  }}
                >
                  {/* Image Background */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2f] via-[#0a1a2f]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <IconComponent size={32} className="mb-3 text-[#c9a14b]" />
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-200">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        ref={(el: HTMLElement | null) => {
          if (el) sectionRefs.current['projects'] = el;
        }}
        className="py-20 md:py-32 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0a1a2f] mb-4 relative inline-block">
              المشاريع الرئيسية
              <div className="absolute -bottom-3 right-0 w-24 h-1 bg-[#00b8b8] rounded-full"></div>
            </h2>
            <p className="text-lg text-gray-600 mt-8 max-w-2xl">
              ثلاثة محاور استراتيجية تشكل أساس رؤية عمان الذكية 2030
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-t-4 ${
                  idx === 0 ? 'border-t-[#00b8b8]' : idx === 1 ? 'border-t-[#c9a14b]' : 'border-t-[#8b5f1c]'
                } ${
                  visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${idx * 100}ms`
                }}
              >
                <h3 className="text-2xl font-bold text-[#0a1a2f] mb-6">{project.title}</h3>
                <ul className="space-y-4">
                  {project.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle size={20} className="text-[#00b8b8] mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-[#0a1a2f] to-[#102a43] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">الأرقام والإحصائيات</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-[#c9a14b] mb-2">5500+</div>
              <p className="text-lg text-gray-200">كاميرا ذكية</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-[#00b8b8] mb-2">40+</div>
              <p className="text-lg text-gray-200">محطة ذكية</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-[#8b5f1c] mb-2">100+</div>
              <p className="text-lg text-gray-200">حافلة كهربائية</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-[#2b6c6c] mb-2">50+</div>
              <p className="text-lg text-gray-200">نقطة شحن</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Legend Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#0a1a2f] mb-12">وسيلة الإيضاح</h2>
          
          {/* Map Legend */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {legendItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-white transition-colors border border-gray-200">
                  <IconComponent size={20} style={{ color: item.color }} />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1a2f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <img 
            src="/logo_transparent.png" 
            alt="AmmanSmart Logo" 
            className="h-16 mx-auto mb-4 opacity-80"
          />
          <h3 className="text-3xl md:text-4xl font-black mb-4">AmmanSmart.com</h3>
          <p className="text-gray-300 mb-4">النطاق الرسمي المقترح لمبادرة عمان الذكية — رؤية 2030</p>
          <p className="text-gray-400 text-sm">
            جميع الحقوق محفوظة. هذا الموقع يعرض رؤية استثمارية وليس موقعاً حكومياً رسمياً.
            <br />
            تماشياً مع استراتيجية أمانة عمان الكبرى وتوصيات البنك الدولي.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeInScale 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
