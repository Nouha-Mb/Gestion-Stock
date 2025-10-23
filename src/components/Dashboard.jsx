import React from 'react';
import { Package, TrendingDown, Warehouse, AlertTriangle } from 'lucide-react';

export const Dashboard = ({ cables, lowStockCount }) => {
  const totalCables = cables.length;
  const totalQuantity = cables.reduce((sum, cable) => sum + cable.quantity, 0);
  const avgQuantity = totalCables > 0 ? Math.round(totalQuantity / totalCables) : 0;

  const stats = [
    {
      title: 'Total Références',
      value: totalCables,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Quantité Totale',
      value: totalQuantity.toLocaleString(),
      icon: Warehouse,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Quantité Moyenne',
      value: avgQuantity,
      icon: TrendingDown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Alertes Stock Bas',
      value: lowStockCount,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};