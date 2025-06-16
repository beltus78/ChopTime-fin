import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Restaurant {
  id: string;
  name: string;
  address: string;
  contact_number: string;
  is_active: boolean;
}

const restaurantSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  address: z.string().min(1, "Address is required"),
  contact_number: z.string().min(1, "Contact number is required"),
  is_active: z.boolean(),
});

type RestaurantFormInputs = z.infer<typeof restaurantSchema>;

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);
  
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<RestaurantFormInputs>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      address: "",
      contact_number: "",
      is_active: true,
    },
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("restaurants").select("*");
    if (error) {
      toast({
        title: "Error fetching restaurants",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRestaurants(data as Restaurant[]);
    }
    setLoading(false);
  };

  const handleAddRestaurant = () => {
    setCurrentRestaurant(null);
    reset({
      name: "",
      address: "",
      contact_number: "",
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    reset({
      name: restaurant.name,
      address: restaurant.address,
      contact_number: restaurant.contact_number,
      is_active: restaurant.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setRestaurantToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteRestaurant = async () => {
    if (restaurantToDelete) {
      const { error } = await supabase.from("restaurants").delete().eq("id", restaurantToDelete);
      if (error) {
        toast({
          title: "Error deleting restaurant",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Restaurant deleted",
          description: "The restaurant has been successfully deleted.",
        });
        fetchRestaurants();
      }
      setRestaurantToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const onSubmit = async (data: RestaurantFormInputs) => {
    if (currentRestaurant) {
      // Update existing restaurant
      const { error } = await supabase
        .from("restaurants")
        .update(data)
        .eq("id", currentRestaurant.id);
      if (error) {
        toast({
          title: "Error updating restaurant",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Restaurant updated",
          description: "The restaurant has been successfully updated.",
        });
        setIsDialogOpen(false);
        fetchRestaurants();
      }
    } else {
      // Add new restaurant
      const { error } = await supabase.from("restaurants").insert([data]);
      if (error) {
        toast({
          title: "Error adding restaurant",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Restaurant added",
          description: "The new restaurant has been successfully added.",
        });
        setIsDialogOpen(false);
        fetchRestaurants();
      }
    }
  };

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurant Management</h1>
        <Button onClick={handleAddRestaurant}>Add New Restaurant</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell className="font-medium">{restaurant.name}</TableCell>
              <TableCell>{restaurant.address}</TableCell>
              <TableCell>{restaurant.contact_number}</TableCell>
              <TableCell>{restaurant.is_active ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => handleEditRestaurant(restaurant)} className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(restaurant.id)}>
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
              This action cannot be undone. This will permanently delete the restaurant and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRestaurant}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentRestaurant ? "Edit Restaurant" : "Add New Restaurant"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div>
              <Input
                placeholder="Restaurant Name"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Input
                placeholder="Address"
                {...register("address")}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            <div>
              <Input
                placeholder="Contact Number"
                {...register("contact_number")}
              />
              {errors.contact_number && <p className="text-red-500 text-sm">{errors.contact_number.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                {...register("is_active")}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label htmlFor="is_active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Is Active
              </label>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentRestaurant ? "Save Changes" : "Add Restaurant"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRestaurants; 