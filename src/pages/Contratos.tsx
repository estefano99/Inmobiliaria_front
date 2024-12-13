import { obtenerContratos } from "@/api/ContratoApi";
import AlertaVencimientos from "@/components/contrato/AlertaVencimientos";
import { ContratoTable } from "@/components/contrato/ContratoTable";
import HeaderPages from "@/components/HeaderPages";
import { contratoJoin } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Contratos = () => {
  const [switchEstado, setSwitchEstado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contratosPorVencer, setContratosPorVencer] = useState<contratoJoin[]>(
    []
  );
  const { data, isLoading } = useQuery<contratoJoin[]>({
    queryKey: ["contratos", switchEstado],
    queryFn: () => obtenerContratos(switchEstado),
  });

  useEffect(() => {
    const hoy = new Date();

    if (data) {
      const contratosFiltrados = [...data].filter((contrato) => {
        const fechaFin = new Date(contrato.fecha_fin);
        const rangoMaximo = new Date();
        rangoMaximo.setDate(hoy.getDate() + contrato.alerta_vencimiento);

        return fechaFin >= hoy && fechaFin <= rangoMaximo;
      });
      setContratosPorVencer(contratosFiltrados || []);
      setOpenModal(contratosFiltrados.length > 0);
    }
  }, [data]);

  return (
    <div className="w-full">
      <HeaderPages title="Contrato" />
      {contratosPorVencer.length > 0 && (
        <AlertaVencimientos
          contratosPorVencer={contratosPorVencer}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {isLoading
        ? "Cargando..."
        : data && (
            <ContratoTable
              contratos={data}
              switchEstado={switchEstado}
              setSwitchEstado={setSwitchEstado}
            />
          )}
    </div>
  );
};

export default Contratos;
