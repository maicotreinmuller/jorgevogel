import { Users, ClipboardList, LayoutDashboard, ShoppingCart, Database } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const menuItems = [{
  path: "/",
  icon: LayoutDashboard,
  label: "Dashboard"
}, {
  path: "/clients",
  icon: Users,
  label: "Clientes"
}, {
  path: "/service-orders",
  icon: ClipboardList,
  label: "Ordens de Serviço"
}, {
  path: "/purchases",
  icon: ShoppingCart,
  label: "Compras"
}, {
  path: "/data-management",
  icon: Database,
  label: "Gerenciar Dados"
}];

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16 px-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg min-w-[60px] transition-all"
                activeClassName="text-primary"
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-600'}`} />
                <span className={`text-[10px] ${isActive ? 'font-semibold text-primary' : 'text-gray-600'}`}>
                  {item.label.split(' ')[0]}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  // Desktop sidebar
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild size="lg">
                      <NavLink 
                        to={item.path} 
                        className="flex items-center gap-3" 
                        activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}