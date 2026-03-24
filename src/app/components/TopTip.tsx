import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { createPortal } from "react-dom";

type TopTipProps = {
  title: string;
  description?: string;
  media?: React.ReactNode;
  container?: HTMLElement | null;
};

export default function TopTip({
  title,
  description,
  media,
  container,
}: TopTipProps) {
  return createPortal(
    <div
      id="top-tip"
      className="absolute top-1/40 left-0 flex w-full items-center justify-center"
    >
      <div
        id="top-tip-content"
        className="flex w-full max-w-sm flex-col justify-center gap-6 shadow-lg shadow-primary-foreground/30"
      >
        <Item variant="outline" size="sm">
          <ItemMedia>{media}</ItemMedia>
          <ItemContent>
            <ItemTitle className="text-sm font-medium">{title}</ItemTitle>
            {description && <ItemDescription>{description}</ItemDescription>}
          </ItemContent>
        </Item>
      </div>
    </div>,
    container ?? document.body
  );
}
