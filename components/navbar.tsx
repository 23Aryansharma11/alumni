import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4">
      <div style={{ position: "relative", width: "40px", height: "40px" }}>
        <Image alt="logo" src="/logo.svg" layout="fill" objectFit="contain" />
      </div>
      <ModeToggle />
    </nav>
  );
}
