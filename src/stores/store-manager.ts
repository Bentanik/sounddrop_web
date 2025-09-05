import {
  BaseStore,
  StoreFactory,
  StoreConfig,
  PopupState,
} from "@/types/store.types";
import { zustandFactory } from "./factories/zustand-factory";
import { reduxFactory } from "./factories/redux-factory";

// Store type enum
export enum StoreType {
  ZUSTAND = "zustand",
  REDUX = "redux",
}

// Store manager to handle different store implementations
class StoreManager {
  private static instance: StoreManager;
  private currentStore: BaseStore<PopupState> | null = null;
  private currentType: StoreType = StoreType.ZUSTAND;

  private constructor() {}

  static getInstance(): StoreManager {
    if (!StoreManager.instance) {
      StoreManager.instance = new StoreManager();
    }
    return StoreManager.instance;
  }

  // Initialize store with specific type
  initializeStore(
    type: StoreType = StoreType.ZUSTAND,
    config?: StoreConfig
  ): BaseStore<PopupState> {
    let factory: StoreFactory<PopupState>;

    switch (type) {
      case StoreType.ZUSTAND:
        factory = zustandFactory;
        break;
      case StoreType.REDUX:
        factory = reduxFactory;
        break;
      default:
        throw new Error(`Unsupported store type: ${type}`);
    }

    this.currentStore = factory.createStore(config);
    this.currentType = type;
    return this.currentStore;
  }

  // Get current store
  getStore(): BaseStore<PopupState> {
    if (!this.currentStore) {
      return this.initializeStore();
    }
    return this.currentStore;
  }

  // Switch store type (useful for migration)
  switchStore(type: StoreType, config?: StoreConfig): BaseStore<PopupState> {
    return this.initializeStore(type, config);
  }

  // Get current store type
  getCurrentType(): StoreType {
    return this.currentType;
  }

  // Check if store is initialized
  isInitialized(): boolean {
    return this.currentStore !== null;
  }
}

// Export singleton instance
export const storeManager = StoreManager.getInstance();

// Export store type
export { StoreType };
