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
import { InmuebleType } from "@/types/types";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { eliminarInmueble } from "@/api/InmuebleApi";

interface props {
  inmueble: InmuebleType
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

  const handleDelete = async (data: InmuebleType) => {
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
            <AlertDialogTitle>
              {`¿Estás seguro que deseas eliminar a ${inmueble.localidad} - ${inmueble.calle} ${inmueble.altura}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Al eliminarlo se borrara de la base de datos de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {handleDelete(inmueble)}}
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
