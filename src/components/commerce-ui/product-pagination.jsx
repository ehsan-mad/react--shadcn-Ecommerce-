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
  
  const currentPage = Math.floor(offset / limit);
  const totalPages = Math.ceil(total / limit);
  
  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 0) {
      setValue("offset", (currentPage - 1) * limit);
    }
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage < totalPages - 1) {
      setValue("offset", (currentPage + 1) * limit);
    }
  };
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={handlePrevious} 
            className={`cursor-pointer hover:bg-gray-100 ${currentPage === 0 ? 'opacity-50' : ''}`} 
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={offset === index * limit}
              onClick={(e) => {
                e.preventDefault();
                setValue("offset", index * limit);
              }}
              className="cursor-pointer hover:bg-gray-100"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={handleNext} 
            className={`cursor-pointer hover:bg-gray-100 ${currentPage === totalPages - 1 ? 'opacity-50' : ''}`} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
