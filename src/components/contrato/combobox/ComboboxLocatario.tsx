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
import { LocadorType } from "@/types/types";
import { obtenerLocatarios } from "@/api/LocatarioApi";

interface LocatarioProps{
  setValue: (name: "id_locatario", value: number) => void;
  defaultValue?: string;
}

// Cambiar el tipo de setValue en ComboboxLocador
export function ComboboxLocatarios({ setValue, defaultValue }: LocatarioProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setInternalValue] = React.useState("");
  const { data: locatarios, isLoading, isError } = useQuery<LocadorType[]>({
    queryKey: ["comboboxLocatarios"],
    queryFn: obtenerLocatarios,
  });

  const handleSelect = (currentValue: string, id_locatario: number) => {
    setInternalValue(currentValue === value ? "" : currentValue);
    setValue("id_locatario", id_locatario); // Actualiza el valor en el formulario
    setOpen(false);
  };

  React.useEffect(() => {
    if (defaultValue) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : "Seleccionar locatario..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder="Buscar locatario..." />
            <CommandList>
              {isLoading && <CommandEmpty>Cargando...</CommandEmpty>}
              {isError && <CommandEmpty>Error cargando locadores.</CommandEmpty>}
              {!isLoading && !isError && locatarios?.length === 0 && (
                <CommandEmpty>No se encontraron locadores.</CommandEmpty>
              )}
              <CommandGroup>
                {locatarios?.map((locatario) => (
                  <CommandItem
                    key={locatario.id}
                    value={`${locatario.apellido} ${locatario.nombre}`}
                    onSelect={() => locatario.id !== undefined && handleSelect(`${locatario.apellido} ${locatario.nombre}`, locatario.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === `${locatario.apellido} ${locatario.nombre}` ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {locatario.apellido} {locatario.nombre}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

