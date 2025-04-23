
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, ListFilter, LayoutDashboard, Calendar } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLocale } from "@/context/LocaleContext";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavItem = ({ to, label, icon, isActive }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        isActive ? "bg-secondary" : "hover:bg-secondary/50"
      )}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  </Link>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Subscriber Manager</h1>
          <p className="text-sm text-muted-foreground">Client Management System</p>
        </div>
        {/* Language selector at the top of sidebar */}
        <LanguageSelector />
        <nav className="space-y-2">
          <NavItem
            to="/"
            label={t("dashboard")}
            icon={<LayoutDashboard className="w-5 h-5" />}
            isActive={currentPath === "/"}
          />
          <NavItem
            to="/clients"
            label={t("totalClients")}
            icon={<Users className="w-5 h-5" />}
            isActive={currentPath.startsWith("/clients")}
          />
          <NavItem
            to="/subscriber-points"
            label={t("subscriberPoints")}
            icon={<Calendar className="w-5 h-5" />}
            isActive={currentPath === "/subscriber-points"}
          />
          <NavItem
            to="/tin-lookup"
            label={t("tinLookup")}
            icon={<ListFilter className="w-5 h-5" />}
            isActive={currentPath === "/tin-lookup"}
          />
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden w-full fixed top-0 z-10 bg-background border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Subscriber Manager</h1>
          {/* Optionally add LanguageSelector for mobile too, if needed */}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:p-0 pt-16 md:pt-0">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
