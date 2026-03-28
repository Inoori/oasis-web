import Pannel from "@/components/Pannel";
import SignupForm from "@/features/authentication/SignupForm";

export default function NewUsers() {
  return (
    <>
      <h1 className="text-3xl font-bold">Create a new user</h1>

      <Pannel className="mt-6">
        <SignupForm />
      </Pannel>
    </>
  );
}
