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
// import { ComboboxLocador } from "./ComboboxLocador";
import { ReceiptText } from "lucide-react";
import { Estado } from "@/types/types";
import { crearContrato } from "@/api/ContratoApi";
import { ComboboxInmueble } from "./combobox/ComboboxInmueble";
import { ComboboxLocatarios } from "./combobox/ComboboxLocatario";
import { ComboboxEstados } from "./combobox/ComboboxEstado";
import { Calendario } from "./Calendario";

const formSchema = z.object({
  id: z.number().optional(),
  id_locatario: z
    .number({
      required_error: "Debe seleccionar un locatario.",
      invalid_type_error: "locatario incorrecto",
    })
    .min(1, {
      message: "El locatario debe ser seleccionado.",
    }),
  id_inmueble: z
    .number({
      required_error: "Debe seleccionar un inmueble.",
      invalid_type_error: "Inmueble incorrecto",
    })
    .min(1, {
      message: "El inmueble debe ser seleccionado.",
    }),
  importe: z.preprocess(
    (val) => {
      const num = parseInt(val as string, 10);
      return isNaN(num) ? undefined : num;
    },
    z
      .number({
        required_error: "Importe es obligatorio.",
        invalid_type_error: "Importe debe ser un número.",
      })
      .min(1, {
        message: "Importe debe ser mayor a 0.",
      })
  ),
  fecha_inicio: z.date({
    required_error: "Debe seleccionar una fecha.",
    invalid_type_error: "Fecha incorrecta",
  }),
  fecha_fin: z.date({
    required_error: "Debe seleccionar una fecha.",
    invalid_type_error: "Fecha incorrecta",
  }),
  estado: z.nativeEnum(Estado, {
    required_error: "Estado debe ser seleccionado",
    invalid_type_error: "Estado no válido",
  }),
  alerta_vencimiento: z.preprocess(
    (val) => {
      const num = parseInt(val as string, 10);
      return isNaN(num) ? undefined : num;
    },
    z
      .number({
        required_error: "Alarma vencimiento es obligatorio.",
        invalid_type_error: "Alarma vencimiento debe ser un número.",
      })
      .min(1, {
        message: "Alarma vencimiento debe ser mayor a 0.",
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
      id_locatario: undefined,
      id_inmueble: undefined,
      importe: undefined,
      fecha_inicio: undefined,
      fecha_fin: undefined,
      estado: undefined,
      alerta_vencimiento: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: crearContrato,
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al crear el Contrato"`,
        variant: "destructive",
        description: error.message || `Error inoportuno al crear un Contrato`,
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
              {respuesta.contrato.fecha_inicio} - {respuesta.contrato.fecha_fin}
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["contratos"] });
      form.reset();
      setOpen(false); //Cierra modal
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await mutation.mutateAsync(values);
  }
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <ReceiptText />
          Crear contrato
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Crear Contrato</AlertDialogTitle>
          <AlertDialogDescription>
            Complete los campos para crear un nuevo Contrato
          </AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-full"
            >
              <FormField
                control={form.control}
                name="id_locatario"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Locatario <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="w-full">
                      <ComboboxLocatarios setValue={form.setValue} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap gap-5">
                <FormField
                  control={form.control}
                  name="id_inmueble"
                  render={() => (
                    <FormItem className="flex-grow min-w-[200px]">
                      <FormLabel>
                        Inmueble <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl className="w-full">
                        <ComboboxInmueble setValue={form.setValue} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="importe"
                  render={({ field }) => (
                    <FormItem className="flex-grow min-w-[200px]">
                      <FormLabel>
                        Importe <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresar importe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-wrap gap-5">
                <FormField
                  control={form.control}
                  name="fecha_inicio"
                  render={() => (
                    <FormItem className="flex flex-col flex-grow min-w-[200px]">
                      <FormLabel>Fecha inicio <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Calendario
                          valueForm="fecha_inicio"
                          setValue={form.setValue}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fecha_fin"
                  render={() => (
                    <FormItem className="flex flex-col flex-grow min-w-[200px]">
                      <FormLabel>Fecha fin <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Calendario
                          valueForm="fecha_fin"
                          setValue={form.setValue}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-wrap gap-5">
                  <FormField
                    control={form.control}
                    name="estado"
                    render={() => (
                      <FormItem className="flex-grow min-w-[200px]">
                        <FormLabel>
                          Estado <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <ComboboxEstados setValue={form.setValue} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="alerta_vencimiento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alarma aumento <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Alerta vencimiento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
