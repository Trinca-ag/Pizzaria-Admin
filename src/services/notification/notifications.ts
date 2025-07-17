// src/services/notifications.ts
import toast from 'react-hot-toast';

// Configurações de som
const SOUNDS = {
  newOrder: '/sounds/new-order.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  warning: '/sounds/warning.mp3',
} as const;

// Interface para configurações de notificação
export interface NotificationConfig {
  enableSound?: boolean;
  enableBrowser?: boolean;
  soundVolume?: number;
  position?: 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right';
}

// Configurações padrão
const defaultConfig: NotificationConfig = {
  enableSound: true,
  enableBrowser: true,
  soundVolume: 0.7,
  position: 'top-right',
};

// Estado das configurações
let notificationConfig: NotificationConfig = { ...defaultConfig };

// Atualizar configurações
export const updateNotificationConfig = (config: Partial<NotificationConfig>) => {
  notificationConfig = { ...notificationConfig, ...config };
  localStorage.setItem('notificationConfig', JSON.stringify(notificationConfig));
};

// Carregar configurações do localStorage
export const loadNotificationConfig = (): NotificationConfig => {
  try {
    const saved = localStorage.getItem('notificationConfig');
    if (saved) {
      notificationConfig = { ...defaultConfig, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.warn('Erro ao carregar configurações de notificação:', error);
  }
  return notificationConfig;
};

// Reproduzir som
const playSound = async (soundType: keyof typeof SOUNDS, volume: number = 0.7) => {
  if (!(notificationConfig.enableSound ?? true)) return;
  
  try {
    // Som simples usando Web Audio API
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Configurar som baseado no tipo
    switch (soundType) {
      case 'newOrder':
        // Som de notificação - duas notas
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.frequency.setValueAtTime(1000, context.currentTime + 0.1);
        break;
      case 'success':
        // Som de sucesso - nota crescente
        oscillator.frequency.setValueAtTime(600, context.currentTime);
        oscillator.frequency.setValueAtTime(800, context.currentTime + 0.1);
        break;
      case 'error':
        // Som de erro - nota descendente
        oscillator.frequency.setValueAtTime(400, context.currentTime);
        oscillator.frequency.setValueAtTime(200, context.currentTime + 0.1);
        break;
      case 'warning':
        // Som de aviso - nota única
        oscillator.frequency.setValueAtTime(500, context.currentTime);
        break;
      default:
        oscillator.frequency.setValueAtTime(440, context.currentTime);
    }
    
    // Configurar volume e duração
    gainNode.gain.setValueAtTime(volume * 0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
    
    // Tocar som
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.3);
    
    console.log(`🔊 Som ${soundType} tocado`);
  } catch (error) {
    console.warn('Erro ao reproduzir som:', error);
  }
};

// Solicitar permissão para notificações do navegador
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('Este navegador não suporta notificações');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Enviar notificação do navegador
const sendBrowserNotification = (title: string, options: NotificationOptions = {}) => {
  if (!(notificationConfig.enableBrowser ?? true) || Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification(title, {
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    ...options,
  });

  // Auto-fechar após 5 segundos
  setTimeout(() => {
    notification.close();
  }, 5000);

  return notification;
};

// ==================== NOTIFICAÇÕES ESPECÍFICAS ====================

// Novo pedido
export const notifyNewOrder = async (orderNumber: string, customerName: string) => {
  const title = `🍕 Novo Pedido #${orderNumber}`;
  const message = `Cliente: ${customerName}`;

  // Toast visual
  toast.success(message, {
    duration: 6000,
    position: notificationConfig.position || 'top-right',
    style: {
      background: '#48BB78',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
    },
    icon: '🍕',
  });

  // Som
  await playSound('newOrder', notificationConfig.soundVolume);

  // Notificação do navegador
  sendBrowserNotification(title, {
    body: message,
    tag: 'new-order',
    requireInteraction: true,
  });
};

// Status atualizado
export const notifyStatusUpdate = async (orderNumber: string, status: string) => {
  const statusMessages = {
    confirmed: 'Pedido confirmado',
    preparing: 'Em preparo',
    ready: 'Pronto para entrega',
    out_for_delivery: 'Saiu para entrega',
    delivered: 'Entregue',
    canceled: 'Cancelado',
  } as const;

  const message = `Pedido #${orderNumber}: ${statusMessages[status as keyof typeof statusMessages] || status}`;

  toast.success(message, {
    duration: 4000,
    position: notificationConfig.position || 'top-right',
    style: {
      background: '#4299E1',
      color: 'white',
    },
    icon: '📋',
  });

  await playSound('success', notificationConfig.soundVolume);
};

// Notificação de sucesso
export const notifySuccess = async (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: notificationConfig.position || 'top-right',
    style: {
      background: '#48BB78',
      color: 'white',
    },
    icon: '✅',
  });

  await playSound('success', notificationConfig.soundVolume);
};

// Notificação de erro
export const notifyError = async (message: string) => {
  toast.error(message, {
    duration: 5000,
    position: notificationConfig.position || 'top-right',
    style: {
      background: '#F56565',
      color: 'white',
    },
    icon: '❌',
  });

  await playSound('error', notificationConfig.soundVolume);
};

// Notificação de aviso
export const notifyWarning = async (message: string) => {
  toast(message, {
    duration: 4000,
    position: notificationConfig.position || 'top-right',
    style: {
      background: '#ED8936',
      color: 'white',
    },
    icon: '⚠️',
  });

  await playSound('warning', notificationConfig.soundVolume);
};

// Notificação de informação
export const notifyInfo = async (message: string) => {
  toast(message, {
    duration: 3000,
    position: notificationConfig.position || 'top-right',
    style: {
      background: '#4299E1',
      color: 'white',
    },
    icon: 'ℹ️',
  });
};

// ==================== UTILITÁRIOS ====================

// Limpar todas as notificações
export const clearAllNotifications = () => {
  toast.dismiss();
};

// Verificar se notificações estão habilitadas
export const areNotificationsEnabled = (): boolean => {
  return Notification.permission === 'granted' && (notificationConfig.enableBrowser ?? false);
};

// Testar som
export const testNotificationSound = async (soundType: keyof typeof SOUNDS = 'newOrder') => {
  await playSound(soundType, notificationConfig.soundVolume);
};

// Inicializar notificações (chamar no início da aplicação)
export const initializeNotifications = async () => {
  loadNotificationConfig();
  
  if (notificationConfig.enableBrowser ?? true) {
    await requestNotificationPermission();
  }
  
  console.log('🔔 Sistema de notificações inicializado');
};