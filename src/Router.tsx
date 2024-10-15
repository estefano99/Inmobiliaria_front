import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Inicio from "@/pages/Inicio";
import Locatario from "./pages/Locatario";
import { inicioRoute, locadorRoute, locatarioRoute } from "./lib/routes";
import Locador from "./pages/Locador";
import PublicLayout from "./layouts/PublicLayout";
import { Login } from "./pages/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout/>}>
          <Route index path={inicioRoute} element={<Inicio/>}/>
          <Route path={locatarioRoute} element={<Locatario/>}/>
          <Route path={locadorRoute} element={<Locador/>}/>
        </Route>
        <Route element={<PublicLayout/>}>
          <Route index path="/" element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;