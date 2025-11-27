import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { db } from "@/db/database";
import { useQuery } from "@tanstack/react-query";

const DataManagement = () => {
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => await db.clients.toArray()
  });

  const { data: serviceOrders = [] } = useQuery({
    queryKey: ['serviceOrders'],
    queryFn: async () => await db.serviceOrders.toArray()
  });

  const { data: purchases = [] } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => await db.purchases.toArray()
  });

  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Exportar clientes
    const clientsData = clients.map(client => ({
      'Nome': client.name,
      'Documento': client.document,
      'Email': client.email,
      'Telefone': client.phone,
      'CEP': client.cep,
      'Endereço': client.street,
      'Número': client.number,
      'Complemento': client.complement,
      'Bairro': client.neighborhood,
      'Cidade': client.city,
      'Estado': client.state,
    }));
    const clientsSheet = XLSX.utils.json_to_sheet(clientsData);
    XLSX.utils.book_append_sheet(workbook, clientsSheet, "Clientes");

    // Exportar ordens de serviço
    const ordersData = serviceOrders.map(order => ({
      'Nº OS': order.orderNumber,
      'Cliente': order.clientName,
      'Produto': order.product,
      'Descrição': order.description,
      'Observação': order.observation,
      'Prioridade': order.priority,
      'Status': order.status,
      'Valor': order.value,
      'Data': new Date(order.date).toLocaleDateString('pt-BR'),
    }));
    const ordersSheet = XLSX.utils.json_to_sheet(ordersData);
    XLSX.utils.book_append_sheet(workbook, ordersSheet, "Ordens de Serviço");

    // Exportar compras
    const purchasesData = purchases.map(purchase => ({
      'Data': new Date(purchase.date).toLocaleDateString('pt-BR'),
      'Fornecedor': purchase.supplier,
      'Documento': purchase.document,
      'NF': purchase.invoiceNumber,
      'Produto': purchase.product,
      'Descrição': purchase.description,
      'Valor': purchase.value,
    }));
    const purchasesSheet = XLSX.utils.json_to_sheet(purchasesData);
    XLSX.utils.book_append_sheet(workbook, purchasesSheet, "Compras");

    XLSX.writeFile(workbook, "dados-erp.xlsx");
    toast.success("Dados exportados com sucesso!");
  };

  const handleExportData = () => {
    const data = {
      clients,
      serviceOrders,
      purchases,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-erp-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Backup exportado com sucesso!");
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Limpar dados existentes
      await db.clients.clear();
      await db.serviceOrders.clear();
      await db.purchases.clear();

      // Importar novos dados
      if (data.clients?.length) await db.clients.bulkAdd(data.clients);
      if (data.serviceOrders?.length) await db.serviceOrders.bulkAdd(data.serviceOrders);
      if (data.purchases?.length) await db.purchases.bulkAdd(data.purchases);

      toast.success("Dados importados com sucesso!");
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao importar dados. Verifique o arquivo.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full">
        <div className="p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Gerenciar Dados</h1>
          
          <div className="space-y-4">
            <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Exportação em Excel</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Exporte todos os dados do sistema em uma planilha Excel organizada. 
                Cada tipo de dado será exportado em uma aba separada.
              </p>
              <Button onClick={handleExportToExcel} className="w-full sm:w-auto">
                Exportar em Excel
              </Button>
            </div>

            <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Backup de Dados</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Faça o download de um arquivo JSON contendo todos os dados do sistema.
                Este arquivo pode ser usado para restaurar os dados posteriormente.
              </p>
              <Button variant="outline" onClick={handleExportData} className="w-full sm:w-auto">
                Exportar Dados
              </Button>
            </div>

            <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Importação de Dados</h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Restaure dados previamente exportados através de um arquivo JSON de backup.
                Esta operação substituirá todos os dados atuais.
              </p>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                  id="import-file"
                />
                <Button
                  variant="secondary"
                  onClick={() => document.getElementById('import-file')?.click()}
                  className="w-full sm:w-auto"
                >
                  Importar Dados
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;