import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type LinkProps = {
  redirectTo: string;
  linkTitle: string;
  linkIcon: LucideIcon;
};

const SidebarLink = ({
  redirectTo,
  linkTitle,
  linkIcon: LinkIcon,
}: LinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    navigate("/");
  };

  const isActive = location.pathname === `/${redirectTo}`;

  return (
    <div
      className={clsx(
        {
          "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer":
            isActive,
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer":
            !isActive,
          "mx-3 flex justify-center items-center gap-3 bg-red-300 rounded-lg px-3 py-2 text-black transition-all hover:text-black hover:bg-red-400 cursor-pointer": redirectTo === "cerrar-sesion" && !isActive,
        },
        "flex items-center gap-3 rounded-lg px-3 py-2 text-lg transition-all"
      )}
      onClick={redirectTo === "cerrar-sesion" ? logout : undefined}
    >
      <LinkIcon className={clsx(
        {"text-black": redirectTo === "cerrar-sesion"}
      )} />
      {redirectTo !== "cerrar-sesion" && (
        <Link className="w-full" to={`/${redirectTo}`}>{linkTitle}</Link>
      )}
      {redirectTo === "cerrar-sesion" && <span className="hover:cursor-pointer text-black">{linkTitle}</span>}
    </div>
  );
};

export default SidebarLink;
