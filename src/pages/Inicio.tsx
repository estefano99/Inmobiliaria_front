import HeaderPages from "@/components/HeaderPages"
import CardCantidades from "@/components/inicio/CardCantidades"
import { GraficoBarras } from "@/components/inicio/GraficoBarras"

const Inicio = () => {

  return (
    <div className="w-full min-h-screen">
      <HeaderPages title="Inicio" />
      <div className="w-full px-8">
        <CardCantidades />
        <GraficoBarras />
      </div>
    </div>
  )
}

export default Inicio
