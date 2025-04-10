import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "../api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductTable({ products, setSelectedProduct }) {
  const queryClient = useQueryClient();

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Updated At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">{product.updatedAt}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <SheetTrigger asChild>
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                </SheetTrigger>
                <Button
                  className="cursor-pointer"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
