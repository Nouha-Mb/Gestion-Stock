import React from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';

export const AlertsPanel = ({ lowStockCables }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            Alertes Stock Faible ({lowStockCables.length})
          </h3>
          <div className="grid gap-3">
            {lowStockCables.map((cable) => (
              <div
                key={cable.id}
                className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{cable.reference}</h4>
                    <p className="text-sm text-gray-600">{cable.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm">
                        <span className="font-medium">Stock:</span> {cable.quantity} {cable.unit}
                      </span>
                      <span className="text-sm">
                        <span className="font-medium">Seuil:</span> {cable.alertThreshold} {cable.unit}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {cable.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      Stock Bas
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};