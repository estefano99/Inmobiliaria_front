import HeaderPages from "@/components/HeaderPages";
import { useQuery } from "@tanstack/react-query";
import { TipoContratoType } from "@/types/types";
import { obtenerTipoContratos } from "@/api/TipoContratoApi";
import { TipoContratoTable } from "@/components/tipoContrato/tipoContratoTable";

const TipoContrato = () => {
  const { data, isLoading } = useQuery<TipoContratoType[]>({
    queryKey: ["tipoContratos"],
    queryFn: obtenerTipoContratos,
  });

  return (
    <div className="w-full">
      <HeaderPages title="Tipo contrato" />
      {isLoading ? "Cargando..." :  data && <TipoContratoTable tipoContratos={data} />}
    </div>
  );
};

export default TipoContrato;
