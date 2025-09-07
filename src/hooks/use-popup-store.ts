import { useCallback, useMemo } from "react";
import { usePopupStore } from "@/stores/zustand/popup-store";

// Only expose auth popup controls
export const useAuthPopup = () => {
  const isAuthPopupOpen = usePopupStore((state) => state.isAuthPopupOpen);
  const openAuthPopup = useCallback(
    () => usePopupStore.getState().openAuthPopup(),
    []
  );
  const closeAuthPopup = useCallback(
    () => usePopupStore.getState().closeAuthPopup(),
    []
  );

  return useMemo(
    () => ({
      isAuthPopupOpen,
      openAuthPopup,
      closeAuthPopup,
    }),
    [isAuthPopupOpen, openAuthPopup, closeAuthPopup]
  );
};
