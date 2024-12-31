"use client"

import * as React from "react"
import { format } from "date-fns"
// import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UseFormSetValue } from "react-hook-form";
import { Estado } from "@/types/types";

interface calendarioProps {
  valueForm: "fecha_inicio" | "fecha_fin";
  setValue: UseFormSetValue<{ 
    fecha_inicio: Date; 
    fecha_fin: Date; 
    id_locatario: number; 
    id_inmueble: number; 
    importe: number; 
    estado: Estado; 
    alerta_vencimiento: number; 
    id?: number;
    id_tipo_contrato: number;
  }>;
  defaultValue?: Date;
}

export function Calendario({setValue, defaultValue, valueForm}: calendarioProps) {
  const [date, setDate] = React.useState<Date>()
  
  const seleccionarDia = (dia: Date | undefined) => {
    if (dia) {
      setDate(dia);
      setValue(valueForm, dia);
    }
  }

  React.useEffect(() => {
    if (defaultValue) {
      setDate(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "text-left font-normal justify-start",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy/MM/dd") : <span>Selecciona una fecha...</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={seleccionarDia}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
