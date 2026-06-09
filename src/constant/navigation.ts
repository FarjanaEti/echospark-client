import {
  UserCircle,
  Settings,
  LayoutDashboard,
  PlusCircle,
  Users,
  ClipboardList,
  Lightbulb,
  MessageSquare,
  Star,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: any;
};

export type RoleNavigation = {
  [key: string]: NavItem[];
};

export const ROLE_NAVIGATION: RoleNavigation = {
  MEMBER: [
    { label: "Dashboard", href: "/dashboard/member", icon: LayoutDashboard },
    { label: "My Profile", href: "/dashboard/profile", icon: UserCircle },
    { label: "My Ideas", href: "/dashboard/ideas", icon: Lightbulb },
    { label: "Submit Idea", href: "/dashboard/ideas/new", icon: PlusCircle },
    { label: "My Comments", href: "/dashboard/comments", icon: MessageSquare },
    { label: "My Reviews", href: "/dashboard/reviews", icon: Star },
    { label: "Settings", href: "/dashboard/member/settings", icon: Settings },
  ],
  ADMIN: [
    { label: "Manage Users", href: "/admin-dashboard/users", icon: Users },
    { label: "Manage Ideas", href: "/admin-dashboard/ideas", icon: Lightbulb },
    { label: "Manage Categories", href: "/admin-dashboard/category", icon: ClipboardList },
    { label: "Add Categories", href: "/admin-dashboard/add-category", icon: ClipboardList },
    { label: "Manage Comments", href: "/admin-dashboard/comments", icon: MessageSquare },
    { label: "Manage Reviews", href: "/admin-dashboard/review", icon: Star },
    { label: "Moderation", href: "/dashboard/admin/moderation", icon: ShieldCheck },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
};

export const COMMON_NAV_ITEMS = [
  { label: "Help", href: "/help", icon: HelpCircle },
];