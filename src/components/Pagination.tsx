import { PageMeta } from "../types";
import { cn } from "../utils";

type PaginationProps = {
  meta: PageMeta;
  onNext: () => void;
  onFirstPage?: () => void;
  onLastPage?: () => void;
  onPrev: () => void;
  activeClass?: string;
  inactiveClass?: string;
  className?: string;
};

const Pagination = ({
  meta,
  onNext,
  onFirstPage,
  onLastPage,
  onPrev,
  activeClass,
  inactiveClass,
  className,
}: PaginationProps) => {
  return (
    <div>
      <div className={cn("flex flex-row gap-2 md:gap-6", className)}>
        {onFirstPage ? (
          <button
            className={cn(
              " bg-blue-500 px-3 py-1 md:px-6 md:py-2 rounded-md text-white hover:bg-blue-600 disabled:bg-slate-500/50 cursor-pointer disabled:cursor-not-allowed",
              meta.hasPreviousPage ? activeClass : inactiveClass
            )}
            onClick={onFirstPage}
            disabled={!meta.hasPreviousPage}
          >
            First
          </button>
        ) : null}

        <button
          className={cn(
            "bg-blue-500 px-3 py-1 md:px-6 md:py-2 rounded-md text-white disabled:bg-slate-500/50 disabled:cursor-not-allowed",
            meta.hasPreviousPage ? activeClass : inactiveClass
          )}
          onClick={onPrev}
          disabled={!meta.hasPreviousPage}
        >
          Prev
        </button>
        <div className=" flex items-center text-gray-600">
          {meta.currentPage} of {meta.totalPages}
        </div>
        <button
          className={cn(
            "bg-blue-500 px-3 py-1 md:px-6 md:py-2 rounded-md text-white disabled:bg-slate-500/50 disabled:cursor-not-allowed",
            meta.hasNextPage ? activeClass : inactiveClass
          )}
          onClick={onNext}
          disabled={!meta.hasNextPage}
        >
          Next
        </button>

        {onLastPage ? (
          <button
            className={cn(
              "bg-blue-500 px-3 py-1 md:px-6 md:py-2 rounded-md text-white disabled:bg-slate-500/50 disabled:cursor-not-allowed",
              meta.hasNextPage ? activeClass : inactiveClass
            )}
            onClick={onLastPage}
            disabled={!meta.hasNextPage}
          >
            Last
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
