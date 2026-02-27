/**
 * CINEMATIC SCENES COMPONENT
 *
 * Immersive, full-screen animated storytelling sections for Amman Smart 2030.
 * Uses Framer Motion scroll-driven animations, parallax effects,
 * staggered text reveals, animated counters, and SVG visualizations.
 *
 * Scenes:
 *  1. الرؤية (The Vision) — dramatic data-flow particles + text reveal
 *  2. التنقل الذكي (Smart Mobility) — animated BRT route with moving dots
 *  3. البنية الذكية (Smart Infrastructure) — camera network scanning grid
 *  4. المستقبل (The Future) — convergence of all elements + CTA
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function useAnimatedCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

/* ------------------------------------------------------------------ */
/*  Shared animation variants                                          */
/* ------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Scene 1 — الرؤية (The Vision)                                      */
/* ------------------------------------------------------------------ */
function SceneVision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse at 30% 50%, #0a1a2f 0%, #081425 40%, #050d18 100%)",
        }}
      />

      {/* Floating data-flow particles (CSS-animated) */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 3 === 0
                  ? "#00b8b8"
                  : i % 3 === 1
                    ? "#c9a14b"
                    : "rgba(255,255,255,0.35)",
              opacity: 0.5 + Math.random() * 0.5,
              animation: `floatParticle ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Horizontal scan line */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b8b8]/60 to-transparent"
          style={{ animation: "scanLine 4s ease-in-out infinite" }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        dir="rtl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={textReveal}
          className="inline-block mb-6 px-5 py-2 rounded-full border border-[#00b8b8]/30 bg-[#00b8b8]/10 text-[#00b8b8] text-sm font-semibold tracking-wide"
        >
          المشهد الأول
        </motion.div>

        <motion.h2
          variants={textReveal}
          className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "Cairo" }}
        >
          الرؤية
        </motion.h2>

        <motion.p
          variants={textReveal}
          className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8"
        >
          في عام 2030، ستتحول عمّان إلى مدينة ذكية متكاملة — حيث تتدفق البيانات
          كالنهر، وتتصل الأنظمة كشبكة حية تنبض بالحياة.
        </motion.p>

        <motion.div
          variants={textReveal}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {[
            { label: "مشروع", value: "12+" },
            { label: "مليون مستفيد", value: "4" },
            { label: "كم² تغطية", value: "800" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-3xl md:text-4xl font-black text-[#00b8b8]">
                {stat.value}
              </span>
              <span className="text-white/60 text-sm">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 2 — التنقل الذكي (Smart Mobility)                            */
/* ------------------------------------------------------------------ */
function SceneMobility() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const routeProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  const busCount = useAnimatedCounter(100, 2200, isInView);
  const stationCount = useAnimatedCounter(40, 2000, isInView);
  const kmCount = useAnimatedCounter(32, 1800, isInView);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: bgY,
          background:
            "linear-gradient(160deg, #0a1a2f 0%, #0d2137 40%, #0f2a45 100%)",
        }}
      />

      {/* Animated BRT route SVG */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00b8b8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00b8b8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c9a14b" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 55}
              x2="800"
              y2={i * 55}
              stroke="rgba(0,184,184,0.06)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 55}
              y1="0"
              x2={i * 55}
              y2="600"
              stroke="rgba(0,184,184,0.06)"
              strokeWidth="1"
            />
          ))}

          {/* Main route path */}
          <motion.path
            d="M 80 500 Q 200 420 300 350 Q 400 280 500 250 Q 600 220 720 100"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            style={{ pathLength: routeProgress }}
          />

          {/* Station dots along route */}
          {[
            [80, 500],
            [200, 400],
            [300, 350],
            [500, 250],
            [720, 100],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="18"
                fill="none"
                stroke="#00b8b8"
                strokeWidth="1"
                opacity="0.2"
              >
                <animate
                  attributeName="r"
                  values="12;22;12"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.08;0.3"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={cx} cy={cy} r="5" fill="#00b8b8" opacity="0.9" />
              <circle cx={cx} cy={cy} r="2" fill="white" />
            </g>
          ))}

          {/* Moving bus dot */}
          <circle r="6" fill="#c9a14b">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M 80 500 Q 200 420 300 350 Q 400 280 500 250 Q 600 220 720 100"
            />
          </circle>
          <circle r="3" fill="white">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M 80 500 Q 200 420 300 350 Q 400 280 500 250 Q 600 220 720 100"
            />
          </circle>
        </svg>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        dir="rtl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={textReveal}
          className="inline-block mb-6 px-5 py-2 rounded-full border border-[#c9a14b]/30 bg-[#c9a14b]/10 text-[#c9a14b] text-sm font-semibold"
        >
          المشهد الثاني
        </motion.div>

        <motion.h2
          variants={textReveal}
          className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "Cairo" }}
        >
          التنقل الذكي
        </motion.h2>

        <motion.p
          variants={textReveal}
          className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-12"
        >
          شبكة نقل كهربائية بالكامل تربط أحياء عمّان — باصات سريعة، محطات مكيفة
          ذكية، وبطاقة موحدة لكل وسائل النقل.
        </motion.p>

        {/* Animated counters */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: busCount, suffix: "+", label: "حافلة كهربائية" },
            { value: stationCount, suffix: "+", label: "محطة ذكية" },
            { value: kmCount, suffix: " كم", label: "طول المسار" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-4xl md:text-5xl font-black text-[#00b8b8]">
                {s.value}
                <span className="text-2xl md:text-3xl">{s.suffix}</span>
              </span>
              <span className="text-white/60 text-sm md:text-base">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 3 — البنية الذكية (Smart Infrastructure)                     */
/* ------------------------------------------------------------------ */
function SceneInfrastructure() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const cameraCount = useAnimatedCounter(5500, 2500, isInView);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: bgY,
          background:
            "linear-gradient(200deg, #0a1a2f 0%, #0b1e33 50%, #081420 100%)",
        }}
      />

      {/* Scanning grid overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full opacity-20"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Hex grid pattern */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
              const x = col * 80 + (row % 2 === 0 ? 0 : 40);
              const y = row * 70;
              return (
                <g key={`${row}-${col}`}>
                  <polygon
                    points={`${x},${y - 30} ${x + 26},${y - 15} ${x + 26},${y + 15} ${x},${y + 30} ${x - 26},${y + 15} ${x - 26},${y - 15}`}
                    fill="none"
                    stroke="#00b8b8"
                    strokeWidth="0.5"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.15;0.5;0.15"
                      dur={`${3 + Math.random() * 3}s`}
                      begin={`${Math.random() * 3}s`}
                      repeatCount="indefinite"
                    />
                  </polygon>
                  {/* Camera node dot */}
                  <circle cx={x} cy={y} r="2" fill="#00b8b8" opacity="0.6">
                    <animate
                      attributeName="opacity"
                      values="0.3;0.9;0.3"
                      dur={`${2 + Math.random() * 2}s`}
                      begin={`${Math.random() * 2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            }),
          )}
        </svg>

        {/* Vertical scan bar */}
        <div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a14b]/50 to-transparent"
          style={{ animation: "scanLineV 5s ease-in-out infinite" }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        dir="rtl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={textReveal}
          className="inline-block mb-6 px-5 py-2 rounded-full border border-[#00b8b8]/30 bg-[#00b8b8]/10 text-[#00b8b8] text-sm font-semibold"
        >
          المشهد الثالث
        </motion.div>

        <motion.h2
          variants={textReveal}
          className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "Cairo" }}
        >
          البنية الذكية
        </motion.h2>

        <motion.p
          variants={textReveal}
          className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-10"
        >
          شبكة مراقبة ذكية تغطي كل زاوية — كاميرات بتقنية الذكاء الاصطناعي
          تحلل المرور، تكشف الحوادث، وتحمي المدينة على مدار الساعة.
        </motion.p>

        {/* Big counter */}
        <motion.div variants={fadeUp} className="mb-10">
          <div className="inline-flex flex-col items-center gap-2 px-10 py-8 rounded-3xl bg-white/5 border border-[#00b8b8]/20 backdrop-blur-sm">
            <span className="text-6xl md:text-8xl font-black text-[#00b8b8]">
              {cameraCount.toLocaleString()}
            </span>
            <span className="text-white/60 text-lg">كاميرا ذكية</span>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            "تحليل ذكي للحوادث",
            "رؤية ليلية متقدمة",
            "تنبيهات فورية",
            "تسجيل 24/7",
            "عد الأشخاص",
            "تحليل الازدحام",
          ].map((feature, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 4 — المستقبل (The Future)                                    */
/* ------------------------------------------------------------------ */
function SceneFuture() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ scale }}
    >
      {/* Background with converging radial gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(circle at 50% 50%, #102a43 0%, #0a1a2f 50%, #050d18 100%)",
        }}
      />

      {/* Converging lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x1 = 400 + Math.cos(angle) * 500;
            const y1 = 300 + Math.sin(angle) * 500;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2="400"
                y2="300"
                stroke="#00b8b8"
                strokeWidth="0.5"
                opacity="0.15"
              >
                <animate
                  attributeName="opacity"
                  values="0.05;0.25;0.05"
                  dur={`${3 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </line>
            );
          })}

          {/* Central pulse */}
          <circle cx="400" cy="300" r="8" fill="#00b8b8" opacity="0.8">
            <animate
              attributeName="r"
              values="6;14;6"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0.3;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="400" cy="300" r="30" fill="none" stroke="#00b8b8" strokeWidth="1" opacity="0.2">
            <animate
              attributeName="r"
              values="20;60;20"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.05;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="400" cy="300" r="60" fill="none" stroke="#c9a14b" strokeWidth="0.5" opacity="0.15">
            <animate
              attributeName="r"
              values="50;100;50"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.15;0.03;0.15"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${30 + i * 12}px`,
              height: `${30 + i * 12}px`,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? "rgba(0,184,184,0.15)" : "rgba(201,161,75,0.12)"} 0%, transparent 70%)`,
              animation: `floatOrb ${8 + i * 2}s ease-in-out ${i * 0.8}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        dir="rtl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={textReveal}
          className="inline-block mb-6 px-5 py-2 rounded-full border border-[#c9a14b]/30 bg-[#c9a14b]/10 text-[#c9a14b] text-sm font-semibold"
        >
          المشهد الأخير
        </motion.div>

        <motion.h2
          variants={textReveal}
          className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "Cairo" }}
        >
          المستقبل يبدأ الآن
        </motion.h2>

        <motion.p
          variants={textReveal}
          className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-10"
        >
          كل نظام، كل محطة، كل كاميرا — تتصل معاً لتشكّل نبض مدينة حية. عمّان
          الذكية ليست مجرد مشروع، بل هي وعد بمستقبل أفضل لكل مواطن.
        </motion.p>

        {/* Pillars */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10"
        >
          {[
            { emoji: "🚌", label: "تنقل ذكي" },
            { emoji: "📹", label: "أمان شامل" },
            { emoji: "🌿", label: "استدامة بيئية" },
            { emoji: "🎯", label: "رؤية 2030" },
          ].map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
              <span className="text-3xl">{p.emoji}</span>
              <span className="text-white/80 font-semibold text-sm">
                {p.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={textReveal}>
          <a
            href="#vision-section"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00b8b8] to-[#00a0a0] text-white font-bold text-lg shadow-lg shadow-[#00b8b8]/20 hover:shadow-[#00b8b8]/40 hover:scale-105 transition-all duration-300"
          >
            <span>استكشف المزيد</span>
            <span className="text-xl">↓</span>
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main CinematicScenes wrapper                                       */
/* ------------------------------------------------------------------ */
export default function CinematicScenes() {
  return (
    <div className="cinematic-scenes">
      {/* Inline keyframes for custom animations */}
      <style>{`
        @keyframes floatParticle {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(${20 - Math.random() * 40}px, ${-30 - Math.random() * 40}px) scale(${0.6 + Math.random() * 0.8}); }
        }
        @keyframes scanLine {
          0%   { top: -2px; }
          50%  { top: 100%; }
          100% { top: -2px; }
        }
        @keyframes scanLineV {
          0%   { left: -2px; }
          50%  { left: 100%; }
          100% { left: -2px; }
        }
        @keyframes floatOrb {
          0%   { transform: translateY(0) scale(1); }
          100% { transform: translateY(-30px) scale(1.15); }
        }
      `}</style>

      <SceneVision />
      <SceneMobility />
      <SceneInfrastructure />
      <SceneFuture />
    </div>
  );
}
