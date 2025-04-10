import React from "react";
import {
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../api/products";

const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  categoryId: z.number().min(1, "Category is required"),
});

const CreateProduct = ({ selectedProduct, setSelectedProduct }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: selectedProduct?.id || null,
      title: selectedProduct?.title || "",
      description: selectedProduct?.description || "",
      price: selectedProduct?.price || 0,
      images: selectedProduct?.images || [],
      categoryId: selectedProduct?.category?.id || 1,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { isSubmitting } = form.formState;

  // mutation for creating product
  const productCreateMutation = useMutation({
    mutationFn: () => createProduct(form.getValues()),
    onSuccess: () => {
      console.log("Product created successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (data) => updateProduct(data),

    onSuccess: () => {
      console.log("Product updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);

    if (isSubmitting) return;

    if (!selectedProduct) {
      productCreateMutation.mutate();
    } else {
      // console.log("updating product", form.getValues());
      updateProductMutation.mutate(data);
      setSelectedProduct(null);
    }

    form.reset();
  };

  React.useEffect(() => {
    if (selectedProduct) {
      console.log("selectedProduct", selectedProduct);
      form.setValue("images", selectedProduct.images);
      form.setValue("title", selectedProduct.title);
      form.setValue("description", selectedProduct.description);
      form.setValue("price", selectedProduct.price);
      form.setValue("categoryId", selectedProduct.category.id);
      form.setValue("id", selectedProduct.id);
    }
  }, [selectedProduct, form]);

  return (
    <SheetContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>
              {selectedProduct ? "Update Product" : "Create Product"}
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="text-muted-foreground text-sm px-4">
            Add a new product to the store
          </SheetDescription>
          <div className="p-4">
            <div className="mb-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a desc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a price"
                        type="number"
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormLabel>Images</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <FormField
                    control={form.control}
                    name={`images.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Enter image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => append("")}
                className="mt-2"
              >
                Add Image URL
              </Button>
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isSubmitting}>
              {selectedProduct ? "Update" : "Create"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
};

export default CreateProduct;
