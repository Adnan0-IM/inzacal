import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { Product } from "@/types/product";
import { useProducts } from "@/features/inventory/queries";
import { useCreateSale, useCustomers, useLocations } from "@/features/sales/queries"

type CartItem = Product & { quantity: number };

export default function NewSalePage() {
  const { data: products, isLoading } = useProducts();
  const { mutate: createSale, isPending } = useCreateSale();
  const { data: customers = [] } = useCustomers();
  const { data: locations = [] } = useLocations();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [locationId, setLocationId] = useState<string | undefined>();

  // Filter products for the picker
  const filteredProducts =
    products?.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Add to Cart Logic
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Don't add if we exceed stock
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove / Adjust Quantity
  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === productId) {
              const newQty = item.quantity + delta;
              if (newQty <= 0) return null; // Will filter out later
              // Check stock limit
              const product = products?.find((p) => p.id === productId);
              if (product && newQty > product.stock) return item;
              return { ...item, quantity: newQty };
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Calculate Total
  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;
    createSale(
      {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        customerId,
        locationId,
      },
      { onSuccess: () => setCart([]) }
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      {/* NEW: selectors */}
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={customerId || ""}
          onChange={(e) => setCustomerId(e.target.value || undefined)}
        >
          <option value="">Select customer (optional)</option>
          {customers.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={locationId || ""}
          onChange={(e) => setLocationId(e.target.value || undefined)}
        >
          <option value="">Select location (optional)</option>
          {locations.map((l: any) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
        {/* LEFT: Product Picker */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search products by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 pb-20">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`cursor-pointer hover:border-primary transition-colors ${
                  product.stock === 0 ? "opacity-50 grayscale" : ""
                }`}
                onClick={() => product.stock > 0 && addToCart(product)}
              >
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-semibold truncate" title={product.name}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.sku}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-end">
                    <span className="font-bold">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No products found.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Cart */}
        <Card className="flex flex-col h-full">
          <CardHeader className="border-b bg-muted/40">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" /> Current Sale
            </CardTitle>
          </CardHeader>

          <div className="flex-1 overflow-y-auto p-0">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
                <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
                <p>Cart is empty</p>
                <p className="text-sm">Click products to add them here.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="w-[100px]">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[40px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ${Number(item.price).toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-4 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-red-500 hover:text-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="border-t p-4 bg-muted/40 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              disabled={cart.length === 0 || isPending}
              onClick={handleCheckout}
            >
              {isPending ? "Processing..." : "Complete Sale"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
