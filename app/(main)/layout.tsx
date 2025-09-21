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
      <section>
        <Navbar />
        {children}
      </section>
    );
  } else {
    redirect("/complete-profile");
  }
}
