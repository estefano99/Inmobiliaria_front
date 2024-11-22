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
import { contrato, contratoJoin, Estado } from "@/types/types";
import { editarContrato } from "@/api/ContratoApi";
import { ComboboxEstados } from "./combobox/ComboboxEstado";
import { Calendario } from "./Calendario";
import { ComboboxInmueble } from "./combobox/ComboboxInmueble";
import { ComboboxLocatarios } from "./combobox/ComboboxLocatario";

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
  fecha_inicio: z.preprocess(
    (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : val),
    z.date({
      required_error: "Debe seleccionar una fecha.",
      invalid_type_error: "Fecha incorrecta",
    })
  ),
  fecha_fin: z.preprocess(
    (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : val),
    z.date({
      required_error: "Debe seleccionar una fecha.",
      invalid_type_error: "Fecha incorrecta",
    })
  ),
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

interface props {
  contrato: contratoJoin;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setContratoEditar: Dispatch<SetStateAction<contratoJoin | null>>;
}

const FormEditar = ({
  contrato,
  setIsEdit,
  isEdit,
  setContratoEditar,
}: props) => {
  console.log(contrato)
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_locatario: contrato.locatario.id,
      id_inmueble: contrato.inmueble.id,
      importe: contrato.importe,
      fecha_inicio: contrato.fecha_inicio,
      fecha_fin: contrato.fecha_fin,
      estado: contrato.estado,
      alerta_vencimiento: contrato.alerta_vencimiento,
    },
  });

  const mutation = useMutation({
    mutationFn: editarContrato,
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error al editar el Contrato.",
        variant: "destructive",
        description:
          error.message ||
          "Error inoportuno en el servidor al editar un Contrato",
        className:
          "from-red-600 to-red-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
    },
    onSuccess: (respuesta) => {
      console.log(respuesta);
      toast({
        title: "Contrato editado exitosamente!",
        description: (
          <span>
            Se ha editado el Contrato{" "}
            <span className="underline underline-offset-2">
              {String(respuesta.contrato.fecha_inicio)} - {String(respuesta.contrato.fecha_fin)} |{" "}
              {respuesta.contrato.inmueble.localidad} - {respuesta.contrato.inmueble.calle} - {respuesta.contrato.inmueble.altura}
            </span>
            .
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["contratos"] }); // Invalidar la consulta "locatarios" para actualizar la lista, osea hace un get de todos nuevamente
      setTimeout(() => {
        setContratoEditar(null);
        setIsEdit(true);
      }, 500);
    },
  });
  console.log(form.getValues())
  // console.log(form.formState.errors);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const data: contrato = {
      id: contrato?.id,
      ...values,
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
                      <ComboboxLocatarios
                        setValue={form.setValue}
                        defaultValue={`${contrato.locatario.nombre} ${contrato.locatario.apellido}`}
                      />
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
                        <ComboboxInmueble
                          setValue={form.setValue}
                          defaultValue={`${contrato.inmueble.localidad} ${contrato.inmueble.calle} ${contrato.inmueble.altura}`}
                        />
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
                      <FormLabel>
                        Fecha inicio <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Calendario
                          valueForm="fecha_inicio"
                          setValue={form.setValue}
                          defaultValue={contrato.fecha_inicio}
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
                      <FormLabel>
                        Fecha fin <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Calendario
                          valueForm="fecha_fin"
                          setValue={form.setValue}
                          defaultValue={contrato.fecha_fin}
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
                          <ComboboxEstados
                            setValue={form.setValue}
                            defaultValue={contrato.estado}
                          />
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
                      <FormLabel>
                        Alarma aumento <span className="text-red-500">*</span>
                      </FormLabel>
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

export default FormEditar;
