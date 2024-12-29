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
import { TipoContratoType } from "@/types/types";
import { useState } from "react";
import FormEditar from "./FormEditar";
import Delete from "./Delete";
import { Input } from "../ui/input";

interface props {
  tipoContratos: TipoContratoType[];
}

export function TipoContratoTable({ tipoContratos }: props) {
  const [isEdit, setIsEdit] = useState(false);
  const [tipoContratoEditar, setTipoContratoEditar] = useState<TipoContratoType | null>(
    null
  );
  const [filter, setFilter] = useState("");

  const handleEditar = async (tipoContrato: TipoContratoType) => {
    setTipoContratoEditar(tipoContrato);  
    setIsEdit(true);
  };

  // Filtrar los inmuebles según el término de búsqueda
  const filteredTipoContratos = tipoContratos.filter((tipoContrato) =>
    `${tipoContrato.duracion / 365}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto mt-5">
      <div className="w-full my-5 flex justify-between gap-2 md:gap-0">
        <Input
          className="w-full md:w-1/4"
          placeholder="Filtrar por Duración..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <FormAlta />
        {isEdit && tipoContratoEditar && (
          <FormEditar
            tipoContrato={tipoContratoEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setTipoContratoEditar={setTipoContratoEditar}
          />
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Duración</TableHead>
            <TableHead>Plazo aumento</TableHead>
            <TableHead>Alarma aumento</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTipoContratos.length > 0 ? (
            filteredTipoContratos.map((tipoContrato) => (
              <TableRow className="h-10" key={tipoContrato.id}>
                <TableCell>{tipoContrato.duracion} meses</TableCell>
                <TableCell>{tipoContrato.plazo_aumento} meses</TableCell>
                <TableCell>{tipoContrato.alarma_aumento} dias</TableCell>
                <TableCell className="flex pt-2 items-center gap-4">
                  <SquarePen
                    color="green"
                    onClick={() => handleEditar(tipoContrato)}
                    className="hover:cursor-pointer"
                  />
                  <Delete tipoContrato={tipoContrato} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={5} className="text-center">
              No se encontraron Tipo de contratos.
            </TableCell>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
