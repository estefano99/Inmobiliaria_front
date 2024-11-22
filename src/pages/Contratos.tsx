import { obtenerContratos } from '@/api/ContratoApi';
import { ContratoTable } from '@/components/contrato/ContratoTable';
import HeaderPages from '@/components/HeaderPages'
import { contratoJoin } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

const Contratos = () => {
  const { data, isLoading } = useQuery<contratoJoin[]>({
    queryKey: ["contratos"],
    queryFn: obtenerContratos,
  });
  console.log(data)
  return (
    <div className='w-full'>
      <HeaderPages title="Contrato" />
      {isLoading ? "Cargando..." : data && <ContratoTable contratos={data} />}
    </div>
  )
}

export default Contratos
