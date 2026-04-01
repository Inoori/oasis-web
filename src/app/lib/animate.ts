// motion.ts 或 animations.ts
import type { Variants, Transition } from "framer-motion";

// 通用过渡配置
const defaultTransition: Transition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1], // 推荐的平滑缓动曲线
};

const fastTransition: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

const slowTransition: Transition = {
  duration: 0.5,
  ease: "easeInOut",
};

// ==================== 基础动画方案 ====================

export const animate = {
  // 1. 淡入淡出
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: defaultTransition,
  },

  fadeInFast: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: fastTransition,
  },

  // 2. 上下滑动
  slideInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: defaultTransition,
  },

  slideInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: defaultTransition,
  },

  slideInUpSmall: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 15 },
    transition: defaultTransition,
  },

  // 3. 左右滑动
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: defaultTransition,
  },

  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: defaultTransition,
  },

  // 4. 缩放动画
  scaleIn: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: defaultTransition,
  },

  scaleInSmall: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: fastTransition,
  },

  scaleOut: {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 0, scale: 0.85 },
    exit: { opacity: 0, scale: 0.85 },
    transition: defaultTransition,
  },

  // 5. 弹跳入场（轻微弹簧效果）
  springUp: {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: { opacity: 0, y: 50 },
  },

  // 6. 页面级转场常用动画
  pageFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
  },

  pageSlideUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
    transition: { duration: 0.45, ease: "easeOut" },
  },

  // 7. 卡片/模态框常用动画
  modalPop: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 280, damping: 24 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  },

  // 8. 列表项交错动画（推荐搭配 staggerChildren 使用）
  listItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: defaultTransition,
  },

  // 9. 悬浮提示（Toast / Notification）
  toastSlide: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 30, scale: 0.95 },
    transition: fastTransition,
  },
};

// ==================== 容器动画（带 stagger）===================
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // 子元素依次延迟出现
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1, // 反向消失
    },
  },
};

// 搭配 containerVariants 使用的子元素动画
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 25,
    transition: { duration: 0.25 },
  },
};

export default animate;
