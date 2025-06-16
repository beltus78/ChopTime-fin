import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MenuItem {
  id: string;
  restaurant_id: string; // Will be set based on the logged-in restaurant owner
  name: string;
  description: string;
  price: number;
  category: string;
  is_available: boolean;
  image_url?: string;
}

const menuItemSchema = z.object({
  name: z.string().min(1, "Menu item name is required"),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => Number(val), 
    z.number().min(0.01, "Price must be greater than 0")
  ),
  category: z.string().min(1, "Category is required"),
  is_available: z.boolean(),
  image_url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type MenuItemFormInputs = z.infer<typeof menuItemSchema>;

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuItemToDelete, setMenuItemToDelete] = useState<string | null>(null);
  
  // For now, assume a static restaurant_id for development. In a real app, this comes from auth context.
  const restaurantId = "your_restaurant_id_here"; 

  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<MenuItemFormInputs>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0.01,
      category: "",
      is_available: true,
      image_url: "",
    },
  });

  useEffect(() => {
    fetchMenuItems();
  }, [restaurantId]);

  const fetchMenuItems = async () => {
    setLoading(true);
    // Filter by restaurant_id in a real application
    const { data, error } = await supabase.from("menu_items").select("*")
                                          .eq("restaurant_id", restaurantId); 
    if (error) {
      toast({
        title: "Error fetching menu items",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setMenuItems(data as MenuItem[]);
    }
    setLoading(false);
  };

  const handleAddMenuItem = () => {
    setCurrentMenuItem(null);
    reset();
    setIsDialogOpen(true);
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setCurrentMenuItem(item);
    reset({
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: item.category,
      is_available: item.is_available,
      image_url: item.image_url || "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setMenuItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteMenuItem = async () => {
    if (menuItemToDelete) {
      const { error } = await supabase.from("menu_items").delete().eq("id", menuItemToDelete);
      if (error) {
        toast({
          title: "Error deleting menu item",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Menu Item deleted",
          description: "The menu item has been successfully deleted.",
        });
        fetchMenuItems();
      }
      setMenuItemToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const onSubmit = async (data: MenuItemFormInputs) => {
    if (currentMenuItem) {
      // Update existing menu item
      const { error } = await supabase
        .from("menu_items")
        .update(data)
        .eq("id", currentMenuItem.id);
      if (error) {
        toast({
          title: "Error updating menu item",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Menu Item updated",
          description: "The menu item has been successfully updated.",
        });
        setIsDialogOpen(false);
        fetchMenuItems();
      }
    } else {
      // Add new menu item
      const { error } = await supabase.from("menu_items").insert([{...data, restaurant_id: restaurantId}]);
      if (error) {
        toast({
          title: "Error adding menu item",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Menu Item added",
          description: "The new menu item has been successfully added.",
        });
        setIsDialogOpen(false);
        fetchMenuItems();
      }
    }
  };

  if (loading) {
    return <div>Loading menu items...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Menu Management</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={handleAddMenuItem}>Add New Menu Item</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>₦{item.price.toLocaleString()}</TableCell>
              <TableCell>{item.is_available ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => handleEditMenuItem(item)} className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the menu item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteMenuItem}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentMenuItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                placeholder="E.g., Jollof Rice"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="A delicious Nigerian rice dish..."
                {...register("description")}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="1500.00"
                {...register("price")}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="E.g., Main Course, Drinks"
                {...register("category")}
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_available"
                {...register("is_available")}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <Label htmlFor="is_available" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Is Available
              </Label>
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                type="url"
                placeholder="https://example.com/jollof.jpg"
                {...register("image_url")}
              />
              {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url.message}</p>}
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentMenuItem ? "Save Changes" : "Add Menu Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantMenu; 