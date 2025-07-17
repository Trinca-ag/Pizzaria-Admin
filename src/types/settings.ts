// src/types/settings.ts

export interface PizzeriaSettings {
  id: string;
  businessInfo: BusinessInfo;
  operationSettings: OperationSettings;
  deliverySettings: DeliverySettings;
  paymentSettings: PaymentSettings;
  notificationSettings: NotificationSettings;
  systemSettings: SystemSettings;
  updatedAt: Date;
  updatedBy: string;
}

export interface BusinessInfo {
  name: string;
  description?: string;
  logo?: string;
  phone: string;
  email: string;
  website?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    twitter?: string;
  };
  documents?: {
    cnpj?: string;
    municipalRegistration?: string;
    stateRegistration?: string;
  };
}

export interface OperationSettings {
  operatingHours: OperatingHours[];
  holidays: Holiday[];
  defaultPreparationTime: number; // em minutos
  maxOrdersPerHour?: number;
  enableOnlineOrdering: boolean;
  enablePhoneOrdering: boolean;
  enableWalkInOrdering: boolean;
  orderNumberPrefix: string;
  orderNumberStartFrom: number;
}

export interface OperatingHours {
  dayOfWeek: number; // 0-6 (domingo = 0)
  isOpen: boolean;
  openTime: string; // "HH:mm"
  closeTime: string; // "HH:mm"
  breakStart?: string; // "HH:mm"
  breakEnd?: string; // "HH:mm"
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  isClosed: boolean;
  specialHours?: {
    openTime: string;
    closeTime: string;
  };
}

export interface DeliverySettings {
  enableDelivery: boolean;
  enablePickup: boolean;
  deliveryFee: number;
  freeDeliveryMinimum?: number;
  maxDeliveryDistance: number; // em km
  deliveryZones: DeliveryZone[];
  estimatedDeliveryTime: number; // em minutos
  deliveryTimeSlots?: TimeSlot[];
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  maxDistance: number;
  isActive: boolean;
  polygonCoordinates?: Array<{
    latitude: number;
    longitude: number;
  }>;
}

export interface TimeSlot {
  id: string;
  label: string;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  isActive: boolean;
  maxOrders?: number;
}

export interface PaymentSettings {
  acceptCash: boolean;
  acceptCard: boolean;
  acceptPix: boolean;
  acceptOnlinePayment: boolean;
  acceptBankTransfer: boolean;
  minimumOrderValue: number;
  pixKey?: string;
  bankInfo?: {
    bank: string;
    agency: string;
    account: string;
  };
  cardProcessors?: string[];
}

export interface NotificationSettings {
  enableNewOrderNotifications: boolean;
  enableStatusChangeNotifications: boolean;
  enablePaymentNotifications: boolean;
  enableInventoryNotifications: boolean;
  notificationSound: boolean;
  soundVolume: number; // 0-100
  emailNotifications: EmailNotificationSettings;
  smsNotifications: SmsNotificationSettings;
  pushNotifications: PushNotificationSettings;
}

export interface EmailNotificationSettings {
  enabled: boolean;
  newOrders: boolean;
  statusChanges: boolean;
  payments: boolean;
  dailyReports: boolean;
  weeklyReports: boolean;
  recipients: string[];
}

export interface SmsNotificationSettings {
  enabled: boolean;
  newOrders: boolean;
  statusChanges: boolean;
  recipients: string[];
}

export interface PushNotificationSettings {
  enabled: boolean;
  newOrders: boolean;
  statusChanges: boolean;
  payments: boolean;
  inventory: boolean;
}

export interface SystemSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  numberFormat: 'US' | 'BR' | 'EU';
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  maintenanceMode: boolean;
  debugMode: boolean;
}

// Formulários
export interface UpdateBusinessInfoData extends Partial<BusinessInfo> {}

export interface UpdateOperationSettingsData extends Partial<OperationSettings> {}

export interface UpdateDeliverySettingsData extends Partial<DeliverySettings> {}

export interface UpdatePaymentSettingsData extends Partial<PaymentSettings> {}

export interface UpdateNotificationSettingsData extends Partial<NotificationSettings> {}

export interface UpdateSystemSettingsData extends Partial<SystemSettings> {}

// Constantes
export const daysOfWeek = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const;

export const themes = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'auto', label: 'Automático' },
] as const;

export const languages = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'es-ES', label: 'Español' },
] as const;

export const timezones = [
  { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-3)' },
  { value: 'America/New_York', label: 'New York (UTC-5)' },
  { value: 'Europe/London', label: 'London (UTC+0)' },
] as const;

export const currencies = [
  { value: 'BRL', label: 'Real (R$)', symbol: 'R$' },
  { value: 'USD', label: 'Dólar ($)', symbol: '$' },
  { value: 'EUR', label: 'Euro (€)', symbol: '€' },
] as const;

export const dateFormats = [
  { value: 'DD/MM/YYYY', label: '31/12/2025' },
  { value: 'MM/DD/YYYY', label: '12/31/2025' },
  { value: 'YYYY-MM-DD', label: '2025-12-31' },
] as const;

export const numberFormats = [
  { value: 'BR', label: '1.234,56' },
  { value: 'US', label: '1,234.56' },
  { value: 'EU', label: '1 234,56' },
] as const;

// Validações
export interface SettingsValidationErrors {
  businessInfo?: Partial<Record<keyof BusinessInfo, string>>;
  operationSettings?: Partial<Record<keyof OperationSettings, string>>;
  deliverySettings?: Partial<Record<keyof DeliverySettings, string>>;
  paymentSettings?: Partial<Record<keyof PaymentSettings, string>>;
  notificationSettings?: Partial<Record<keyof NotificationSettings, string>>;
  systemSettings?: Partial<Record<keyof SystemSettings, string>>;
}