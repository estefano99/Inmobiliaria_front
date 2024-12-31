import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { contratoJoin } from '@/types/types'
import { Eye } from 'lucide-react'
import { Separator } from '@radix-ui/react-dropdown-menu'

export default function ContractDetailsModal({ contrato }: { contrato: contratoJoin }) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        asChild
        onClick={(e) => {e.stopPropagation()}}
      >
        <div className='flex gap-2'>
          <Eye className="w-5 h-5" />
          Ver detalles
        </div>
      </DialogTrigger>
      <DialogContent onClick={(e) => {e.stopPropagation()}} className="sm:w-4/6">
        <DialogHeader>
          <DialogTitle className='text-center text-xl'>Detalles del Contrato</DialogTitle>
        </DialogHeader>
        <Separator className='bg-muted-foreground h-0.5'/>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex flex-col gap-3 py-4">
            {/* Información del contrato */}
            <div className="flex items-center">
              <span className="font-medium w-2/4">Estado:</span>
              <span className="w-2/4 capitalize">{contrato.estado}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Fecha de inicio:</span>
              <span className="w-2/4">{formatDate(contrato.fecha_inicio)}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Fecha de fin:</span>
              <span className="w-2/4">{formatDate(contrato.fecha_fin)}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Importe:</span>
              <span className="w-2/4">${contrato.importe}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Alerta de vencimiento:</span>
              <span className="w-2/4">{contrato.alerta_vencimiento} días</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>

            {/* Información del locatario */}
            <div className="flex items-center">
              <span className="font-medium w-2/4">Nombre Locatario:</span>
              <span className="w-2/4">{contrato.locatario.nombre} {contrato.locatario.apellido}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">DNI Locatario:</span>
              <span className="w-2/4">{contrato.locatario.dni}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Teléfono Locatario:</span>
              <span className="w-2/4">{contrato.locatario.telefono}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>

            {/* Información del inmueble */}
            <div className="flex items-center">
              <span className="font-medium w-2/4">Localidad Inmueble:</span>
              <span className="w-2/4">{contrato.inmueble.localidad}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Calle:</span>
              <span className="w-2/4">{contrato.inmueble.calle}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Altura:</span>
              <span className="w-2/4">{contrato.inmueble.altura || '-'}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Piso:</span>
              <span className="w-2/4">{contrato.inmueble.piso || '-'}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Duracion (Tipo):</span>
              <span className="w-2/4">{contrato.tipo_contrato.duracion ? `${contrato.tipo_contrato.duracion } meses`  : '-'}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Plazo aumento (Tipo):</span>
              <span className="w-2/4">{contrato.tipo_contrato.plazo_aumento ? `${contrato.tipo_contrato.plazo_aumento} meses`  : '-'}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">alarma aumento(Tipo):</span>
              <span className="w-2/4">{contrato.tipo_contrato.alarma_aumento ? `${contrato.tipo_contrato.alarma_aumento} dia`  : '-'}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
