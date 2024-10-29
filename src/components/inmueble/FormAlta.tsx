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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearInmueble } from "@/api/InmuebleApi";
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
  piso: z.string().optional(),
  departamento: z.string().optional(),
  locadorId: z.number().min(1, {
    message: "El locador debe ser seleccionado.",
  }),
});

const FormAlta = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calle: "",
      altura: "",
      localidad: "",
      piso: "",
      departamento: "",
    },
  });

  const mutation = useMutation({
    mutationFn: crearInmueble,
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al crear el Inmueble"}`,
        variant: "destructive",
        description: error.message || `Error inoportuno al crear un Inmueble`,
        className:
          "from-red-600 to-red-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
    },
    onSuccess: (respuesta) => {
      toast({
        title: respuesta.message,
        description: (
          <span>
            Se ha creado{" "}
            <span className="underline underline-offset-2">
              {respuesta.inmueble.localidad} - {respuesta.inmueble.calle} -{" "}
              {respuesta.inmueble.altura}
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["inmuebles"] });
      form.reset();
      setOpen(false); //Cierra modal
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync(values);
  }
  return (
      <AlertDialog onOpenChange={setOpen} open={open}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Crear Inmueble</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Crear Inmueble</AlertDialogTitle>
            <AlertDialogDescription>
              Complete los campos para crear un nuevo Inmueble
            </AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                <FormField
                  control={form.control}
                  name="calle"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
                      <FormLabel>Altura</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingesar altura" {...field} />
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
                <FormField
                  control={form.control}
                  name="locadorId"
                  render={() => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Locador</FormLabel>
                      <FormControl className="w-full">
                        <ComboboxLocador setValue={form.setValue} />
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

export default FormAlta;
