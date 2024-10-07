import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Inicio from "@/pages/Inicio";
import Locatario from "./pages/Locatario";
import { inicioRoute, locatarioRoute } from "./lib/routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout/>}>
          <Route index path={inicioRoute} element={<Inicio/>}/>
          <Route path={locatarioRoute} element={<Locatario/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;