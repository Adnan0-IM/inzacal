import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router"; // To go back after save
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Assuming you have sonner or use-toast
import { useCreateProduct } from "@/features/inventory/queries";
import { api } from "@/lib/http";
import { useLocation as useGeoLocation } from "@/hooks/use-location";
import type { CreateLocationInput, Location } from "@/types/location";

// 1. Schema matches API expectations
const productSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
  // Allow strings in input, but validate they are numbers
  price: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a positive number"
    ),
  costPrice: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a positive number"
    ),
  stock: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a positive number"
    ),
  minStock: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Must be a positive number"
    ),
});

const NewProduct = () => {
  const navigate = useNavigate();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { location, loading: geoLoading } = useGeoLocation();

  type SimpleIdName = { id: string; name: string };
  const [locations, setLocations] = useState<SimpleIdName[]>([]);
  const [listsLoading, setListsLoading] = useState<boolean>(true);
  const [locationId, setLocationId] = useState<string | undefined>();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: "",
      costPrice: "",
      stock: "0",
      minStock: "5",
    },
  });

  useEffect(() => {
    let mounted = true;
    setListsLoading(true);
    api
      .get<SimpleIdName[]>("/locations")
      .then((r) => r.data)
      .then((locs) => {
        if (!mounted) return;
        const list = (locs || []).map((l) => ({ id: l.id, name: l.name }));
        setLocations(list);
        // If only one location, preselect it
        if (list.length === 1) setLocationId(list[0].id);
      })
      .finally(() => mounted && setListsLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  function onSubmit(values: z.infer<typeof productSchema>) {
    // 2. Convert strings to numbers for the API
    createProduct(
      {
        ...values,
        price: Number(values.price),
        costPrice: Number(values.costPrice),
        stock: Number(values.stock),
        minStock: Number(values.minStock),
        locationId, // allocate initial stock to this location if provided
      },
      {
        onSuccess: () => {
          toast.success("Product created!");
          navigate("/dashboard/inventory"); // Go back to list
        },
        onError: () => {
          toast.error("Failed to create product");
        },
      }
    );
  }

  return (
    <div className=" container mx-auto p-6 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <p className="text-muted-foreground">
          Enter product details to track inventory.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Arabica Coffee Bean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU (Barcode)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. COF-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pricing Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Inventory Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Low Stock Alert At</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign to Location</label>
              <select
                className="border rounded px-2 py-2 text-sm"
                value={locationId || ""}
                onChange={(e) => setLocationId(e.target.value || undefined)}
              >
                <option value="">No location (general stock)</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
              {listsLoading && (
                <span className="text-xs text-muted-foreground">
                  Loading locations…
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Quick-create Location
              </label>
              <Button
                type="button"
                variant="outline"
                disabled={geoLoading}
                onClick={async () => {
                  try {
                    const name = "My Location";
                    const payload: CreateLocationInput = { name };
                    if (location) {
                      payload.lat = location.latitude;
                      payload.lng = location.longitude;
                    }
                    const res = await api.post<Location>("/locations", payload);
                    const newLoc = res.data;
                    setLocations((prev) => [
                      ...prev,
                      { id: newLoc.id, name: newLoc.name },
                    ]);
                    setLocationId(newLoc.id);
                    toast.success("Location created");
                  } catch (err: unknown) {
                    const message =
                      err instanceof Error
                        ? err.message
                        : "Failed to create location";
                    toast.error(message);
                  }
                }}
              >
                {geoLoading ? "Detecting…" : "Use my current location"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Creates a location for this branch using your current
                coordinates.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewProduct;
