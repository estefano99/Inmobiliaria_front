import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
} from "@/components/ui/table";

import { historialFiltrados } from "@/types/types";
import { ScrollArea } from "../../ui/scroll-area";
import ModalActualizarImporte from "./ModalActualizarImporte";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

interface props {
  contratosParaAumento: historialFiltrados[];
  openModalAumento: boolean;
  setOpenModalAumento: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmaAumentos = ({
  contratosParaAumento,
  openModalAumento,
  setOpenModalAumento,
}: props) => {
  const [openConfirmar, setOpenConfirmar] = useState(false);
  const [contratoConHistorial, setContratoConHistorial] = useState<historialFiltrados | null>(null);

  const handleClickAumento = (contrato: historialFiltrados) => {
    setOpenConfirmar(true);
    setContratoConHistorial(contrato);
  }
  return (
    <AlertDialog open={openModalAumento} onOpenChange={setOpenModalAumento}>
      <AlertDialogContent className="w-full">
        {
          openConfirmar && <ModalActualizarImporte contratoConHistorial={contratoConHistorial} openConfirmar={openConfirmar} setOpenConfirmar={setOpenConfirmar} />
        }
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">¡Atención!</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="pb-5 text-center text-xl font-bold text-slate-400 ">
          Los siguientes contratos necesitan un <span className="underline underline-offset-4 font-black text-yellow-600">aumento de importe</span>
        </AlertDialogDescription>
        <ScrollArea className="h-[300px] w-full">
          <Table>
            <TableHeader>
              <TableHeaderRow>
                <TableHead>Inicio</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Localidad</TableHead>
                <TableHead>Calle</TableHead>
                <TableHead>Altura</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Importe</TableHead>
                <TableHead className="font-bold text-slate-100">Fecha aumento</TableHead>
                <TableHead>Acciones</TableHead>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {contratosParaAumento.map((contrato) => (
                <TableHeaderRow key={contrato.id}>
                  <TableCell>{String(contrato.fecha_inicio)}</TableCell>
                  <TableCell>{String(contrato.fecha_fin)}</TableCell>
                  <TableCell>
                    {String(contrato.inmueble.localidad)}
                  </TableCell>
                  <TableCell>{String(contrato.inmueble.calle)}</TableCell>
                  <TableCell>{String(contrato.inmueble.altura)}</TableCell>
                  <TableCell>{String(contrato.locatario.nombre)}</TableCell>
                  <TableCell>
                    {String(contrato.locatario.apellido)}
                  </TableCell>
                  <TableCell>{String(contrato.importe)}</TableCell>
                  <TableCell className="font-bold text-slate-100">{String(contrato.historial.fecha_actualizacion)}</TableCell>
                  <TableCell onClick={() => handleClickAumento(contrato)} className="cursor-pointer text-yellow-400 hover:bg-yellow-300/20 transition-all">Actualizar</TableCell>
                </TableHeaderRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        
        <AlertDialogFooter>
          <AlertDialogAction>Cerrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlarmaAumentos;
