import type { User } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Label } from "radix-ui";
import { Controller, useForm } from "react-hook-form";

type ProfileFormProps = {
  user: User;
  setEditing?: (editing: boolean) => void;
};

type ProfileFormValues = {
  UserName?: string;
  Email?: string;
};

export default function ProfileForm({ user, setEditing }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<ProfileFormValues>({
    defaultValues: {},
    mode: "onSubmit",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="userName">User Name</FieldLabel>

            <Controller
              name="UserName"
              control={control}
              rules={{
                required: "User Name is required",
              }}
              render={({ field }) => (
                <Input
                  id="userName"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your user name"
                  className="text-base"
                  {...field}
                />
              )}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <footer className="flex flex-row gap-3">
        <Button
          type="submit"
          variant="default"
          className="active:translate-y-0.5"
        >
          Save
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="active:translate-y-0.5"
          onClick={() => setEditing && setEditing(false)}
        >
          Cancel
        </Button>
      </footer>
    </form>
  );
}
