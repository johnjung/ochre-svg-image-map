"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, systemTheme, setTheme } = useTheme();

  function handleTheme() {
    if (systemTheme === "dark") {
      if (theme === "system") {
        setTheme("light");
      } else if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("system");
      }
    } else {
      if (theme === "system") {
        setTheme("dark");
      } else if (theme === "dark") {
        setTheme("light");
      } else {
        setTheme("system");
      }
    }
  }

  return (
    <TooltipProvider disableHoverableContent={true}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          onClick={handleTheme}
          className="grid h-9 w-9 items-center justify-center rounded-sm bg-gradient-to-b from-white to-neutral-200 text-black shadow-sm hover-sm active-sm active:rounded-sm dark:from-neutral-700 dark:to-neutral-800 dark:text-white"
        >
          {systemTheme === "dark" ?
            theme === "system" ?
              <SunIcon className="h-[22px] w-auto" strokeWidth={2.25} />
            : theme === "light" ?
              <MoonIcon className="h-[22px] w-auto" strokeWidth={2.25} />
            : <MonitorIcon className="h-[22px] w-auto" strokeWidth={2.25} />
          : theme === "system" ?
            <MoonIcon className="h-[22px] w-auto" strokeWidth={2.25} />
          : theme === "dark" ?
            <SunIcon className="h-[22px] w-auto" strokeWidth={2.25} />
          : <MonitorIcon className="h-[22px] w-auto" strokeWidth={2.25} />}
        </TooltipTrigger>
        <TooltipContent side="right">
          {systemTheme === "dark" ?
            theme === "system" ?
              "Switch to light theme"
            : theme === "light" ?
              "Switch to dark theme"
            : "Switch to system theme"
          : theme === "system" ?
            "Switch to dark theme"
          : theme === "dark" ?
            "Switch to light theme"
          : "Switch to system theme"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
