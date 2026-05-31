import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Cabin } from "@/api/cabin";
import { toast } from "react-toastify";
import type { ODataResponse, QueryParams } from "@/api/query";

export const CABINS_TABLE = "cabins";

export function useCabins(query: QueryParams = {}) {
  return useQuery({
    queryKey: query.queryKey
      ? [...query.queryKey, CABINS_TABLE]
      : [CABINS_TABLE],
    queryFn: () =>
      api.getCabins(query) as unknown as Promise<ODataResponse<Cabin>>,
    retry: false,
  });
}

export function useCreateCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cabin: Cabin) => api.createCabin(cabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CABINS_TABLE] });
    },
    onError: (err) => {
      toast.error(`Failed to create cabin: ${err.message}`);
    },
  });
}

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cabin: Cabin) => api.updateCabin(cabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CABINS_TABLE] });
    },
    onError: (err) => {
      toast.error(`Failed to update cabin: ${err.message}`);
    },
  });
}

export function useCreateOrUpdateCabin({
  cabin,
  onSucess,
  onError,
}: {
  cabin?: Cabin;
  onSucess?: () => void;
  onError?: (err: Error) => void;
}) {
  const queryClient = useQueryClient();

  const isEdit = Boolean(cabin?.Id);

  return useMutation({
    mutationFn: (cabin: Cabin) =>
      isEdit ? api.updateCabin(cabin) : api.createCabin(cabin),

    onError: onError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CABINS_TABLE] });
      onSucess?.();
    },
  });
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cabinId: bigint) => api.deleteCabin(cabinId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CABINS_TABLE] });
    },
    onError: (err) => {
      toast.error(`Failed to delete cabin: ${err.message}`);
    },
  });
}

export function useOptimisticDeleteCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cabinId: bigint) => api.deleteCabin(cabinId),
    onMutate: async (cabinId: bigint) => {
      await queryClient.cancelQueries({ queryKey: [CABINS_TABLE] });
      const previousCabins = queryClient.getQueryData([CABINS_TABLE]);
      queryClient.setQueryData([CABINS_TABLE], (old: any) => {
        return old.value.filter((cabin: Cabin) => cabin.Id !== cabinId);
      });
      return { previousCabins };
    },
    onSuccess: () => {
      toast.success(`Cabin deleted successfully`);
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([CABINS_TABLE], context?.previousCabins);
      toast.error(`Failed to delete cabin: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CABINS_TABLE] });
    },
  });
}
