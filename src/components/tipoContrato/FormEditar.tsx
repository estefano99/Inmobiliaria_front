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
import { TipoContratoType } from "@/types/types";
import { ComboboxTipoContrato } from "./ComboboxTipoContrato";
import { editarTipoContrato } from "@/api/TipoContratoApi";

const formSchema = z.object({
  id: z.number().optional(),
  duracion: z.preprocess(
    (val) => {
      const num = parseInt(val as string, 10);
      return isNaN(num) ? undefined : num;
    },
    z
      .number({
        required_error: "Duracion es obligatorio.",
        invalid_type_error: "Duracion debe ser un número.",
      })
      .min(1, {
        message: "Duracion debe ser al menos 1.",
      })
  ),
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

interface props {
  tipoContrato: TipoContratoType;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setTipoContratoEditar: Dispatch<SetStateAction<TipoContratoType | null>>;
}

const FormEditar = ({
  tipoContrato,
  setIsEdit,
  isEdit,
  setTipoContratoEditar,
}: props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: tipoContrato.id,
      duracion: tipoContrato.duracion,
      plazo_aumento: tipoContrato.plazo_aumento,
      alarma_aumento: tipoContrato.alarma_aumento,
    },
  });

  const mutation = useMutation({
    mutationFn: editarTipoContrato,
    onError: (error) => {
      toast({
        title: "Error al editar el tipo de contrato",
        variant: "destructive",
        description:
          error.message || "Error inoportuno al editar tipo de contrato",
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
              Duracion: {respuesta.tipoContrato.duracion} meses - Plazo aumento:{" "}
              {respuesta.tipoContrato.plazo_aumento} meses - Alarma aumento:{" "}
              {respuesta.tipoContrato.alarma_aumento} días
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["tipoContratos"] });
      setTimeout(() => {
        setTipoContratoEditar(null);
        setIsEdit(true);
      }, 500);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync(values);
  }

  return (
    <AlertDialog onOpenChange={setIsEdit} open={isEdit}>
      <AlertDialogContent className="h-full md:h-auto w-full items-center">
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Tipo de contrato</AlertDialogTitle>
          <AlertDialogDescription>
            Edita los campos que deseas modificar.
          </AlertDialogDescription>
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
                    <FormLabel>Plazo aumento</FormLabel>
                    <FormControl className="w-full">
                      <ComboboxTipoContrato
                        isDuracion={false}
                        setValue={form.setValue}
                        initialValue={tipoContrato.plazo_aumento}
                        isEdit={isEdit}
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
                    <FormLabel>Alarma aumento</FormLabel>
                    <FormControl>
                      <Input placeholder="Alarma aumento" {...field} />
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
