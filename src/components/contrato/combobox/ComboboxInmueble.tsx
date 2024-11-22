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
import { InmuebleType } from "@/types/types";
import { obtenerInmuebles } from "@/api/InmuebleApi";

interface inmuebleProps{
  setValue: (name: "id_inmueble", value: number) => void;
  defaultValue?: string;
}

export function ComboboxInmueble({ setValue, defaultValue }: inmuebleProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setInternalValue] = React.useState("");
  const { data: inmuebles, isLoading, isError } = useQuery<InmuebleType[]>({
    queryKey: ["comboboxInmueble"],
    queryFn: obtenerInmuebles,
  });

  const handleSelect = (currentValue: string, id_inmueble: number) => {
    setInternalValue(currentValue === value ? "" : currentValue);
    setValue("id_inmueble", id_inmueble); // Actualiza el valor en el formulario
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
            {value ? value : "Seleccionar inmueble..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar inmueble..." />
            <CommandList>
              {isLoading && <CommandEmpty>Cargando...</CommandEmpty>}
              {isError && <CommandEmpty>Error cargando inmuebles.</CommandEmpty>}
              {!isLoading && !isError && inmuebles?.length === 0 && (
                <CommandEmpty>No se encontraron inmuebles.</CommandEmpty>
              )}
              <CommandGroup>
                {inmuebles?.map((inmueble) => (
                  <CommandItem
                    key={inmueble.id}
                    value={`${inmueble.localidad} ${inmueble.calle} ${inmueble.altura}`}
                    onSelect={() => inmueble.id !== undefined && handleSelect(`${inmueble.localidad} ${inmueble.calle} ${inmueble.altura}`, inmueble.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === `${inmueble.localidad} ${inmueble.calle} ${inmueble.altura}` ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {inmueble.localidad} {inmueble.calle} {inmueble.altura}
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

