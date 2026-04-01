import { useEffect, useState } from "react";

// 如果你有多个 persist store，可以改成接收参数，这里先针对 authStore 简化
export const useHydration = (store: any) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // 立即检查当前状态
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(store.persist.hasHydrated());

    // 监听 hydration 完成
    const unsubFinish = store.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // 监听开始（可选）
    const unsubHydrate = store.persist.onHydrate(() => {
      setHydrated(false);
    });

    return () => {
      unsubFinish();
      unsubHydrate();
    };
  }, [store]);

  return hydrated;
};
