import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Settings,
  LogOut,
  FolderPlus,
  BarChart3,
  Home,
  Bell,
  HelpCircle,
  Crosshair,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useAuth } from "@/contexts/AuthContext";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const runCommand = useCallback((command: () => void) => {
    onOpenChange(false);
    command();
  }, [onOpenChange]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/dashboard"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Go to Dashboard</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/projects"))}>
            <FolderPlus className="mr-2 h-4 w-4" />
            <span>Go to Projects</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/dashboard/analytics"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Go to Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/market-sniper"))}>
            <Crosshair className="mr-2 h-4 w-4" />
            <span>Go to Market Sniper</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/gem-finder"))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Go to Gem Finder</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/notifications"))}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Go to Notifications</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/dashboard/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Go to Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/help"))}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Go to Help & Support</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => navigate("/projects"))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Create New Project</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/gem-finder"))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Find Gems</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem onSelect={() => runCommand(handleLogout)} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <CommandShortcut>⌘Q</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
