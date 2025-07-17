// src/services/firebase/firestore.ts
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  QuerySnapshot,
  DocumentSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db, COLLECTIONS } from './config';
import { Order } from '../../types/order';
import { Product } from '../../types/product';
import { Category } from '../../types/category';

// Helper para converter timestamp do Firestore
export const convertTimestamp = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp?.seconds) {
    return new Date(timestamp.seconds * 1000);
  }
  return new Date(timestamp);
};

// ==================== ORDERS ====================

// Buscar pedidos do dia
export const getTodayOrders = async (): Promise<Order[]> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('createdAt', '>=', Timestamp.fromDate(today)),
      where('createdAt', '<', Timestamp.fromDate(tomorrow)),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as Order[];
  } catch (error) {
    console.error('Erro ao buscar pedidos do dia:', error);
    return [];
  }
};

// Escutar pedidos em tempo real
export const subscribeToTodayOrders = (callback: (orders: Order[]) => void) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const q = query(
    collection(db, COLLECTIONS.ORDERS),
    where('createdAt', '>=', Timestamp.fromDate(today)),
    where('createdAt', '<', Timestamp.fromDate(tomorrow)),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as Order[];
    
    callback(orders);
  });
};

// Atualizar status do pedido
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Status do pedido atualizado:', orderId, status);
  } catch (error) {
    console.error('❌ Erro ao atualizar status:', error);
    throw error;
  }
};

// ==================== PRODUCTS ====================

// Buscar produtos mais vendidos
export const getTopProducts = async (limit_count: number = 5): Promise<any[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('isActive', '==', true),
      orderBy('salesCount', 'desc'),
      limit(limit_count)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos mais vendidos:', error);
    return [];
  }
};

// ==================== STATISTICS ====================

// Interface para estatísticas
export interface DashboardStats {
  todayOrders: number;
  pendingOrders: number;
  completedOrders: number;
  canceledOrders: number;
  todayRevenue: number;
  averageOrderValue: number;
}

// Calcular estatísticas do dashboard
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Pedidos de hoje
    const ordersQuery = query(
      collection(db, COLLECTIONS.ORDERS),
      where('createdAt', '>=', Timestamp.fromDate(today)),
      where('createdAt', '<', Timestamp.fromDate(tomorrow))
    );

    const ordersSnapshot = await getDocs(ordersQuery);
    const todayOrders = ordersSnapshot.docs.map(doc => doc.data()) as any[];

    // Calcular estatísticas
    const stats: DashboardStats = {
      todayOrders: todayOrders.length,
      pendingOrders: todayOrders.filter(order => 
        ['pending', 'confirmed', 'preparing'].includes(order.status)
      ).length,
      completedOrders: todayOrders.filter(order => 
        order.status === 'delivered'
      ).length,
      canceledOrders: todayOrders.filter(order => 
        order.status === 'canceled'
      ).length,
      todayRevenue: todayOrders
        .filter(order => order.status !== 'canceled')
        .reduce((sum, order) => sum + (order.total || 0), 0),
      averageOrderValue: 0,
    };

    // Calcular ticket médio
    const completedOrdersCount = stats.completedOrders + 
      todayOrders.filter(order => 
        ['confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(order.status)
      ).length;

    if (completedOrdersCount > 0) {
      stats.averageOrderValue = stats.todayRevenue / completedOrdersCount;
    }

    return stats;
  } catch (error) {
    console.error('Erro ao calcular estatísticas:', error);
    return {
      todayOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      canceledOrders: 0,
      todayRevenue: 0,
      averageOrderValue: 0,
    };
  }
};

// ==================== SAMPLE DATA ====================

// Criar dados de exemplo para demonstração
export const createSampleData = async () => {
  try {
    const batch = writeBatch(db);

    // Categorias de exemplo
    const categories = [
      { name: 'Pizzas Tradicionais', description: 'Sabores clássicos', icon: '🍕', color: '#FF6B35', isActive: true, order: 1 },
      { name: 'Pizzas Especiais', description: 'Sabores únicos', icon: '⭐', color: '#F56565', isActive: true, order: 2 },
      { name: 'Bebidas', description: 'Refrigerantes e sucos', icon: '🥤', color: '#4299E1', isActive: true, order: 3 },
      { name: 'Sobremesas', description: 'Doces e sobremesas', icon: '🍰', color: '#48BB78', isActive: true, order: 4 },
    ];

    // Adicionar categorias
    categories.forEach((category, index) => {
      const categoryRef = doc(collection(db, COLLECTIONS.CATEGORIES));
      batch.set(categoryRef, {
        ...category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    // Produtos de exemplo
    const products = [
      { name: 'Pizza Margherita', description: 'Molho de tomate, mussarela e manjericão', price: 32.90, categoryId: 'pizzas-tradicionais', preparationTime: 25, salesCount: 45, isActive: true },
      { name: 'Pizza Pepperoni', description: 'Molho de tomate, mussarela e pepperoni', price: 38.90, categoryId: 'pizzas-tradicionais', preparationTime: 25, salesCount: 52, isActive: true },
      { name: 'Pizza Calabresa', description: 'Molho de tomate, mussarela e calabresa', price: 35.90, categoryId: 'pizzas-tradicionais', preparationTime: 25, salesCount: 38, isActive: true },
      { name: 'Pizza Portuguesa', description: 'Molho, mussarela, presunto, ovos, cebola e azeitona', price: 42.90, categoryId: 'pizzas-especiais', preparationTime: 30, salesCount: 28, isActive: true },
      { name: 'Coca-Cola 350ml', description: 'Refrigerante gelado', price: 5.50, categoryId: 'bebidas', preparationTime: 2, salesCount: 85, isActive: true },
      { name: 'Pudim', description: 'Pudim de leite condensado', price: 8.90, categoryId: 'sobremesas', preparationTime: 5, salesCount: 15, isActive: true },
    ];

    // Adicionar produtos
    products.forEach((product) => {
      const productRef = doc(collection(db, COLLECTIONS.PRODUCTS));
      batch.set(productRef, {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    // Pedidos de exemplo para hoje
    const sampleOrders = [
      {
        orderNumber: '001',
        customerInfo: { name: 'João Silva', phone: '(11) 99999-9999', email: 'joao@email.com' },
        items: [
          { id: '1', productName: 'Pizza Margherita', quantity: 1, unitPrice: 32.90, totalPrice: 32.90 },
          { id: '2', productName: 'Coca-Cola 350ml', quantity: 2, unitPrice: 5.50, totalPrice: 11.00 }
        ],
        status: 'pending',
        paymentMethod: 'card',
        paymentStatus: 'pending',
        deliveryMethod: 'delivery',
        subtotal: 43.90,
        deliveryFee: 5.00,
        discount: 0,
        total: 48.90,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      {
        orderNumber: '002',
        customerInfo: { name: 'Maria Santos', phone: '(11) 88888-8888', email: 'maria@email.com' },
        items: [
          { id: '1', productName: 'Pizza Pepperoni', quantity: 1, unitPrice: 38.90, totalPrice: 38.90 }
        ],
        status: 'preparing',
        paymentMethod: 'pix',
        paymentStatus: 'paid',
        deliveryMethod: 'pickup',
        subtotal: 38.90,
        deliveryFee: 0,
        discount: 0,
        total: 38.90,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      {
        orderNumber: '003',
        customerInfo: { name: 'Pedro Costa', phone: '(11) 77777-7777' },
        items: [
          { id: '1', productName: 'Pizza Portuguesa', quantity: 1, unitPrice: 42.90, totalPrice: 42.90 },
          { id: '2', productName: 'Pudim', quantity: 1, unitPrice: 8.90, totalPrice: 8.90 }
        ],
        status: 'delivered',
        paymentMethod: 'cash',
        paymentStatus: 'paid',
        deliveryMethod: 'delivery',
        subtotal: 51.80,
        deliveryFee: 7.00,
        discount: 5.00,
        total: 53.80,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    ];

    // Adicionar pedidos
    sampleOrders.forEach((order) => {
      const orderRef = doc(collection(db, COLLECTIONS.ORDERS));
      batch.set(orderRef, order);
    });

    await batch.commit();
    console.log('✅ Dados de exemplo criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar dados de exemplo:', error);
  }
};