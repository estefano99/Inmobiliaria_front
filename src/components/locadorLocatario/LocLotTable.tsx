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
import { LocadorType, LocatarioType } from "@/types/types";
import { useState } from "react";
import FormEditar from "./FormEditar";
import Delete from "./Delete";
import { Input } from "../ui/input";

interface props {
  locatarios: LocatarioType[];
  locadores: LocatarioType[];
  isLocatario: boolean;
}

export function LocLotTable({ locatarios, locadores, isLocatario }: props) {
  const [isEdit, setIsEdit] = useState(false);
  const [locatarioEditar, setLocatarioEditar] = useState<LocatarioType | null>(
    null
  );
  const [locadorEditar, setLocadorEditar] = useState<LocadorType | null>(
    null
  );
  const [filter, setFilter] = useState("");
  const [filterLocador, setFilterLocador] = useState("");

  const handleEditar = async (locatario: LocatarioType) => {
    setLocatarioEditar(locatario);
    setIsEdit(true);
  };

  const handleEditarLocador = async (locador: LocadorType) => {
    setLocadorEditar(locador);
    setIsEdit(true);
  };

  // Filtrar los locatarios según el término de búsqueda
  const filteredLocatarios = locatarios.filter((locatario) =>
    `${locatario.nombre} ${locatario.apellido} ${locatario.dni} ${locatario.telefono}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const filteredLocadores = locadores.filter((locador) =>
    `${locador.nombre} ${locador.apellido} ${locador.dni} ${locador.telefono}`
      .toLowerCase()
      .includes(filterLocador.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto mt-5">
      <div className="w-full my-5 flex justify-between">
        {isLocatario ? (
          <Input
            className="w-1/4"
            placeholder="Filtrar..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        ) : (
          <Input
            className="w-1/4"
            placeholder="Filtrar..."
            value={filterLocador}
            onChange={(e) => setFilterLocador(e.target.value)}
          />
        )}
        <FormAlta isLocatario={isLocatario} />
        {isEdit && locatarioEditar && (
          <FormEditar
            locatario={locatarioEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setLocatarioEditar={setLocatarioEditar}
            locador={null}
            setLocadorEditar={setLocadorEditar}
          />
        )}
        {isEdit && locadorEditar && (
          <FormEditar
            locador={locadorEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setLocadorEditar={setLocadorEditar}
            locatario={null}
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
          {isLocatario ? (
            filteredLocatarios.length > 0 ? (
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
                    <Delete locatario={locatario} locador={null} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={5} className="text-center">
                No se encontraron locatores.
              </TableCell>
            )
          ) : filteredLocadores.length > 0 ? (
            filteredLocadores.map((locador) => (
              <TableRow key={locador.id}>
                <TableCell>{locador.nombre}</TableCell>
                <TableCell>{locador.apellido}</TableCell>
                <TableCell>{locador.dni}</TableCell>
                <TableCell>{locador.telefono}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <SquarePen
                    color="green"
                    onClick={() => handleEditarLocador(locador)}
                    className="hover:cursor-pointer"
                  />
                  <Delete locatario={null} locador={locador} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={5} className="text-center">
              No se encontraron locadores.
            </TableCell>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
