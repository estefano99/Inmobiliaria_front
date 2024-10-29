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
          "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary":
            isActive,
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary":
            !isActive,
        },
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      )}
      onClick={redirectTo === "cerrar-sesion" ? logout : undefined}
    >
      <LinkIcon className="h-4 w-4" />
      {redirectTo !== "cerrar-sesion" && (
        <Link to={`/${redirectTo}`}>{linkTitle}</Link>
      )}
      {redirectTo === "cerrar-sesion" && <span className="hover:cursor-pointer">{linkTitle}</span>}
    </div>
  );
};

export default SidebarLink;
