'use client';
import { GenericPaginationProps } from '@/lib/types/table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from 'rc-pagination';

export default function GenericPagination({
  itemsPerPage = 20,
  count,
  queries = {},
}: GenericPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const params = new URLSearchParams(searchParams);

  const filtersApplied = Object.entries(queries).map(([key, value]) => ({
    name: key,
    value: Number(value),
  }));

  function createQueryString(query: any) {
    query.map(({ name, value }: any) => (value ? params.set(name, value) : ''));
    return params.toString();
  }

  const handlePageClick = (event: any) => {
    const newQuery: any = { ...searchParams };
    if (event) {
      newQuery.page = Number(event);
    } else {
      newQuery.page = 1;
    }
    router.push(
      pathname +
      '?' +
      createQueryString([
        ...filtersApplied,
        { name: 'page', value: newQuery.page },
      ])
    );
  };

  const PrevNextArrow = (current: any, type: any, originalElement: any) => {
    if (type === 'prev' || type === 'next') {
      return null;
    }
    return originalElement;
  };

  return (
    <div className="py-3 text-black">
      <div className="">
        <Pagination
          className="pagination-data"
          showTitle={true}
          showTotal={(total: any, range: any) =>
            `${range[0]} - ${range[1]} of ${total} items`
          }
          current={page ? Number(page) : 1}
          total={Number(count)}
          pageSize={itemsPerPage}
          onChange={handlePageClick}
          itemRender={PrevNextArrow}
        />
      </div>
    </div>
  );
}
