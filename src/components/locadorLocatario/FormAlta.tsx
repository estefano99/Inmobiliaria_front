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
import { crearLocatario } from "@/api/LocatarioApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearLocador } from "@/api/LocadorApi";

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
  isLocatario: boolean;
}

const FormAlta = ({ isLocatario }: props) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
    },
  });

  const mutation = useMutation({
    mutationFn: isLocatario ? crearLocatario : crearLocador,
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al crear el ${isLocatario ? "locatario" : "locador"}`,
        variant: "destructive",
        description:
          error.message ||
          `Error inoportuno al crear un ${
            isLocatario ? "locatario" : "locador"
          }`,
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
              {isLocatario
                ? respuesta.locatario.nombre
                : respuesta.locador.nombre}
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
      const invalidarQuery = isLocatario ? "locatarios" : "locadores";
      queryClient.invalidateQueries({ queryKey: [invalidarQuery] });
      form.reset();
      setOpen(false); //Cierra modal
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync(values); //Esto seria como cuando haciamos con context const respuesta = await crearLocatario(values), esta funcion llama a useMutation declarado arriba
  }
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          {isLocatario ? "Crear Locatario" : "Crear Locador"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isLocatario ? "Crear Locatario" : "Crear Locador"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isLocatario
              ? "Completa los campos para crear un nuevo Locatario."
              : "Completa los campos para crear un nuevo Locador."}
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

export default FormAlta;
