
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vehicle } from '../types';

interface ComparisonBarProps {
  selectedIds: string[];
  vehicles: Vehicle[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({ selectedIds, vehicles, onRemove, onClear, onCompare }) => {
  const selectedVehicles = vehicles.filter(v => selectedIds.includes(v.id));
  const isEnabled = selectedIds.length >= 2;

  if (selectedIds.length === 0) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl"
    >
      <div className="glass shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2rem] p-5 flex flex-wrap items-center justify-between gap-6 border-white/40">
        <div className="flex items-center gap-5">
          <div className="flex -space-x-4 overflow-hidden py-1">
            <AnimatePresence>
              {selectedVehicles.map(v => (
                <motion.div 
                  key={v.id} 
                  initial={{ scale: 0, opacity: 0, x: -20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0, opacity: 0, x: -20 }}
                  className="relative group shrink-0"
                >
                  <img 
                    src={v.image} 
                    className="w-14 h-14 rounded-2xl object-cover border-4 border-white shadow-md transition-transform hover:-translate-y-2 hover:z-10"
                    alt={v.model}
                  />
                  <button 
                    onClick={() => onRemove(v.id)}
                    className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 shadow-lg scale-75 group-hover:scale-100"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-black text-slate-900 leading-tight">
              {selectedIds.length} / 3 <span className="text-slate-400 font-medium">Selected</span>
            </div>
            {!isEnabled && (
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">
                Add {2 - selectedIds.length} more to compare
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button 
            onClick={onClear}
            className="px-5 py-2.5 text-xs font-black text-slate-400 hover:text-red-500 transition-all uppercase tracking-widest"
          >
            Clear All
          </button>
          
          <div className="relative group">
            <button 
              onClick={onCompare}
              disabled={!isEnabled}
              className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                isEnabled 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
              }`}
            >
              Compare
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
            
            {!isEnabled && (
              <div className="absolute bottom-full right-0 mb-3 w-48 p-3 bg-slate-900 text-white text-[10px] font-bold rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center leading-relaxed">
                <div className="absolute -bottom-1 right-10 w-2 h-2 bg-slate-900 rotate-45"></div>
                Please select at least two vehicles to initiate a side-by-side comparison analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonBar;
