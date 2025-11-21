import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/features/inventory/queries";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const InventoryPage = () => {
  const { data: products, isLoading } = useProducts();
  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner />
      </div>
    );

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Get started by adding your first product to inventory."
        action={{ label: "Add Product", to: "/dashboard/inventory/new" }}
      />
    );
  }
  return (
    <div className="space-y-4  container mx-auto p-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
        <Link to={"/dashboard/inventory/new"}>
          <Button>
            <Plus className="mr-2 size-4">Add Products</Plus>
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku || "-"}</TableCell>
                <TableCell>₦{Number(product.price).toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {product.stock <= product.minStock ? (
                    <span className="text-red-500 font-bold">Low Stock</span>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryPage;
