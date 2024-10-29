"use client"

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { obtenerLocadores } from "@/api/LocadorApi";
import { LocadorType } from "@/types/types";

export function ComboboxLocador() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [selectedLocadorId, setSelectedLocadorId] = React.useState<number | null>(null);

  const { data: locadores, isLoading, isError } = useQuery<LocadorType[]>({
    queryKey: ["inmuebles"],
    queryFn: obtenerLocadores,
  });

  const handleSelect = (currentValue: string, locadorId: number) => {
    setValue(currentValue === value ? "" : currentValue);
    setSelectedLocadorId(currentValue === value ? null : locadorId);
    setOpen(false);
  };

  const handleAlta = () => {
    if (selectedLocadorId !== null) {
      // Lógica para dar de alta el inmueble con el ID del locador seleccionado
      console.log("ID del locador seleccionado:", selectedLocadorId);
      // Aquí puedes hacer la llamada a la API para dar de alta el inmueble
    } else {
      console.error("No se ha seleccionado ningún locador");
    }
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? value
              : "Seleccionar locador..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search locador..." />
            <CommandList>
              {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
              {isError && <CommandEmpty>Error loading locadores.</CommandEmpty>}
              {!isLoading && !isError && locadores?.length === 0 && (
                <CommandEmpty>No locador found.</CommandEmpty>
              )}
              <CommandGroup>
                {locadores?.map((locador) => (
                  <CommandItem
                    key={locador.id}
                    value={`${locador.apellido} ${locador.nombre}`}
                    onSelect={() => locador.id !== undefined && handleSelect(`${locador.apellido} ${locador.nombre}`, locador.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === `${locador.apellido} ${locador.nombre}` ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {locador.apellido} {locador.nombre}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button onClick={handleAlta}>Dar de Alta</Button>
    </div>
  );
}