import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import { Button } from "../ui/button";

const Sidebar = () => {
  return (
    <div className="h-14 md:h-full md:border-r md:bg-muted/40 md:block">
      <div className="hidden md:flex h-full w-[300px] flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Inmobiliaria</span>
          </Link>
        </div>
        <div className="flex-1">
          <SidebarNav
            links={[
              { title: "Inicio", icon: Home },
              { title: "Locador", icon: ShoppingCart },
              { title: "Locatario", icon: Package },
              { title: "Inmuebles", icon: LineChart },
              { title: "Contratos", icon: Users },
            ]}
          />
        </div>
      </div>
      {/* Menu hamburguesa para mobile */}
      <div className="flex flex-col md:hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SidebarNav
                links={[
                  { title: "Inicio", icon: Home },
                  { title: "Locador", icon: ShoppingCart },
                  { title: "Locatario", icon: Package },
                  { title: "Inmuebles", icon: LineChart },
                  { title: "Contratos", icon: Users },
                ]}
              />
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;
