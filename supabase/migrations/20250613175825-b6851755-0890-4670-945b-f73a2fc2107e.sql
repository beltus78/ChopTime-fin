
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create restaurants table
CREATE TABLE public.restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  address TEXT,
  phone TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  delivery_fee INTEGER DEFAULT 0,
  delivery_time TEXT DEFAULT '30-45 mins',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Price in cents/minor currency unit
  image_url TEXT,
  category TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  restaurant_id UUID REFERENCES public.restaurants(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'in_transit', 'delivered', 'cancelled')),
  total_amount INTEGER NOT NULL, -- Total in cents/minor currency unit
  delivery_address TEXT,
  delivery_fee INTEGER DEFAULT 0,
  payment_method TEXT DEFAULT 'cash',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  notes TEXT,
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES public.menu_items(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for restaurants (public read access)
CREATE POLICY "Anyone can view restaurants" ON public.restaurants
  FOR SELECT TO authenticated, anon USING (is_active = true);

-- RLS Policies for menu items (public read access)
CREATE POLICY "Anyone can view menu items" ON public.menu_items
  FOR SELECT TO authenticated, anon USING (is_available = true);

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for order items
CREATE POLICY "Users can view their order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample restaurants
INSERT INTO public.restaurants (name, description, image_url, address, phone, rating, delivery_fee, delivery_time) VALUES
('Mama Africa Kitchen', 'Authentic Cameroonian cuisine with traditional flavors', '/lovable-uploads/b045b0f7-18cc-4bde-bed3-e0d354ea7954.png', 'Mile 16, Buea', '+237 690 123 456', 4.8, 500, '20-30 mins'),
('Spice Garden', 'Fresh ingredients and bold spices from across Africa', '/lovable-uploads/b045b0f7-18cc-4bde-bed3-e0d354ea7954.png', 'Molyko, Buea', '+237 679 987 654', 4.6, 300, '25-35 mins'),
('Ocean Breeze Restaurant', 'Fresh seafood and coastal delicacies', '/lovable-uploads/b045b0f7-18cc-4bde-bed3-e0d354ea7954.png', 'Down Beach, Limbe', '+237 677 555 123', 4.7, 700, '30-40 mins');

-- Insert sample menu items
INSERT INTO public.menu_items (restaurant_id, name, description, price, category) VALUES
((SELECT id FROM public.restaurants WHERE name = 'Mama Africa Kitchen'), 'Ndolé Special', 'Traditional Cameroonian dish with groundnuts and vegetables', 2500, 'Main Course'),
((SELECT id FROM public.restaurants WHERE name = 'Mama Africa Kitchen'), 'Jollof Rice', 'Spiced rice with vegetables and choice of protein', 2000, 'Main Course'),
((SELECT id FROM public.restaurants WHERE name = 'Mama Africa Kitchen'), 'Plantain', 'Fried sweet plantain', 500, 'Side Dish'),
((SELECT id FROM public.restaurants WHERE name = 'Spice Garden'), 'Pepper Soup', 'Spicy traditional soup with fish or meat', 1800, 'Soup'),
((SELECT id FROM public.restaurants WHERE name = 'Spice Garden'), 'Egusi Stew', 'Melon seed stew with vegetables', 2200, 'Main Course'),
((SELECT id FROM public.restaurants WHERE name = 'Ocean Breeze Restaurant'), 'Grilled Fish', 'Fresh catch grilled with local spices', 3000, 'Main Course'),
((SELECT id FROM public.restaurants WHERE name = 'Ocean Breeze Restaurant'), 'Seafood Platter', 'Mixed seafood with rice and vegetables', 4500, 'Main Course');
