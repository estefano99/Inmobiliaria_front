import HeaderPages from "@/components/HeaderPages";
import { LocLotTable } from "@/components/locadorLocatario/LocLotTable";
import { useQuery } from "@tanstack/react-query";
import { obtenerLocadores } from "@/api/LocadorApi";
import { LocatarioType } from "@/types/types";

const Locador = () => {
  const { data, isLoading } = useQuery<LocatarioType[]>({
    queryKey: ["locadores"],
    queryFn: obtenerLocadores,
  });

  return (
    <div className="w-full">
      <HeaderPages title="Locador" />
      {isLoading ? "Cargando..." :  data && <LocLotTable locatarios={[]} locadores={data} isLocatario={false} />}
    </div>
  );
};

export default Locador;
