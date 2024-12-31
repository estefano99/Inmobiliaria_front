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
  AlertDialogContentSmall,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { historialFiltrados } from "@/types/types";
import { ArrowBigRight, ReceiptText } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { actualizarImporte } from "@/api/HistorialContratoApi";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";

interface props {
  contratoConHistorial: historialFiltrados | null;
  openConfirmar: boolean;
  setOpenConfirmar: Dispatch<SetStateAction<boolean>>;
}

interface ConfirmarActualizacionProps {
  contratoConHistorial: historialFiltrados | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  nuevo_importe: number;
}

const formSchema = z.object({
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
});


const ModalActualizarImporte = ({ contratoConHistorial, openConfirmar, setOpenConfirmar }: props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      importe: 0,
    },
  });
  const mutation = useMutation({
    mutationFn: actualizarImporte,
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error al actualizar el importe`,
        variant: "destructive",
        description:
          error.message || "Error inoportuno actualizar el importe",
        className:
          "from-red-600 to-red-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });
    },
    onSuccess: (respuesta) => {
      toast({
        title: "Contrato actualizado exitosamente!",
        description: (
          <span>
            Se ha actualizado el importe: {" "}
            <span className="underline underline-offset-2">
              {respuesta.importe_actualizado}
            </span>
          </span>
        ),
        className:
          "from-green-600 to-green-800 bg-gradient-to-tr bg-opacity-80 backdrop-blur-sm",
      });

      queryClient.invalidateQueries({ queryKey: ["historialContratos"] });
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
      setOpenConfirmar(false);
    },
  });

  const ConfirmarActualizacion = ({ contratoConHistorial, open, setOpen, nuevo_importe }: ConfirmarActualizacionProps) => {
    return (
      <AlertDialog onOpenChange={setOpen} open={open}>
        <AlertDialogTrigger asChild>
          <Button className="flex gap-2 text-xs 2xl:text-sm" variant="default">
            Confirmar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContentSmall className="w-1/2">
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-2"><span className="text-2xl font-bold">Confirmar actualización</span></AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="pb-4">
            ¿Está seguro que desea actualizar el importe del contrato?
          </AlertDialogDescription>
          <AlertDialogDescription className="pb-4">
            <span className="text-lg flex justify-between items-center">
              <span className="max-w-36">Importe actual: <span className="text-white">${contratoConHistorial?.importe}</span></span>
              <ArrowBigRight className="h-8 w-8" />
              <span className="max-w-44">Importe actualizado: <span className="text-white">${nuevo_importe}</span></span>
            </span>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={mutation.isPending}>
              {mutation.isPending ? "Cargando..." : "Guardar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContentSmall>
      </AlertDialog>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data_a_actualizar = {
      id_historial: contratoConHistorial?.historial.id,
      id_contrato: contratoConHistorial?.historial.id_contrato,
      importe_actualizado: values.importe,
      plazo_aumento: contratoConHistorial?.tipo_contrato.plazo_aumento,
    };

    await mutation.mutateAsync(data_a_actualizar);
  }
  return (
    <AlertDialog onOpenChange={setOpenConfirmar} open={openConfirmar}>
      <AlertDialogTrigger asChild className="h-8.5 2xl:h-10">
        <Button className="flex gap-2 text-xs 2xl:text-sm" variant="secondary">
          <ReceiptText className="h-4 w-4 2xl:h-5 2xl:w-5" />
          Actualizar importe
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full md:w-2/5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Actualizar importe
          </AlertDialogTitle>
          <AlertDialogDescription>
            Complete los campos para actualizar el importe y guardarlo en el historial
          </AlertDialogDescription>
        </AlertDialogHeader>

        <p className="text-normal">Datos del contrato</p>
        <div className="space-y-3 border-2 rounded-lg p-2">
          <p className="text-slate-400">Importe actual: <span className="text-white">${contratoConHistorial?.importe}</span></p>
          <p className="text-slate-400">Fecha actualizacion: <span className="text-white">{String(contratoConHistorial?.historial.fecha_actualizacion)}</span></p>
          <p className="text-slate-400">Duracion del contrato: <span className="text-white">{String(contratoConHistorial?.fecha_inicio) + " - " + String(contratoConHistorial?.fecha_fin)}</span></p>
          <p className="text-slate-400">Localidad: <span className="text-white">{contratoConHistorial?.inmueble.localidad}</span></p>
          <p className="text-slate-400">Calle: <span className="text-white">{contratoConHistorial?.inmueble.calle}</span></p>
          <p className="text-slate-400">Altura: <span className="text-white">{contratoConHistorial?.inmueble.altura}</span></p>
          <p className="text-slate-400">Departamento: <span className="text-white">{contratoConHistorial?.inmueble.departamento ? contratoConHistorial?.inmueble.departamento : " - "}</span></p>
          <p className="text-slate-400">Locador: <span className="text-white">{`${contratoConHistorial?.locatario.nombre} ${contratoConHistorial?.locatario.apellido}`}</span></p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pt-4 w-full"
          >
            <FormField
              control={form.control}
              name="importe"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>
                    Importe nuevo<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ingresar importe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel onClick={() => form.reset()}>
                Cancelar
              </AlertDialogCancel>
              <ConfirmarActualizacion
                open={open}
                setOpen={setOpen}
                contratoConHistorial={contratoConHistorial}
                nuevo_importe={form.getValues().importe}
              />

            </AlertDialogFooter>
          </form>
        </Form>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalActualizarImporte;