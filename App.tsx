
import React, { useState } from 'react';
import { HOURS_PER_PT, PRESETS } from './constants';
import { ConversionResult } from './types';
import Header from './components/Header';
import ConverterCard from './components/ConverterCard';
import HistoryList from './components/HistoryList';
import ComparisonTable from './components/ComparisonTable';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [history, setHistory] = useState<ConversionResult[]>([]);

  const calculatePT = (hours: number): ConversionResult => {
    // Return precise decimal PT (e.g., 4h / 8h = 0.5 PT)
    const pt = hours / HOURS_PER_PT;
    return {
      hours,
      pt,
      timestamp: Date.now(),
    };
  };

  const handleInputChange = (val: string) => {
    const sanitizedValue = val.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    if ((sanitizedValue.match(/\./g) || []).length > 1) return;
    setInputValue(sanitizedValue);
  };

  const handleSave = () => {
    const hours = parseFloat(inputValue);
    if (!isNaN(hours) && hours > 0) {
      const result = calculatePT(hours);
      setHistory(prev => [result, ...prev].slice(0, 10));
    }
  };

  const applyPreset = (hours: number) => {
    setInputValue(hours.toString());
  };

  const currentResult = inputValue && !isNaN(parseFloat(inputValue)) 
    ? calculatePT(parseFloat(inputValue)) 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Converter Column */}
          <div className="md:col-span-2 space-y-6">
            <ConverterCard 
              inputValue={inputValue}
              onInputChange={handleInputChange}
              result={currentResult}
              onSave={handleSave}
            />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Presets</h2>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset.hours)}
                    className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-lg border border-slate-200 transition-all text-sm font-medium"
                  >
                    {preset.label} ({preset.hours}h)
                  </button>
                ))}
              </div>
            </div>

            <ComparisonTable />
          </div>

          {/* History Column */}
          <div className="space-y-6">
            <HistoryList history={history} />
            
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
              <h3 className="text-lg font-bold mb-2">Did you know?</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                A standard Person-Day (PT) is calculated as 8 productive hours. In most agile environments, this helps estimate sprint capacity more accurately than raw hours.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
