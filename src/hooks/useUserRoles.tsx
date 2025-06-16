
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type UserRole = 'admin' | 'restaurant_owner' | 'user';

export const useUserRoles = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-roles', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user roles:', error);
        throw error;
      }

      return data.map(item => item.role as UserRole);
    },
    enabled: !!user,
  });
};

export const useIsAdmin = () => {
  const { data: roles = [] } = useUserRoles();
  return roles.includes('admin');
};

export const useIsRestaurantOwner = () => {
  const { data: roles = [] } = useUserRoles();
  return roles.includes('restaurant_owner');
};
