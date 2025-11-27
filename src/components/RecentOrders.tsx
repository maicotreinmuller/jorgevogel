import { useState } from "react";
import ServiceOrderViewModal from "./ServiceOrderViewModal";
import { ServiceOrder } from "@/db/database";

interface RecentOrdersProps {
  orders: ServiceOrder[];
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Sort orders by date, most recent first
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "text-yellow-600 bg-yellow-50",
      in_progress: "text-blue-600 bg-blue-50",
      completed: "text-green-600 bg-green-50",
      cancelled: "text-red-600 bg-red-50",
    };
    return colors[status] || "text-gray-600 bg-gray-50";
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500">
              <th className="py-3 px-4">Número</th>
              <th className="py-3 px-4">Cliente</th>
              <th className="py-3 px-4">Produto</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedOrders.slice(0, 5).map((order) => (
              <tr 
                key={order.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedOrder(order);
                  setModalOpen(true);
                }}
              >
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  #{order.orderNumber}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {order.clientName}
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {order.product}
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status === 'pending' && 'Pendente'}
                    {order.status === 'in_progress' && 'Em Andamento'}
                    {order.status === 'completed' && 'Concluída'}
                    {order.status === 'cancelled' && 'Cancelada'}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {sortedOrders.slice(0, 5).map((order) => (
          <div
            key={order.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer active:bg-gray-100"
            onClick={() => {
              setSelectedOrder(order);
              setModalOpen(true);
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-gray-900">
                #{order.orderNumber}
              </span>
              <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status === 'pending' && 'Pendente'}
                {order.status === 'in_progress' && 'Em Andamento'}
                {order.status === 'completed' && 'Concluída'}
                {order.status === 'cancelled' && 'Cancelada'}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-700 font-medium">{order.clientName}</p>
              <p className="text-sm text-gray-600">{order.product}</p>
              <p className="text-xs text-gray-500">
                {new Date(order.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ServiceOrderViewModal 
        order={selectedOrder}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

export default RecentOrders;