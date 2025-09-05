import { storeManager, StoreType } from "@/stores/store-manager";
import { PopupState } from "@/types/store.types";

// Migration utility for switching between store types
export class StoreMigration {
  // Migrate from current store to new store type
  static async migrateTo(newType: StoreType): Promise<void> {
    const currentStore = storeManager.getStore();
    const currentState = currentStore.getState();

    // Save current state
    const stateSnapshot = this.serializeState(currentState);

    // Switch to new store type
    storeManager.switchStore(newType);

    // Restore state in new store
    const newStore = storeManager.getStore();
    this.deserializeState(newStore, stateSnapshot);

    // Notify components about migration
    window.dispatchEvent(
      new CustomEvent("storeMigrated", {
        detail: {
          from: storeManager.getCurrentType(),
          to: newType,
        },
      })
    );
  }

  // Serialize state for migration
  private static serializeState(state: PopupState): string {
    return JSON.stringify({
      isAuthPopupOpen: state.isAuthPopupOpen,
      isPopupOpen: state.isPopupOpen,
      popupContent: null, // Don't migrate React nodes
      popupTitle: state.popupTitle,
      popupSize: state.popupSize,
      isLoading: state.isLoading,
      user: state.user,
    });
  }

  // Deserialize state after migration
  private static deserializeState(store: any, serializedState: string): void {
    try {
      const state = JSON.parse(serializedState);

      // Restore state using store actions
      if (state.isAuthPopupOpen) {
        store.getState().openAuthPopup();
      }

      if (state.isPopupOpen) {
        store.getState().openPopup(null, state.popupTitle, state.popupSize);
      }

      if (state.isLoading) {
        store.getState().setLoading(true);
      }

      if (state.user) {
        store.getState().setUser(state.user);
      }
    } catch (error) {
      console.error("Failed to migrate state:", error);
    }
  }

  // Check if migration is needed
  static needsMigration(
    currentType: StoreType,
    targetType: StoreType
  ): boolean {
    return currentType !== targetType;
  }

  // Get migration status
  static getMigrationStatus(): {
    currentType: StoreType;
    canMigrate: boolean;
    supportedTypes: StoreType[];
  } {
    return {
      currentType: storeManager.getCurrentType(),
      canMigrate: true,
      supportedTypes: [StoreType.ZUSTAND, StoreType.REDUX],
    };
  }
}

// Migration hook for React components
export const useStoreMigration = () => {
  const migrateToZustand = () => StoreMigration.migrateTo(StoreType.ZUSTAND);
  const migrateToRedux = () => StoreMigration.migrateTo(StoreType.REDUX);

  const migrationStatus = StoreMigration.getMigrationStatus();

  return {
    migrateToZustand,
    migrateToRedux,
    migrationStatus,
  };
};
