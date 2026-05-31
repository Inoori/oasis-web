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
import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import type { Cabin } from "@/api/cabin";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "./ImageUploader";
import { toast } from "react-toastify";
import { useCreateOrUpdateCabin } from "./useCabins";
import { Label } from "@/components/ui/label";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import validator from "validator";

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
        if (!open)
          reset(cabin ? { ...cabin, Image: undefined } : { Image: undefined }); // 关闭对话框时重置表单，并清空图片字段，避免下次打开时旧图片仍然显示
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
                      const valid = validator.isInt(String(value), {
                        min: 1,
                        max: 10,
                      });
                      if (!valid)
                        return "Maximum capacity must be a number between 1 and 10";

                      return true;
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
                      const valid = validator.isCurrency(
                        String(value),
                        {
                          allow_negatives: false,
                          digits_after_decimal: [1, 2],
                        }
                      );

                      if (!valid)
                        return "Regular price must be a valid currency amount";

                      return true;
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
                      const valid = validator.isCurrency(
                        String(value),
                        {
                          allow_negatives: false,
                        }
                      );

                      if (!valid)
                        return "Discount must be a valid currency amount";
                      const val = Number(value);
                      const regularPrice = Number(getValues("RegularPrice"));

                      if (isNaN(val) || isNaN(regularPrice))
                        return "Discount and regular price must be valid numbers";

                      if (val > regularPrice)
                        return "Discount cannot be greater than regular price";

                      return true;
                    },
                  })}
                />

                <FloatingLabelInput
                  label="Enter a description"
                  id="Description"
                  type="text"
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
              <Button variant="outline">Cancel</Button>
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
