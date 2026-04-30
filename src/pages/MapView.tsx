/// <reference types="@types/google.maps" />
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation, Search } from 'lucide-react';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!API_KEY) {
      setApiKeyMissing(true);
      return;
    }

    const loader = new Loader({
      apiKey: API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    (loader as any).load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.0060 }, // NYC center
          zoom: 13,
          styles: darkMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
        });

        // Mock Polling Booths
        const booths = [
          { lat: 40.7128, lng: -74.0060, name: "City Hall Polling Center", status: "Open" },
          { lat: 40.7200, lng: -74.0100, name: "Public Library Booth #4", status: "Busy" },
          { lat: 40.7050, lng: -73.9950, name: "Community Center Alpha", status: "Closed" },
        ];

        booths.forEach(booth => {
          new google.maps.Marker({
            position: { lat: booth.lat, lng: booth.lng },
            map,
            title: booth.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: booth.status === 'Open' ? '#34A853' : booth.status === 'Busy' ? '#FBBC05' : '#EA4335',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#FFFFFF',
              scale: 10,
            },
          });
        });

        setMapLoaded(true);
      }
    }).catch((e: any) => {
      console.error("Maps failed to load", e);
      setApiKeyMissing(true);
    });
  }, []);

  return (
    <div className="pt-24 pb-12 section-container h-screen flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold flex items-center gap-3">
             <MapPin className="text-google-red" /> Voter Access Map
           </h2>
           <p className="text-gray-400 mt-1">Locate your nearest polling station and check real-time accessibility.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
             <input 
               type="text" 
               placeholder="Search area..." 
               className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors w-full md:w-64"
             />
           </div>
           <button className="glass-button p-2.5">
             <Navigation className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="flex-1 rounded-3xl overflow-hidden glass-card border-white/20 relative">
        {apiKeyMissing ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-md p-12 text-center" role="alert">
             <div className="max-w-md">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                   <MapPin className="text-google-red w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Google Maps Configuration Required</h3>
                <p className="text-gray-400 mb-8">
                  To view the interactive polling map, please ensure your <span className="text-white">Google Maps API Key</span> is present and <strong>Billing is Enabled</strong> on your Google Cloud Project.
                </p>
                <div className="bg-brand-dark p-4 rounded-xl text-left font-mono text-xs border border-white/5 overflow-x-auto">
                  VITE_GOOGLE_MAPS_API_KEY=AIzaSy...
                </div>
                <a 
                  href="https://console.cloud.google.com/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-blue-400 hover:underline text-sm font-bold"
                >
                  Enable Billing in Google Cloud →
                </a>
             </div>
          </div>
        ) : !mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 font-medium">Initializing Google Maps SDK...</p>
             </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Map Legend Overlay */}
        {mapLoaded && (
          <div className="absolute bottom-6 left-6 glass-card p-4 space-y-3">
             <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Legend</h4>
             <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-google-green"></div>
                <span>Open / Short Wait</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-google-yellow"></div>
                <span>Busy / High Traffic</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-google-red"></div>
                <span>Closed</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
];

export default MapView;
