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

export function LocLotTable() {
  return (
    <div className="md:w-[90%] mx-auto mt-5">
      {/* BOTON crear locatario que llama al form */}
      <div className="w-full my-5 flex justify-end">
        <FormAlta />
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
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell className="flex gap-4">
              <SquarePen color="green" className="hover:cursor-pointer" />{" "}
              <Trash color="red" className="hover:cursor-pointer" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
