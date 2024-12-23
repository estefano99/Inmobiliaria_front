import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
  contratosPorAumentar: contratoJoin[];
  openModalAumento: boolean;
  setOpenModalAumento: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmaAumentos = ({
  contratosPorAumentar,
  openModalAumento,
  setOpenModalAumento,
}: props) => {
  return (
    <AlertDialog open={openModalAumento} onOpenChange={setOpenModalAumento}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">¡Atención!</AlertDialogTitle>
          <TableCaption className="pb-5 text-xl font-bold text-red-500 ">
            Los siguientes contratos necesitan aumento de importes
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
                  {contratosPorAumentar.map((contrato) => (
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

export default AlarmaAumentos;
