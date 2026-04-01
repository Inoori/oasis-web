import { useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import validator from "validator";
import { Card } from "@/components/ui/card";

export type SignupFormValues = {
  Id?: string;
  UserName?: string;
  Email?: string;
  Password?: string;
  ConfirmPassword?: string;
  PhoneNumber?: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<SignupFormValues>({
    defaultValues: {},
    mode: "onSubmit",
  });

  function onSubmit(data: SignupFormValues) {
    console.log("Form data:", data);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-8 pt-12"
    >
      <Card className="w-xl px-4">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FloatingLabelInput
                label="User Name"
                id="UserName"
                type="text"
                autoComplete="username"
                required
                error={errors.UserName?.message}
                {...register("UserName", {
                  required: "Full name is required",
                })}
              />

              <FloatingLabelInput
                label="Email Address"
                id="Email"
                type="text"
                required
                error={errors.Email?.message}
                {...register("Email", {
                  required: "Email is required",
                  validate: (value) =>
                    validator.isEmail(value as string) ||
                    "Invalid email address",
                })}
              />

              <FloatingLabelInput
                label="Password"
                id="Password"
                type="password"
                autoComplete="new-password"
                required
                error={errors.Password?.message}
                {...register("Password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <FloatingLabelInput
                label="Confirm Password"
                id="ConfirmPassword"
                type="password"
                autoComplete="new-password"
                required
                error={errors.ConfirmPassword?.message}
                {...register("ConfirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("Password") ||
                    "Passwords need to match",
                })}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button
          type="submit"
          disabled={false}
          size="default"
          className="self-end"
        >
          {/* {isPending && <Spinner className="size-4" />} */}
          Confirm
        </Button>
      </Card>
    </form>
  );
}
