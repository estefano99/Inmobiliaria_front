import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { FilePlus2 } from "lucide-react";

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
        invalid_type_error: "Alarma aumento debe ser un número.",
        required_error: "Alarma aumento es obligatorio.",
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
      toast({
        title: `Error al crear el tipo de contrato`,
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
              Duracion: {respuesta.tipoContrato.duracion} días - Plazo aumento:{" "}
              {respuesta.tipoContrato.plazo_aumento} meses - Alarma aumento:{" "}
              {respuesta.tipoContrato.alarma_aumento} días
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
      <AlertDialogTrigger asChild className="h-8.5 2xl:h-10">
        <Button className="flex gap-2 text-xs 2xl:text-sm" variant="secondary">
          <FilePlus2 className="h-4 w-4 2xl:h-5 2xl:w-5" />
          Crear Tipo de contrato
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-full md:h-auto w-full sm:w-2/5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold mb-2">Crear Tipo de contrato</AlertDialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="duracion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duración del contrato <i className="text-xs text-gray-400">(en meses)</i></FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Duración contrato" {...field} className="w-[200px]" />
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
                    <FormLabel>Plazo de aumento</FormLabel>
                    <FormDescription>El plazo de aumento indica la frecuencia con la que se ajustará el valor del alquiler mensual.</FormDescription>
                    <FormControl className="w-full">
                      <ComboboxTipoContrato
                        isDuracion={false}
                        setValue={form.setValue}
                        initialValue={undefined}
                        isEdit={false}
                      />
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
                    <FormLabel>Alarma de aumento <i className="text-xs text-gray-400">(en dias)</i></FormLabel>
                    <FormDescription>
                      La alarma de aumento establece cuántos días antes se notificará al administrador que
                      se aproxima un ajuste en el alquiler. Por ejemplo, si configuras "15", recibirás
                      una alerta 15 días antes del próximo aumento.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" placeholder="Alarma aumento" {...field} className="w-[200px]" />
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
