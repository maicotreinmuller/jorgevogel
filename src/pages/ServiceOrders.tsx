import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormModal from "@/components/FormModal";
import ServiceOrderForm from "@/components/ServiceOrderForm";
import SearchField from "@/components/SearchField";
import ServiceOrdersTable from "@/components/ServiceOrdersTable";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { formatCurrency } from "@/utils/formatters";
import { db } from "@/db/database";
import { useQuery } from "@tanstack/react-query";

const ServiceOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['serviceOrders'],
    queryFn: async () => await db.serviceOrders.toArray()
  });

  const handleExportToExcel = () => {
    const exportData = orders.map(order => ({
      'Nº OS': order.orderNumber,
      'Cliente': order.clientName,
      'Produto': order.product,
      'Descrição': order.description,
      'Observação': order.observation,
      'Prioridade': getPriorityLabel(order.priority),
      'Status': getStatusLabel(order.status),
      'Valor': formatCurrency(order.value),
      'Data': new Date(order.date).toLocaleDateString('pt-BR'),
    }));
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ordens de Serviço");
    XLSX.writeFile(wb, "ordens-de-servico.xlsx");
    toast.success("Dados exportados com sucesso!");
  };

  const handleSubmit = async (data: any) => {
    try {
      const client = await db.clients.get(data.clientId);
      if (!client) {
        toast.error("Cliente não encontrado!");
        return;
      }

      await db.serviceOrders.add({
        ...data,
        clientName: client.name,
        date: new Date(),
      });
      
      refetch();
      toast.success("Ordem de serviço cadastrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar ordem de serviço!");
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      const client = await db.clients.get(data.clientId);
      if (!client) {
        toast.error("Cliente não encontrado!");
        return;
      }

      await db.serviceOrders.update(id, {
        ...data,
        clientName: client.name,
      });
      
      refetch();
      toast.success("Ordem de serviço atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar ordem de serviço!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.serviceOrders.delete(id);
      refetch();
      toast.success("Ordem de serviço excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir ordem de serviço!");
    }
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

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pendente",
      in_progress: "Em Andamento",
      completed: "Concluída",
      cancelled: "Cancelada",
    };
    return labels[status] || status;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = Object.values(order).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = !dateFilter || new Date(order.date).toISOString().includes(dateFilter);
    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full">
        <div className="p-4 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <Button variant="outline" onClick={handleExportToExcel} className="w-full sm:w-auto">
                Exportar Excel
              </Button>
              <FormModal title="Nova Ordem de Serviço" triggerText={<Button className="w-full sm:w-auto">Nova Ordem</Button>}>
                <ServiceOrderForm
                  onSubmit={handleSubmit}
                  lastOrderNumber={Math.max(...orders.map(o => Number(o.orderNumber)), 0)}
                />
              </FormModal>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Pesquisar ordens..."
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
          </div>

          <ServiceOrdersTable
            orders={filteredOrders}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceOrders;