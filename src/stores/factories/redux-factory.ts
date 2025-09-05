import {
  BaseStore,
  StoreFactory,
  StoreConfig,
  PopupState,
} from "@/types/store.types";

// Redux store implementation (for future use)
class ReduxStoreImpl implements BaseStore<PopupState> {
  private store: any;

  constructor(store: any) {
    this.store = store;
  }

  getState = () => this.store.getState();

  setState = (
    partial: Partial<PopupState> | ((state: PopupState) => PopupState)
  ) => {
    // In Redux, we would dispatch actions instead of direct state updates
    // This is a simplified implementation
    this.store.dispatch({ type: "UPDATE_STATE", payload: partial });
  };

  subscribe = (
    listener: (state: PopupState, prevState: PopupState) => void
  ) => {
    return this.store.subscribe(() => {
      const currentState = this.store.getState();
      listener(currentState, currentState); // Simplified for now
    });
  };
}

// Redux factory (placeholder for future implementation)
export const reduxFactory: StoreFactory<PopupState> = {
  createStore: (config?: StoreConfig) => {
    // This would create a Redux store with reducers, middleware, etc.
    // For now, it's a placeholder
    throw new Error("Redux factory not implemented yet. Use Zustand for now.");
  },

  createHooks: (store: BaseStore<PopupState>) => ({
    useStore: <U>(selector: (state: PopupState) => U) => {
      // This would use useSelector from react-redux
      return selector(store.getState());
    },
    useActions: () => store.getState(),
  }),
};
