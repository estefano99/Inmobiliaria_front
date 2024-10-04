import Sidebar from "@/components/sidebar/Sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <main className="flex w-full min-h-screen">
      <Sidebar/>
      <Outlet/>
    </main>
  )
}

export default AdminLayout
