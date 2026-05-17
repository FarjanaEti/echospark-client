import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

type SidebarItemProps = {
  label: string;
  href: string;
  icon?: React.ElementType;
};

export function SidebarItem({
  label,
  href,
  icon: Icon,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200",
        "hover:bg-primary/10 hover:text-primary text-foreground/70"
      )}
    >
      <span className="text-muted-foreground transition-colors">
        {Icon ? <Icon size={18} /> : <Home size={18} />}
      </span>

      {label}
    </Link>
  );
}