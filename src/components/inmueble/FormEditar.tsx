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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InmuebleJoin, InmuebleType } from "@/types/types";
import { editarInmueble } from "@/api/InmuebleApi";
import { ComboboxLocador } from "./ComboboxLocador";

const formSchema = z.object({
  id: z.number().optional(),
  calle: z.string().min(1, {
    message: "Calle debe tener al menos 1 letra.",
  }),
  altura: z.string().optional(),
  localidad: z.string().min(1, {
    message: "Localidad debe tener al menos 1 letra.",
  }),
  torre: z.string().optional(),
  piso: z.string().optional(),
  departamento: z.string().optional(),
  locador: z.string().min(1, {
    message: "El locador debe ser seleccionado.",
  }),
  locadorId: z.number().min(1, {
    message: "El locador debe ser seleccionado.",
  }),
});

interface props {
  inmueble: InmuebleJoin;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setInmuebleEditar: Dispatch<SetStateAction<InmuebleJoin | null>>;
}

const FormEditar = ({
  inmueble,
  setIsEdit,
  isEdit,
  setInmuebleEditar,
}: props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      localidad: inmueble.localidad,
      calle: inmueble.calle,
      altura: inmueble.altura,
      torre: inmueble.torre,
      piso: inmueble.piso,
      departamento: inmueble.departamento,
      locador: `${inmueble.locador.apellido} ${inmueble.locador.nombre}`,
      locadorId: inmueble.locador.id,
    },
  });

  const mutation = useMutation({
    mutationFn: editarInmueble, //Funcion que realiza la mutacion(POST) y debemos pasarle como parametro la funcion en  carpeta api
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error al editar el Inmueble.",
        variant: "destructive",
        description: error.message || "Error inoportuno en el servidor al editar un Inmueble",
        className:
          "from-red-600 to-red-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
    },
    onSuccess: (respuesta) => {
      console.log(respuesta);
      toast({
        title: "Inmueble editado exitosamente!",
        description: (
          <span>
            Se ha editado el Inmueble{" "}
            <span className="underline underline-offset-2">
              {inmueble.localidad} | {inmueble.calle} | {inmueble.altura ? inmueble.altura : "s/altura"} | {inmueble.torre ? inmueble.torre : "s/torre"} | {inmueble.piso ? inmueble.piso : "s/piso"} | {inmueble.departamento ? inmueble.departamento : "s/departamento"} 
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["inmuebles"] }); // Invalidar la consulta "locatarios" para actualizar la lista, osea hace un get de todos nuevamente
      setTimeout(() => {
        setInmuebleEditar(null);
        setIsEdit(true);
      }, 500);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data: InmuebleType= {
      id: inmueble?.id,
      ...values
    };

    await mutation.mutateAsync(data);
  }
  return (
    <AlertDialog onOpenChange={setIsEdit} open={isEdit}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Inmueble</AlertDialogTitle>
          <AlertDialogDescription>
            Edita los campos que deseas modificar.
          </AlertDialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="localidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localidad</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingesar localidad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-5 justify-between">
                <FormField
                  control={form.control}
                  name="calle"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Calle</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingesar calle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="altura"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Altura</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingesar altura" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-5 justify-between">
                <FormField
                  control={form.control}
                  name="torre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Torre</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingesar torre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="piso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Piso</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingesar piso" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingesar departamento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="locadorId"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Locador <span className="text-red-500">*</span></FormLabel>
                    <FormControl className="w-full">
                      <ComboboxLocador 
                      setValue={form.setValue} 
                      defaultValue={`${inmueble.locador.apellido} ${inmueble.locador.nombre}`}
                      />
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
