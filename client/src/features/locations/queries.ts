import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLocation, fetchLocations } from "./api";

export function useLocations(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    enabled: opts?.enabled ?? true,
  });
}

export function useCreateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}
