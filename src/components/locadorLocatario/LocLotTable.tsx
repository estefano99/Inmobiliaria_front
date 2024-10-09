import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen } from "lucide-react";
import FormAlta from "./FormAlta";
import { LocatarioType } from "@/types/types";
import { useState } from "react";
import FormEditar from "./FormEditar";
import Delete from "./Delete";
import { Input } from "../ui/input";

interface props {
  locatarios: LocatarioType[];
}

export function LocLotTable({ locatarios }: props) {
  const [isEdit, setIsEdit] = useState(false);
  const [locatarioEditar, setLocatarioEditar] = useState<LocatarioType | null>(
    null
  );
  const [filter, setFilter] = useState(""); // Estado para el filtro

  const handleEditar = async (locatario: LocatarioType) => {
    setLocatarioEditar(locatario);
    setIsEdit(true);
  };

  // Filtrar los locatarios según el término de búsqueda
  const filteredLocatarios = locatarios.filter((locatario) =>
    `${locatario.nombre} ${locatario.apellido} ${locatario.dni} ${locatario.telefono}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto mt-5">
      {/* BOTON crear locatario que llama al form */}
      <div className="w-full my-5 flex justify-between">
        <Input
          className="w-1/4"
          placeholder="Filtrar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
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
        {filteredLocatarios.length > 0 ? (
            filteredLocatarios.map((locatario) => (
              <TableRow key={locatario.id}>
                <TableCell>{locatario.nombre}</TableCell>
                <TableCell>{locatario.apellido}</TableCell>
                <TableCell>{locatario.dni}</TableCell>
                <TableCell>{locatario.telefono}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <SquarePen
                    color="green"
                    onClick={() => handleEditar(locatario)}
                    className="hover:cursor-pointer"
                  />
                  <Delete locatario={locatario} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p className="mt-5">
              No se encontraron locatarios que coincidan con el filtro.
            </p>
          )}
          {/* Dialog para confirmacion de eliminar */}
        </TableBody>
      </Table>
    </div>
  );
}
