import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DefaultPagination from 'rc-pagination';
import { useMemo } from 'react';

interface PaginationProps {
  itemsPerPage?: number;
  count: number;
  queries?: Record<string, number | string>;
  handleChange?: (page: number) => void;
}

export default function Pagination({
  itemsPerPage = 20,
  count,
  queries = {},
  handleChange,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const filtersApplied = useMemo(
    () => Object.entries(queries).map(([key, value]) => ({ name: key, value })),
    [queries]
  );

  const createQueryString = (
    query: { name: string; value: number | string }[]
  ) => {
    query.forEach(({ name, value }) => {
      if (value) {
        params.set(name, String(value));
      }
    });
    return params.toString();
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === 1) {
      router.push(pathname);
    } else {
      router.push(
        `${pathname}?${createQueryString([
          ...filtersApplied,
          { name: 'page', value: pageNumber },
        ])}`
      );
    }
    if (handleChange) {
      handleChange(pageNumber);
    }
  };

  const PrevNextArrow = (
    current: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === 'prev' || type === 'next') {
      return null;
    }
    return originalElement;
  };

  return (
    <div className="py-3 text-black">
      <DefaultPagination
        className="pagination-data"
        showTitle={false}
        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} of ${total} items`
        }
        current={page}
        total={count}
        pageSize={itemsPerPage}
        onChange={handlePageClick}
        itemRender={PrevNextArrow}
      />
    </div>
  );
}
