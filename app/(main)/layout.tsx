import { Dock } from "@/components/dock";
import { Navbar } from "@/components/navbar";
import { isUserProfileComplete } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProfileComplete = await isUserProfileComplete();
  if (isProfileComplete) {
    return (
      <section className="w-full h-full overflow-hidden">
        <Navbar />
        <div className="mt-12 h-full">{children}</div>
        <Dock />
      </section>
    );
  } else {
    redirect("/complete-profile");
  }
}
