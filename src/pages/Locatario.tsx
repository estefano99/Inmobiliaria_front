import HeaderPages from "@/components/HeaderPages";
import { LocLotTable } from "@/components/locadorLocatario/LocLotTable";
import { useQuery } from "@tanstack/react-query";
import { obtenerLocatarios } from "@/api/LocatarioApi";
import { LocatarioType } from "@/types/types";

const Locatario = () => {
  const { data, isLoading } = useQuery<LocatarioType[]>({
    queryKey: ["locatarios"],
    queryFn: obtenerLocatarios,
  });

  return (
    <div className="w-full">
      <HeaderPages title="Locatario" />
      {isLoading ? "Cargando..." :  data && <LocLotTable locatarios={data} />}
    </div>
  );
};

export default Locatario;
