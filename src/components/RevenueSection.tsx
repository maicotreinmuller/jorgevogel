import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/db/database";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PeriodSection } from "./finance/PeriodSection";

interface RevenueSectionProps {
  monthlyRevenue: number;
  annualRevenue: number;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  orders: any[];
  calculateRevenue: (orders: any[], period: 'monthly' | 'annual' | 'custom') => number;
}

const RevenueSection = ({
  monthlyRevenue,
  annualRevenue,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  orders,
  calculateRevenue
}: RevenueSectionProps) => {
  const { data: purchases = [] } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => await db.purchases.toArray()
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filterPurchasesByDate = (purchases: any[], start: Date, end: Date) => {
    return purchases.filter(purchase => {
      const purchaseDate = new Date(purchase.date);
      
      // Ajusta as datas para o início e fim do dia no fuso horário local
      const startOfDay = new Date(start);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(end);
      endOfDay.setHours(23, 59, 59, 999);

      return purchaseDate >= startOfDay && purchaseDate <= endOfDay;
    });
  };

  // Cálculo de despesas mensais
  const monthlyExpenses = filterPurchasesByDate(
    purchases,
    new Date(currentYear, currentMonth, 1),
    new Date(currentYear, currentMonth + 1, 0)
  ).reduce((acc, purchase) => acc + purchase.value, 0);

  // Cálculo de despesas anuais
  const annualExpenses = filterPurchasesByDate(
    purchases,
    new Date(currentYear, 0, 1),
    new Date(currentYear, 11, 31)
  ).reduce((acc, purchase) => acc + purchase.value, 0);

  // Cálculo de despesas do período selecionado
  const periodExpenses = startDate && endDate ? filterPurchasesByDate(
    purchases,
    new Date(startDate),
    new Date(endDate)
  ).reduce((acc, purchase) => acc + purchase.value, 0) : 0;

  // Cálculo dos balanços
  const monthlyBalance = monthlyRevenue - monthlyExpenses;
  const annualBalance = annualRevenue - annualExpenses;
  const periodRevenue = startDate && endDate ? calculateRevenue(orders, 'custom') : 0;
  const periodBalance = periodRevenue - periodExpenses;

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Filtrar por Período
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="startDate" className="text-sm font-medium">
              Data Inicial
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-sm font-medium">
              Data Final
            </Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <div className="space-y-8">
        <PeriodSection
          title={`Mensal (${format(currentDate, 'MMMM yyyy', { locale: ptBR })})`}
          revenue={monthlyRevenue}
          expenses={monthlyExpenses}
          balance={monthlyBalance}
        />
        
        <PeriodSection
          title={`Anual (${currentYear})`}
          revenue={annualRevenue}
          expenses={annualExpenses}
          balance={annualBalance}
        />

        {startDate && endDate && (
          <PeriodSection
            title={`Período Selecionado (${format(new Date(startDate), 'dd/MM/yyyy')} - ${format(new Date(endDate), 'dd/MM/yyyy')})`}
            revenue={periodRevenue}
            expenses={periodExpenses}
            balance={periodBalance}
          />
        )}
      </div>
    </div>
  );
};

export default RevenueSection;