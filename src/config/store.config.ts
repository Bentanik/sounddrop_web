import { StoreType } from "@/stores/store-manager";

// Store configuration
export const STORE_CONFIG = {
  // Current store type - change this to switch between Zustand and Redux
  currentType: StoreType.ZUSTAND,

  // Store settings
  settings: {
    devtools: process.env.NODE_ENV === "development",
    middleware: [],
    version: "1.0.0",
  },

  // Migration settings
  migration: {
    enabled: true,
    autoMigrate: false, // Set to true for automatic migration
    migrationPath: "/migration", // Path for migration UI
  },

  // Performance settings
  performance: {
    enableSelectors: true,
    enableMemoization: true,
    enableDevtools: process.env.NODE_ENV === "development",
  },
} as const;

// Helper function to get store type
export const getStoreType = (): StoreType => {
  // You can also read from environment variables or localStorage
  const storedType = localStorage.getItem("storeType");
  if (
    storedType &&
    Object.values(StoreType).includes(storedType as StoreType)
  ) {
    return storedType as StoreType;
  }
  return STORE_CONFIG.currentType;
};

// Helper function to set store type
export const setStoreType = (type: StoreType): void => {
  localStorage.setItem("storeType", type);
  // You can also dispatch an event to notify components
  window.dispatchEvent(
    new CustomEvent("storeTypeChanged", { detail: { type } })
  );
};
