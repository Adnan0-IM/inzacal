import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/http";
import { useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/i, "Only alphanumeric and hyphen"),
  currency: z.string().length(3, "3-letter ISO code"),
  address: z.string().min(4),
  taxId: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  industry: z.string().optional().or(z.literal("")),
  timezone: z.string().optional(),
  fiscalYearStart: z.number().min(1).max(12),
  logo: z.string().optional(), // base64 data URL
});

type FormValues = z.infer<typeof schema>;


export function CreateOrganizationForm() {
  const qc = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      currency: "USD",
      address: "",
      taxId: "",
      phone: "",
      website: "",
      industry: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      fiscalYearStart: 1,
      logo: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      await api.post("/organizations", values);
      qc.invalidateQueries({ queryKey: ["organizations"] });
      form.reset();
      setPreview(null);
    } catch (err: any) {
      setServerError(err?.response?.data?.error || err.message || "Failed");
    }
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
      form.setValue("logo", result, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border rounded-md p-6 bg-card shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">Create Organization</h2>
          {preview && (
            <img
              src={preview}
              alt="Logo preview"
              className="size-12 rounded-md border object-cover"
            />
          )}
        </div>
        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="acme" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Input
                    placeholder="USD"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax ID</FormLabel>
                <FormControl>
                  <Input placeholder="Optional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 555 000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Retail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fiscalYearStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiscal Year Start (month)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Input placeholder="UTC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            {preview && (
              <p className="text-xs text-muted-foreground">
                Image attached ({Math.round((preview.length / 1024) * 10) / 10}{" "}
                KB)
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
export default CreateOrganizationForm;
