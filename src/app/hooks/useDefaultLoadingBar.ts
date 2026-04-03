import { useLoadingBar } from "react-top-loading-bar";

export function useDefaultLoadingBar(color: string = "oklch(60.9% 0.126 221.723)") {
  return useLoadingBar({
    color: color,
    height: 2,
    // className:cn("text-indigo-500")
  });
}
