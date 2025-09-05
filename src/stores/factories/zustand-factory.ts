import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {
  BaseStore,
  StoreFactory,
  StoreConfig,
  PopupState,
} from "@/types/store.types";

// Zustand store implementation
class ZustandStoreImpl implements BaseStore<PopupState> {
  private store: any;

  constructor(store: any) {
    this.store = store;
  }

  getState = () => this.store.getState();

  setState = (
    partial: Partial<PopupState> | ((state: PopupState) => PopupState)
  ) => {
    this.store.setState(partial);
  };

  subscribe = (
    listener: (state: PopupState, prevState: PopupState) => void
  ) => {
    return this.store.subscribe(listener);
  };
}

// Zustand factory
export const zustandFactory: StoreFactory<PopupState> = {
  createStore: (config?: StoreConfig) => {
    const store = create<PopupState>()(
      subscribeWithSelector((set) => ({
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
      }))
    );

    return new ZustandStoreImpl(store);
  },

  createHooks: (store: BaseStore<PopupState>) => ({
    useStore: <U>(selector: (state: PopupState) => U) => {
      // This would be implemented with React hooks
      // For now, we'll use the direct store access
      return selector(store.getState());
    },
    useActions: () => store.getState(),
  }),
};
