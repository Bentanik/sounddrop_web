import { useCallback, useMemo, useEffect, useState } from "react";
import { storeManager, StoreType } from "@/stores/store-manager";
import { PopupState } from "@/types/store.types";

// Custom hook to use store manager
export const useStoreManager = () => {
  const [store] = useState(() => storeManager.getStore());
  const [isInitialized, setIsInitialized] = useState(
    storeManager.isInitialized()
  );

  useEffect(() => {
    if (!isInitialized) {
      storeManager.initializeStore(StoreType.ZUSTAND);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const switchToRedux = useCallback(() => {
    storeManager.switchStore(StoreType.REDUX);
    setIsInitialized(true);
  }, []);

  const switchToZustand = useCallback(() => {
    storeManager.switchStore(StoreType.ZUSTAND);
    setIsInitialized(true);
  }, []);

  return {
    store,
    isInitialized,
    currentType: storeManager.getCurrentType(),
    switchToRedux,
    switchToZustand,
  };
};

// Generic store hook
export const useStore = <T>(selector: (state: PopupState) => T) => {
  const { store } = useStoreManager();
  const [state, setState] = useState<T>(() => selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe((newState, prevState) => {
      const newValue = selector(newState);
      const prevValue = selector(prevState);

      // Only update if the selected value actually changed
      if (newValue !== prevValue) {
        setState(newValue);
      }
    });

    return unsubscribe;
  }, [store, selector]);

  return state;
};

// Actions hook
export const useStoreActions = () => {
  const { store } = useStoreManager();

  return useMemo(() => store.getState(), [store]);
};
