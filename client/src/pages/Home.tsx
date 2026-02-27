import { useEffect, useRef, useState } from 'react';
import { MapPin, Bus, Leaf, Shield, Headphones, CheckCircle, MapPin as MapMarker, CreditCard, Droplet, Bike, Video } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import CinematicScenes from '@/components/CinematicScenes';

/**
 * AmmanSmart Home Page - Clean Version
 * 
 * Design Philosophy: Smart Modernism
 * - Clean geometric lines reflecting technological precision
 * - Smooth animations and scroll reveals
 * - Trust-building colors: Deep Blue + Cyan + Gold
 * - Arabic typography: Cairo (headers) + Tajawal (body)
 */

const Home = () => {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      // Detect scroll for header styling
      setIsScrolled(window.scrollY > 50);

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
      {/* Fixed Header with Logo */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img 
              src="/logo_transparent.png" 
              alt="AmmanSmart Logo" 
              className="h-24 md:h-32 drop-shadow-xl"
            />
            <div className="flex flex-col">
              <div className="text-2xl md:text-4xl font-black text-[#0a1a2f]" style={{ fontFamily: 'Cairo' }}>
                AMMAN SMART
              </div>
              <div className="text-lg md:text-xl font-bold text-[#00b8b8]">
                عمّان الذكية
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Logo - Main */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 md:pt-48">
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
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Logo with Image - LARGER */}
          <div 
            className="mb-8 animate-fade-in"
            style={{
              animation: 'fadeInScale 0.8s ease-out'
            }}
          >
            <img 
              src="/logo_transparent.png" 
              alt="AmmanSmart Logo" 
              className="h-56 md:h-96 mx-auto mb-12 drop-shadow-2xl"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: 'Cairo' }}>
                عمّان الذكية 2030
              </div>
              <div className="text-3xl md:text-5xl font-bold text-[#00b8b8] tracking-wide">
                Amman Smart 2030
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="flex items-center justify-center gap-2 mb-8 text-[#00b8b8] text-xl md:text-2xl font-medium mt-6">
            <MapPin size={28} />
            <span>النطاق الرسمي لمبادرة عمان الذكية</span>
          </div>

          {/* Description */}
          <p className="text-2xl md:text-3xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
            منصة متكاملة لرسم ملامح مستقبل العاصمة، حيث تلتقي الرؤية الحضرية مع التكنولوجيا لخلق مدينة أكثر كفاءة واستدامة وجودة للحياة.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-[#c9a14b]/30 text-white hover:bg-white/15 transition-all duration-300">
            <span className="text-xl font-semibold">🎯 عمان الذكية 2030 · رؤية تواكب المستقبل</span>
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

      {/* Cinematic Scenes */}
      <CinematicScenes />

      {/* Vision Cards Section */}
      <section 
        id="vision-section"
        ref={(el) => { if (el) sectionRefs.current['vision'] = el; }}
        className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1a2f] mb-4" style={{ fontFamily: 'Cairo' }}>
              رؤيتنا الاستراتيجية
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              نسعى لتحويل عمّان إلى مدينة ذكية تجمع بين الحداثة التكنولوجية والاستدامة البيئية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionCards.map((card, idx) => {
              const Icon = card.icon;
              const isVisible = visibleSections['vision'];
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                    borderLeftWidth: '4px',
                    borderLeftColor: '#00b8b8'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#00b8b820' }}
                  >
                    <Icon size={24} style={{ color: '#00b8b8' }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a1a2f] mb-2" style={{ fontFamily: 'Cairo' }}>
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-0">
        <InteractiveMap />
      </section>

      {/* Projects Section */}
      <section 
        ref={(el) => { if (el) sectionRefs.current['projects'] = el; }}
        className="py-16 md:py-24 bg-white px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1a2f] mb-4" style={{ fontFamily: 'Cairo' }}>
              المشاريع الرئيسية
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              مبادرات متكاملة لتطوير البنية التحتية والخدمات الذكية في العاصمة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 ${
                  visibleSections['projects'] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-[#0a1a2f] mb-6" style={{ fontFamily: 'Cairo' }}>
                  {project.title}
                </h3>
                <ul className="space-y-3">
                  {project.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#00b8b8] flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Legend Section */}
      <section className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#0a1a2f] text-center mb-12" style={{ fontFamily: 'Cairo' }}>
            وسيلة الإيضاح
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legendItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-100">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon size={24} style={{ color: item.color }} />
                  </div>
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1a2f] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-2">© 2030 عمّان الذكية - جميع الحقوق محفوظة</p>
          <p className="text-gray-500 text-sm">منصة رسمية لمبادرة تطوير العاصمة عمّان</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
