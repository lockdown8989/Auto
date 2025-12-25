
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VEHICLES } from './constants';
import { Vehicle, FilterState } from './types';
import VehicleCard from './components/VehicleCard';
import FilterSidebar from './components/FilterSidebar';
import VehicleDetails from './components/VehicleDetails';
import ComparisonBar from './components/ComparisonBar';
import { geminiService } from './services/geminiService';

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[450px]">
    <div className="h-52 shimmer"></div>
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <div className="h-3 shimmer rounded w-1/4"></div>
        <div className="h-6 shimmer rounded w-3/4"></div>
      </div>
      <div className="h-8 shimmer rounded w-1/2 mt-4"></div>
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
        <div className="h-4 shimmer rounded"></div>
        <div className="h-4 shimmer rounded"></div>
      </div>
      <div className="h-12 shimmer rounded-xl mt-4"></div>
    </div>
  </div>
);

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    make: '',
    minPrice: 0,
    maxPrice: 0,
    bodyType: [],
    fuelType: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>('year-desc');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isAISearching, setIsAISearching] = useState(false);
  const [aiMatchIds, setAiMatchIds] = useState<string[] | null>(null);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);

  // Filtering Logic
  const filteredAndSortedVehicles = useMemo(() => {
    let result = VEHICLES.filter(v => {
      const matchesSearch = v.make.toLowerCase().includes(filters.search.toLowerCase()) || 
                           v.model.toLowerCase().includes(filters.search.toLowerCase());
      const matchesMake = !filters.make || v.make === filters.make;
      const matchesPrice = (v.price >= filters.minPrice) && (filters.maxPrice === 0 || v.price <= filters.maxPrice);
      const matchesBody = filters.bodyType.length === 0 || filters.bodyType.includes(v.bodyType);
      const matchesFuel = filters.fuelType.length === 0 || filters.fuelType.includes(v.fuelType);
      const matchesAI = aiMatchIds === null || aiMatchIds.includes(v.id);

      return matchesSearch && matchesMake && matchesPrice && matchesBody && matchesFuel && matchesAI;
    });

    // Sorting Logic
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'year-desc': return b.year - a.year;
        case 'mileage-asc': return a.mileage - b.mileage;
        default: return 0;
      }
    });
  }, [filters, aiMatchIds, sortBy]);

  const handleAISearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!filters.search.trim()) {
      setAiMatchIds(null);
      return;
    }
    setIsAISearching(true);
    try {
      const ids = await geminiService.smartSearch(filters.search, VEHICLES);
      setAiMatchIds(ids);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAISearching(false);
    }
  };

  const toggleComparison = (id: string) => {
    setComparisonIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">
              AUTOSPHERE <span className="text-blue-600 italic font-black">🚘</span>
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-blue-600 transition-colors">Marketplace</a>
            <a href="#" className="hover:text-blue-600 transition-colors">AI Advisor</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Sell</a>
            <button className="bg-slate-900 text-white px-7 py-3 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 font-bold active:scale-95">
              Account
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        {/* Hero Section */}
        <section className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-20 relative overflow-hidden shadow-2xl shadow-slate-300"
          >
            <div className="relative z-10 max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
              >
                Intelligent Search 2.0
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1]">
                Find the car you <br/><span className="text-blue-500">actually</span> want.
              </h1>
              <p className="text-slate-400 text-xl mb-12 max-w-xl leading-relaxed">
                Describe your lifestyle, budget, and needs. Our AI analyzes the market to find your perfect match.
              </p>
              
              <form onSubmit={handleAISearch} className="relative max-w-2xl">
                <input 
                  type="text" 
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="e.g. 'A family SUV with AWD under $50k that's great for road trips'"
                  className="w-full pl-8 pr-40 py-6 bg-white rounded-3xl shadow-2xl text-slate-900 focus:ring-8 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 font-medium text-lg"
                />
                <div className="absolute right-3 top-3 bottom-3 flex gap-2">
                   <button 
                    type="submit"
                    disabled={isAISearching}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-2xl font-black transition-all flex items-center gap-3 disabled:opacity-50 shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    {isAISearching ? (
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : 'FIND'}
                  </button>
                </div>
              </form>
              
              <AnimatePresence>
                {aiMatchIds !== null && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 flex items-center gap-4 text-blue-400 text-sm font-bold bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10 w-fit"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000-16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    AI Recommendations active ({filteredAndSortedVehicles.length})
                    <button onClick={() => { setAiMatchIds(null); setFilters(prev => ({...prev, search: ''})); }} className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all">Clear Results</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-40 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[160px]"></div>
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[140px]"></div>
            </div>
          </motion.div>
        </section>

        {/* Listings Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Results Grid */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {isAISearching ? 'Scanning Inventory...' : `${filteredAndSortedVehicles.length} Vehicles Found`}
                </h2>
                <p className="text-slate-400 font-medium text-sm mt-1">Updated 5 minutes ago</p>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
                >
                  <option value="year-desc">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="mileage-asc">Lowest Mileage</option>
                </select>
              </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative">
              <AnimatePresence mode="popLayout">
                {isAISearching ? (
                  [...Array(6)].map((_, i) => (
                    <motion.div 
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SkeletonCard />
                    </motion.div>
                  ))
                ) : filteredAndSortedVehicles.length > 0 ? (
                  filteredAndSortedVehicles.map(v => (
                    <VehicleCard 
                      key={v.id} 
                      vehicle={v} 
                      onClick={setSelectedVehicle}
                      isComparing={comparisonIds.includes(v.id)}
                      onToggleCompare={toggleComparison}
                    />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-full bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200"
                  >
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">No matches found</h3>
                    <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">We couldn't find vehicles matching your criteria. Try widening your search or using our AI expert.</p>
                    <button 
                      onClick={() => { setFilters({ search: '', make: '', minPrice: 0, maxPrice: 0, bodyType: [], fuelType: [] }); setAiMatchIds(null); }}
                      className="bg-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                    >
                      RESET ALL SEARCHES
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Comparison Bar */}
      <AnimatePresence>
        {comparisonIds.length > 0 && (
          <ComparisonBar 
            selectedIds={comparisonIds}
            vehicles={VEHICLES}
            onRemove={(id) => setComparisonIds(prev => prev.filter(i => i !== id))}
            onClear={() => setComparisonIds([])}
            onCompare={() => alert('Comparison view would open here with selected IDs: ' + comparisonIds.join(', '))}
          />
        )}
      </AnimatePresence>

      {/* Footer (Condensed) */}
      <footer className="bg-slate-900 text-slate-500 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-white font-black tracking-widest uppercase">AUTOSPHERE 🚘</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4">Market Engineering • Intelligence • Scale</p>
          <p className="text-sm opacity-50">© 2024 AutoSphere 🚘. Advanced automotive logic for the next generation.</p>
        </div>
      </footer>

      {/* Vehicle Details Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <VehicleDetails 
            vehicle={selectedVehicle} 
            onClose={() => setSelectedVehicle(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;