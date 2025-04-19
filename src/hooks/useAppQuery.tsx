import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKey } from '@tanstack/query-core';

export type TQueryOptions = UseQueryOptions<any, unknown, any>;

export default function useAppQuery<T>(
  type: QueryKey,
  fetcher: () => Promise<T>,
  option?: UseQueryOptions<T, Error, T, QueryKey>
) {
  return useQuery<T, Error, T>({
    queryKey: type,
    queryFn: fetcher,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    ...option,
  });
}
