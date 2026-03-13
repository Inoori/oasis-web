import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export type UseQueryParams<T> = {
  queryKey: string[];
  queryFn?: () => Promise<T>;
  mutationFn?: () => Promise<AxiosResponse>;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
};

export type UseOptimisticDeleteParams<T> = {
  filterFn: (item: T) => boolean;
} & UseQueryParams<T>;

/**
 * 乐观删除钩子
 * @returns
 */
export function useOptimisticDelete<T>({
  queryKey,
  mutationFn,
  filterFn,
  onSuccess,
  onError,
}: UseOptimisticDeleteParams<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: T[] | undefined) =>
        old?.filter(filterFn)
      );
      return { previousData };
    },
    onSuccess: onSuccess,
    onError: (err, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      onError?.(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
