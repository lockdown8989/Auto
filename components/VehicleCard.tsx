
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
  isComparing: boolean;
  onToggleCompare: (id: string) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick, isComparing, onToggleCompare }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-slate-100 flex flex-col relative"
      onClick={() => onClick(vehicle)}
    >
      {/* Comparison Toggle */}
      <div 
        className="absolute top-3 left-3 z-10"
        onClick={(e) => { e.stopPropagation(); onToggleCompare(vehicle.id); }}
      >
        <div className={`p-2 rounded-xl backdrop-blur-md transition-all ${
          isComparing 
            ? 'bg-blue-600 text-white scale-110 shadow-lg' 
            : 'bg-white/80 text-slate-400 hover:text-blue-600'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </div>

      <div className="relative h-52 overflow-hidden bg-slate-100">
        {!imgError ? (
          <motion.img 
            src={vehicle.image} 
            alt={`${vehicle.make} ${vehicle.model}`} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Image Unavailable</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
          {vehicle.year}
        </div>
        <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
          {vehicle.fuelType}
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{vehicle.make}</h3>
            <h2 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
              {vehicle.model}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-900">${vehicle.price.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full uppercase">
            {vehicle.bodyType}
          </span>
          <span className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full uppercase">
            {vehicle.transmission}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-xs font-semibold">{vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            <span className="text-xs font-semibold">{vehicle.rating} / 5</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 mt-auto">
        <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-200 hover:shadow-blue-200">
          Exploration Mode
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
