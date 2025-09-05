import { useCallback, useMemo } from "react";
import { usePopupStore } from "@/stores/popup-store";

// Memoized selectors to prevent infinite loops
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

export const useGenericPopup = () => {
  const isPopupOpen = usePopupStore((state) => state.isPopupOpen);
  const popupContent = usePopupStore((state) => state.popupContent);
  const popupTitle = usePopupStore((state) => state.popupTitle);
  const popupSize = usePopupStore((state) => state.popupSize);
  const openPopup = useCallback(
    (content: any, title?: string, size?: any) =>
      usePopupStore.getState().openPopup(content, title, size),
    []
  );
  const closePopup = useCallback(
    () => usePopupStore.getState().closePopup(),
    []
  );

  return useMemo(
    () => ({
      isPopupOpen,
      popupContent,
      popupTitle,
      popupSize,
      openPopup,
      closePopup,
    }),
    [isPopupOpen, popupContent, popupTitle, popupSize, openPopup, closePopup]
  );
};

export const useUser = () => {
  const user = usePopupStore((state) => state.user);
  const setUser = useCallback(
    (user: any) => usePopupStore.getState().setUser(user),
    []
  );

  return useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
};

export const useLoading = () => {
  const isLoading = usePopupStore((state) => state.isLoading);
  const setLoading = useCallback(
    (loading: boolean) => usePopupStore.getState().setLoading(loading),
    []
  );

  return useMemo(
    () => ({
      isLoading,
      setLoading,
    }),
    [isLoading, setLoading]
  );
};
