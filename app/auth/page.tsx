"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const AuthPage = () => {
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (!data.data) {
      toast.error("Couldn't get user");
    }
    console.log(data.data?.url);
  };
  return (
    <section className="w-full h-[100dvh] flex flex-col justify-center items-center text-center px-4 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Welcome to the Alumni Portal
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Whether you’re a current student or a proud graduate, join our community
        to connect, collaborate, and stay updated. Get started now.
      </p>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
        onClick={signIn}
      >
        Continue with Google
      </Button>
    </section>
  );
};

export default AuthPage;
