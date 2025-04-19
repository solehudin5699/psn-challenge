import { useMutation, UseMutationOptions, MutationFunction } from '@tanstack/react-query';

/* NOTES
  D-> Data
  V-> Variables
  E-> Error
  C-> Context */

type TFetcher<D, V> = MutationFunction<D, V>;
type TOptions<D, E, V, C> = Omit<UseMutationOptions<D, E, V, C>, 'mutationFn'>;

export type TMutationOptions = TOptions<any, any, any, any>;

function useAppMutation<V = any, D = any, E = D, C = any>(
  fetcher: TFetcher<D, V>,
  options: TOptions<D, E, V, C> = {}
) {
  const { onError, onSuccess, ...rest } = options;
  const result = useMutation<D, E, V, C>({
    ...rest,
    mutationFn: fetcher,
    onError: (error, variables, ctx) => {
      onError?.(error, variables, ctx);
    },
    onSuccess: (data, variables, ctx) => {
      onSuccess?.(data, variables, ctx);
    },
  });

  return { response: result.data ? result.data : result.error, ...result };
}
export default useAppMutation;
