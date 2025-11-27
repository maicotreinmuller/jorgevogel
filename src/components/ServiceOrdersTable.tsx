import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import FormModal from "./FormModal";
import ServiceOrderForm from "./ServiceOrderForm";
import { ServiceOrder } from "@/db/database";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmation from "./DeleteConfirmation";

interface ServiceOrdersTableProps {
  orders: ServiceOrder[];
  onEdit: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}

const ServiceOrdersTable = ({ orders, onEdit, onDelete }: ServiceOrdersTableProps) => {
  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      urgent: "Urgente",
    };
    return labels[priority] || priority;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pendente",
      in_progress: "Em Andamento",
      completed: "Concluída",
      cancelled: "Cancelada",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      normal: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                N° OS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prioridade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                    {getPriorityLabel(order.priority)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(order.value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <FormModal
                    title="Editar Ordem de Serviço"
                    triggerText={
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        title="Editar ordem de serviço"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <ServiceOrderForm
                      onSubmit={(data) => onEdit(order.id!, data)}
                      initialData={order}
                      lastOrderNumber={Number(order.orderNumber)}
                    />
                  </FormModal>
                  <DeleteConfirmation 
                    onDelete={() => {
                      onDelete(order.id!);
                      toast.success('Ordem de serviço excluída com sucesso!');
                    }}
                    description="Deseja realmente excluir esta ordem de serviço?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-medium text-gray-500">OS #{order.orderNumber}</span>
                <h3 className="font-semibold text-gray-900 text-base mt-1">{order.clientName}</h3>
              </div>
              <div className="flex gap-1">
                <FormModal
                  title="Editar Ordem de Serviço"
                  triggerText={
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  }
                >
                  <ServiceOrderForm
                    onSubmit={(data) => onEdit(order.id!, data)}
                    initialData={order}
                    lastOrderNumber={Number(order.orderNumber)}
                  />
                </FormModal>
                <DeleteConfirmation 
                  onDelete={() => {
                    onDelete(order.id!);
                    toast.success('Ordem de serviço excluída com sucesso!');
                  }}
                  description="Deseja realmente excluir esta ordem de serviço?"
                />
              </div>
            </div>
            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Produto:</span>
                <span className="text-gray-900">{order.product}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Valor:</span>
                <span className="text-gray-900 font-semibold">{formatCurrency(order.value)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Data:</span>
                <span className="text-gray-900">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                {getPriorityLabel(order.priority)}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceOrdersTable;
