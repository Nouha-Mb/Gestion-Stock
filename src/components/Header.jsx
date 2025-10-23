import React from 'react';
import { Cable } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Cable className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LEONI StockLight</h1>
            <p className="text-gray-600">Gestion d'Inventaire Câbles</p>
          </div>
        </div>
      </div>
    </header>
  );
};