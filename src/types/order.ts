// src/types/order.ts

export interface Order {
  id: string;
  orderNumber: string; // Número sequencial para exibição
  customerId?: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryMethod: DeliveryMethod;
  deliveryInfo?: DeliveryInfo;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  notes?: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  canceledAt?: Date;
  cancelReason?: string;
  
  // Histórico de status
  statusHistory: OrderStatusHistory[];
  
  // Avaliação do cliente
  rating?: number;
  review?: string;
  reviewDate?: Date;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  document?: string; // CPF
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedVariations?: SelectedVariation[];
  notes?: string;
}

export interface SelectedVariation {
  variationId: string;
  variationName: string;
  optionId: string;
  optionName: string;
  priceModifier: number;
}

export interface DeliveryInfo {
  address: Address;
  distance?: number; // em km
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  reference?: string;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  userId?: string; // Quem alterou o status
  notes?: string;
}

export type OrderStatus = 
  | 'pending'     // Pendente (recém criado)
  | 'confirmed'   // Confirmado
  | 'preparing'   // Em preparo
  | 'ready'       // Pronto
  | 'out_for_delivery' // Saiu para entrega
  | 'delivered'   // Entregue
  | 'canceled'    // Cancelado
  | 'returned';   // Devolvido

export type PaymentMethod = 
  | 'cash'        // Dinheiro
  | 'card'        // Cartão
  | 'pix'         // PIX
  | 'online'      // Pagamento online
  | 'bank_transfer'; // Transferência

export type PaymentStatus = 
  | 'pending'     // Pendente
  | 'paid'        // Pago
  | 'failed'      // Falhou
  | 'refunded'    // Reembolsado
  | 'partial';    // Parcial

export type DeliveryMethod = 
  | 'delivery'    // Entrega
  | 'pickup';     // Retirada

// Formulários e criação
export interface CreateOrderData {
  customerInfo: CustomerInfo;
  items: Omit<OrderItem, 'id' | 'totalPrice'>[];
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  deliveryInfo?: DeliveryInfo;
  notes?: string;
}

export interface UpdateOrderData {
  id: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  notes?: string;
}

// Filtros e busca
export interface OrderFilters {
  status?: OrderStatus[];
  paymentMethod?: PaymentMethod[];
  paymentStatus?: PaymentStatus[];
  deliveryMethod?: DeliveryMethod[];
  dateFrom?: Date;
  dateTo?: Date;
  customerName?: string;
  customerPhone?: string;
  orderNumber?: string;
  minTotal?: number;
  maxTotal?: number;
  orderBy?: 'createdAt' | 'total' | 'status' | 'customerName';
  orderDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Estatísticas
export interface OrderStats {
  today: {
    total: number;
    pending: number;
    confirmed: number;
    preparing: number;
    ready: number;
    delivered: number;
    canceled: number;
    revenue: number;
  };
  thisWeek: {
    total: number;
    revenue: number;
    averageOrderValue: number;
  };
  thisMonth: {
    total: number;
    revenue: number;
    averageOrderValue: number;
  };
  averagePreparationTime: number;
  averageDeliveryTime: number;
  popularItems: Array<{
    productId: string;
    productName: string;
    quantity: number;
  }>;
  revenueByDay: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

// Mapeamento de status em português
export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  preparing: 'Em Preparo',
  ready: 'Pronto',
  out_for_delivery: 'Saiu para Entrega',
  delivered: 'Entregue',
  canceled: 'Cancelado',
  returned: 'Devolvido',
};

// Cores dos status
export const orderStatusColors: Record<OrderStatus, string> = {
  pending: '#ED8936',      // Laranja
  confirmed: '#4299E1',    // Azul
  preparing: '#9F7AEA',    // Roxo
  ready: '#48BB78',        // Verde
  out_for_delivery: '#38A169', // Verde escuro
  delivered: '#38A169',    // Verde escuro
  canceled: '#F56565',     // Vermelho
  returned: '#F56565',     // Vermelho
};

// Mapeamento de métodos de pagamento
export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: 'Dinheiro',
  card: 'Cartão',
  pix: 'PIX',
  online: 'Online',
  bank_transfer: 'Transferência',
};

// Mapeamento de status de pagamento
export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  failed: 'Falhou',
  refunded: 'Reembolsado',
  partial: 'Parcial',
};

// Mapeamento de métodos de entrega
export const deliveryMethodLabels: Record<DeliveryMethod, string> = {
  delivery: 'Entrega',
  pickup: 'Retirada',
};