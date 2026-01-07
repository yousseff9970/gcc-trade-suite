import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Crosshair, Wallet, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Home", path: "/dashboard" },
  { icon: Crosshair, label: "Sniper", path: "/market-sniper" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-area-bottom">
      <div className="border-t bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-around h-14 px-1 max-w-lg mx-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full py-1 rounded-lg transition-all active:scale-95",
                  active 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-all",
                  active && "bg-primary/10"
                )}>
                  <item.icon className={cn("h-5 w-5", active && "text-primary")} />
                </div>
                <span className={cn(
                  "text-[10px] mt-0.5 font-medium truncate",
                  active && "text-primary"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)] bg-background" />
    </nav>
  );
};

export default MobileBottomNav;