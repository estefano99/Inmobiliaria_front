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
import { LocatarioType } from "@/types/types";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarLocatario } from "@/api/LocatarioApi";
import { toast } from "@/hooks/use-toast";

interface props {
  locatario: LocatarioType;
}

const Delete = ({ locatario }: props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: eliminarLocatario,
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
              {locatario.nombre}
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
      queryClient.invalidateQueries({ queryKey: ["locatarios"] }); // Invalidar la consulta "locatarios" para actualizar la lista, osea hace un get de todos nuevamente
    },
  });

  const handleDelete = async (locatario: LocatarioType) => {
    await mutation.mutateAsync(locatario);
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
              {`¿Estás seguro que deseas eliminar a ${locatario?.nombre}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Al eliminarlo se borrara de la base de datos de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(locatario)}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Delete;
