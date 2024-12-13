import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { contratoJoin } from "@/types/types";
import { ScrollArea } from "../ui/scroll-area";

interface props {
  contratosPorVencer: contratoJoin[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertaVencimientos = ({
  contratosPorVencer,
  openModal,
  setOpenModal,
}: props) => {
  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">¡Atención!</AlertDialogTitle>
          <TableCaption className="pb-5 text-xl font-bold text-red-500 ">
            Los siguientes contratos están por vencer
          </TableCaption>
          <AlertDialogDescription>
            <ScrollArea className="h-[300px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Inicio</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Localidad</TableHead>
                    <TableHead>Calle</TableHead>
                    <TableHead>Altura</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>Importe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contratosPorVencer.map((contrato) => (
                    <TableRow key={contrato.id}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Cerrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertaVencimientos;
