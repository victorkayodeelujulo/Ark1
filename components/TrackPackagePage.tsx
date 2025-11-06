import React, { useState, useEffect } from 'react';
import { Order, TrackingEvent } from '../types';
import { MOCK_ORDER, TRACKING_DATA } from '../constants';
import { ChevronLeftIcon, TruckIcon } from './IconComponents';

interface TrackPackagePageProps {
  onBack: () => void;
}

const TrackingResult: React.FC<{ order: Order, events: TrackingEvent[] }> = ({ order, events }) => (
  <div className="animate-fadeIn mt-8">
    <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Order {order.id}</h2>
          <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Tracking Number: {order.trackingNumber}</p>
        </div>
        <div className="mt-4 sm:mt-0 text-left sm:text-right">
          <p className="font-bold text-arkaenia-text dark:text-arkaenia-text-dark">{order.status}</p>
          <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Estimated Delivery: Aug 2, 2024</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map visualization */}
      <div className="lg:col-span-1 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg p-4">
          <h3 className="font-bold text-lg text-arkaenia-text dark:text-arkaenia-text-dark mb-4">Package Journey</h3>
          <div className="aspect-square bg-arkaenia-card dark:bg-arkaenia-card-dark rounded-md flex items-center justify-center relative overflow-hidden">
             {/* This is a simplified map visualization */}
             <img src="https://lh3.googleusercontent.com/d/1B2t-yE7sPajQRoj-fYoA5SD_iE2GR1sA" alt="Package map" className="w-full h-full object-cover opacity-50 dark:opacity-30" />
             <div className="absolute inset-0 flex flex-col justify-between p-4">
                 <div className="text-left">
                     <p className="font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Origin</p>
                     <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Ikeja, NG</p>
                 </div>
                 <div className="text-right">
                     <p className="font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Destination</p>
                     <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Your Location</p>
                 </div>
             </div>
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 20 80 Q 50 20, 80 20" stroke="currentColor" strokeWidth="2" fill="none" className="text-arkaenia-accent dark:text-arkaenia-accent-dark" strokeDasharray="4 4" />
             </svg>
          </div>
      </div>
      
      {/* Timeline */}
      <div className="lg:col-span-2 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg p-6">
        <h3 className="font-bold text-lg text-arkaenia-text dark:text-arkaenia-text-dark mb-6">Tracking History</h3>
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-arkaenia-primary dark:bg-arkaenia-primary-dark ring-4 ring-arkaenia-primary/20 dark:ring-arkaenia-primary-dark/20' : 'bg-arkaenia-card dark:bg-arkaenia-card-dark'}`}></div>
                {index < events.length - 1 && <div className="w-0.5 flex-1 bg-arkaenia-card dark:bg-arkaenia-card-dark"></div>}
              </div>
              <div>
                <p className={`font-bold ${index === 0 ? 'text-arkaenia-text dark:text-arkaenia-text-dark' : 'text-arkaenia-subtext dark:text-arkaenia-subtext-dark'}`}>{event.status}</p>
                <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">{event.location}</p>
                <p className="text-xs text-arkaenia-subtext/70 dark:text-arkaenia-subtext-dark/70 mt-1">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TrackPackagePage: React.FC<TrackPackagePageProps> = ({ onBack }) => {
  const [trackingNumber, setTrackingNumber] = useState(MOCK_ORDER.trackingNumber);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{order: Order, events: TrackingEvent[]} | null>(null);

  const handleTrackPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const events = TRACKING_DATA[trackingNumber.trim()];
      if (events) {
        setResult({ order: MOCK_ORDER, events });
      } else {
        setError("Invalid tracking number. Please check and try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Track Your Package</h1>
      </div>
      
      <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg shadow-sm p-8">
        <form onSubmit={handleTrackPackage} className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
           <div className="relative flex-1 w-full">
                <TruckIcon className="absolute w-5 h-5 text-arkaenia-subtext dark:text-arkaenia-subtext-dark top-1/2 left-4 -translate-y-1/2" />
                <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number (e.g., ARK0012345678)"
                    className="w-full py-3 pl-12 pr-4 text-arkaenia-text dark:text-arkaenia-text-dark rounded-full bg-arkaenia-bg dark:bg-arkaenia-bg-dark border-2 border-arkaenia-card dark:border-arkaenia-card-dark focus:border-arkaenia-accent dark:focus:border-arkaenia-accent-dark outline-none transition-colors"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full hover:scale-105 transition-transform duration-200 disabled:bg-arkaenia-subtext dark:disabled:bg-arkaenia-subtext-dark disabled:scale-100 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Tracking...' : 'Track'}
            </button>
        </form>
         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>

      {isLoading && (
        <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arkaenia-accent dark:border-arkaenia-accent-dark mx-auto"></div>
            <p className="mt-4 text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Finding your package...</p>
        </div>
      )}

      {!isLoading && result && <TrackingResult order={result.order} events={result.events} />}

      {!isLoading && !result && !error && (
        <div className="text-center py-20 mt-8 border-2 border-dashed border-arkaenia-card dark:border-arkaenia-card-dark rounded-lg">
            <TruckIcon className="w-24 h-24 mx-auto text-arkaenia-subtext/50 dark:text-arkaenia-subtext-dark/50 mb-4 animate-pulseSlow" />
            <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Real-time updates will appear here</h2>
            <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-2">Enter your tracking number above to see your package's journey.</p>
        </div>
      )}
    </div>
  );
};

export default TrackPackagePage;
