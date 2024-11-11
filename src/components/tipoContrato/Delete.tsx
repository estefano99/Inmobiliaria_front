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
import { TipoContratoType } from "@/types/types";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { eliminarTipoContrato } from "@/api/TipoContratoApi";

interface props {
  tipoContrato: TipoContratoType
}

const Delete = ({ tipoContrato }: props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: eliminarTipoContrato,
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al eliminar el tipo contrato`,
        variant: "destructive",
        description: error.message || "Error inoportuno al eliminar tipo contrato",
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
              {tipoContrato.duracion / 365} Años - {tipoContrato.plazo_aumento} Meses - {tipoContrato.plazo_aumento} Días
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["tipoContratos"] }); // Invalidar la consulta "inmuebles" para actualizar la lista, osea hace un get de todos nuevamente
    },
  });

  const handleDelete = async (data: TipoContratoType) => {
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
              {`¿Estás seguro que deseas eliminar a Duracion: ${tipoContrato.duracion / 365} Años - Plazo aumento: ${tipoContrato.plazo_aumento} Meses - alarma Venc.: ${tipoContrato.alarma_aumento} Días?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Al eliminarlo se borrara de la base de datos de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {handleDelete(tipoContrato)}}
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
