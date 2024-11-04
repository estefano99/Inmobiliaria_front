import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { InmuebleJoin } from "@/types/types";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { eliminarInmueble } from "@/api/InmuebleApi";

interface props {
  inmueble: InmuebleJoin
}

const Delete = ({ inmueble }: props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: eliminarInmueble,
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al eliminar el locatario`,
        variant: "destructive",
        description: error.message || "Error inoportuno al editar un locatario",
        className:
          "from-red-600 to-red-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
    },
    onSuccess: (respuesta) => {
      toast({
        title: respuesta.message,
        description: (
          <span>
            Se ha eliminado{" "}
            <span className="underline underline-offset-2">
              {inmueble.localidad} - {inmueble.calle} - {inmueble.altura}
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["inmuebles"] }); // Invalidar la consulta "inmuebles" para actualizar la lista, osea hace un get de todos nuevamente
    },
  });

  const handleDelete = async (data: InmuebleJoin) => {
    console.log(data)
    await mutation.mutateAsync(data);
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash color="red" className="hover:cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl mb-2">
              ¿Estás seguro que deseas eliminar el siguiente inmueble?
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-0.5">
              <span className="block"><span className="font-bold text-slate-400 mr-1">Localidad:</span> {`${inmueble.localidad || "Sin Localidad"}`}</span>
              <span className="block"><span className="font-bold text-slate-400 mr-1">Calle:</span> {`${inmueble.calle || "Sin Calle"}`}</span>
              <span className="block"><span className="font-bold text-slate-400 mr-1">Altura:</span> {`${inmueble.altura || "Sin Altura"}`}</span>
              <span className="block"><span className="font-bold text-slate-400 mr-1">Piso:</span> {`${inmueble.piso || "Sin Piso"}`}</span>
              <span className="block"><span className="font-bold text-slate-400 mr-1">Departamento:</span> {`${inmueble.departamento || "Sin departamento"}`}</span>
              <span className="block">
              <span className="font-bold text-slate-400 mr-1">Locador:</span> 
                {`${inmueble.locador.apellido || "Sin Apellido"} ${inmueble.locador.nombre || "Sin Nombre"}`}
              </span>
              <span className="block mt-6 text-red-300/80">Al eliminarlo se borrará de la base de datos de forma permanente.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { handleDelete(inmueble) }}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Delete;
