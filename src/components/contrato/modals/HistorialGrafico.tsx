import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { contratoJoin, historialContratos } from '@/types/types'
import { ChartNoAxesCombined } from 'lucide-react'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { obtenerHistorial } from '@/api/HistorialContratoApi'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HistorialGrafico({ contrato }: { contrato: contratoJoin }) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: historial, isLoading } = useQuery<historialContratos[]>({
    queryKey: ["historialGraficos", contrato?.id],
    queryFn: () => obtenerHistorial(contrato?.id ? contrato.id : 0),
    enabled: !!contrato?.id,
  });

  const mappedHistorial = historial?.map((h) => ({
    fecha: h.fecha_actualizacion,
    importe: h.importe_actualizado,
  })) || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        onClick={(e) => { e.stopPropagation() }}
      >
        <div className='flex gap-2'>
          <ChartNoAxesCombined className="w-5 h-5" />
          Ver historial
        </div>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()} className="sm:w-4/6 w-full">
        <DialogHeader>
          <DialogTitle className='text-center text-xl'>Historial del contrato</DialogTitle>
        </DialogHeader>
        <Separator className='bg-muted-foreground h-0.5' />
        <div>
          <p className='text-slate-400'>Duración: <span className='dark:text-white text-black'>{String(contrato.fecha_inicio)} / {String(contrato.fecha_fin)}</span></p>
          <p className='text-slate-400'>Locatario: <span className='dark:text-white text-black'>{contrato.locatario.nombre} {contrato.locatario.apellido}</span></p>
          <p className='text-slate-400'>Dirección: <span className='dark:text-white text-black'>{contrato.inmueble.localidad} {contrato.inmueble?.calle} {contrato.inmueble?.altura}</span></p>
        </div>
        <div className="flex flex-col gap-3 py-4">
          {isLoading ? (
            <p>Cargando...</p>
          ) : mappedHistorial.length === 0 ? (
            <p className='mx-auto dark:text-yellow-200 text-yellow-500'>No existe historial aún.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={mappedHistorial}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="importe" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
