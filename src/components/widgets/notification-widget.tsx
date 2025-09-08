'use client';

import React from 'react';
import { useNotification } from '@/hooks/use-notification';
import { Notification } from '@/stores/zustand/notification-store';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const NotificationItem: React.FC<{
    notification: Notification;
    onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
            default:
                return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    const getBackgroundColor = () => {
        switch (notification.type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'info':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    return (
        <div
            className={cn(
                'relative flex items-start gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]',
                getBackgroundColor()
            )}
            style={{
                animation: 'slideInRight 0.3s ease-out',
            }}
        >
            <div className="flex-shrink-0 mt-0.5">
                {getIcon()}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {notification.title}
                </h4>
                {notification.message && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {notification.message}
                    </p>
                )}
                {notification.action && (
                    <button
                        onClick={notification.action.onClick}
                        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        {notification.action.label}
                    </button>
                )}
            </div>

            <button
                onClick={() => onRemove(notification.id)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Đóng thông báo"
            >
                <X className="w-4 h-4 text-gray-500" />
            </button>
        </div>
    );
};

export const NotificationWidget: React.FC = () => {
    const { notifications, removeNotification } = useNotification();

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
            <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemove={removeNotification}
                />
            ))}
        </div>
    );
};
