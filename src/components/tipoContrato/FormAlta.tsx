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
import { crearTipoContrato } from "@/api/TipoContratoApi";
import { ComboboxTipoContrato } from "./ComboboxTipoContrato";

const formSchema = z.object({
  id: z.number().optional(),
  duracion: z
    .number({
      invalid_type_error: "Duracion debe ser un número.",
      required_error: "Duracion es obligatorio.",
    })
    .min(1, {
      message: "Duracion es obligatorio.",
    }),
  plazo_aumento: z
    .number({
      invalid_type_error: "Plazo aumento debe ser un número.",
      required_error: "Plazo aumento es obligatorio.",
    })
    .min(1, {
      message: "Plazo aumento es obligatorio.",
    }),
  alarma_aumento: z.preprocess(
    (val) => {
      const num = parseInt(val as string, 10);
      return isNaN(num) ? undefined : num;
    },
    z
      .number({
        required_error: "Alarma aumento es obligatorio.",
        invalid_type_error: "Alarma aumento debe ser un número.",
      })
      .min(1, {
        message: "Alarma aumento debe ser al menos 1.",
      })
  ),
});

const FormAlta = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duracion: undefined,
      plazo_aumento: undefined,
      alarma_aumento: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: crearTipoContrato,
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al crear el tipo de contrato"`,
        variant: "destructive",
        description:
          error.message || `Error inoportuno al crear tipo de contrato`,
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
              Duracion: {respuesta.tipoContrato.duracion} días -{" "}
              Plazo aumento: {respuesta.tipoContrato.plazo_aumento} meses -{" "}
              Alarma aumento: {respuesta.tipoContrato.alarma_aumento} días
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["tipoContratos"] });
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
        <Button variant="outline">Crear Tipo de contrato</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Crear Tipo de contrato</AlertDialogTitle>
          <AlertDialogDescription>
            Complete los campos para crear un nuevo Tipo de contrato
          </AlertDialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="duracion"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Duracion</FormLabel>
                    <FormControl className="w-full">
                      <ComboboxTipoContrato isDuracion={true} setValue={form.setValue} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plazo_aumento"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Plazo aumento</FormLabel>
                    <FormControl className="w-full">
                      <ComboboxTipoContrato isDuracion={false} setValue={form.setValue}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alarma_aumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alarma aumento</FormLabel>
                    <FormControl>
                      <Input placeholder="Alarma aumento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => form.reset()}>
                  Cancelar
                </AlertDialogCancel>
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
