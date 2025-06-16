
-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'restaurant_owner', 'user');

CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create restaurant owners table
CREATE TABLE public.restaurant_owners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, restaurant_id)
);

-- Create commission settings table
CREATE TABLE public.commission_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL DEFAULT 15.00, -- Percentage
  fixed_fee INTEGER DEFAULT 0, -- Fixed fee in cents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (restaurant_id)
);

-- Create payments table for tracking transactions
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- Amount in cents
  commission_amount INTEGER NOT NULL DEFAULT 0,
  restaurant_amount INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (order_id)
);

-- Create analytics table for tracking key metrics
CREATE TABLE public.analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  total_orders INTEGER DEFAULT 0,
  total_revenue INTEGER DEFAULT 0, -- Revenue in cents
  commission_earned INTEGER DEFAULT 0,
  avg_order_value INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (date, restaurant_id)
);

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user owns restaurant
CREATE OR REPLACE FUNCTION public.owns_restaurant(_user_id UUID, _restaurant_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.restaurant_owners
    WHERE user_id = _user_id
      AND restaurant_id = _restaurant_id
  )
$$;

-- Enable RLS on new tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage all user roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for restaurant_owners
CREATE POLICY "Admins can manage restaurant owners" ON public.restaurant_owners
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Restaurant owners can view their assignments" ON public.restaurant_owners
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for commission_settings
CREATE POLICY "Admins can manage commission settings" ON public.commission_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Restaurant owners can view their commission settings" ON public.commission_settings
  FOR SELECT USING (public.owns_restaurant(auth.uid(), restaurant_id));

-- RLS Policies for payments
CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Restaurant owners can view their payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = payments.order_id
      AND public.owns_restaurant(auth.uid(), o.restaurant_id)
    )
  );

-- RLS Policies for analytics
CREATE POLICY "Admins can manage all analytics" ON public.analytics
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Restaurant owners can view their analytics" ON public.analytics
  FOR SELECT USING (public.owns_restaurant(auth.uid(), restaurant_id));

-- Update restaurant policies to allow admin management
DROP POLICY IF EXISTS "Anyone can view restaurants" ON public.restaurants;
CREATE POLICY "Anyone can view active restaurants" ON public.restaurants
  FOR SELECT TO authenticated, anon USING (is_active = true);

CREATE POLICY "Admins can manage all restaurants" ON public.restaurants
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Restaurant owners can update their restaurants" ON public.restaurants
  FOR UPDATE USING (public.owns_restaurant(auth.uid(), id));

-- Update menu_items policies
DROP POLICY IF EXISTS "Anyone can view menu items" ON public.menu_items;
CREATE POLICY "Anyone can view available menu items" ON public.menu_items
  FOR SELECT TO authenticated, anon USING (is_available = true);

CREATE POLICY "Admins can manage all menu items" ON public.menu_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Restaurant owners can manage their menu items" ON public.menu_items
  FOR ALL USING (public.owns_restaurant(auth.uid(), restaurant_id));

-- Update orders policies for admin access
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Restaurant owners can view their orders" ON public.orders
  FOR SELECT USING (public.owns_restaurant(auth.uid(), restaurant_id));

CREATE POLICY "Restaurant owners can update their orders" ON public.orders
  FOR UPDATE USING (public.owns_restaurant(auth.uid(), restaurant_id));

-- Insert default admin user (you'll need to replace with actual user ID after signup)
-- INSERT INTO public.user_roles (user_id, role) VALUES 
-- ('your-admin-user-id-here', 'admin');

-- Insert default commission settings for existing restaurants
INSERT INTO public.commission_settings (restaurant_id, commission_rate, fixed_fee)
SELECT id, 15.00, 0 FROM public.restaurants
ON CONFLICT (restaurant_id) DO NOTHING;

-- Create function to automatically create commission settings for new restaurants
CREATE OR REPLACE FUNCTION public.handle_new_restaurant()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.commission_settings (restaurant_id, commission_rate, fixed_fee)
  VALUES (NEW.id, 15.00, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create commission settings on new restaurant
CREATE TRIGGER on_restaurant_created
  AFTER INSERT ON public.restaurants
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_restaurant();
