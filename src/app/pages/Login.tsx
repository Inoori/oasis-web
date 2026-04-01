import Logo from "@/components/Logo";
import LoginForm from "@/features/authentication/LoginForm";

export default function Login() {
  return (
    <main className="flex justify-center">
      <div className="flex w-md flex-col pt-30">
        <Logo />
        <h4 className="mt-8 text-lg font-semibold">Log in to your account</h4>
        <p className="mt-2 mb-6 text-xs text-muted-foreground">
          Enter your email below to login to your account
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
