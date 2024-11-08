import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InmuebleJoin } from '@/types/types'
import { Eye } from 'lucide-react'
import { Separator } from '@radix-ui/react-dropdown-menu'

export default function DetailsModal({ inmueble }: { inmueble: InmuebleJoin }) {
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
      <DialogContent className="sm:w-4/6">
        <DialogHeader>
          <DialogTitle className='text-center text-xl'>Detalles del inmueble</DialogTitle>
        </DialogHeader>
        <Separator className='bg-muted-foreground h-0.5'/>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex flex-col gap-3 py-4">
            <div className="flex items-center">
              <span className="font-medium w-2/4">Localidad:</span>
              <span className="w-2/4">{inmueble.localidad}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Calle:</span>
              <span className="w-2/4">{inmueble.calle}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Altura:</span>
              <span className="w-2/4">{inmueble.altura ? inmueble.altura : "-"}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Torre:</span>
              <span className="w-2/4">{inmueble.torre ? inmueble.torre : "-"}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Piso:</span>
              <span className="w-2/4">{inmueble.piso ? inmueble.piso : "-"}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Departamento:</span>
              <span className="w-2/4">{inmueble.departamento ? inmueble.departamento : "-"}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Apellido Locador:</span>
              <span className="w-2/4">{inmueble.locador.apellido}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Nombre Locador:</span>
              <span className="w-2/4">{inmueble.locador.nombre}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">DNI Locador:</span>
              <span className="w-2/4">{inmueble.locador.dni}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Telefono Locador:</span>
              <span className="w-2/4">{inmueble.locador.telefono}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Fecha de creacion:</span>
              <span className="w-2/4">{inmueble.createdAt ? formatDate(inmueble.createdAt) : 'N/A'}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
            <div className="flex items-center">
              <span className="font-medium w-2/4">Fecha de actualizacion:</span>
              <span className="w-2/4">{inmueble.updatedAt ? formatDate(inmueble.updatedAt) : 'N/A'}</span>
            </div>
            <Separator className="h-[1px] bg-muted"/>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}