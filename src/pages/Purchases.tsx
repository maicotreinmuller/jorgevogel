import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/FormModal";
import PurchaseForm from "@/components/PurchaseForm";
import SearchField from "@/components/SearchField";
import PurchasesTable from "@/components/PurchasesTable";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { formatCurrency } from "@/utils/formatters";
import { db } from "@/db/database";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

const Purchases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data: purchases = [], refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => await db.purchases.toArray()
  });

  const handleExportToExcel = () => {
    const exportData = purchases.map(purchase => ({
      'Data': new Date(purchase.date).toLocaleDateString('pt-BR'),
      'Fornecedor': purchase.supplier,
      'CPF/CNPJ': purchase.document,
      'NF': purchase.invoiceNumber,
      'Produto': purchase.product,
      'Descrição': purchase.description,
      'Valor': formatCurrency(purchase.value),
    }));
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Compras");
    XLSX.writeFile(wb, "compras.xlsx");
    toast.success("Dados exportados com sucesso!");
  };

  const handleSubmit = async (data: any) => {
    try {
      await db.purchases.add(data);
      refetch();
      toast.success("Compra cadastrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar compra!");
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      await db.purchases.update(id, data);
      refetch();
      toast.success("Compra atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar compra!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.purchases.delete(id);
      refetch();
      toast.success("Compra excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir compra!");
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = Object.values(purchase).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = !dateFilter || new Date(purchase.date).toISOString().includes(dateFilter);
    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full">
        <div className="p-4 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Compras</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <Button variant="outline" onClick={handleExportToExcel} className="w-full sm:w-auto">
                Exportar Excel
              </Button>
              <FormModal title="Nova Compra" triggerText={<Button className="w-full sm:w-auto">Nova Compra</Button>}>
                <PurchaseForm onSubmit={handleSubmit} />
              </FormModal>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Pesquisar compras..."
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
          </div>

          <PurchasesTable
            purchases={filteredPurchases}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Purchases;