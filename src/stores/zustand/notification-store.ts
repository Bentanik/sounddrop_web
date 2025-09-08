import { create } from "zustand";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt">
  ) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  success: (
    title: string,
    message?: string,
    options?: Partial<Notification>
  ) => void;
  error: (
    title: string,
    message?: string,
    options?: Partial<Notification>
  ) => void;
  warning: (
    title: string,
    message?: string,
    options?: Partial<Notification>
  ) => void;
  info: (
    title: string,
    message?: string,
    options?: Partial<Notification>
  ) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date(),
      duration: notification.duration ?? 5000, // 5 seconds default
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto remove after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },

  clearAllNotifications: () => {
    set({ notifications: [] });
  },

  success: (title, message, options) => {
    get().addNotification({
      type: "success",
      title,
      message,
      ...options,
    });
  },

  error: (title, message, options) => {
    get().addNotification({
      type: "error",
      title,
      message,
      ...options,
    });
  },

  warning: (title, message, options) => {
    get().addNotification({
      type: "warning",
      title,
      message,
      ...options,
    });
  },

  info: (title, message, options) => {
    get().addNotification({
      type: "info",
      title,
      message,
      ...options,
    });
  },
}));
