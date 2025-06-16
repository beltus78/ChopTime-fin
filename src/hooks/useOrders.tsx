
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Order {
  id: string;
  restaurant_id: string;
  status: string;
  total_amount: number;
  delivery_address: string;
  delivery_fee: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  restaurants: {
    name: string;
    image_url: string;
  };
  order_items: Array<{
    quantity: number;
    unit_price: number;
    total_price: number;
    menu_items: {
      name: string;
      description: string;
    };
  }>;
}

export const useOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants (
            name,
            image_url
          ),
          order_items (
            quantity,
            unit_price,
            total_price,
            menu_items (
              name,
              description
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }

      return data as Order[];
    },
    enabled: !!user,
  });
};
