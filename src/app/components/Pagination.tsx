import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export type PaginationProps = {
  dataLength: number;
  pageSize?: number;
  className?: string;
};

const getPageNumbers = (page: number, totalPages: number) => {
  const pages: (number | "ellipsis")[] = [];
  pages.push(1);
  if (page > 3) {
    pages.push("ellipsis");
  }
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (page < totalPages - 2) {
    pages.push("ellipsis");
  }
  if (totalPages > 1) pages.push(totalPages);
  return pages;
};

export default function Pagination({
  dataLength,
  pageSize = 50,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(dataLength / pageSize);

  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const canPrevious = currentPage > 1;

  const canNext = currentPage < totalPages;

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={`?page=${currentPage - 1}`}
            disabled={!canPrevious}
            className={cn(
              "border-0 bg-primary text-primary dark:border-0 dark:bg-black dark:hover:border dark:hover:border-[#1890ff] dark:hover:bg-black",
              !canPrevious && "cursor-not-allowed hover:bg-black"
            )}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={index}>
            {typeof pageNumber === "string" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                to={`?page=${pageNumber}`}
                isActive={pageNumber === currentPage}
                className={cn(
                  "border-0 bg-primary text-primary dark:bg-black dark:hover:border dark:hover:border-[#1890ff] dark:hover:bg-black",
                  currentPage === pageNumber && "border border-[#1890ff]!"
                )}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            to={`?page=${currentPage + 1}`}
            disabled={!canNext}
            className={cn(
              "border-0 bg-primary text-primary dark:border-0 dark:bg-black dark:hover:border dark:hover:border-[#1890ff] dark:hover:bg-black",
              !canNext &&
                "cursor-not-allowed hover:text-primary dark:hover:bg-primary-foreground"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
