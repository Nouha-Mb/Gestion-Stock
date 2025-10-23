import React, { useState } from 'react';
import { Cable, Package, Search, Plus, CreditCard as Edit2, Trash2, AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

// Définition des PropTypes
const CableItemShape = {
  id: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  alertThreshold: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired
};

function App() {
  const [cables, setCables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCable, setEditingCable] = useState(null);
  const [formData, setFormData] = useState({
    reference: '',
    description: '',
    quantity: 0,
    unit: 'mètres',
    alertThreshold: 10,
    location: '',
  });

  const filteredCables = cables.filter(cable =>
    cable.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cable.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCables = cables.filter(cable => cable.quantity <= cable.alertThreshold);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.reference.trim() && formData.description.trim()) {
      if (editingCable) {
        setCables(prev => prev.map(cable => 
          cable.id === editingCable.id 
            ? { ...cable, ...formData, lastUpdated: new Date().toISOString() }
            : cable
        ));
      } else {
        const newCable = {
          ...formData,
          id: Date.now().toString(),
          lastUpdated: new Date().toISOString(),
        };
        setCables(prev => [...prev, newCable]);
      }
      setFormData({
        reference: '',
        description: '',
        quantity: 0,
        unit: 'mètres',
        alertThreshold: 10,
        location: '',
      });
      setShowForm(false);
      setEditingCable(null);
    }
  };

  const handleEdit = (cable) => {
    setEditingCable(cable);
    setFormData({
      reference: cable.reference,
      description: cable.description,
      quantity: cable.quantity,
      unit: cable.unit,
      alertThreshold: cable.alertThreshold,
      location: cable.location,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCables(prev => prev.filter(cable => cable.id !== id));
  };

  const handleQuantityChange = (id, change) => {
    setCables(prev => prev.map(cable => 
      cable.id === id 
        ? { ...cable, quantity: Math.max(0, cable.quantity + change), lastUpdated: new Date().toISOString() }
        : cable
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Références</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{cables.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quantité Totale</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {cables.reduce((sum, cable) => sum + cable.quantity, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alertes Stock Bas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{lowStockCables.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {lowStockCables.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                  Alertes Stock Faible ({lowStockCables.length})
                </h3>
                <div className="grid gap-3">
                  {lowStockCables.map((cable) => (
                    <div key={cable.id} className="bg-white rounded-lg p-4 border border-amber-200">
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
                          </div>
                        </div>
                        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          Stock Bas
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Rechercher par référence ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter un Câble
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingCable ? 'Modifier le Câble' : 'Ajouter un Nouveau Câble'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingCable(null);
                      setFormData({
                        reference: '',
                        description: '',
                        quantity: 0,
                        unit: 'mètres',
                        alertThreshold: 10,
                        location: '',
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Référence *
                    </label>
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantité
                      </label>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unité
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="mètres">Mètres</option>
                        <option value="pièces">Pièces</option>
                        <option value="kg">Kilogrammes</option>
                        <option value="rouleaux">Rouleaux</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seuil d'Alerte
                    </label>
                    <input
                      type="number"
                      value={formData.alertThreshold}
                      onChange={(e) => setFormData(prev => ({ ...prev, alertThreshold: Number(e.target.value) }))}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emplacement
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="ex: Entrepôt A - Zone 3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    {editingCable ? 'Modifier' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingCable(null);
                      setFormData({
                        reference: '',
                        description: '',
                        quantity: 0,
                        unit: 'mètres',
                        alertThreshold: 10,
                        location: '',
                      });
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cable Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Inventaire des Câbles</h2>
          </div>
          
          {filteredCables.length > 0 ? (
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
                  {filteredCables.map((cable) => {
                    const isLowStock = cable.quantity <= cable.alertThreshold;
                    const isMediumStock = cable.quantity <= cable.alertThreshold * 2 && !isLowStock;
                    
                    return (
                      <tr key={cable.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{cable.reference}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{cable.description}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(cable.id, -1)}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
                              disabled={cable.quantity <= 0}
                            >
                              -
                            </button>
                            <span className="text-sm font-semibold text-gray-900 min-w-[60px]">
                              {cable.quantity} {cable.unit}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(cable.id, 1)}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Seuil: {cable.alertThreshold} {cable.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            isLowStock 
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : isMediumStock
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-green-100 text-green-800 border border-green-200'
                          }`}>
                            {isLowStock ? 'Stock Bas' : isMediumStock ? 'Stock Moyen' : 'Stock OK'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {cable.location || 'Non spécifié'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(cable)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Modifier"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cable.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'Aucun câble trouvé pour votre recherche.' : 'Aucun câble dans le stock. Ajoutez votre premier câble !'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Définition des PropTypes pour le composant App
App.propTypes = {
  cableItem: PropTypes.shape(CableItemShape)
};

export default App;