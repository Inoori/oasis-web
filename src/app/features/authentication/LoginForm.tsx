import { AnimatePresence, motion } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "./useLogin";
import { Spinner } from "@/components/ui/spinner";
import validator from "validator";

type LoginFormValues = {
  Email?: string;
  Password?: string;
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<LoginFormValues>({
    defaultValues: { Email: "", Password: "" },
    mode: "onSubmit",
  });

  const { handlerLogin, isLoading } = useLogin();

  function onSubmit(data: LoginFormValues) {
    handlerLogin({
      email: data.Email!,
      password: data.Password!,
      onError: () => resetField("Password", { defaultValue: "" }),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col justify-center gap-8"
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="Email">Email</FieldLabel>
            <Controller
              name="Email"
              control={control}
              rules={{
                required: "Email is required",
                validate: (value) =>
                  validator.isEmail(value!) ||
                  "Please enter a valid email address",
              }}
              render={({ field }) => (
                <Input
                  id="Email"
                  type="text"
                  autoComplete="username"
                  placeholder="example@example.com"
                  className="text-base"
                  {...field}
                />
              )}
            />
            <AnimatePresence>
              {errors.Email && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FieldError className="text-xs">
                    {errors.Email.message}
                  </FieldError>
                </motion.div>
              )}
            </AnimatePresence>

            <FieldLabel htmlFor="Password">Password</FieldLabel>
            <Controller
              name="Password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  id="Password"
                  type="password"
                  autoComplete="current-password"
                  className="text-base"
                  {...field}
                />
              )}
            />
            <AnimatePresence>
              {errors.Password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FieldError className="text-xs">
                    {errors.Password.message}
                  </FieldError>
                </motion.div>
              )}
            </AnimatePresence>
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button asChild type="submit" size="default" className="self-end">
        <motion.button
          layout
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          disabled={isLoading}
          whileTap={!isLoading ? { scale: 0.97 } : undefined}
          className="flex items-center gap-1 overflow-hidden"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isLoading && (
              <motion.span
                key="spinner"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
                className="flex items-center"
              >
                <Spinner className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
          <span>Login</span>
        </motion.button>
      </Button>
    </form>
  );
}
