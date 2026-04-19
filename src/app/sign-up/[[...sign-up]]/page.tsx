import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10">
      <SignUp
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
