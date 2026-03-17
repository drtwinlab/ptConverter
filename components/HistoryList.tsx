
import React from 'react';
import { ConversionResult } from '../types';

interface HistoryListProps {
  history: ConversionResult[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Recent Conversions</h2>
        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {history.length} SAVED
        </span>
      </div>
      <div className="divide-y divide-slate-50">
        {history.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-400">No history yet</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.timestamp} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.hours} Hours</p>
                <p className="text-xs text-slate-400">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-indigo-600 font-bold">
                  {item.pt.toLocaleString(undefined, { maximumFractionDigits: 3 })} PT
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryList;
