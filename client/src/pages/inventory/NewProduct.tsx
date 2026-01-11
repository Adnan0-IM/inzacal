import { useForm } from "react-hook-form";
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

  function onSubmit(values: z.infer<typeof productSchema>) {
    // 2. Convert strings to numbers for the API
    createProduct(
      {
        ...values,
        price: Number(values.price),
        costPrice: Number(values.costPrice),
        stock: Number(values.stock),
        minStock: Number(values.minStock),
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
