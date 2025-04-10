import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductPagination({ setValue, offset, limit, total }) {
  console.log("total", total);
  return (
    <Pagination>
      <PaginationContent>
        {/*<PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem> */}

        {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={offset === index * limit}
              onClick={(e) => {
                e.preventDefault();
                setValue("offset", index * limit);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
