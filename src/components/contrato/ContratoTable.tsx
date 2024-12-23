import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  BetweenVerticalStart,
  CircleEllipsis,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from "@/components/ui/table";
import { contratoJoin } from "@/types/types";
import FormEditar from "./FormEditar";
import FormAlta from "./FormAlta";
import ContractDetailsModal from "./DetailsModal";
import Delete from "./Delete";
import { ContratoSwitch } from "./ContratoSwitch";

const flipIcon = (iconName: string) => {
  const icon = document.getElementById(iconName);

  if (icon) {
    icon.classList.toggle("rotate-180");
  }
};

type EstadoBadgeVariant =
  | "default"
  | "secondary"
  | "finalizado"
  | "rescindido"
  | "vigente"
  | "proximo_a_vencer"
  | "info";

type ContratoProps = {
  contratos: contratoJoin[];
  switchEstado: boolean;
  setSwitchEstado: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ContratoTable({
  contratos,
  switchEstado,
  setSwitchEstado,
}: ContratoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [contratoEditar, setContratoEditar] =
    React.useState<contratoJoin | null>(null);

  const handleEdit = (contrato: contratoJoin) => {
    setIsEdit(true);
    setContratoEditar(contrato);
  };

  const columns: ColumnDef<contratoJoin>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "locatario",
      accessorFn: (row) => `${row.locatario.nombre} ${row.locatario.apellido}`,
      header: ({ column }) => (
        <Button
          className="text-xs 2xl:text-sm"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
            flipIcon("icon-locatario");
          }}
        >
          Locatario
          <ArrowDown id="icon-locatario" className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.original.locatario.apellido} {row.original.locatario.nombre}
        </div>
      ),
    },
    {
      id: "inmueble",
      accessorFn: (row) =>
        `${row.inmueble.localidad} ${row.inmueble.calle} ${
          row.inmueble.altura ?? ""
        }`,
      header: ({ column }) => (
        <Button
          className="text-xs 2xl:text-sm"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
            flipIcon("icon-inmueble");
          }}
        >
          Inmueble
          <ArrowDown id="icon-inmueble" className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.original.inmueble.localidad} {row.original.inmueble.calle}{" "}
          {row.original.inmueble.altura ?? ""}
        </div>
      ),
    },
    {
      accessorKey: "importe",
      header: () => <div className="text-center">Importe</div>,
      cell: ({ row }) => (
        <div className="text-center">
          ${row.getValue("importe") ? row.getValue("importe") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "fecha_inicio",
      header: () => <div className="text-center">Fecha inicio</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("fecha_inicio") ? row.getValue("fecha_inicio") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "fecha_fin",
      header: () => <div className="text-center">Fecha fin</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("fecha_fin") ? row.getValue("fecha_fin") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "estado",
      header: () => <div className="text-center">Estado</div>,
      cell: ({ row }) => {
        const estado = row.getValue("estado") as string;

        // Filtra o convierte el `estado` a un tipo válido de `variant`
        const estadoVariant: EstadoBadgeVariant =
          (estado.replace(/\s+/g, "_") as EstadoBadgeVariant) || "default";

        return (
          <div className="text-center">
            <Badge variant={estadoVariant}>{estado || "-"}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "alerta_vencimiento",
      header: () => <div className="text-center">Alerta vencimiento</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("alerta_vencimiento")
            ? `${row.getValue("alerta_vencimiento")} días`
            : "-"}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => "Acciones",
      cell: ({ row }) => {
        const contrato = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-3 h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <CircleEllipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center select-none">
                Acciones
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-yellow-300/30 flex items-center gap-2">
                <ContractDetailsModal contrato={contrato} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-blue-500/30 flex items-center gap-2"
                onClick={() => handleEdit(contrato)}
              >
                <Pencil className="w-5 h-5" />
                Editar contrato
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-red-500/30 flex items-center gap-2">
                <Delete contrato={contrato} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: contratos,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize: 10 } },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-3 md:grid-cols-7 items-center py-4 gap-5">
        <Input
          placeholder="Filtrar por locatario..."
          value={
            (table.getColumn("locatario")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("locatario")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        <Input
          placeholder="Filtrar por inmueble..."
          value={
            (table.getColumn("inmueble")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("inmueble")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        <Input
          placeholder="Filtrar por fecha inicio..."
          value={
            (table.getColumn("fecha_inicio")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fecha_inicio")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        <Input
          placeholder="Filtrar por fecha fin..."
          value={
            (table.getColumn("fecha_fin")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fecha_fin")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        <Input
          placeholder="Filtrar por estado..."
          value={(table.getColumn("estado")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("estado")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        {isEdit && contratoEditar && (
          <FormEditar
            contrato={contratoEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setContratoEditar={setContratoEditar}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="h-8.5 2xl:h-10">
            <Button variant="outline" className="ml-auto">
              <BetweenVerticalStart className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <FormAlta />
      </div>
      <ContratoSwitch
        switchEstado={switchEstado}
        setSwitchEstado={setSwitchEstado}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableHeaderRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableHeaderRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=""
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} Fila(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-xs 2xl:text-sm h-7"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-xs 2xl:text-sm h-7"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
