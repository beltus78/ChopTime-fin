
import { useIsRestaurantOwner } from "@/hooks/useUserRoles";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import RestaurantSidebar from "./RestaurantSidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface RestaurantLayoutProps {
  children: React.ReactNode;
}

const RestaurantLayout = ({ children }: RestaurantLayoutProps) => {
  const { user, loading } = useAuth();
  const isRestaurantOwner = useIsRestaurantOwner();

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 bg-gray-100">
          <Skeleton className="h-full" />
        </div>
        <div className="flex-1 p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isRestaurantOwner) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <RestaurantSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default RestaurantLayout;
