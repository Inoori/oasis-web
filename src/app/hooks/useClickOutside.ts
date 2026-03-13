import { useEffect, useRef } from "react";

interface UseClickOutsideOptions {
  handler?: () => void;
  //判断是否触发点击事件
  clickTrigger?: boolean;
}

// 自定义 Hook：监听点击外部关闭
function useClickOutside({ handler, clickTrigger }: UseClickOutsideOptions) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!clickTrigger) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.debug("Clicked outside");
        handler?.();
      }
    };

    if (!clickTrigger) return;

    // 使用 setTimeout 确保事件监听在组件挂载后添加，避免初始点击被误触发
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [handler, clickTrigger]);

  return ref;
}

export default useClickOutside;
