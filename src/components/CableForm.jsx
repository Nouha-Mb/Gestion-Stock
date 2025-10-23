import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export const CableForm = ({ cable, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    reference: '',
    description: '',
    quantity: 0,
    unit: 'mètres',
    alertThreshold: 10,
    location: '',
  });

  useEffect(() => {
    if (cable) {
      setFormData({
        reference: cable.reference,
        description: cable.description,
        quantity: cable.quantity,
        unit: cable.unit,
        alertThreshold: cable.alertThreshold,
        location: cable.location,
      });
    }
  }, [cable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.reference.trim() && formData.description.trim()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'alertThreshold' ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {cable ? 'Modifier le Câble' : 'Ajouter un Nouveau Câble'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">
            Référence *
          </label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantité
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unité
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="mètres">Mètres</option>
              <option value="pièces">Pièces</option>
              <option value="kg">Kilogrammes</option>
              <option value="rouleaux">Rouleaux</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="alertThreshold" className="block text-sm font-medium text-gray-700 mb-1">
            Seuil d'Alerte
          </label>
          <input
            type="number"
            id="alertThreshold"
            name="alertThreshold"
            value={formData.alertThreshold}
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Emplacement
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="ex: Entrepôt A - Zone 3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          {cable ? 'Modifier' : 'Ajouter'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};