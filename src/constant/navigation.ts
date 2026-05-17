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
    { label: "My Profile", href: "/dashboard/member/profile", icon: UserCircle },
    { label: "My Ideas", href: "/dashboard/member/ideas", icon: Lightbulb },
    { label: "Submit Idea", href: "/dashboard/member/ideas/new", icon: PlusCircle },
    { label: "My Comments", href: "/dashboard/member/comments", icon: MessageSquare },
    { label: "My Reviews", href: "/dashboard/member/reviews", icon: Star },
    { label: "Settings", href: "/dashboard/member/settings", icon: Settings },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Manage Ideas", href: "/dashboard/admin/ideas", icon: Lightbulb },
    { label: "Manage Categories", href: "/dashboard/admin/categories", icon: ClipboardList },
    { label: "Manage Comments", href: "/dashboard/admin/comments", icon: MessageSquare },
    { label: "Manage Reviews", href: "/dashboard/admin/reviews", icon: Star },
    { label: "Moderation", href: "/dashboard/admin/moderation", icon: ShieldCheck },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
};

export const COMMON_NAV_ITEMS = [
  { label: "Help", href: "/help", icon: HelpCircle },
];