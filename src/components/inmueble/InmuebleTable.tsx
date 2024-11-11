import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen } from "lucide-react";
import FormAlta from "./FormAlta";
import { InmuebleJoin } from "@/types/types";
import { useState } from "react";
import FormEditar from "./FormEditar";
import Delete from "./Delete";
import { Input } from "../ui/input";

interface props {
  inmuebles: InmuebleJoin[];
}

export function InmuebleTable({ inmuebles }: props) {
  const [isEdit, setIsEdit] = useState(false);
  const [inmuebleEditar, setInmuebleEditar] = useState<InmuebleJoin | null>(null);
  const [filter, setFilter] = useState("");

  const handleEditar = async (inmueble: InmuebleJoin) => {
    setInmuebleEditar(inmueble);
    setIsEdit(true);
  };

  const filteredInmuebles = inmuebles.filter((inmueble) =>
    `${inmueble.calle} ${inmueble.altura} ${inmueble.localidad} ${inmueble.piso} ${inmueble.departamento}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto mt-5 h-[85vh]">
      <div className="w-full mb-3 flex justify-between">
        <Input
          className="w-1/4"
          placeholder="Filtrar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <FormAlta />
        {isEdit && inmuebleEditar && (
          <FormEditar
            inmueble={inmuebleEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setInmuebleEditar={setInmuebleEditar}
          />
        )}
      </div>
      <div className="h-full w-full">
        <Table className="w-full">
          <TableHeader className="w-full">
            <TableRow>
              <TableHead>Localidad</TableHead>
              <TableHead>Calle</TableHead>
              <TableHead className="text-center">Altura</TableHead>
              <TableHead className="text-center">Piso</TableHead>
              <TableHead className="text-center">Departamento</TableHead>
              <TableHead>Locador</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          {/* Contenedor scrollable */}
          <div className="max-h-[79vh] w-full overflow-y-scroll">
            <TableBody className="w-full">
              {filteredInmuebles.length > 0 ? (
                filteredInmuebles.map((inmueble) => (
                  <TableRow key={inmueble.id} className="w-full">
                    <TableCell>{inmueble.localidad || "Sin localidad"}</TableCell>
                    <TableCell>{inmueble.calle || "Sin calle"}</TableCell>
                    <TableCell className="text-center">{inmueble.altura || "Sin altura"}</TableCell>
                    <TableCell className="text-center">{inmueble.piso || "Sin piso"}</TableCell>
                    <TableCell className="text-center">{inmueble.departamento || "Sin departamento"}</TableCell>
                    <TableCell>{`${inmueble.locador?.apellido || "Sin Apellido"} ${inmueble.locador?.nombre || "Sin Nombre"}`}</TableCell>
                    <TableCell className="flex items-center gap-4">
                      <SquarePen
                        color="green"
                        onClick={() => handleEditar(inmueble)}
                        className="hover:cursor-pointer"
                      />
                      <Delete inmueble={inmueble} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No se encontraron inmuebles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </div>
        </Table>
      </div>
    </div>
  );
}
