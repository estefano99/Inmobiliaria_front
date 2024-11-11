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

interface ComboboxLocadorProps {
  setValue: (name: "locadorId", value: number) => void;
  defaultValue?: string;
}

// Cambiar el tipo de setValue en ComboboxLocador
export function ComboboxLocador({ setValue, defaultValue }: ComboboxLocadorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setInternalValue] = React.useState("");
  const { data: locadores, isLoading, isError } = useQuery<LocadorType[]>({
    queryKey: ["locadores"],
    queryFn: obtenerLocadores,
  });

  const handleSelect = (currentValue: string, locadorId: number) => {
    setInternalValue(currentValue === value ? "" : currentValue);
    setValue("locadorId", locadorId); // Actualiza el valor en el formulario
    setOpen(false);
  };

  React.useEffect(() => {
    if (defaultValue) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

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
            {value ? value : "Seleccionar locador..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar locador..." />
            <CommandList>
              {isLoading && <CommandEmpty>Cargando...</CommandEmpty>}
              {isError && <CommandEmpty>Error cargando locadores.</CommandEmpty>}
              {!isLoading && !isError && locadores?.length === 0 && (
                <CommandEmpty>No se encontraron locadores.</CommandEmpty>
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
    </div>
  );
}

