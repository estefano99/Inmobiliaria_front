import HeaderPages from "@/components/HeaderPages";

import { useQuery } from "@tanstack/react-query";

import { InmuebleType } from "@/types/types";
import { obtenerInmuebles } from "@/api/InmuebleApi";
import { LocLotTable } from "@/components/inmueble/LocLotTable";

const Inmueble = () => {
  const { data, isLoading } = useQuery<InmuebleType[]>({
    queryKey: ["inmuebles"],
    queryFn: obtenerInmuebles,
  });

  return (
    <div className="w-full">
      <HeaderPages title="Inmueble" />
      {isLoading ? "Cargando..." : data && <LocLotTable inmuebles={data} />}
    </div>
  );
};

export default Inmueble;
