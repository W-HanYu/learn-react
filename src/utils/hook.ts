// import { useState, useEffect } from "react";

// type DebounceFn<T extends any[]> = (...args: T) => void;

// export const useDebounce = <T extends any[]>(
//   fn: DebounceFn<T>,
//   deply: number
// ): DebounceFn<T> => {
//   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [timer]);

//   function debounce(...args: T) {
//     if (timer) clearInterval(timer);
//     setTimer(
//       setTimeout(() => {
//         fn.apply(this.args);
//       }, deply)
//     );
//   }
//   return debounce;
// };


import { useState, useEffect } from "react";

// 定义一个泛型类型 ThrottleFn，表示节流函数类型，可以接收任意类型的参数
type ThrottleFn<T extends any[]> = (...args: T) => void;

// 导出一个 useThrottle Hook，接收一个函数 fn 和一个节流时间 delay
export const useThrottle = <T extends any[]>(
  fn: ThrottleFn<T>,
  delay: number
): ThrottleFn<T> => {
  // 使用 useState Hook 定义一个状态 lastExecTime，表示上一次函数执行的时间戳
  const [lastExecTime, setLastExecTime] = useState(0);

  // 使用 useEffect Hook 在组件销毁时将 lastExecTime 重置为 0
  useEffect(() => {
    return () => {
      setLastExecTime(0);
    };
  }, []);

  // 定义一个节流函数 throttledFn，接收任意类型的参数 args
  function throttledFn(...args: T) {
    // 获取当前时间戳 now
    const now = Date.now();
    // 如果距离上一次函数执行的时间间隔大于等于节流时间 delay
    if (now - lastExecTime >= delay) {
      // 更新上一次函数执行的时间戳为 now
      setLastExecTime(now);
      // 执行传入的函数 fn，并传入参数 args
      fn.apply(this, args);
    }
  }

  // 返回节流函数 throttledFn
  return throttledFn;
};
