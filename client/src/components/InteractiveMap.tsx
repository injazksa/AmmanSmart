/**
 * INTERACTIVE MAP COMPONENT FOR AMMAN SMART
 * 
 * Features:
 * - Interactive map visualization using SVG
 * - BRT Bus routes visualization
 * - Smart stations with detailed information
 * - Smart camera coverage areas
 * - Interactive popups with descriptions
 * - Real-time statistics
 */

import { useEffect, useRef, useState } from 'react';
import { MapPin, Bus, Camera, Zap, Users, TrendingUp, Info, X } from 'lucide-react';

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
  const mapContainer = useRef<HTMLDivElement>(null);

  // Amman Smart Project Data
  const markers: MapMarker[] = [
    // Main BRT Stations
    {
      id: 'station-1',
      lat: 31.9454,
      lng: 35.9284,
      type: 'station',
      title: 'محطة الدوار الأول',
      description: 'المحطة الرئيسية للخط السريع',
      details: ['مكيفة الهواء', 'نقاط بيع وشحن', 'حمام ذكي', 'مساحة انتظار آمنة']
    },
    {
      id: 'station-2',
      lat: 31.9467,
      lng: 35.9315,
      type: 'station',
      title: 'محطة شارع الملك عبدالله',
      description: 'محطة وسط البلد الرئيسية',
      details: ['مكيفة الهواء', 'صراف آلي', 'نقاط شحن الهواتف', 'مراحيض ذكية']
    },
    {
      id: 'station-3',
      lat: 31.9485,
      lng: 35.9345,
      type: 'station',
      title: 'محطة الجامعة الأردنية',
      description: 'محطة الخدمات الجامعية',
      details: ['مكيفة الهواء', 'نقاط بيع', 'محطة شحن كهربائية', 'حمامات عمومية']
    },
    {
      id: 'station-4',
      lat: 31.9520,
      lng: 35.9280,
      type: 'station',
      title: 'محطة الشميساني',
      description: 'محطة الأعمال والتجارة',
      details: ['مكيفة الهواء', 'نقاط بيع متقدمة', 'شحن سريع', 'خدمات VIP']
    },
    // Smart Cameras
    {
      id: 'camera-1',
      lat: 31.9454,
      lng: 35.9284,
      type: 'camera',
      title: 'كاميرا ذكية - الدوار الأول',
      description: 'مراقبة المرور والسلامة العامة',
      details: ['دقة 4K', 'تحليل ذكي للحوادث', 'تنبيهات فورية', 'تسجيل 24/7']
    },
    {
      id: 'camera-2',
      lat: 31.9467,
      lng: 35.9315,
      type: 'camera',
      title: 'كاميرا ذكية - وسط البلد',
      description: 'مراقبة المناطق التجارية',
      details: ['تتبع الحركة', 'عد الأشخاص', 'تحليل الازدحام', 'إنذار أمني']
    },
    {
      id: 'camera-3',
      lat: 31.9485,
      lng: 35.9345,
      type: 'camera',
      title: 'كاميرا ذكية - الجامعة',
      description: 'مراقبة المناطق الأكاديمية',
      details: ['رؤية ليلية', 'تتبع الحركة المريبة', 'إنذارات أمنية', 'تسجيل عالي الجودة']
    },
    // Charging Stations
    {
      id: 'charging-1',
      lat: 31.9460,
      lng: 35.9300,
      type: 'charging',
      title: 'محطة شحن كهربائية - المركز',
      description: 'شحن سريع للحافلات الكهربائية',
      details: ['شحن 150 كيلوواط', 'وقت شحن 30 دقيقة', 'طاقة نظيفة 100%', 'مراقبة ذكية']
    },
    {
      id: 'charging-2',
      lat: 31.9500,
      lng: 35.9330,
      type: 'charging',
      title: 'محطة شحن - الشرق',
      description: 'محطة شحن إضافية',
      details: ['شحن 100 كيلوواط', 'وقت شحن 45 دقيقة', 'طاقة متجددة', 'نظام ذكي']
    },
    // Smart Bathrooms
    {
      id: 'bathroom-1',
      lat: 31.9470,
      lng: 35.9310,
      type: 'bathroom',
      title: 'حمام ذكي - المركز',
      description: 'حمامات عمومية ذكية مكيفة',
      details: ['تنظيف آلي', 'تهوية ذكية', 'إضاءة حساسة', 'مياه ساخنة']
    },
    {
      id: 'bathroom-2',
      lat: 31.9490,
      lng: 35.9340,
      type: 'bathroom',
      title: 'حمام ذكي - الشمال',
      description: 'حمامات عمومية حديثة',
      details: ['تنظيف مستمر', 'مراقبة الاحتلال', 'إنذار الطوارئ', 'تدفئة ذكية']
    }
  ];

  const statistics = [
    { label: 'كاميرات ذكية', value: '5500', icon: Camera, color: '#8b5f1c' },
    { label: 'محطات ذكية', value: '40+', icon: MapPin, color: '#c9a14b' },
    { label: 'حافلات كهربائية', value: '100+', icon: Bus, color: '#00b8b8' },
    { label: 'نقاط شحن', value: '50+', icon: Zap, color: '#0a1a2f' }
  ];

  // Convert lat/lng to pixel coordinates for SVG
  const latToPixel = (lat: number) => {
    const minLat = 31.9400;
    const maxLat = 31.9550;
    return ((maxLat - lat) / (maxLat - minLat)) * 100;
  };

  const lngToPixel = (lng: number) => {
    const minLng = 35.9200;
    const maxLng = 35.9400;
    return ((lng - minLng) / (maxLng - minLng)) * 100;
  };

  const filteredMarkers = selectedCategory === 'all' 
    ? markers 
    : markers.filter(m => m.type === selectedCategory);

  const markersByType = {
    station: { color: '#c9a14b', symbol: '🚌' },
    camera: { color: '#8b5f1c', symbol: '📹' },
    charging: { color: '#00b8b8', symbol: '⚡' },
    bathroom: { color: '#102a43', symbol: '🚽' }
  };

  const handleMarkerClick = (marker: MapMarker, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopup({
      marker,
      position: { x: rect.left, y: rect.top }
    });
  };

  return (
    <div className="w-full bg-white" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a1a2f] to-[#102a43] text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ fontFamily: 'Cairo' }}>الخريطة التفاعلية</h2>
          <p className="text-gray-200">استكشف مشروع عمان الذكية بشكل تفاعلي - المحطات، الكاميرات، محطات الشحن والحمامات الذكية</p>
        </div>
      </div>



      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0a1a2f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedCategory('station')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'station'
                  ? 'bg-[#c9a14b] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🚌 المحطات الذكية
            </button>
            <button
              onClick={() => setSelectedCategory('camera')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'camera'
                  ? 'bg-[#8b5f1c] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📹 الكاميرات الذكية
            </button>
            <button
              onClick={() => setSelectedCategory('charging')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'charging'
                  ? 'bg-[#00b8b8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚡ محطات الشحن
            </button>
            <button
              onClick={() => setSelectedCategory('bathroom')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'bathroom'
                  ? 'bg-[#102a43] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🚽 الحمامات الذكية
            </button>
          </div>
        </div>
      </div>

      {/* Map Container with SVG */}
      <div className="relative w-full h-96 md:h-screen bg-gradient-to-br from-gray-50 to-gray-100" ref={mapContainer}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f8fc 100%)' }}
        >
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#d0e8f2" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* BRT Route Line */}
          <polyline
            points="50,20 55,35 60,50 65,65 70,80"
            stroke="#00b8b8"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.6"
          />

          {/* Markers */}
          {filteredMarkers.map((marker) => {
            const x = lngToPixel(marker.lng);
            const y = latToPixel(marker.lat);
            const typeConfig = markersByType[marker.type];

            return (
              <g key={marker.id}>
                {/* Marker circle */}
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill={typeConfig.color}
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.8"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleMarkerClick(marker, e as any)}
                />
                {/* Marker glow */}
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="none"
                  stroke={typeConfig.color}
                  strokeWidth="0.5"
                  opacity="0.3"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleMarkerClick(marker, e as any)}
                />
              </g>
            );
          })}
        </svg>

        {/* Overlay with markers for better interaction */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredMarkers.map((marker) => {
            const x = lngToPixel(marker.lng);
            const y = latToPixel(marker.lat);
            const typeConfig = markersByType[marker.type];

            return (
              <div
                key={marker.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  onClick={(e) => handleMarkerClick(marker, e)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-125 transition-transform"
                  style={{
                    backgroundColor: typeConfig.color,
                    border: '3px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                  title={marker.title}
                >
                  {typeConfig.symbol}
                </button>
              </div>
            );
          })}
        </div>

        {/* Popup */}
        {popup && (
          <div 
            className="fixed bg-white rounded-lg shadow-xl p-4 max-w-sm z-50"
            style={{
              left: `${popup.position.x}px`,
              top: `${popup.position.y + 50}px`,
              maxHeight: '300px',
              overflow: 'auto'
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-[#0a1a2f]">{popup.marker.title}</h3>
              <button 
                onClick={() => setPopup(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-3">{popup.marker.description}</p>
            {popup.marker.details && (
              <div className="space-y-2">
                <p className="font-semibold text-sm text-[#0a1a2f]">التفاصيل:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {popup.marker.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#00b8b8]">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 border-t border-gray-200 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-bold text-lg text-[#0a1a2f] mb-4" style={{ fontFamily: 'Cairo' }}>وسيلة الإيضاح</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c9a14b] flex items-center justify-center text-white text-sm">🚌</div>
              <span className="text-sm text-gray-700">محطات ذكية</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8b5f1c] flex items-center justify-center text-white text-sm">📹</div>
              <span className="text-sm text-gray-700">كاميرات ذكية</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00b8b8] flex items-center justify-center text-white text-sm">⚡</div>
              <span className="text-sm text-gray-700">محطات شحن</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#102a43] flex items-center justify-center text-white text-sm">🚽</div>
              <span className="text-sm text-gray-700">حمامات ذكية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
