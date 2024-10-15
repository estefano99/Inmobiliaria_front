import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { editarLocatario } from "@/api/LocatarioApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LocadorType, LocatarioType } from "@/types/types";
import { editarLocador } from "@/api/LocadorApi";

const formSchema = z.object({
  nombre: z.string().min(1, {
    message: "Nombre debe tener al menos 1 letra.",
  }),
  apellido: z.string().min(1, {
    message: "apellido debe tener al menos 1 letra.",
  }),
  dni: z.string().min(1, {
    message: "dni debe tener al menos 1 numero.",
  }),
  telefono: z.string().min(1, {
    message: "telefono debe tener al menos 1 numero.",
  }),
});

interface props {
  locatario: LocatarioType | null;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setLocatarioEditar: Dispatch<SetStateAction<LocatarioType | null>>;
  locador: LocadorType | null;
  setLocadorEditar: Dispatch<SetStateAction<LocatarioType | null>>;
}

const FormEditar = ({
  locatario,
  setIsEdit,
  isEdit,
  setLocatarioEditar,
  locador,
  setLocadorEditar,
}: props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: locatario ? locatario.nombre : locador?.nombre,
      apellido: locatario ? locatario.apellido : locador?.apellido,
      dni: locatario ? locatario.dni : locador?.dni,
      telefono: locatario ? locatario.telefono : locador?.telefono,
    },
  });

  const mutation = useMutation({
    mutationFn: locatario ? editarLocatario : editarLocador, //Funcion que realiza la mutacion(POST) y debemos pasarle como parametro la funcion en  carpeta api
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al editar el ${locatario ? 'locatario' : 'locador'}`,
        variant: "destructive",
        description: error.message || `Error inoportuno al editar un ${locatario ? 'locatario' : 'locador'}`,
        className:
          "from-red-600 to-red-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
    },
    onSuccess: (respuesta) => {
      toast({
        title: respuesta.message,
        description: (
          <span>
            Se ha editado{" "}
            <span className="underline underline-offset-2">
              {locatario ? respuesta.locatario.nombre : respuesta.locador.nombre}
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
      const invalidarQuery = locador ? "locadores" : "locatarios"
      queryClient.invalidateQueries({ queryKey: [invalidarQuery] }); // Invalidar la consulta "locatarios" para actualizar la lista, osea hace un get de todos nuevamente
      setTimeout(() => {
        setLocatarioEditar(null);
        setLocadorEditar(null);
        setIsEdit(true);
      }, 500);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //Junto el id con los values del form
    let data: LocatarioType;
    if (locatario) {
      data = {
        id: locatario.id,
        nombre: values.nombre,
        apellido: values.apellido,
        dni: values.dni,
        telefono: values.telefono,
      };
    } else {
      data = {
        id: locador?.id,
        nombre: values.nombre,
        apellido: values.apellido,
        dni: values.dni,
        telefono: values.telefono,
      };
    }
    await mutation.mutateAsync(data);
  }
  return (
    <AlertDialog onOpenChange={setIsEdit} open={isEdit}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`${locatario ? "Editar Locatario" : "Editar Locador"}`}</AlertDialogTitle>
          <AlertDialogDescription>
            Edita los campos que deseas modificar.
          </AlertDialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingesar nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingesar apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DNI</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingesar dni" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingesar teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Cargando..." : "Guardar"}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FormEditar;
