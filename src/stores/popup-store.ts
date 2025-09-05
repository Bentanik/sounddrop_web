import { create } from "zustand";
import { ReactNode } from "react";

interface PopupState {
  // Auth popup
  isAuthPopupOpen: boolean;
  openAuthPopup: () => void;
  closeAuthPopup: () => void;

  // Generic popup
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

  // Loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // User state (for auth)
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
  // Auth popup
  isAuthPopupOpen: false,
  openAuthPopup: () => set({ isAuthPopupOpen: true }),
  closeAuthPopup: () => set({ isAuthPopupOpen: false }),

  // Generic popup
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

  // Loading state
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  // User state
  user: null,
  setUser: (user) => set({ user }),
}));

// Store is now clean - selectors moved to hooks/use-popup-store.ts
