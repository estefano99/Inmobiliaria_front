"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowDown, BetweenVerticalStart, CircleEllipsis, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from "@/components/ui/table"
import { InmuebleJoin } from "@/types/types"
import FormEditar from "./FormEditar"
import FormAlta from "./FormAlta"
import Delete from "./Delete"
import DetailsModal from "./DetailsModal"

type InmuebleNewTableProps = {
  inmuebles: InmuebleJoin[]
}

export function InmuebleNewTable({ inmuebles }: InmuebleNewTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isEdit, setIsEdit] = React.useState(false);
  const [inmuebleEditar, setInmuebleEditar] = React.useState<InmuebleJoin | null>(null);
  const [sortDirections, setSortDirections] = React.useState<Record<string, boolean>>({});

  const handleEdit = (inmueble: InmuebleJoin) => {
    setIsEdit(true);
    setInmuebleEditar(inmueble);
  };

  const columns: ColumnDef<InmuebleJoin>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
      accessorKey: "localidad",
      header: ({ column }) => (
        <Button
          className="text-xs 2xl:text-sm"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
            setSortDirections(prev => ({
              ...prev,
              localidad: !prev.localidad
            }));
          }}
        >
          Localidad
          <ArrowDown
            className={`ml-2 h-4 w-4 transition-all ${sortDirections.localidad ? 'rotate-180' : ''
              }`}
          />
        </Button>
      ),
    },
    {
      accessorKey: "calle",
      header: ({ column }) => (
        <Button
          className="text-xs 2xl:text-sm"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
            setSortDirections(prev => ({
              ...prev,
              calle: !prev.calle
            }));
          }}
        >
          Calle
          <ArrowDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${sortDirections.calle ? 'rotate-180' : ''
              }`}
          />
        </Button>
      ),
    },
    {
      accessorKey: "altura",
      header: () => <div className="text-center">Altura</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("altura") ? row.getValue("altura") : "-"}</div>
      ),
    },
    {
      accessorKey: "torre",
      header: () => <div className="text-center">Torre</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("torre") ? row.getValue("torre") : "-"}</div>
      ),
    },
    {
      accessorKey: "piso",
      header: () => <div className="text-center">Piso</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("piso") ? row.getValue("piso") : "-"}</div>
      ),
    },
    {
      accessorKey: "departamento",
      header: () => <div className="text-center">Departamento</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("departamento") ? row.getValue("departamento") : "-"}</div>
      ),
    },
    {
      id: "locador",
      accessorFn: row => `${row.locador.nombre} ${row.locador.apellido}`,
      header: ({ column }) => (
        <Button
          className="text-xs 2xl:text-sm"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
            setSortDirections(prev => ({
              ...prev,
              localidad: !prev.localidad
            }));
          }}
        >
          Locador
          <ArrowDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${sortDirections.localidad ? 'rotate-180' : ''}`}
          />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.original.locador.apellido} {row.original.locador.nombre}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => "Acciones",
      cell: ({ row }) => {
        const inmueble = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-3 h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <CircleEllipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center select-none">Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="focus:bg-yellow-300/30 flex items-center gap-2"
              >
                <DetailsModal inmueble={inmueble} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-blue-500/30 flex items-center gap-2"
                onClick={() => handleEdit(inmueble)}
              >
                <Pencil className="w-5 h-5" />
                Editar inmueble
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-red-500/30 flex items-center gap-2"
              >
                <Delete inmueble={inmueble} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: inmuebles,
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
  })

  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-6 items-center py-4 gap-5">
        <Input
          placeholder="Filtrar por localidad..."
          value={(table.getColumn("localidad")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("localidad")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        <Input
          placeholder="Filtrar por calle..."
          value={(table.getColumn("calle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("calle")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        <Input
          placeholder="Filtrar por altura..."
          value={(table.getColumn("altura")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("altura")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        <Input
          placeholder="Filtrar por locador..."
          value={(table.getColumn("locador")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("locador")?.setFilterValue(event.target.value)
          }
          className="w-full text-xs 2xl:text-sm"
        />
        {isEdit && inmuebleEditar && (
          <FormEditar
            inmueble={inmuebleEditar}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            setInmuebleEditar={setInmuebleEditar}
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <FormAlta />
      </div>
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
                  )
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-[5px]" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableHeaderRow className="h-10">
                <TableCell
                  colSpan={columns.length}
                  className="text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableHeaderRow>
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
  )
}
