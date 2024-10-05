import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Inicio from "@/pages/Inicio";
import Locatario from "./pages/Locatario";
import { inicio, locatario } from "./lib/routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout/>}>
          <Route index path={inicio} element={<Inicio/>}/>
          <Route path={locatario} element={<Locatario/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;