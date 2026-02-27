/**
 * INTERACTIVE MAP COMPONENT FOR AMMAN SMART
 * Enhanced with cinematic Framer Motion animations
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Bus, Camera, Zap, X } from 'lucide-react';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'station' | 'camera' | 'charging' | 'bathroom';
  title: string;
  description: string;
  details?: string[];
}

interface PopupData {
  marker: MapMarker;
  position: { x: number; y: number };
}

const InteractiveMap = () => {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const markers: MapMarker[] = [
    {
      id: 'station-1',
      lat: 31.9454,
      lng: 35.9284,
      type: 'station',
      title: 'محطة الدوار الأول',
      description: 'المحطة الرئيسية للخط السريع',
      details: ['مكيفة الهواء', 'نقاط بيع وشحن', 'حمام ذكي', 'مساحة انتظار آمنة'],
    },
    {
      id: 'station-2',
      lat: 31.9467,
      lng: 35.9315,
      type: 'station',
      title: 'محطة شارع الملك عبدالله',
      description: 'محطة وسط البلد الرئيسية',
      details: ['مكيفة الهواء', 'صراف آلي', 'نقاط شحن الهواتف', 'مراحيض ذكية'],
    },
    {
      id: 'station-3',
      lat: 31.9485,
      lng: 35.9345,
      type: 'station',
      title: 'محطة الجامعة الأردنية',
      description: 'محطة الخدمات الجامعية',
      details: ['مكيفة الهواء', 'نقاط بيع', 'محطة شحن كهربائية', 'حمامات عمومية'],
    },
    {
      id: 'station-4',
      lat: 31.952,
      lng: 35.928,
      type: 'station',
      title: 'محطة الشميساني',
      description: 'محطة الأعمال والتجارة',
      details: ['مكيفة الهواء', 'نقاط بيع متقدمة', 'شحن سريع', 'خدمات VIP'],
    },
    {
      id: 'camera-1',
      lat: 31.9454,
      lng: 35.9284,
      type: 'camera',
      title: 'كاميرا ذكية - الدوار الأول',
      description: 'مراقبة المرور والسلامة العامة',
      details: ['دقة 4K', 'تحليل ذكي للحوادث', 'تنبيهات فورية', 'تسجيل 24/7'],
    },
    {
      id: 'camera-2',
      lat: 31.9467,
      lng: 35.9315,
      type: 'camera',
      title: 'كاميرا ذكية - وسط البلد',
      description: 'مراقبة المناطق التجارية',
      details: ['تتبع الحركة', 'عد الأشخاص', 'تحليل الازدحام', 'إنذار أمني'],
    },
    {
      id: 'camera-3',
      lat: 31.9485,
      lng: 35.9345,
      type: 'camera',
      title: 'كاميرا ذكية - الجامعة',
      description: 'مراقبة المناطق الأكاديمية',
      details: ['رؤية ليلية', 'تتبع الحركة المريبة', 'إنذارات أمنية', 'تسجيل عالي الجودة'],
    },
    {
      id: 'charging-1',
      lat: 31.946,
      lng: 35.93,
      type: 'charging',
      title: 'محطة شحن كهربائية - المركز',
      description: 'شحن سريع للحافلات الكهربائية',
      details: ['شحن 150 كيلوواط', 'وقت شحن 30 دقيقة', 'طاقة نظيفة 100%', 'مراقبة ذكية'],
    },
    {
      id: 'charging-2',
      lat: 31.95,
      lng: 35.933,
      type: 'charging',
      title: 'محطة شحن - الشرق',
      description: 'محطة شحن إضافية',
      details: ['شحن 100 كيلوواط', 'وقت شحن 45 دقيقة', 'طاقة متجددة', 'نظام ذكي'],
    },
    {
      id: 'bathroom-1',
      lat: 31.947,
      lng: 35.931,
      type: 'bathroom',
      title: 'حمام ذكي - المركز',
      description: 'حمامات عمومية ذكية مكيفة',
      details: ['تنظيف آلي', 'تهوية ذكية', 'إضاءة حساسة', 'مياه ساخنة'],
    },
    {
      id: 'bathroom-2',
      lat: 31.949,
      lng: 35.934,
      type: 'bathroom',
      title: 'حمام ذكي - الشمال',
      description: 'حمامات عمومية حديثة',
      details: ['تنظيف مستمر', 'مراقبة الاحتلال', 'إنذار الطوارئ', 'تدفئة ذكية'],
    },
  ];

  const statistics = [
    { label: 'كاميرات ذكية', value: '5500', icon: Camera, color: '#8b5f1c' },
    { label: 'محطات ذكية', value: '40+', icon: MapPin, color: '#c9a14b' },
    { label: 'حافلات كهربائية', value: '100+', icon: Bus, color: '#00b8b8' },
    { label: 'نقاط شحن', value: '50+', icon: Zap, color: '#0a1a2f' },
  ];

  const latToPixel = (lat: number) => {
    const minLat = 31.94;
    const maxLat = 31.955;
    return ((maxLat - lat) / (maxLat - minLat)) * 100;
  };

  const lngToPixel = (lng: number) => {
    const minLng = 35.92;
    const maxLng = 35.94;
    return ((lng - minLng) / (maxLng - minLng)) * 100;
  };

  const filteredMarkers =
    selectedCategory === 'all' ? markers : markers.filter((m) => m.type === selectedCategory);

  const markersByType: Record<string, { color: string; symbol: string }> = {
    station: { color: '#c9a14b', symbol: '🚌' },
    camera: { color: '#8b5f1c', symbol: '📹' },
    charging: { color: '#00b8b8', symbol: '⚡' },
    bathroom: { color: '#102a43', symbol: '🚽' },
  };

  const categories = [
    { key: 'all', label: 'الكل', color: '#0a1a2f', activeColor: '#00b8b8' },
    { key: 'station', label: '🚌 المحطات الذكية', color: '#c9a14b', activeColor: '#c9a14b' },
    { key: 'camera', label: '📹 الكاميرات الذكية', color: '#8b5f1c', activeColor: '#8b5f1c' },
    { key: 'charging', label: '⚡ محطات الشحن', color: '#00b8b8', activeColor: '#00b8b8' },
    { key: 'bathroom', label: '🚽 الحمامات الذكية', color: '#102a43', activeColor: '#102a43' },
  ];

  const handleMarkerClick = (marker: MapMarker, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopup({
      marker,
      position: { x: rect.left, y: rect.top },
    });
  };

  return (
    <div className="w-full bg-[#0a1a2f]" dir="rtl" ref={sectionRef}>
      {/* Header with animated gradient */}
      <motion.div
        className="relative overflow-hidden py-10 px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a2f] via-[#0d2240] to-[#0a1a2f]" />
        {/* Animated accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #00b8b8, #c9a14b, transparent)' }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-black mb-3 text-white"
            style={{ fontFamily: 'Cairo' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            الخريطة <span className="text-[#00b8b8]">التفاعلية</span>
          </motion.h2>
          <motion.p
            className="text-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            استكشف مشروع عمان الذكية بشكل تفاعلي - المحطات، الكاميرات، محطات الشحن والحمامات الذكية
          </motion.p>
        </div>
      </motion.div>

      {/* Category Filter with animated selection */}
      <div className="bg-[#0d2240]/80 backdrop-blur-md border-b border-white/5 py-4 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className="px-4 py-2 rounded-full font-medium text-sm transition-all relative overflow-hidden"
                style={{
                  backgroundColor:
                    selectedCategory === cat.key ? cat.activeColor : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === cat.key ? '#fff' : 'rgba(255,255,255,0.6)',
                  border: `1px solid ${selectedCategory === cat.key ? cat.activeColor : 'rgba(255,255,255,0.1)'}`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {selectedCategory === cat.key && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    layoutId="activeCategory"
                    style={{ backgroundColor: cat.activeColor }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Map Container */}
      <div
        className="relative w-full h-96 md:h-[70vh] overflow-hidden"
        ref={mapContainer}
      >
        {/* Animated SVG Map */}
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ background: 'linear-gradient(135deg, #0d2240 0%, #0a1a2f 50%, #0d2240 100%)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Animated grid */}
          <defs>
            <pattern id="mapGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,184,184,0.08)" strokeWidth="0.3" />
            </pattern>
            <radialGradient id="markerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00b8b8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00b8b8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#mapGrid)" />

          {/* Animated BRT Route Line */}
          <motion.polyline
            points="42,13 48,30 55,47 60,60 65,73 70,87"
            stroke="#00b8b8"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
          />

          {/* Route glow */}
          <motion.polyline
            points="42,13 48,30 55,47 60,60 65,73 70,87"
            stroke="#00b8b8"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
          />

          {/* SVG Markers with pulse animation */}
          {filteredMarkers.map((marker, idx) => {
            const x = lngToPixel(marker.lng);
            const y = latToPixel(marker.lat);
            const typeConfig = markersByType[marker.type];
            const isHovered = hoveredMarker === marker.id;

            return (
              <motion.g
                key={marker.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + idx * 0.08, type: 'spring' }}
              >
                {/* Ripple effect */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="none"
                  stroke={typeConfig.color}
                  strokeWidth="0.3"
                  animate={{
                    r: [3, 8, 3],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.3,
                    ease: 'easeInOut',
                  }}
                />

                {/* Marker dot */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 4 : 2.5}
                  fill={typeConfig.color}
                  stroke="white"
                  strokeWidth="0.8"
                  style={{ cursor: 'pointer' }}
                  animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.g>
            );
          })}
        </motion.svg>

        {/* Interactive marker overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {filteredMarkers.map((marker, idx) => {
              const x = lngToPixel(marker.lng);
              const y = latToPixel(marker.lat);
              const typeConfig = markersByType[marker.type];

              return (
                <motion.div
                  key={marker.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, type: 'spring' }}
                >
                  <motion.button
                    onClick={(e) => handleMarkerClick(marker, e)}
                    onMouseEnter={() => setHoveredMarker(marker.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg relative"
                    style={{
                      backgroundColor: typeConfig.color,
                      border: '2px solid rgba(255,255,255,0.8)',
                      boxShadow: `0 2px 12px ${typeConfig.color}60`,
                    }}
                    whileHover={{
                      scale: 1.3,
                      boxShadow: `0 0 25px ${typeConfig.color}80`,
                    }}
                    whileTap={{ scale: 0.9 }}
                    title={marker.title}
                  >
                    {typeConfig.symbol}

                    {/* Hover tooltip */}
                    <AnimatePresence>
                      {hoveredMarker === marker.id && (
                        <motion.div
                          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0a1a2f]/95 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10"
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          {marker.title}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1a2f]/95 rotate-45 border-r border-b border-white/10" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Popup with cinematic animation */}
        <AnimatePresence>
          {popup && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPopup(null)}
              />

              {/* Popup card */}
              <motion.div
                className="fixed z-50 bg-[#0d2240]/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 max-w-sm border border-[#00b8b8]/20"
                style={{
                  left: `min(${popup.position.x}px, calc(100vw - 380px))`,
                  top: `min(${popup.position.y + 60}px, calc(100vh - 320px))`,
                }}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{
                        backgroundColor: `${markersByType[popup.marker.type].color}30`,
                        border: `1px solid ${markersByType[popup.marker.type].color}50`,
                      }}
                    >
                      {markersByType[popup.marker.type].symbol}
                    </div>
                    <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Cairo' }}>
                      {popup.marker.title}
                    </h3>
                  </div>
                  <motion.button
                    onClick={() => setPopup(null)}
                    className="text-white/40 hover:text-white/80 transition-colors"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <p className="text-white/60 text-sm mb-4">{popup.marker.description}</p>

                {popup.marker.details && (
                  <div className="space-y-2">
                    <p className="font-semibold text-sm text-[#00b8b8]">التفاصيل:</p>
                    <ul className="text-sm text-white/60 space-y-2">
                      {popup.marker.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.08 }}
                        >
                          <span className="text-[#00b8b8]">✓</span>
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Statistics bar */}
      <motion.div
        className="bg-[#0d2240]/80 backdrop-blur-md border-t border-white/5 py-6 px-4 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {statistics.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                whileHover={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: `${stat.color}40`,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="bg-[#0a1a2f] border-t border-white/5 py-6 px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="font-bold text-lg text-white/80 mb-4" style={{ fontFamily: 'Cairo' }}>
            وسيلة الإيضاح
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { symbol: '🚌', label: 'محطات ذكية', color: '#c9a14b' },
              { symbol: '📹', label: 'كاميرات ذكية', color: '#8b5f1c' },
              { symbol: '⚡', label: 'محطات شحن', color: '#00b8b8' },
              { symbol: '🚽', label: 'حمامات ذكية', color: '#102a43' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 p-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: `${item.color}30`,
                    border: `1px solid ${item.color}50`,
                  }}
                >
                  {item.symbol}
                </div>
                <span className="text-sm text-white/50">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveMap;
