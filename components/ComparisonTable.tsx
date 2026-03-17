
import React from 'react';

const ComparisonTable: React.FC = () => {
  const steps = [1, 2, 4, 8, 16, 24, 32, 40];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Conversion Cheat Sheet</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {steps.map((h) => (
          <div key={h} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-1">{h} {h === 1 ? 'Hour' : 'Hours'}</p>
            <p className="text-lg font-bold text-slate-800">{(h / 8).toFixed(h % 8 === 0 ? 0 : 2)} <span className="text-sm text-indigo-500">PT</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;
