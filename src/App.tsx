import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Package, Truck, Search } from 'lucide-react';

function App() {
  const [trackingCode, setTrackingCode] = useState('');
  const [carrier, setCarrier] = useState<'none' | 'correios' | 'jadlog'>('none');

  useEffect(() => {
    // Detectar transportadora com base no código
    if (/^[A-Z]{2}\d{9}BR$/i.test(trackingCode)) {
      setCarrier('correios');
    } else if (/^\d{11}$/.test(trackingCode) || /^\d{14}$/.test(trackingCode)) {
      setCarrier('jadlog');
    } else {
      setCarrier('none');
    }
  }, [trackingCode]);

  const handleTrack = () => {
    if (carrier === 'correios') {
      window.open(`https://rastreamento.correios.com.br/app/index.php?objeto=${trackingCode}`, '_blank');
    } else if (carrier === 'jadlog') {
      window.open(`https://www.jadlog.com.br/siteInstitucional/tracking.jad?cte=${trackingCode}`, '_blank');
    }
  };

  const getButtonColor = () => {
    switch (carrier) {
      case 'correios':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'jadlog':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background */}
      <div 
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3")',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center">
          {/* Logo and Title */}
          <div className="flex items-center mb-8">
            <Package className="w-12 h-12 text-white mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Rastreio Brasil
            </h1>
          </div>

          {/* Tracking Form */}
          <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <label htmlFor="tracking" className="block text-gray-700 text-sm font-semibold mb-2">
                Código de Rastreio
              </label>
              <input
                id="tracking"
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                placeholder="Digite seu código de rastreio"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleTrack}
              disabled={carrier === 'none'}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold flex items-center justify-center transition-colors ${getButtonColor()} ${
                carrier === 'none' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Search className="w-5 h-5 mr-2" />
              Rastrear Encomenda
            </button>

            {/* Carrier Identification */}
            {carrier !== 'none' && (
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Truck className={`w-5 h-5 ${carrier === 'correios' ? 'text-yellow-600' : 'text-red-600'}`} />
                  <p className="font-medium">
                    {carrier === 'correios' ? 'Correios' : 'Jadlog'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 text-white text-center">
            <p className="text-sm opacity-80">
              Exemplos de códigos: Correios (AA123456789BR) | Jadlog (12345678912345 ou 12345678901) BY NINEX_OF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
