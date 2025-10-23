import React from 'react';
import { Edit2, Trash2, MapPin, Calendar, Plus, Minus } from 'lucide-react';

export const CableTable = ({ 
  cables, 
  onEdit, 
  onDelete, 
  onUpdateQuantity 
}) => {
  const handleQuantityChange = (cableId, change) => {
    const cable = cables.find(c => c.id === cableId);
    if (cable) {
      const newQuantity = Math.max(0, cable.quantity + change);
      onUpdateQuantity(cableId, { quantity: newQuantity });
    }
  };

  const getStockStatus = (cable) => {
    if (cable.quantity <= cable.alertThreshold) {
      return {
        label: 'Stock Bas',
        className: 'bg-red-100 text-red-800 border border-red-200',
      };
    } else if (cable.quantity <= cable.alertThreshold * 2) {
      return {
        label: 'Stock Moyen',
        className: 'bg-amber-100 text-amber-800 border border-amber-200',
      };
    } else {
      return {
        label: 'Stock OK',
        className: 'bg-green-100 text-green-800 border border-green-200',
      };
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return 'Date invalide';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Inventaire des Câbles</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Référence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantité
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Emplacement
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cables.map((cable) => {
              const stockStatus = getStockStatus(cable);
              return (
                <tr key={cable.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{cable.reference}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(cable.lastUpdated)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{cable.description}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(cable.id, -1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-150"
                        disabled={cable.quantity <= 0}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-gray-900 min-w-[60px]">
                        {cable.quantity} {cable.unit}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(cable.id, 1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-150"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Seuil: {cable.alertThreshold} {cable.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${stockStatus.className}`}>
                      {stockStatus.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {cable.location || 'Non spécifié'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(cable)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(cable.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};