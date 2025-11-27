import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";

interface PeriodSectionProps {
  title: string;
  revenue: number;
  expenses: number;
  balance: number;
}

export const PeriodSection = ({
  title,
  revenue,
  expenses,
  balance,
}: PeriodSectionProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-600">Receita</p>
          <div className="flex items-center gap-2 mt-1">
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(revenue)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Despesas</p>
          <div className="flex items-center gap-2 mt-1">
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(expenses)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Balanço</p>
          <div className="flex items-center gap-2 mt-1">
            {balance > 0 ? (
              <ArrowUpIcon className="w-4 h-4 text-green-500" />
            ) : balance < 0 ? (
              <ArrowDownIcon className="w-4 h-4 text-red-500" />
            ) : (
              <MinusIcon className="w-4 h-4 text-gray-500" />
            )}
            <p
              className={`text-xl font-bold ${
                balance > 0
                  ? "text-green-600"
                  : balance < 0
                  ? "text-red-600"
                  : "text-gray-900"
              }`}
            >
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};