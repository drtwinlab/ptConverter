
import React, { useState } from 'react';
import { ConversionResult } from '../types';

interface ConverterCardProps {
  inputValue: string;
  onInputChange: (val: string) => void;
  result: ConversionResult | null;
  onSave: () => void;
}

const ConverterCard: React.FC<ConverterCardProps> = ({ 
  inputValue, 
  onInputChange, 
  result,
  onSave
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!result) return;
    const text = `${result.pt.toLocaleString(undefined, { maximumFractionDigits: 3 })} PT`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const fullDays = result ? Math.floor(result.pt) : 0;
  const fractionalPart = result ? result.pt % 1 : 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="p-8 space-y-8">
        <div>
          <label htmlFor="hours" className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
            Enter Total Hours
          </label>
          <div className="relative group">
            <input
              type="text"
              id="hours"
              placeholder="e.g., 4.5"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              className="w-full text-4xl font-bold py-4 px-0 border-b-2 border-slate-100 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-200"
            />
            <span className="absolute right-0 bottom-4 text-slate-400 font-semibold text-lg">hrs</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Result</span>
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-indigo-600">
                  {result ? result.pt.toLocaleString(undefined, { maximumFractionDigits: 3 }) : '0'}
                </span>
                <span className="text-2xl font-bold text-slate-800">PT</span>
              </div>
              
              {result && (
                <button 
                  onClick={copyToClipboard}
                  className={`p-2 rounded-xl transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>

          <button
            onClick={onSave}
            disabled={!inputValue || parseFloat(inputValue) <= 0}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Save Record
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100">
          <div className="flex gap-1 h-3 rounded-full bg-slate-200 overflow-hidden">
             {Array.from({ length: Math.min(fullDays, 20) }).map((_, i) => (
               <div key={i} className="flex-1 bg-indigo-500 h-full border-r border-indigo-600/20 last:border-0" />
             ))}
             {fractionalPart > 0 && (
               <div 
                 className="bg-indigo-300 h-full min-w-[4px]" 
                 style={{ width: `${(fractionalPart) * 100}%` }} 
               />
             )}
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium text-center">
            {result.hours} hours = {result.pt.toLocaleString(undefined, { maximumFractionDigits: 3 })} working days
          </p>
        </div>
      )}
    </div>
  );
};

export default ConverterCard;
