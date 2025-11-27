import { useQuery } from "@tanstack/react-query";
import { db } from "@/db/database";
import DashboardCard from "@/components/DashboardCard";
import RecentOrders from "@/components/RecentOrders";
import { ListChecks, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const Index = () => {
  const { data: orders = [] } = useQuery({
    queryKey: ['serviceOrders'],
    queryFn: async () => await db.serviceOrders.toArray()
  });

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const inProgressOrders = orders.filter(o => o.status === 'in_progress').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
  const totalOrders = orders.length;

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <DashboardCard
            title="Em Andamento"
            value={inProgressOrders}
            icon={Clock}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            iconClassName="text-blue-600"
          />
          <DashboardCard
            title="Pendentes"
            value={pendingOrders}
            icon={AlertCircle}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
            iconClassName="text-yellow-600"
          />
          <DashboardCard
            title="Concluídas"
            value={completedOrders}
            icon={CheckCircle}
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
            iconClassName="text-green-600"
          />
          <DashboardCard
            title="Canceladas"
            value={cancelledOrders}
            icon={XCircle}
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200"
            iconClassName="text-red-600"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <ListChecks className="w-5 h-5 text-primary" />
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Ordens Recentes</h2>
          </div>
          <RecentOrders orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Index;