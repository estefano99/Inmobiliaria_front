import HeaderPages from "@/components/HeaderPages"
import { LocLotTable } from "@/components/locadorLocatario/LocLotTable"


const Locatario = () => {
  return (
    <div className="w-full">
        <HeaderPages title="Locatario" />
        <LocLotTable/>
    </div>
  )
}

export default Locatario
