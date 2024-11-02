import HeaderPages from "@/components/HeaderPages";
import { useQuery } from "@tanstack/react-query";
import { obtenerLocatarios } from "@/api/LocatarioApi";
import { LocatarioType } from "@/types/types";

const TipoContrato = () => {
  const { data, isLoading } = useQuery<LocatarioType[]>({
    queryKey: ["tipoContratos"],
    queryFn: obtenerLocatarios,
  });

  return (
    <div className="w-full">
      <HeaderPages title="Tipo contrato" />
      {isLoading ? "Cargando..." :  data && <LocLotTable locadores={[]} locatarios={data} isLocatario={true} />}
    </div>
  );
};

export default TipoContrato;
