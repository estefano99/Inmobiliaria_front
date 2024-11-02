import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen } from "lucide-react";
// import FormAlta from "./FormAlta";
import { InmuebleJoin } from "@/types/types";
import { useState } from "react";
// import FormEditar from "./FormEditar";
// import Delete from "./Delete";
import { Input } from "../ui/input";

interface props {
  inmuebles: InmuebleJoin[];
}

export function InmuebleTable({ inmuebles }: props) {
  const [isEdit, setIsEdit] = useState(false);
  const [inmuebleEditar, setInmuebleEditar] = useState<InmuebleJoin | null>(
    null
  );
  const [filter, setFilter] = useState("");

  const handleEditar = async (inmueble: InmuebleJoin) => {
    setInmuebleEditar(inmueble);
    setIsEdit(true);
  };

  // Filtrar los inmuebles según el término de búsqueda
  const filteredInmuebles = inmuebles.filter((inmueble) =>
    `${inmueble.calle} ${inmueble.altura} ${inmueble.localidad} ${inmueble.piso} ${inmueble.departamento}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto mt-5">
      <div className="w-full my-5 flex justify-between">
        <Input
          className="w-1/4"
          placeholder="Filtrar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* <FormAlta /> */}
        {/* {isEdit && inmuebleEditar && (
          <FormEditar
            inmueble={inmuebleEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setInmuebleEditar={setInmuebleEditar}
          />
        )} */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>duracion</TableHead>
            <TableHead>Plazo aumento</TableHead>
            <TableHead>alarma vencimiento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInmuebles.length > 0 ? (
            filteredInmuebles.map((inmueble) => (
              <TableRow key={inmueble.id}>
                <TableCell>{inmueble.localidad}</TableCell>
                <TableCell>{inmueble.calle}</TableCell>
                <TableCell>{inmueble.altura}</TableCell>
                <TableCell>{inmueble.piso}</TableCell>
                <TableCell>{inmueble.departamento}</TableCell>
                <TableCell>{inmueble.locador?.nombre}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <SquarePen
                    color="green"
                    onClick={() => handleEditar(inmueble)}
                    className="hover:cursor-pointer"
                  />
                  {/* <Delete inmueble={inmueble} /> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={5} className="text-center">
              No se encontraron inmuebles.
            </TableCell>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
