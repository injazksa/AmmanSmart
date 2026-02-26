/**
 * INTERACTIVE MAP COMPONENT FOR AMMAN SMART
 * 
 * Features:
 * - Google Maps integration with custom markers
 * - BRT Bus routes visualization
 * - Smart stations with detailed information
 * - Smart camera coverage areas
 * - Interactive popups with descriptions
 * - Real-time statistics
 */

import { useEffect, useRef, useState } from 'react';
import { MapPin, Bus, Camera, Zap, Info, X } from 'lucide-react';
import { MapView } from '@/components/Map';

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
  const map = useRef<google.maps.Map | null>(null);
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const onMapReady = (googleMap: google.maps.Map) => {
    map.current = googleMap;
    addMarkers();
    setMapLoaded(true);
  };

  const addMarkers = () => {
    if (!map.current || !window.google) return;

    const markersByType = {
      station: { color: '#c9a14b', symbol: '🚌' },
      camera: { color: '#8b5f1c', symbol: '📹' },
      charging: { color: '#00b8b8', symbol: '⚡' },
      bathroom: { color: '#102a43', symbol: '🚽' }
    };

    markers.forEach(marker => {
      const typeConfig = markersByType[marker.type];
      
      const markerElement = document.createElement('div');
      markerElement.innerHTML = `
        <div style="
          background-color: ${typeConfig.color};
          color: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 3px solid white;
          transition: all 0.3s ease;
        " class="map-marker">
          ${typeConfig.symbol}
        </div>
      `;

      markerElement.addEventListener('click', (e) => {
        const rect = markerElement.getBoundingClientRect();
        setPopup({
          marker,
          position: { x: rect.left, y: rect.top }
        });
      });

      if (window.google && window.google.maps && window.google.maps.marker) {
        new window.google.maps.marker.AdvancedMarkerElement({
          map: map.current,
          position: { lat: marker.lat, lng: marker.lng },
          content: markerElement,
          title: marker.title
        });
      }
    });
  };

  return (
    <div className="w-full bg-white" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a1a2f] to-[#102a43] text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-2">الخريطة التفاعلية</h2>
          <p className="text-gray-200">استكشف مشروع عمان الذكية بشكل تفاعلي - المحطات، الكاميرات، محطات الشحن والحمامات الذكية</p>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistics.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-4 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                  <Icon size={24} style={{ color: stat.color }} className="mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#0a1a2f]">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
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

      {/* Map Container */}
      <div className="relative">
        <MapView
          initialCenter={{ lat: 31.9454, lng: 35.9284 }}
          initialZoom={13}
          onMapReady={onMapReady}
          className="w-full h-[600px]"
        />

        {/* Popup */}
        {popup && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-[#0a1a2f] to-[#102a43] text-white p-4 flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{popup.marker.title}</h3>
                  <p className="text-sm text-gray-200">{popup.marker.description}</p>
                </div>
                <button
                  onClick={() => setPopup(null)}
                  className="ml-4 p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                  <Info size={20} className="text-[#c9a14b]" />
                  <span className="font-semibold text-[#0a1a2f]">التفاصيل</span>
                </div>
                
                {popup.marker.details && (
                  <ul className="space-y-2">
                    {popup.marker.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-[#c9a14b] rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>الموقع:</strong> {popup.marker.lat.toFixed(4)}°N, {popup.marker.lng.toFixed(4)}°E
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 border-t border-gray-200 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-[#0a1a2f] mb-6">وسيلة الإيضاح</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#c9a14b] flex items-center justify-center text-white text-lg">🚌</div>
              <div>
                <div className="font-semibold text-gray-900">المحطات الذكية</div>
                <div className="text-sm text-gray-600">محطات BRT مكيفة وذكية</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#8b5f1c] flex items-center justify-center text-white text-lg">📹</div>
              <div>
                <div className="font-semibold text-gray-900">الكاميرات الذكية</div>
                <div className="text-sm text-gray-600">مراقبة وتحليل ذكي</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#00b8b8] flex items-center justify-center text-white text-lg">⚡</div>
              <div>
                <div className="font-semibold text-gray-900">محطات الشحن</div>
                <div className="text-sm text-gray-600">شحن سريع كهربائي</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#102a43] flex items-center justify-center text-white text-lg">🚽</div>
              <div>
                <div className="font-semibold text-gray-900">الحمامات الذكية</div>
                <div className="text-sm text-gray-600">حمامات عمومية ذكية</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white border-t border-gray-200 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-[#0a1a2f] mb-6">حول الخريطة التفاعلية</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <h4 className="font-bold text-[#0a1a2f] mb-2">🗺️ التنقل الذكي</h4>
              <p className="text-gray-700 text-sm">
                استكشف شبكة النقل الذكية مع 40+ محطة ذكية موزعة في أنحاء عمّان، مع حافلات كهربائية بالكامل وبطاقة مواصلات موحدة.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
              <h4 className="font-bold text-[#0a1a2f] mb-2">📹 الأمان والمراقبة</h4>
              <p className="text-gray-700 text-sm">
                شبكة من 5500 كاميرا ذكية موزعة في جميع أنحاء المدينة، مع تحليل ذكي وتنبيهات فورية للحوادث والمخاطر.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
              <h4 className="font-bold text-[#0a1a2f] mb-2">⚡ الطاقة النظيفة</h4>
              <p className="text-gray-700 text-sm">
                محطات شحن كهربائية موزعة بشكل استراتيجي، مع استخدام 100% من الطاقة المتجددة والنظيفة لتشغيل النقل العام.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
