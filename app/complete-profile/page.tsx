import { CompleteProfileForm } from "@/features/auth/components/complete-profile-form";

const CompleteProfilePage = () => {
  return (
    <section className="w-full min-h-[100dvh] flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold  mb-4 text-center">
        Complete Profile
      </h1>
      {/* Complete profile form */}
      <CompleteProfileForm />
    </section>
  );
};

export default CompleteProfilePage;
