import { dashboardObtenerTotalDatos } from "@/api/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { FileText, HouseIcon, SquareUserRound, UserRoundSearch } from "lucide-react";

type TotalDatos = {
  totalLocatarios: number;
  totalLocadores: number;
  totalInmuebles: number;
  totalContratos: number;
};

const CardCantidades = () => {
  const { data, isLoading } = useQuery<TotalDatos>({
    queryKey: ["dashboardTotalDatos"],
    queryFn: dashboardObtenerTotalDatos,
  });

  return (
    <section className="flex flex-col">
      {isLoading ? (
        "Cargando..."
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {/* Tarjeta 1 */}
          <div className="flex flex-col bg-green-400 rounded-md shadow-md pb-3 px-3">
            <div className="flex justify-start gap-2 items-center py-3">
              <SquareUserRound className="text-green-900" />
              <p className="text-green-900 text-sm md:text-base font-bold uppercase">
                Total Locadores
              </p>
            </div>
            <div className="bg-green-300 rounded-2xl">
              <p className="text-green-900 font-black text-2xl md:text-5xl text-center py-5">
                {data?.totalLocadores || 0}
              </p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="flex flex-col bg-orange-400 rounded-md shadow-md pb-3 px-3">
            <div className="flex justify-start gap-2 items-center py-3">
              <UserRoundSearch className="text-orange-900"/>
              <p className="text-orange-900 text-sm md:text-base font-bold uppercase">
                Total Locatarios
              </p>
            </div>
            <div className="bg-orange-300 rounded-2xl">
              <p className="text-orange-900 font-black text-2xl md:text-5xl text-center py-5">
                {data?.totalLocatarios || 0}
              </p>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="flex flex-col bg-yellow-400 rounded-md shadow-md pb-3 px-3">
            <div className="flex justify-start gap-2 items-center py-3">
              <HouseIcon className="text-yellow-900"/>
              <p className="text-yellow-900 text-sm md:text-base font-bold uppercase">
                Total Inmuebles
              </p>
            </div>
            <div className="bg-yellow-300 rounded-2xl">
              <p className="text-yellow-900 font-black text-2xl md:text-5xl text-center py-5">
                {data?.totalInmuebles || 0}
              </p>
            </div>
          </div>

          {/* Tarjeta 4 */}
          <div className="flex flex-col bg-blue-400 rounded-md shadow-md pb-3 px-3">
            <div className="flex justify-start gap-2 items-center py-3">
              <FileText className="text-blue-900"/>
              <p className="text-blue-900 text-sm md:text-base font-bold uppercase">
                Total Contratos
              </p>
            </div>
            <div className="bg-blue-300 rounded-2xl">
              <p className="text-blue-900 font-black text-2xl md:text-5xl text-center py-5">
                {data?.totalContratos || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CardCantidades;
