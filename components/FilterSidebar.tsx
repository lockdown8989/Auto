
import React from 'react';
import { motion } from 'framer-motion';
import { FilterState } from '../types';
import { MAKES, BODY_TYPES, FUEL_TYPES } from '../constants';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const toggleSelection = (key: 'bodyType' | 'fuelType', value: string) => {
    setFilters(prev => {
      const current = prev[key] as string[];
      const next = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const val = parseInt(e.target.value) || 0;
    setFilters(prev => ({ ...prev, [type === 'min' ? 'minPrice' : 'maxPrice']: val }));
  };

  return (
    <aside className="w-full space-y-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100 h-fit sticky top-24">
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">General Filters</h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900">Make / Model</label>
            <input 
              type="text" 
              placeholder="Keyword..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900">Brand</label>
            <select 
              value={filters.make}
              onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value }))}
              className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="">All Brands</option>
              {MAKES.map(make => <option key={make} value={make}>{make}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Specifications</h3>
        
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900">Budget Range</label>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="number" 
                placeholder="Min $" 
                value={filters.minPrice || ''}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10"
              />
              <input 
                type="number" 
                placeholder="Max $" 
                value={filters.maxPrice || ''}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900">Body Architecture</label>
            <div className="flex flex-wrap gap-2">
              {BODY_TYPES.map(type => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSelection('bodyType', type)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${
                    filters.bodyType.includes(type)
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900">Energy Source</label>
            <div className="grid grid-cols-2 gap-2">
              {FUEL_TYPES.map(fuel => (
                <label key={fuel} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${
                  filters.fuelType.includes(fuel) ? 'border-blue-600 bg-blue-50/50' : 'border-slate-50 bg-slate-50'
                }`}>
                  <input 
                    type="checkbox" 
                    checked={filters.fuelType.includes(fuel)}
                    onChange={() => toggleSelection('fuelType', fuel)}
                    className="hidden"
                  />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    filters.fuelType.includes(fuel) ? 'text-blue-600' : 'text-slate-500'
                  }`}>{fuel}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setFilters({ search: '', make: '', minPrice: 0, maxPrice: 0, bodyType: [], fuelType: [] })}
        className="w-full bg-slate-50 text-slate-400 font-black py-4 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all text-[10px] uppercase tracking-[0.2em]"
      >
        Reset Workspace
      </button>
    </aside>
  );
};

export default FilterSidebar;
