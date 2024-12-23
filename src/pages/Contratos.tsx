import { obtenerContratos } from "@/api/ContratoApi";
import AlarmaAumentos from "@/components/contrato/AlarmaAumentos";
import AlertaVencimientos from "@/components/contrato/AlertaVencimientos";
import { ContratoTable } from "@/components/contrato/ContratoTable";
import HeaderPages from "@/components/HeaderPages";
import { contratoJoin } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Contratos = () => {
  const [switchEstado, setSwitchEstado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAumento, setOpenModalAumento] = useState(false);
  const [contratosPorVencer, setContratosPorVencer] = useState<contratoJoin[]>(
    []
  );
  const [contratosPorAumentar, setContratosPorAumentar] = useState<contratoJoin[]>(
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
      setOpenModal(contratosFiltrados.length > 0); // Este efecto solo afecta a openModal
    }
  }, [data]);

  useEffect(() => {
    const hoy = new Date();

    if (data) {
      const contratosConAumentosProximos = [...data].filter((contrato) => {
        const tipoContrato = contrato.tipo_contrato;

        if (!tipoContrato) return false;

        const fechaInicio = new Date(contrato.fecha_inicio);
        const plazoAumentoMeses = tipoContrato.plazo_aumento;
        const alarmaAumentoDias = tipoContrato.alarma_aumento;

        const proximaFechaAumento = new Date(fechaInicio);
        proximaFechaAumento.setMonth(
          fechaInicio.getMonth() +
          plazoAumentoMeses *
          Math.floor(
            (hoy.getTime() - fechaInicio.getTime()) /
            (plazoAumentoMeses * 30 * 24 * 60 * 60 * 1000)
          )
        );

        const fechaInicioAlarma = new Date(proximaFechaAumento);
        fechaInicioAlarma.setDate(proximaFechaAumento.getDate() - alarmaAumentoDias);

        return hoy >= fechaInicioAlarma && hoy <= new Date(proximaFechaAumento.setDate(proximaFechaAumento.getDate() + 1));
      });

      setContratosPorAumentar(contratosConAumentosProximos || []);
      setOpenModalAumento(contratosConAumentosProximos.length > 0); // Este efecto solo afecta a openModalAumento
    }
  }, [data]);
  console.log("[Contratos por aumentas]:",contratosPorAumentar)

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
      {contratosPorAumentar.length > 0 && (
        <AlarmaAumentos
          contratosPorAumentar={contratosPorAumentar}
          openModalAumento={openModalAumento}
          setOpenModalAumento={setOpenModalAumento}
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
