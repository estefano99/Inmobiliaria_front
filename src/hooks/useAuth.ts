import { obtenerUsuario } from "@/api/Auth";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["usuario"],
    queryFn: obtenerUsuario,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};
