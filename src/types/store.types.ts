import { ReactNode } from "react";

// Base store interface that can work with any state management library
export interface BaseStore<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => T)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

// Popup state interface
export interface PopupState {
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

// Store configuration
export interface StoreConfig {
  name: string;
  version: string;
  middleware?: any[];
  devtools?: boolean;
}

// Store factory interface
export interface StoreFactory<T> {
  createStore: (config?: StoreConfig) => BaseStore<T>;
  createHooks: (store: BaseStore<T>) => {
    useStore: <U>(selector: (state: T) => U) => U;
    useActions: () => T;
  };
}

// Zustand implementation
export interface ZustandStore<T> extends BaseStore<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => T)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

// Redux implementation (for future)
export interface ReduxStore<T> extends BaseStore<T> {
  dispatch: (action: any) => void;
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
}
