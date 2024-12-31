"use client";

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
import { TipoContratoType } from "@/types/types";
import { obtenerTipoContratos } from "@/api/TipoContratoApi";

interface TipoContratoProps {
  setValue: (name: "id_tipo_contrato", value: number) => void;
  defaultValue?: string;
}

export function ComboboxTipoContratoComponent({
  setValue,
  defaultValue,
}: TipoContratoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setInternalValue] = React.useState("");
  const {
    data: tipo_contratos,
    isLoading,
    isError,
  } = useQuery<TipoContratoType[]>({
    queryKey: ["comboboxTipoContrato"],
    queryFn: obtenerTipoContratos,
  });

  const handleSelect = (currentValue: string, id_tipo_contrato: number) => {
    setInternalValue(currentValue === value ? "" : currentValue);
    setValue("id_tipo_contrato", id_tipo_contrato); // Actualiza el valor en el formulario
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
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value ? value : "Seleccionar tipo contrato..."}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Buscar tipo contrato..." />
            <CommandList>
              {isLoading && <CommandEmpty>Cargando...</CommandEmpty>}
              {isError && (
                <CommandEmpty>Error cargando tipos de contratos.</CommandEmpty>
              )}
              {!isLoading && !isError && tipo_contratos?.length === 0 && (
                <CommandEmpty>
                  No se encontraron tipos de contratos.
                </CommandEmpty>
              )}
              <CommandGroup>
                {tipo_contratos?.map((tipo_contrato) => (
                  <CommandItem
                    key={tipo_contrato.id}
                    value={`${tipo_contrato.duracion} ${tipo_contrato.plazo_aumento} ${tipo_contrato.alarma_aumento}`}
                    onSelect={() =>
                      tipo_contrato.id !== undefined &&
                      handleSelect(
                        `${tipo_contrato.duracion} ${tipo_contrato.plazo_aumento} ${tipo_contrato.alarma_aumento}`,
                        tipo_contrato.id
                      )
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value ===
                          `${tipo_contrato.duracion} ${tipo_contrato.plazo_aumento} ${tipo_contrato.alarma_aumento}`
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    Duracion: {tipo_contrato.duracion} meses<br />
                    Aumento: {tipo_contrato.plazo_aumento} meses<br />
                    Alarma: {tipo_contrato.alarma_aumento} dias
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
