"use client";
import { BriefcaseBusiness, House, User, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Dock() {
  const pathname = usePathname();
  const items = [
    { label: "home", icon: House, to: "/" },
    { label: "mentors", icon: Users, to: "/mentors" },
    { label: "jobs", icon: BriefcaseBusiness, to: "/jobs" },
    { label: "profile", icon: User, to: "/profile" },
  ];

  return (
    <div className="w-full h-16 bg-card fixed bottom-0 z-10 flex justify-around items-center rounded-t-md">
      {items.map(({ label, icon: Icon, to }) => {
        const isActive = pathname === to;
        return (
          <Link
            key={label}
            href={to}
            className={`flex flex-col items-center text-sm transition ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Icon size={24} className="mb-1" />
            <span className="capitalize text-xs">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
