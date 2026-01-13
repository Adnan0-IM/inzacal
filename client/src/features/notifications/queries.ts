import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchNotifications, markNotificationRead } from "./api";

export function useNotifications(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: opts?.enabled ?? true,
    staleTime: 15_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
