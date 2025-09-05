import { useEffect, useState } from "react";

export function useStore<T>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => unknown
) {
  const result = store(callback) as ReturnType<typeof callback>;
  const [data, setData] = useState<ReturnType<typeof callback>>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}

// SSR-safe hook for Zustand
export function useHydratedStore<T>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => unknown
) {
  const [isHydrated, setIsHydrated] = useState(false);
  const result = store(callback) as ReturnType<typeof callback>;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // Return default values during SSR
    return undefined;
  }

  return result;
}
