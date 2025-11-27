import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/formatters";
import { ServiceOrder } from "@/db/database";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ServiceOrderViewModalProps {
  order: ServiceOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServiceOrderViewModal = ({ order, open, onOpenChange }: ServiceOrderViewModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!order) return null;

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pendente",
      in_progress: "Em Andamento",
      completed: "Concluída",
      cancelled: "Cancelada",
    };
    return labels[status] || status;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      urgent: "Urgente",
    };
    return labels[priority] || priority;
  };

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
      <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações do Cliente</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Cliente</p>
            <p className="font-medium text-gray-900">{order.clientName}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Data</p>
            <p className="font-medium text-gray-900">
              {new Date(order.date).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium text-gray-900">{getStatusLabel(order.status)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Prioridade</p>
            <p className="font-medium text-gray-900">{getPriorityLabel(order.priority)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalhes do Serviço</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Produto</p>
            <p className="font-medium text-gray-900">{order.product}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Valor</p>
            <p className="font-medium text-gray-900">{formatCurrency(order.value)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Descrição</p>
            <p className="font-medium text-gray-900">{order.description}</p>
          </div>
          {order.observation && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Observação</p>
              <p className="font-medium text-gray-900">{order.observation}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-lg md:text-xl">Ordem de Serviço #{order.orderNumber}</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-full overflow-y-auto">
            {content}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Ordem de Serviço #{order.orderNumber}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] overflow-y-auto">
          {content}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceOrderViewModal;
