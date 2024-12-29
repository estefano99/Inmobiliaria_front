import { obtenerContratos } from "@/api/ContratoApi";
import { obtenerHistorialesContratos } from "@/api/HistorialContratoApi";
import AlarmaAumentos from "@/components/contrato/modals/AlarmaAumentos";
import AlertaVencimientos from "@/components/contrato/modals/AlertaVencimientos";
import { ContratoTable } from "@/components/contrato/ContratoTable";
import HeaderPages from "@/components/HeaderPages";
import { contratoJoin, historialContratos, historialFiltrados } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Contratos = () => {
  const [switchEstado, setSwitchEstado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAumento, setOpenModalAumento] = useState(false);
  const [contratosPorVencer, setContratosPorVencer] = useState<contratoJoin[]>(
    []
  );
  const [contratosParaAumento, setContratosParaAumento] = useState<historialFiltrados[]>(
    []
  );
  const { data: contratos, isLoading } = useQuery<contratoJoin[]>({
    queryKey: ["contratos", switchEstado],
    queryFn: () => obtenerContratos(switchEstado),
  });

  const { data: historialContratos } = useQuery<historialContratos[]>({
    queryKey: ["historialContratos"],
    queryFn: obtenerHistorialesContratos,
  });

  useEffect(() => {
    const hoy = new Date();

    if (contratos) {
      const contratosFiltrados = [...contratos].filter((contrato) => {
        const fechaFin = new Date(contrato.fecha_fin);
        const rangoMaximo = new Date();
        rangoMaximo.setDate(hoy.getDate() + contrato.alerta_vencimiento);

        return fechaFin >= hoy && fechaFin <= rangoMaximo;
      });

      setContratosPorVencer(contratosFiltrados || []);
      setOpenModal(contratosFiltrados.length > 0);
    }

    const contratosFiltrados = filtrarHistoriales(historialContratos || []);
    const contratosConAumento = contratosPorAumentar(contratosFiltrados || [])
    setContratosParaAumento(contratosConAumento);
    setOpenModalAumento(contratosConAumento.length > 0);
    
  }, [contratos, historialContratos, switchEstado]);

  //Une a los contratos junto con su historial que esta vigente
  const filtrarHistoriales = (historialContratos: historialContratos[]) => {
    if (!historialContratos || !contratos) {
      return []; // Devuelve un array vacío si alguno de los datos no está disponible
    }
  
    // Filtrar contratos que tienen un historial asociado y mapearlos
    const contratosFiltrados = contratos
      .map((contrato) => {
        const historial = historialContratos.find(
          (historial) => historial.id_contrato === contrato.id
        );
        if (!historial) return null; // Si no hay historial, retorna null
        return {
          ...contrato,
          historial, // Agrega el historial al contrato
        };
      })
      .filter((contrato): contrato is historialFiltrados => contrato !== null); // Filtra valores nulos
  
    return contratosFiltrados;
  };
  

  const contratosPorAumentar = (contratosFiltrados: historialFiltrados[]) => {
    if (!contratosFiltrados) return [];

    const contratosRangoAumento = contratosFiltrados.filter(contratos => {
      const hoy = new Date();
      const fechaActualizacion = new Date(contratos.historial.fecha_actualizacion);
      const alarmaAumento = contratos.tipo_contrato.alarma_aumento;
      
      const rangoInicio = new Date(fechaActualizacion);
      rangoInicio.setDate(fechaActualizacion.getDate() - alarmaAumento);

      return hoy >= rangoInicio;
    })
    return contratosRangoAumento
  }

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
      {contratosParaAumento.length > 0 && (
        <AlarmaAumentos
          contratosParaAumento={contratosParaAumento}
          openModalAumento={openModalAumento}
          setOpenModalAumento={setOpenModalAumento}
        />
      )}
      {isLoading
        ? "Cargando..."
        : contratos && (
          <ContratoTable
            contratos={contratos}
            switchEstado={switchEstado}
            setSwitchEstado={setSwitchEstado}
          />
        )}
    </div>
  );
};

export default Contratos;
