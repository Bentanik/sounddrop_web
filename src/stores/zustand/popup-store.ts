import { create } from "zustand";
import { ReactNode } from "react";

interface PopupState {
  isAuthPopupOpen: boolean;
  openAuthPopup: () => void;
  closeAuthPopup: () => void;

  isPopupOpen: boolean;
  popupContent: ReactNode | null;
  popupTitle: string | null;
  popupSize: "sm" | "md" | "lg" | "xl" | "full";
  openPopup: (
    content: ReactNode,
    title?: string,
    size?: "sm" | "md" | "lg" | "xl" | "full"
  ) => void;
  closePopup: () => void;

  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  user: {
    email: string;
    name: string;
    isAuthenticated: boolean;
  } | null;
  setUser: (
    user: { email: string; name: string; isAuthenticated: boolean } | null
  ) => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isAuthPopupOpen: false,
  openAuthPopup: () => set({ isAuthPopupOpen: true }),
  closeAuthPopup: () => set({ isAuthPopupOpen: false }),

  isPopupOpen: false,
  popupContent: null,
  popupTitle: null,
  popupSize: "md",
  openPopup: (content, title, size = "md") =>
    set({
      isPopupOpen: true,
      popupContent: content,
      popupTitle: title,
      popupSize: size,
    }),
  closePopup: () =>
    set({
      isPopupOpen: false,
      popupContent: null,
      popupTitle: null,
      popupSize: "md",
    }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  user: null,
  setUser: (user) => set({ user }),
}));
