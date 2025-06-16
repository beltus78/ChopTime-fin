
import { Home, Menu, ShoppingBag, BarChart3, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const RestaurantSidebar = () => {
  const location = useLocation();
  
  const restaurantNavItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/restaurant",
    },
    {
      icon: Menu,
      label: "Menu Items",
      path: "/restaurant/menu",
    },
    {
      icon: ShoppingBag,
      label: "Orders",
      path: "/restaurant/orders",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/restaurant/analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/restaurant/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {restaurantNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path}>
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
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
};

export default RestaurantSidebar;
