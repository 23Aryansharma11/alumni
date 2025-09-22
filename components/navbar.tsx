import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4 h-12 border-b-1 border-b-accent fixed top-0 py-6">
      <div style={{ position: "relative", width: "40px", height: "40px" }}>
        <Image alt="logo" src="/logo.svg" layout="fill" objectFit="contain" />
      </div>
      <ModeToggle />
    </nav>
  );
}
