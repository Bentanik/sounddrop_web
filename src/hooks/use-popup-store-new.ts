import { useCallback, useMemo } from "react";
import { useStore, useStoreActions } from "./use-store-manager";

// Memoized selectors using store manager
export const useAuthPopup = () => {
  const isAuthPopupOpen = useStore((state) => state.isAuthPopupOpen);
  const actions = useStoreActions();

  const openAuthPopup = useCallback(() => actions.openAuthPopup(), [actions]);
  const closeAuthPopup = useCallback(() => actions.closeAuthPopup(), [actions]);

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
  const isPopupOpen = useStore((state) => state.isPopupOpen);
  const popupContent = useStore((state) => state.popupContent);
  const popupTitle = useStore((state) => state.popupTitle);
  const popupSize = useStore((state) => state.popupSize);
  const actions = useStoreActions();

  const openPopup = useCallback(
    (content: any, title?: string, size?: any) =>
      actions.openPopup(content, title, size),
    [actions]
  );
  const closePopup = useCallback(() => actions.closePopup(), [actions]);

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
  const user = useStore((state) => state.user);
  const actions = useStoreActions();

  const setUser = useCallback((user: any) => actions.setUser(user), [actions]);

  return useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
};

export const useLoading = () => {
  const isLoading = useStore((state) => state.isLoading);
  const actions = useStoreActions();

  const setLoading = useCallback(
    (loading: boolean) => actions.setLoading(loading),
    [actions]
  );

  return useMemo(
    () => ({
      isLoading,
      setLoading,
    }),
    [isLoading, setLoading]
  );
};
