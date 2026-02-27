import { useEffect, useRef, useState, useCallback } from 'react';
import ThreeCanvas from '@/components/three/ThreeCanvas';
import ProtectionLayer from '@/components/ProtectionLayer';

/**
 * عمان الذكية - AMMAN SMART 2030
 * 
 * صفحة هبوط ثلاثية الأبعاد تفاعلية بنظام "سرد القصص عبر التمرير" (Scrollytelling)
 * 
 * الأقسام:
 * 1. أفق عمان - مبنى أيقوني يُبنى ذاتياً
 * 2. النقل الذكي - الباص السريع
 * 3. الشاشات الإعلانية - لوحات LED
 * 4. المرافق الذكية - الحمامات الذكية
 * 5. السياحة الافتراضية - جولة 360°
 */

// Section data for the scrollytelling narrative
const sections = [
  {
    id: 'skyline',
    title: 'أفق عمّان الذكية',
    subtitle: 'AMMAN SMART SKYLINE',
    description: 'مبنى أيقوني يمثل "عمان الذكية" يرتفع أمامك — رمز للتحول الرقمي الذي يعيد تشكيل أفق العاصمة.',
    accent: '#00b8b8',
  },
  {
    id: 'transport',
    title: 'النقل الذكي',
    subtitle: 'SMART TRANSIT',
    description: 'باص عمان السريع الكهربائي ينطلق على مساره — محطات مكيفة، بطاقة موحدة، وتجربة تنقل عصرية تربط أحياء المدينة.',
    accent: '#ff3344',
  },
  {
    id: 'billboards',
    title: 'الشاشات الإعلانية الذكية',
    subtitle: 'DIGITAL BILLBOARDS',
    description: 'لوحات إعلانية رقمية بتقنية LED تنبض بالحياة في شوارع عمان — محتوى ديناميكي يتغير لحظياً ويضيء المدينة.',
    accent: '#c9a14b',
  },
  {
    id: 'facilities',
    title: 'المرافق العامة الذكية',
    subtitle: 'SMART FACILITIES',
    description: 'حمامات عمومية ذكية بتقنية الدخول عبر بطاقة الباص — تنظيف آلي، تهوية ذكية، وطاقة شمسية مستدامة.',
    accent: '#00aaff',
  },
  {
    id: 'tourism',
    title: 'بوابة السياحة الافتراضية',
    subtitle: 'VR TOURISM GATEWAY',
    description: 'انتقل داخل مشهد 360° لمواقع أثرية خالدة — البترا، المدرج الروماني، وأعمدة جرش تنبض بالحياة أمامك.',
    accent: '#ffaa44',
  },
];

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
    setScrollProgress(progress);

    // Determine active section
    const sectionIndex = Math.min(
      sections.length - 1,
      Math.floor(progress * sections.length)
    );
    setActiveSection(sectionIndex);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const currentSection = sections[activeSection];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a1a2f]" dir="rtl">
      <ProtectionLayer />

      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0a1a2f] flex flex-col items-center justify-center transition-all duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="relative mb-8">
          <img
            src="/logo_transparent.png"
            alt="عمان الذكية"
            className="h-32 md:h-48 animate-pulse"
          />
        </div>
        <div className="text-3xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Cairo' }}>
          عمّان الذكية
        </div>
        <div className="text-lg md:text-xl text-[#00b8b8] font-bold tracking-widest">
          AMMAN SMART 2030
        </div>
        <div className="mt-8 w-48 h-1 bg-[#1a3a52] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-l from-[#00b8b8] to-[#c9a14b] rounded-full animate-[loadingBar_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* 3D Canvas - Fixed background */}
      <div className="fixed inset-0 z-0">
        <ThreeCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Gradient overlays for readability */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {/* Bottom gradient for text */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#0a1a2f]/95 via-[#0a1a2f]/60 to-transparent" />
        {/* Top gradient for header */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a1a2f]/80 to-transparent" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,26,47,0.4)_100%)]" />
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo_transparent.png"
              alt="عمان الذكية"
              className="h-10 md:h-14 drop-shadow-lg"
            />
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-black text-white leading-tight" style={{ fontFamily: 'Cairo' }}>
                عمّان الذكية
              </span>
              <span className="text-[10px] md:text-xs text-[#00b8b8] font-bold tracking-wider">
                AMMAN SMART 2030
              </span>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="hidden md:flex items-center gap-6">
            {sections.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  if (!scrollContainerRef.current) return;
                  const scrollHeight = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
                  const targetScroll = (idx / sections.length) * scrollHeight;
                  scrollContainerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }}
                className={`text-xs font-medium transition-all duration-300 ${
                  activeSection === idx
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Scrollable content container */}
      <div
        ref={scrollContainerRef}
        className="relative z-[2] w-full h-screen overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Scroll spacer - creates the scroll distance */}
        <div style={{ height: '600vh' }}>
          {/* Hero Section (top) */}
          <div className="h-screen flex flex-col items-center justify-center px-4 text-center relative">
            <div
              className={`transition-all duration-1000 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <img
                src="/logo_transparent.png"
                alt="عمان الذكية"
                className="h-40 md:h-64 mx-auto mb-6 drop-shadow-2xl"
              />
              <h1
                className="text-5xl md:text-8xl font-black text-white mb-4 leading-tight"
                style={{ fontFamily: 'Cairo' }}
              >
                عمّان الذكية
                <span className="block text-[#00b8b8] text-3xl md:text-5xl mt-2">
                  2030
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed">
                نحن المعماريون الرقميون لمستقبل الأردن. مشروع طموح يدمج الإرث التاريخي مع أحدث تقنيات إنترنت الأشياء والذكاء الاصطناعي.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-[#c9a14b]/30">
                <span className="text-[#c9a14b] text-sm md:text-base font-semibold">
                  🎯 النطاق الرسمي لمبادرة عمان الذكية
                </span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <span className="text-white/50 text-sm">اسحب للأسفل لاستكشاف الرؤية</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-2 bg-[#00b8b8] rounded-full mt-2 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Spacer sections for scroll distance */}
          {sections.map((section, idx) => (
            <div key={section.id} className="h-screen relative" />
          ))}

          {/* About / Vision / Investment Section */}
          <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-16">
              {/* من نحن */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-[#00b8b8]/20 border border-[#00b8b8]/30 mb-2">
                  <span className="text-[#00b8b8] text-sm font-bold">من نحن</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: 'Cairo' }}>
                  المعماريون الرقميون
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  نحن المعماريون الرقميون لمستقبل الأردن. "عمان الذكية" مشروع طموح يدمج الإرث التاريخي مع أحدث تقنيات إنترنت الأشياء والذكاء الاصطناعي.
                </p>
              </div>

              {/* الرؤية */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-[#c9a14b]/20 border border-[#c9a14b]/30 mb-2">
                  <span className="text-[#c9a14b] text-sm font-bold">الرؤية</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: 'Cairo' }}>
                  رائدة المدن الذكية
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                  تحويل عمان إلى رائدة المدن الذكية عالمياً، حيث يتصل كل مواطن بنظام بيئي مستدام، آمن، ومتطور تقنياً.
                </p>
              </div>

              {/* الرسالة الاستثمارية */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00b8b8]/10 via-[#c9a14b]/10 to-[#00b8b8]/10 rounded-2xl blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-md border border-[#c9a14b]/30 rounded-2xl p-8 md:p-12">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#ff3344]/20 border border-[#ff3344]/30 mb-4">
                    <span className="text-[#ff3344] text-sm font-bold">فرصة استثمارية</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Cairo' }}>
                    المستقبل يبدأ هنا
                  </h2>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                    هذا النطاق الرقمي هو البوابة الرسمية لرؤية عمان الذكية. امتلك الهوية الرقمية لأضخم تحول حضري في المنطقة.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <div className="bg-[#00b8b8]/20 border border-[#00b8b8]/30 rounded-xl px-6 py-4 text-center">
                      <div className="text-2xl md:text-3xl font-black text-[#00b8b8]">5500+</div>
                      <div className="text-white/60 text-sm mt-1">كاميرا ذكية</div>
                    </div>
                    <div className="bg-[#c9a14b]/20 border border-[#c9a14b]/30 rounded-xl px-6 py-4 text-center">
                      <div className="text-2xl md:text-3xl font-black text-[#c9a14b]">100+</div>
                      <div className="text-white/60 text-sm mt-1">حافلة كهربائية</div>
                    </div>
                    <div className="bg-[#ff3344]/20 border border-[#ff3344]/30 rounded-xl px-6 py-4 text-center">
                      <div className="text-2xl md:text-3xl font-black text-[#ff3344]">40+</div>
                      <div className="text-white/60 text-sm mt-1">محطة ذكية</div>
                    </div>
                    <div className="bg-[#00aaff]/20 border border-[#00aaff]/30 rounded-xl px-6 py-4 text-center">
                      <div className="text-2xl md:text-3xl font-black text-[#00aaff]">360°</div>
                      <div className="text-white/60 text-sm mt-1">سياحة افتراضية</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    title: 'التنقل الذكي',
                    items: ['باص سريع كهربائي بالكامل', 'محطات ذكية مكيفة', 'بطاقة مواصلات موحدة', 'مسارات مشاة ودراجات آمنة'],
                    color: '#ff3344',
                  },
                  {
                    title: 'البنية التحتية',
                    items: ['5500 كاميرا ذكية', 'ذكاء اصطناعي للتحليل', 'شبكة إعلانات رقمية', 'مراقبة لحظية للحوادث'],
                    color: '#00b8b8',
                  },
                  {
                    title: 'السياحة الذكية',
                    items: ['منصة VR سياحية', 'جولات افتراضية 360°', 'بيع تذاكر إلكترونية', 'دليل سياحي ذكي'],
                    color: '#c9a14b',
                  },
                ].map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-right hover:bg-white/10 transition-all duration-300"
                  >
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ fontFamily: 'Cairo', color: project.color }}
                    >
                      {project.title}
                    </h3>
                    <ul className="space-y-2">
                      {project.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                          <span style={{ color: project.color }}>✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Section Info Overlay (bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-[3] pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6 md:pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            {/* Section text */}
            <div
              className="max-w-xl transition-all duration-500"
              key={currentSection.id}
            >
              <div
                className="text-xs md:text-sm font-bold tracking-widest mb-2 transition-colors duration-500"
                style={{ color: currentSection.accent }}
              >
                {currentSection.subtitle}
              </div>
              <h2
                className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight"
                style={{ fontFamily: 'Cairo' }}
              >
                {currentSection.title}
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                {currentSection.description}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-white/40 text-xs font-mono">
                {String(activeSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
              </div>
              {/* Vertical dots */}
              <div className="flex md:flex-col gap-2">
                {sections.map((s, idx) => (
                  <div
                    key={s.id}
                    className="relative"
                  >
                    <div
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${
                        activeSection === idx
                          ? 'scale-125'
                          : 'bg-white/20 scale-100'
                      }`}
                      style={{
                        backgroundColor: activeSection === idx ? s.accent : undefined,
                        boxShadow: activeSection === idx ? `0 0 10px ${s.accent}` : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${scrollProgress * 100}%`,
              background: `linear-gradient(90deg, #00b8b8, ${currentSection.accent})`,
              boxShadow: `0 0 10px ${currentSection.accent}`,
            }}
          />
        </div>
      </div>

      {/* Side scroll indicator (desktop) */}
      {!isMobile && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[3] flex flex-col gap-3">
          {sections.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                if (!scrollContainerRef.current) return;
                const scrollHeight = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
                const targetScroll = (idx / sections.length) * scrollHeight;
                scrollContainerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
              }}
              className="group relative flex items-center"
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === idx
                    ? 'scale-125'
                    : 'border-white/30 hover:border-white/60'
                }`}
                style={{
                  borderColor: activeSection === idx ? s.accent : undefined,
                  backgroundColor: activeSection === idx ? s.accent : 'transparent',
                  boxShadow: activeSection === idx ? `0 0 8px ${s.accent}` : 'none',
                }}
              />
              <span
                className={`absolute right-6 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                  activeSection === idx
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
                }`}
                style={{ color: activeSection === idx ? s.accent : '#ffffff' }}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Footer - Fixed at very bottom, visible when scrolled to end */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[4] transition-all duration-500 ${
          scrollProgress > 0.92 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <footer className="bg-[#0a1a2f]/95 backdrop-blur-md border-t border-white/10 py-6 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img src="/logo_transparent.png" alt="عمان الذكية" className="h-8" />
              <span className="text-white font-bold" style={{ fontFamily: 'Cairo' }}>عمّان الذكية 2030</span>
            </div>
            <p className="text-white/40 text-sm">
              جميع التصاميم والرؤية الفنية هي ملكية فكرية مسجلة. هذا الموقع هو نموذج أولي لهوية عمان الرقمية.
            </p>
            <p className="text-white/30 text-xs">
              © 2030 AMMAN SMART — جميع الحقوق محفوظة | النطاق الرسمي لمبادرة تطوير العاصمة عمّان
            </p>
          </div>
        </footer>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; margin-right: 100%; }
          50% { width: 100%; margin-right: 0%; }
          100% { width: 0%; margin-right: 0%; }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #0a1a2f;
        }
        ::-webkit-scrollbar-thumb {
          background: #00b8b8;
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00d4d4;
        }

        /* Smooth scroll for touch */
        @media (pointer: coarse) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: y proximity;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
