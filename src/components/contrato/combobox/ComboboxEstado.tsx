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
import { Estado } from "@/types/types";

interface EstadoProps {
  setValue: (name: "estado", value: Estado) => void;
  defaultValue?: Estado | "";
}

// Cambiar el tipo de setValue en ComboboxLocador
export function ComboboxEstados({ setValue, defaultValue }: EstadoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setInternalValue] = React.useState<Estado | "">("");
  
  const estados = Object.values(Estado); // Convierte el enum a un array de valores

  const handleSelect = (currentValue: Estado) => {
    setInternalValue(currentValue === value ? "" : currentValue);
    setValue("estado", currentValue); // Actualiza el valor en el formulario
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
            {value ? value : "Seleccionar estado..."}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Buscar estado..." />
            <CommandList>
              <CommandGroup>
                {estados?.map((estado) => (
                  <CommandItem
                    key={estado}
                    value={estado}
                    onSelect={() =>
                      estado !== undefined && handleSelect(estado)
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === `${estado}`
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {estado}
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
