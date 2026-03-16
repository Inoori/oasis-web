import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import type { Cabin } from "@/api/cabin";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "./ImageUploader";
import { toast } from "react-toastify";
import { useCreateOrUpdateCabin } from "./useCabins";

export type CabinFormProps = {
  open?: boolean;
  cabin?: Cabin;
  openChange?: (open: boolean) => void;
};

export default function CabinForm({ cabin, openChange, open }: CabinFormProps) {
  const isEdit = Boolean(cabin?.Id);

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Cabin>({
    defaultValues: cabin ? cabin : {},
    mode: "onSubmit",
    // reValidateMode: "onSubmit",
  });

  const createOrUpdateMutation = useCreateOrUpdateCabin({
    cabin,
    onSucess: () => {
      toast.success(`Cabin ${isEdit ? "updated" : "created"} successfully!`);
      if (openChange) openChange(false);
    },
    onError: (err) => {
      toast.error(
        `Failed to ${isEdit ? "update" : "create"} cabin: ${err.message}`
      );
    },
  });

  const onSubmit = (data: Cabin) => {
    //todo, 目前后端不支持图片上传，所以先把图片字段置空
    data.Image = "";
    createOrUpdateMutation.mutate(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (openChange) openChange(open);
        if (!open) reset();
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Cabin" : "Create Cabin"}</DialogTitle>
          <DialogDescription>
            Please fill in the details to {isEdit ? "edit" : "create"} a{" "}
            {isEdit ? "cabin" : "new cabin"}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldRow
                  label="Cabin name"
                  error={errors.Name?.message}
                  required
                >
                  <Input
                    id="Name"
                    type="text"
                    // disabled={isPending}
                    {...register("Name", {
                      required: "Cabin name is required",
                    })}
                  />
                </FieldRow>

                <FieldRow
                  label="Maximum capacity"
                  error={errors.MaxCapacity?.message}
                  required
                >
                  <Input
                    id="MaxCapacity"
                    type="text"
                    // disabled={isPending}
                    {...register("MaxCapacity", {
                      required: "Maximum capacity is required",
                      validate: (value) => {
                        const val = Number(value);
                        if (Number.isNaN(val))
                          return "Maximum capacity must be a number";
                        if (val < 1) return "Capacity must be at least 1";
                        if (val > 10) return "Capacity cannot exceed 10";
                      },
                    })}
                  />
                </FieldRow>

                <FieldRow
                  label="Regular price"
                  error={errors.RegularPrice?.message}
                  required
                >
                  <Input
                    id="RegularPrice"
                    type="text"
                    // disabled={isPending}
                    {...register("RegularPrice", {
                      required: "Regular price is required",
                      validate: (value) => {
                        const val = Number(value);
                        if (Number.isNaN(val))
                          return "Regular price must be a number";
                        if (val < 0) return "Regular price cannot be negative";
                      },
                    })}
                  />
                </FieldRow>

                <FieldRow
                  label="Discount"
                  error={errors.Discount?.message}
                  required
                >
                  <Input
                    id="Discount"
                    type="text"
                    // disabled={isPending}
                    {...register("Discount", {
                      required: "Discount is required",
                      validate: (value) => {
                        const val = Number(value);
                        const regularPrice = Number(getValues("RegularPrice"));

                        if (!value && value !== 0)
                          return "Discount is required";
                        if (Number.isNaN(val))
                          return "Discount must be a number";
                        if (Number.isNaN(regularPrice))
                          return "Regular price must be a number";
                        if (val > regularPrice)
                          return "Discount cannot be greater than regular price";
                        if (val < 0) return "Discount cannot be negative";
                        return true;
                      },
                    })}
                  />
                </FieldRow>

                <FieldRow
                  label="Description"
                  error={errors.Description?.message}
                >
                  <Textarea
                    id="Description"
                    placeholder="Enter a description"
                    // disabled={isPending}
                    {...register("Description")}
                  />
                </FieldRow>

                <FieldLabel>Cabin Image</FieldLabel>
                {errors?.Image && (
                  <FieldError>{errors.Image.message}</FieldError>
                )}

                <Controller
                  name="Image"
                  control={control}
                  rules={{
                    validate: (files) => {
                      if (isEdit) return true; //编辑模式不强制要求上传图片
                      return (
                        (files && files.length > 0) || "至少需要上传一张图片"
                      );
                    },
                  }}
                  render={({ field }) => {
                    let files = field.value as File[] | undefined;

                    if (typeof files === "string") files = undefined; //后端返回的 Cabin 对象中的 Image 字段是字符串，这里需要兼容一下
                    return (
                      <ImageUploader
                        // 使用受控模式：把 RHF 的值和更改回调传入
                        maxFiles={1}
                        value={files}
                        onValueChange={(files) => field.onChange(files)}
                      />
                    );
                  }}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={createOrUpdateMutation.isPending}>
              {createOrUpdateMutation.isPending && (
                <Spinner className="size-4" />
              )}
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldRow({
  children,
  label,
  error,
  required = false,
}: {
  children: React.ReactElement<{ id?: string }>;
  label: string;
  error: string | undefined;
  required?: boolean;
}) {
  return (
    <>
      {children?.props?.id && (
        <FieldLabel htmlFor={children.props.id}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      {error && <FieldError>{error}</FieldError>}
      {children}
    </>
  );
}
