
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useRestaurantStats = (restaurantId?: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['restaurant-stats', restaurantId || user?.id],
    queryFn: async () => {
      let targetRestaurantId = restaurantId;

      // If no restaurantId provided, get the user's restaurant
      if (!targetRestaurantId && user) {
        const { data: ownerData } = await supabase
          .from('restaurant_owners')
          .select('restaurant_id')
          .eq('user_id', user.id)
          .single();

        targetRestaurantId = ownerData?.restaurant_id;
      }

      if (!targetRestaurantId) return null;

      // Get total orders for this restaurant
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('restaurant_id', targetRestaurantId);

      // Get total revenue
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('restaurant_id', targetRestaurantId)
        .eq('payment_status', 'paid');

      const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Get pending orders
      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('restaurant_id', targetRestaurantId)
        .eq('status', 'pending');

      // Get menu items count
      const { count: menuItemsCount } = await supabase
        .from('menu_items')
        .select('*', { count: 'exact', head: true })
        .eq('restaurant_id', targetRestaurantId);

      return {
        totalOrders: totalOrders || 0,
        totalRevenue,
        pendingOrders: pendingOrders || 0,
        menuItemsCount: menuItemsCount || 0,
        restaurantId: targetRestaurantId,
      };
    },
    enabled: !!user,
  });
};
