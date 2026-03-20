import { cn } from "@/lib/utils";
import React from "react";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/**
 * 带有浮动标签的输入框，标签会根据输入框的状态（是否有值或是否聚焦）来调整位置和样式。
 * @param props
 * @returns
 */
export default function FloatingLabelInput(
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
