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
import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "@/components/ui/label";

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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FloatingLabelInput
                  label="Cabin name"
                  id="Name"
                  type="text"
                  required
                  error={errors.Name?.message}
                  {...register("Name", {
                    required: "Cabin name is required",
                  })}
                />

                <FloatingLabelInput
                  label="Maximum capacity"
                  id="MaxCapacity"
                  type="text"
                  required
                  error={errors.MaxCapacity?.message}
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

                <FloatingLabelInput
                  label="Regular price"
                  id="RegularPrice"
                  type="text"
                  required
                  error={errors.RegularPrice?.message}
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

                <FloatingLabelInput
                  label="Discount"
                  id="Discount"
                  type="text"
                  required
                  error={errors.Discount?.message}
                  {...register("Discount", {
                    required: "Discount is required",
                    validate: (value) => {
                      const val = Number(value);
                      const regularPrice = Number(getValues("RegularPrice"));

                      if (!value && value !== 0) return "Discount is required";
                      if (Number.isNaN(val)) return "Discount must be a number";
                      if (Number.isNaN(regularPrice))
                        return "Regular price must be a number";
                      if (val > regularPrice)
                        return "Discount cannot be greater than regular price";
                      if (val < 0) return "Discount cannot be negative";
                      return true;
                    },
                  })}
                />

                <FloatingLabelInput
                  label="Enter a description"
                  id="Description"
                  type="text"
                  required
                  error={errors.Description?.message}
                >
                  <Textarea id="Description" {...register("Description")} />
                </FloatingLabelInput>

                <Label className="mt-3 text-muted-foreground">
                  Cabin Image
                </Label>
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
                        id="Image"
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

/**
 * 带有浮动标签的输入框，标签会根据输入框的状态（是否有值或是否聚焦）来调整位置和样式。
 * @param props
 * @returns
 */
function FloatingLabelInput(
  props: React.ComponentProps<typeof Input> & {
    label: string;
    required?: boolean;
    error?: string | undefined;
    children?: React.ReactElement<{
      placeholder?: string;
      className?: string;
      id?: string;
    }>;
  }
) {
  const { label, required, error, children, ...inputProps } = props;

  let inputElement: React.ReactElement;
  if (React.isValidElement(children)) {
    const childProps = {
      placeholder: (children.props as any).placeholder ?? " ",
      className: cn((children.props as any).className, "peer"),
      id: (children.props as any).id ?? inputProps.id,
    };
    inputElement = React.cloneElement(children, childProps);
  } else {
    inputElement = <Input {...inputProps} placeholder=" " className="peer" />;
  }

  return (
    <div className="relative mt-6">
      {inputElement}
      {error && <FieldError className="mt-1 text-xs">{error}</FieldError>}
      <FieldLabel
        htmlFor={inputProps.id}
        className={cn(
          "pointer-events-none absolute top-0 left-2 -translate-y-6 text-xs text-muted-foreground",
          "peer-placeholder-shown:top-0 peer-placeholder-shown:left-2 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground",
          "peer-focus:top-0 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-muted-foreground",
          "transition-all duration-200 ease-in-out"
        )}
      >
        <span> {label}</span>
        {required && (
          <span className="relative top-0.75 inline-block align-bottom text-sm leading-0 text-destructive">
            *
          </span>
        )}
      </FieldLabel>
    </div>
  );
}
