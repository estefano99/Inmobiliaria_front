import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash } from "lucide-react";
import FormAlta from "./FormAlta";
import { LocatarioType } from "@/types/types";
import { useState } from "react";
import FormEditar from "./FormEditar";

interface props {
  locatarios: LocatarioType[];
}

export function LocLotTable({ locatarios }: props) {
  const [isEdit, setIsEdit] = useState(false);
  const [locatarioEditar, setLocatarioEditar] = useState<LocatarioType | null>(
    null
  );

  const handleEditar = async (locatario: LocatarioType) => {
    setLocatarioEditar(locatario);
    setIsEdit(true);
  };
  return (
    <div className="md:w-[90%] mx-auto mt-5">
      {/* BOTON crear locatario que llama al form */}
      <div className="w-full my-5 flex justify-end">
        <FormAlta />
        {isEdit && locatarioEditar && (
          <FormEditar
            locatario={locatarioEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setLocatarioEditar={setLocatarioEditar}
          />
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locatarios.length > 0 ? (
            locatarios.map((locatario) => (
              <TableRow key={locatario.id}>
                <TableCell>{locatario.nombre}</TableCell>
                <TableCell>{locatario.apellido}</TableCell>
                <TableCell>{locatario.dni}</TableCell>
                <TableCell>{locatario.telefono}</TableCell>
                <TableCell className="flex gap-4">
                  <SquarePen
                    color="green"
                    onClick={() => handleEditar(locatario)}
                    className="hover:cursor-pointer"
                  />{" "}
                  <Trash color="red" className="hover:cursor-pointer" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p className="mt-5">
              Aún no ha creado Locatarios, presione en crear Locatario para
              cargarlos.
            </p>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
