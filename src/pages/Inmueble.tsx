import HeaderPages from "@/components/HeaderPages";

import { useQuery } from "@tanstack/react-query";

import { InmuebleJoin } from "@/types/types";
import { obtenerInmuebles } from "@/api/InmuebleApi";
import { InmuebleTable } from "@/components/inmueble/InmuebleTable";

const Inmueble = () => {
  const { data, isLoading } = useQuery<InmuebleJoin[]>({
    queryKey: ["inmuebles"],
    queryFn: obtenerInmuebles,
  });
  console.log(data)

  return (
    <div className="w-full">
      <HeaderPages title="Inmueble" />
      {isLoading ? "Cargando..." : data && <InmuebleTable inmuebles={data} />}
    </div>
  );
};

export default Inmueble;
