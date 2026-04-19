import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#facc15",
            colorBackground: "#0a0a0a",
            colorInputBackground: "#171717",
            colorText: "#f5f5f5",
          },
        }}
      />
    </div>
  );
}
