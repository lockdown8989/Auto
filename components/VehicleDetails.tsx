
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vehicle, AIInsight } from '../types';
import { geminiService } from '../services/geminiService';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle, onClose }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      try {
        const data = await geminiService.getVehicleInsight(vehicle);
        setInsight(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [vehicle]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Media Side */}
        <div className="w-full md:w-1/2 relative bg-slate-100 overflow-hidden h-72 md:h-auto">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            src={vehicle.image} 
            alt={vehicle.model} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-2 leading-none">{vehicle.model}</h1>
            <p className="text-xl font-bold opacity-80">{vehicle.make} • {vehicle.year}</p>
          </div>
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 p-8 md:p-14 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="text-4xl font-black text-blue-600">${vehicle.price.toLocaleString()}</div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
              <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">Inventory Score</span>
              <span className="text-lg font-black text-slate-800">{vehicle.rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            {[
              { label: 'Odometer', val: `${vehicle.mileage.toLocaleString()} mi`, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Transmission', val: vehicle.transmission, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { label: 'Power Unit', val: vehicle.fuelType, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { label: 'Body Type', val: vehicle.bodyType, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-slate-800">{stat.val}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Manufacturer Insight</h3>
            <p className="text-slate-600 leading-relaxed font-medium">{vehicle.description}</p>
          </div>

          <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-black text-blue-900 uppercase text-xs tracking-widest">AI Market Analysis</h3>
              </div>
              {loading && (
                 <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full"
                 >
                   PROCESSING DATA...
                 </motion.span>
              )}
            </div>
            
            {loading ? (
              <div className="space-y-6">
                <div className="h-4 shimmer rounded-full w-full"></div>
                <div className="h-4 shimmer rounded-full w-5/6"></div>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <div className="h-3 shimmer rounded-full w-1/2"></div>
                    <div className="h-2 shimmer rounded-full w-full"></div>
                    <div className="h-2 shimmer rounded-full w-3/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 shimmer rounded-full w-1/2"></div>
                    <div className="h-2 shimmer rounded-full w-full"></div>
                    <div className="h-2 shimmer rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            ) : insight ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <p className="text-sm text-blue-900/80 font-semibold leading-relaxed">"{insight.summary}"</p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-green-700 uppercase tracking-widest">Market Pros</h4>
                    <ul className="text-xs text-slate-600 space-y-2 font-bold">
                      {insight.pros.map((p, i) => <li key={i} className="flex gap-2"><span>•</span> {p}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-red-700 uppercase tracking-widest">Market Cons</h4>
                    <ul className="text-xs text-slate-600 space-y-2 font-bold">
                      {insight.cons.map((c, i) => <li key={i} className="flex gap-2"><span>•</span> {c}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="pt-6 border-t border-blue-200">
                  <div className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">Final Decision Logic</div>
                  <p className="text-sm font-black text-blue-800">{insight.marketVerdict}</p>
                </div>
              </motion.div>
            ) : null}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-2xl shadow-slate-200 transition-all mt-10 hover:bg-blue-600 uppercase tracking-[0.2em] text-xs"
          >
            Initiate Procurement
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VehicleDetails;
