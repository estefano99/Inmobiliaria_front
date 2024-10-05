import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type LinkProps = {
  redirectTo: string;
  linkTitle: string;
  linkIcon: LucideIcon
};

const SidebarLink = ({ redirectTo, linkTitle, linkIcon: LinkIcon }: LinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === `/${redirectTo}`;

  return (
    <Link
      className={clsx(
        {
          'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary': isActive,
          'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary': !isActive,
        },
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
      )}
      to={`/${redirectTo}`}
    >
       <LinkIcon className="h-4 w-4" />
        {linkTitle}
    </Link>
  );
};

export default SidebarLink