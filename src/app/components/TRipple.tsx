import { useRef, type ReactNode } from "react";

interface TRippleProps {
  children: ReactNode;
  className?: string;
  rippleColor?: string; // 如 "bg-white/30" 或 "bg-black/20"
  rippleDuration?: number; // 动画时长（毫秒），默认 600
  disabled?: boolean; // 禁用波纹
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; // 可选额外点击事件
}

/**
 * TRipple component - 在点击时显示水波纹效果的容器组件
 */
export default function TRipple({
  children,
  className,
  rippleColor = "bg-white/30",
  rippleDuration = 600,
  disabled = false,
  onClick,
}: TRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    const ripple = document.createElement("span");
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2; // 让波纹足够大
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.animationDuration = `${rippleDuration}ms`; // 设置动画时长
    ripple.className = `absolute rounded-full ${rippleColor} scale-0 pointer-events-none animate-ripple`;

    // 清除旧波纹（防止快速点击叠加太多）
    const oldRipple = container.querySelector(".animate-ripple");
    if (oldRipple) oldRipple.remove();

    container.appendChild(ripple);

    // 动画结束后自动移除
    setTimeout(() => {
      ripple.remove();
    }, rippleDuration + 50); // 加点缓冲时间确保动画完成
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    createRipple(e);
    onClick?.(e); // 支持外部 onClick
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
