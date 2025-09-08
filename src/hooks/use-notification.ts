import { useNotificationStore } from "@/stores/zustand/notification-store";

export const useNotification = () => {
  const {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info,
  } = useNotificationStore();

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info,
  };
};
