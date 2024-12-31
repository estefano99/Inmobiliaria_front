"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
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

interface ComboboxTipoContratoProps {
  setValue: (name: "duracion" | "plazo_aumento", value: number) => void;
  isDuracion: boolean;
  initialValue: number | undefined;
  isEdit: boolean;
}

const duraciones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function ComboboxTipoContrato({
  setValue,
  isDuracion,
  initialValue,
  isEdit,
}: ComboboxTipoContratoProps) {
  const [open, setOpen] = React.useState(false);

  let initialDisplayValue = undefined; //Inicializa los select con los valores de la row seleccionada, ej: 2 anios, 3 meses, 

  if (isEdit && initialValue) {
    initialDisplayValue = initialValue; // Usa el valor inicial tal cual si no es duración
  }
  const [selectedValue, setSelectedValue] = React.useState<number | undefined>(
    initialDisplayValue
  );

  // Maneja la selección de valor, convirtiendo solo los años a días antes de setear en el formulario
  const handleSelect = (actualValue: number) => {
    setValue(isDuracion ? "duracion" : "plazo_aumento", actualValue);
    setSelectedValue(actualValue);
    setOpen(false);
  };

  return (
    <div >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-sm font-light"
          >
            {selectedValue
              ? `${selectedValue} Meses`
              : isDuracion
                ? "Seleccionar duración..."
                : "Seleccionar plazo..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandGroup>
                {duraciones.map((item, index) => (
                  <CommandItem key={index} onSelect={() => handleSelect(item)}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === item ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item} {isDuracion ? "Años" : "Meses"}
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
