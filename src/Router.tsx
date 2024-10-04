import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Inicio from "@/pages/Inicio";
import Locatario from "./pages/Locatario";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout/>}>
          <Route path="/" index element={<Inicio/>}/>
          <Route path="/locatario" index element={<Locatario/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;