import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import {
  MapPin,
  Bus,
  Leaf,
  Shield,
  Headphones,
  CheckCircle,
  MapPin as MapMarker,
  CreditCard,
  Droplet,
  Bike,
  Video,
  Camera,
  Zap,
  ChevronDown,
  ArrowUp,
} from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';
import TextReveal, { WordReveal } from '@/components/TextReveal';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  // Header background
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 26, 47, 0)', 'rgba(10, 26, 47, 0.95)']
  );
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

  // Mouse tracking for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 600);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visionCards = [
    {
      icon: Leaf,
      title: 'استدامة بيئية',
      description: 'مسارات خضراء، دراجات هوائية، تخفيض الانبعاثات، واعتماد الطاقة النظيفة.',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      borderColor: '#10b981',
      image:
        'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-2_1772062144000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtMQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTJfMTc3MjA2MjE0NDAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE1RLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Y8IbNmG6FCODifkPH2xhC3bg2AI2wIO3C3frS5-jKThFluY30S549naozw3DbSFPS7z8IUv6xMcPD~tf~YxGlIkLIpzihdroJvLi2ZyVIAnXAhoEyi-GcCmkNoscHTQsmbWs0IhSG5175gB6fEwsEHjOrRQyop34Yx6thempvN8-yLyy~Nm5oKql0jVE159SLa3jass5eWvaSHKpsg51wwn7nfPlu9pVBW5xzy2aQIAm6tB~EfSTaYyDObVTcxfo30Pg3o5ZA~5jZz6YbJbky~p4SmMMYdJcMc3mtUIasY1fslktebkkhOiuZIauKgYfdmK0Da6elAxOySEbo~TGoQ__',
    },
    {
      icon: Bus,
      title: 'تنقل ذكي',
      description: 'باص سريع كهربائي، محطات مكيفة، بطاقة مواصلات موحدة.',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      borderColor: '#00b8b8',
      image:
        'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-3_1772062143000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtMg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTNfMTc3MjA2MjE0MzAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE1nLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=AXon5F5TiIvWyl~33QWMVShjFbVjT0ktpTiR~3EgzRNA3PPHjg4Ok129u3N3ZvUdgq6X6EeUJi-ABj~pOxiQooza8a-MdJajRTBkdcU83~RJOvTkOlKiXfqHnxCL1IVfrvW47imSAA22RcgTKy21icPwSk1ihKAYIePazjgVfS3sHVguz3WSCJTwJs4K0REG1wIjtY8Q24G~HLY-eDZonVkXIFQXDfps9jjSNhEou-3jTVZeUssibj2jfRbuMxBOg4dUXgKl9NzT037BgxurYhWUbfBUxh9hAiXEge8J9hyDCLkMQQbROXi0~fntmNxvc2tzhKMNEP8FJmr9sVTloQ__',
    },
    {
      icon: Shield,
      title: 'أمان ومراقبة',
      description: 'شبكة كاميرات ذكية لمراقبة المرور والسلامة العامة.',
      gradient: 'from-amber-500/20 to-orange-500/20',
      borderColor: '#c9a14b',
      image:
        'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-4_1772062144000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtMw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTRfMTc3MjA2MjE0NDAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE13LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VCTzwyQR9zvSUDWkeonp0RuCoXBE5LkM-V9B4jA-RyT2sCnoGJXwf-cHLhCbT49SpineWGV1kMNNuzPAGZg00wKBooTZzI2NXtj9HVFEWSEl6I1Qx~D8~fzT3JLRuR1ZvXwkzJO4Wurr9JCoWT24gQU3uXoUC-JMUhgbTCD5fwSrUmBmewzvVNfV2C7vmSOX7lbQN61Sib-7uWYYZQ7HzXeV9O0ZbWaNjMgCfwTeoSMnE3WwK-ioMgu~2We~1ogidLSNBSncVHMtSlIYB3Jsjo1~kQQgomlZ1gSg05Go0BLbKBn1z7wI-q~JbMT5OCHjEM1N1-MJd7PDdjt~7Uiabg__',
    },
    {
      icon: Headphones,
      title: 'سياحة افتراضية',
      description: 'جولات VR في المواقع الأثرية وتجارب تفاعلية.',
      gradient: 'from-purple-500/20 to-indigo-500/20',
      borderColor: '#8b5cf6',
      image:
        'https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-5_1772062141000_na1fn_YW1tYW4tc21hcnQtdmlzaW9uLWNhcmQtNA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTVfMTc3MjA2MjE0MTAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0ZG1semFXOXVMV05oY21RdE5BLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=llI2CWwKEHsyZExw0DW6o9-V3Bm2mqAw9hLAX3lp47~HcZn666lKlwMeFt~Lo~foLTHQbpj0G4dJAQMy9FBx~pKIdzlHhnyGGi4uy4UX2-3beSUFv1kTXvzX7k7weoTdeGiKeClqrZ9Cu~nxsmZ42npp-DeEXOfX-GF-VXJuSIxVB1YXXR8O5GSv-x6BhhVEJrKJ4FImmNOl1AYV9oXaw~uNxiD3nlR-zbckOvk7AxWg9Km3xJ2ItO-SyKNpRXB3~DzPAdzBhqWQzc~bROq9uPnPseFC6kKy2RuVbILFgh9bu~xwHIrPW~8tLrOLY2jSVkMHHYUc40HQc0nj23Wqag__',
    },
  ];

  const projects = [
    {
      title: 'التنقل الذكي',
      icon: Bus,
      color: '#00b8b8',
      items: [
        'باص سريع (BRT) كهربائي بالكامل',
        'محطات ذكية مكيفة',
        'بطاقة مواصلات موحدة',
        'مسارات مشاة ودراجات آمنة',
        'نقاط بيع وشحن ذكية',
        'حمامات عمومية ذكية',
      ],
    },
    {
      title: 'البنية التحتية الذكية',
      icon: Camera,
      color: '#c9a14b',
      items: [
        '5500 كاميرا ذكية',
        'ذكاء اصطناعي للتحليل',
        'شبكة إعلانات رقمية',
        'مضلات مغلقة بـ Wi-Fi',
        'تكامل مع إشارات المرور',
        'مراقبة لحظية للحوادث',
      ],
    },
    {
      title: 'السياحة الذكية',
      icon: Headphones,
      color: '#8b5cf6',
      items: [
        'منصة VR سياحية',
        'جولات افتراضية',
        'بيع تذاكر إلكترونية',
        'نقاط معلومات رقمية',
        'دليل سياحي ذكي',
        'تجارب تفاعلية عالمية',
      ],
    },
  ];

  const statistics = [
    { label: 'كاميرات ذكية', value: 5500, suffix: '', icon: Camera, color: '#00b8b8' },
    { label: 'محطات ذكية', value: 40, suffix: '+', icon: MapPin, color: '#c9a14b' },
    { label: 'حافلات كهربائية', value: 100, suffix: '+', icon: Bus, color: '#10b981' },
    { label: 'نقاط شحن', value: 50, suffix: '+', icon: Zap, color: '#8b5cf6' },
  ];

  const legendItems = [
    { icon: Bus, label: 'مسار الباص السريع', color: '#00b8b8' },
    { icon: MapMarker, label: 'محطات رئيسية', color: '#c9a14b' },
    { icon: CreditCard, label: 'نقاط بيع وشحن', color: '#0a1a2f' },
    { icon: Droplet, label: 'حمامات ذكية', color: '#102a43' },
    { icon: Bike, label: 'مواقف دراجات', color: '#2b6c6c' },
    { icon: Video, label: 'تغطية كاميرات', color: '#8b5f1c' },
  ];

  return (
    <div className="min-h-screen bg-[#0a1a2f] text-white overflow-x-hidden" dir="rtl" ref={containerRef}>
      <ScrollProgress />

      {/* ═══════════════════════════════════════════════════════════════════
          CINEMATIC HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: headerBg,
          backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img
              src="/logo_transparent.png"
              alt="AmmanSmart Logo"
              className="h-16 md:h-20 drop-shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <div className="flex flex-col">
              <motion.div
                className="text-xl md:text-2xl font-black text-white tracking-tight"
                style={{ fontFamily: 'Cairo' }}
              >
                AMMAN SMART
              </motion.div>
              <motion.div className="text-sm md:text-base font-bold text-[#00b8b8]">
                عمّان الذكية
              </motion.div>
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            className="hidden md:flex items-center gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {['الرؤية', 'المشاريع', 'الخريطة', 'الإحصائيات'].map((item, idx) => (
              <motion.a
                key={idx}
                href={`#section-${idx}`}
                className="text-white/70 hover:text-[#00b8b8] transition-colors text-sm font-medium relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00b8b8] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </motion.nav>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════════
          CINEMATIC HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: heroY,
            scale: heroScale,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url(https://private-us-east-1.manuscdn.com/sessionFile/M7hMGGpYjwKaeNdJhFiBGt/sandbox/5zdeC30QGpXiol4lkVYC4N-img-1_1772062147000_na1fn_YW1tYW4tc21hcnQtaGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTTdoTUdHcFlqd0thZU5kSmhGaUJHdC9zYW5kYm94LzV6ZGVDMzBRR3BYaW9sNGxrVllDNE4taW1nLTFfMTc3MjA2MjE0NzAwMF9uYTFmbl9ZVzF0WVc0dGMyMWhjblF0YUdWeWJ5MWlady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JjdezmUitPaELDJuza2Z6q7Sa9ab7IdU8yl80IB4APGVmWGWE1LjpmqXpE3aiSOvKh2JiWZEwYZS80gY1PYygRlTlHVZzwWdWljOCmujSFXl60h-AQwi21t6UmCNPN8gdcp20r9IX17xtyMipxA~HLPMrgNB4563RbU1dqwh5M3aeamRY6nvL889TxuzmO9wKi0l0mT30D28IQ7w1oytaC~mmhDtHzITIC3-0jK71wnXtQq4NNIEdtuoZ3nPHw738g3aC0qoi~3xGycugy9~~fLSV8EBmjn50TAmb8qzTchxGZPPsmcDZ-AkuXDSrnM4ByYRWPS3R7SzoNSubqQA5w__)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f]/90 via-[#0a1a2f]/70 to-[#0a1a2f]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a2f]/50 via-transparent to-[#0a1a2f]/50" />
        </motion.div>

        {/* Particle System */}
        <div className="absolute inset-0 z-[1]">
          <ParticleBackground particleCount={50} speed={0.2} connectDistance={100} />
        </div>

        {/* Animated grid lines */}
        <div className="absolute inset-0 z-[1] opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,184,184,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,184,184,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{
            opacity: heroOpacity,
            x: springMouseX,
            y: springMouseY,
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <motion.img
              src="/logo_transparent.png"
              alt="AmmanSmart Logo"
              className="h-40 md:h-64 mx-auto mb-8 drop-shadow-2xl"
              animate={{
                filter: [
                  'drop-shadow(0 0 20px rgba(0,184,184,0.3))',
                  'drop-shadow(0 0 40px rgba(0,184,184,0.6))',
                  'drop-shadow(0 0 20px rgba(0,184,184,0.3))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Title with character reveal */}
          <div className="mb-4">
            <TextReveal
              text="عمّان الذكية 2030"
              as="h1"
              className="text-5xl md:text-8xl font-black text-white tracking-tight leading-tight"
              style={{ fontFamily: 'Cairo' }}
              delay={0.5}
              charDelay={0.04}
            />
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mb-6"
          >
            <span className="text-2xl md:text-4xl font-bold shimmer-text">
              Amman Smart 2030
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex items-center justify-center gap-2 mb-6 text-[#00b8b8] text-lg md:text-xl font-medium"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin size={24} />
            </motion.div>
            <span>النطاق الرسمي لمبادرة عمان الذكية</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3 }}
            className="text-lg md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            منصة متكاملة لرسم ملامح مستقبل العاصمة، حيث تلتقي الرؤية الحضرية مع التكنولوجيا لخلق
            مدينة أكثر كفاءة واستدامة وجودة للحياة.
          </motion.p>

          {/* CTA Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            <MagneticButton>
              <motion.div
                className="inline-flex items-center gap-2 glass px-8 py-4 rounded-full text-white hover:bg-white/15 transition-all duration-300 glow-pulse cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContent}
              >
                <span className="text-lg font-semibold">🎯 عمان الذكية 2030 · رؤية تواكب المستقبل</span>
              </motion.div>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          onClick={scrollToContent}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-white/50 text-sm">اسحب للأسفل</span>
            <motion.div
              className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden"
              whileHover={{ borderColor: 'rgba(0,184,184,0.6)' }}
            >
              <motion.div
                className="w-1.5 h-3 bg-[#00b8b8] rounded-full mt-2"
                animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <ChevronDown size={20} className="text-white/40" />
          </motion.div>
        </motion.div>

        {/* Decorative corner elements */}
        <div className="absolute top-20 left-8 w-20 h-20 border-l-2 border-t-2 border-[#00b8b8]/20 z-[2]" />
        <div className="absolute top-20 right-8 w-20 h-20 border-r-2 border-t-2 border-[#00b8b8]/20 z-[2]" />
        <div className="absolute bottom-20 left-8 w-20 h-20 border-l-2 border-b-2 border-[#c9a14b]/20 z-[2]" />
        <div className="absolute bottom-20 right-8 w-20 h-20 border-r-2 border-b-2 border-[#c9a14b]/20 z-[2]" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATISTICS SECTION - Animated Counters
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden" id="section-3">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f] via-[#0d2240] to-[#0a1a2f]" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 50%, rgba(0,184,184,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(201,161,75,0.3) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-3"
              style={{ fontFamily: 'Cairo' }}
            >
              أرقام <span className="text-[#00b8b8]">تتحدث</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b8b8] to-[#c9a14b] mx-auto rounded-full" />
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.15}>
            {statistics.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    className="glass-card rounded-2xl p-6 text-center group"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 30px ${stat.color}30`,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${stat.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon size={28} style={{ color: stat.color }} />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-black mb-2" style={{ color: stat.color }}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VISION CARDS SECTION - 3D Tilt Cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden" id="section-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f] to-[#0d2240]" />

        {/* Decorative floating orbs */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00b8b8, transparent)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c9a14b, transparent)' }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimatedSection direction="up" className="text-center mb-16">
            <WordReveal
              text="رؤيتنا الاستراتيجية"
              as="h2"
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: 'Cairo' }}
            />
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00b8b8] to-transparent mx-auto rounded-full mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <AnimatedSection delay={0.2}>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                نسعى لتحويل عمّان إلى مدينة ذكية تجمع بين الحداثة التكنولوجية والاستدامة البيئية
              </p>
            </AnimatedSection>
          </AnimatedSection>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.12}
          >
            {visionCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={idx}>
                  <TiltCard tiltAmount={8}>
                    <motion.div
                      className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 h-full group"
                      whileHover={{
                        borderColor: card.borderColor,
                        boxShadow: `0 0 40px ${card.borderColor}20`,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Card image with overlay */}
                      <div className="relative h-44 overflow-hidden">
                        <motion.img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2f] via-[#0a1a2f]/50 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${card.borderColor}30`, border: `1px solid ${card.borderColor}50` }}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={24} style={{ color: card.borderColor }} />
                        </motion.div>
                      </div>

                      {/* Card content */}
                      <div className="p-5">
                        <h3
                          className="text-xl font-bold text-white mb-2"
                          style={{ fontFamily: 'Cairo' }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                      </div>

                      {/* Bottom accent line */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: card.borderColor }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTERACTIVE MAP SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative" id="section-2">
        <AnimatedSection direction="up" duration={0.8}>
          <InteractiveMap />
        </AnimatedSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROJECTS SECTION - Cinematic Cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden" id="section-1">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a2f] via-[#0d2240] to-[#0a1a2f]" />

        {/* Animated background lines */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#00b8b8] to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: '-100%',
                right: '-100%',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimatedSection direction="up" className="text-center mb-16">
            <WordReveal
              text="المشاريع الرئيسية"
              as="h2"
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: 'Cairo' }}
            />
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-[#c9a14b] to-transparent mx-auto rounded-full mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <AnimatedSection delay={0.2}>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                مبادرات متكاملة لتطوير البنية التحتية والخدمات الذكية في العاصمة
              </p>
            </AnimatedSection>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {projects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full group overflow-hidden"
                    whileHover={{
                      borderColor: `${project.color}60`,
                      y: -8,
                      boxShadow: `0 20px 60px ${project.color}15`,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle, ${project.color}, transparent)` }}
                    />

                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}30` }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon size={28} style={{ color: project.color }} />
                    </motion.div>

                    <h3
                      className="text-2xl font-bold text-white mb-6"
                      style={{ fontFamily: 'Cairo' }}
                    >
                      {project.title}
                    </h3>

                    <ul className="space-y-3">
                      {project.items.map((item, itemIdx) => (
                        <motion.li
                          key={itemIdx}
                          className="flex items-start gap-3 group/item"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * itemIdx + 0.3 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle
                              size={18}
                              className="flex-shrink-0 mt-1"
                              style={{ color: project.color }}
                            />
                          </motion.div>
                          <span className="text-white/70 group-hover/item:text-white/90 transition-colors">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Bottom accent */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 origin-right"
                      style={{ backgroundColor: project.color }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + idx * 0.2 }}
                    />
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          LEGEND SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2240] to-[#0a1a2f]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-3"
              style={{ fontFamily: 'Cairo' }}
            >
              وسيلة الإيضاح
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b8b8] to-[#c9a14b] mx-auto rounded-full" />
          </AnimatedSection>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.08}
          >
            {legendItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={idx}>
                  <motion.div
                    className="flex items-center gap-4 glass-card rounded-xl p-5 group"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: `0 0 25px ${item.color}20`,
                    }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}30` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={22} style={{ color: item.color }} />
                    </motion.div>
                    <span className="text-white/70 font-medium group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CINEMATIC FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#060f1d]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b8b8]/30 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center">
              <motion.img
                src="/logo_transparent.png"
                alt="AmmanSmart"
                className="h-16 mx-auto mb-4 opacity-50"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <p className="text-white/30 mb-2">© 2030 عمّان الذكية - جميع الحقوق محفوظة</p>
              <p className="text-white/20 text-sm">منصة رسمية لمبادرة تطوير العاصمة عمّان</p>

              {/* Decorative line */}
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-[#00b8b8]/30 to-transparent mx-auto mt-6"
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </AnimatedSection>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          BACK TO TOP BUTTON
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full bg-[#00b8b8] text-white flex items-center justify-center shadow-lg glow-pulse"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
