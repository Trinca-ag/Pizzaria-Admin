// src/hooks/useNotifications.ts
import { useState, useEffect, useCallback } from 'react';
import {
  NotificationConfig,
  loadNotificationConfig,
  updateNotificationConfig,
  requestNotificationPermission,
  areNotificationsEnabled,
  testNotificationSound,
  initializeNotifications,
  notifyNewOrder,
  notifyStatusUpdate,
  notifySuccess,
  notifyError,
  notifyWarning,
  notifyInfo,
  clearAllNotifications,
} from '../services/notification/notifications';

export const useNotifications = () => {
  const [config, setConfig] = useState<NotificationConfig>(loadNotificationConfig());
  const [hasPermission, setHasPermission] = useState(areNotificationsEnabled());

  // Inicializar notificações
  useEffect(() => {
    const initialize = async () => {
      await initializeNotifications();
      setHasPermission(areNotificationsEnabled());
    };
    
    initialize();
  }, []);

  // Atualizar configurações
  const updateConfig = useCallback((newConfig: Partial<NotificationConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    updateNotificationConfig(newConfig);
  }, [config]);

  // Solicitar permissão
  const requestPermission = useCallback(async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);
    return granted;
  }, []);

  // Testar som
  const testSound = useCallback(async (soundType: 'newOrder' | 'success' | 'error' | 'warning' = 'newOrder') => {
    await testNotificationSound(soundType);
  }, []);

  // Notificações específicas
  const notifications = {
    newOrder: notifyNewOrder,
    statusUpdate: notifyStatusUpdate,
    success: notifySuccess,
    error: notifyError,
    warning: notifyWarning,
    info: notifyInfo,
    clear: clearAllNotifications,
  };

  return {
    config,
    hasPermission,
    updateConfig,
    requestPermission,
    testSound,
    notifications,
  };
};