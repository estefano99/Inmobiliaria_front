import HeaderPages from "@/components/HeaderPages";

import { useQuery } from "@tanstack/react-query";

import { InmuebleJoin } from "@/types/types";
import { obtenerInmuebles } from "@/api/InmuebleApi";
import { InmuebleNewTable } from "@/components/inmueble/InmuebleNewTable";

const Inmueble = () => {
  const { data, isLoading } = useQuery<InmuebleJoin[]>({
    queryKey: ["inmuebles"],
    queryFn: obtenerInmuebles,
  });

  return (
    <div className="w-full">
      <HeaderPages title="Inmueble" />
      {isLoading ? "Cargando..." : data && <InmuebleNewTable inmuebles={data} />}
    </div>
  );
};

export default Inmueble;
