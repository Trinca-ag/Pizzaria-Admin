// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { 
  getDashboardStats, 
  subscribeToTodayOrders, 
  createSampleData,
  DashboardStats 
} from '../services/firebase/firestore';
import { Order } from '../types/order';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    todayOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    todayRevenue: 0,
    averageOrderValue: 0,
  });
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCreatedSampleData, setHasCreatedSampleData] = useState(false);

  // Carregar estatísticas iniciais
  const loadStats = async () => {
    try {
      const dashboardStats = await getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setError('Erro ao carregar estatísticas');
    }
  };

  // Criar dados de exemplo se não existirem
  const initializeSampleData = async () => {
    try {
      // Verificar se já existem dados
      const initialStats = await getDashboardStats();
      
      // Se não há pedidos hoje, criar dados de exemplo
      if (initialStats.todayOrders === 0 && !hasCreatedSampleData) {
        console.log('📊 Criando dados de exemplo...');
        await createSampleData();
        setHasCreatedSampleData(true);
        
        // Recarregar estatísticas após criar dados
        setTimeout(loadStats, 1000);
      }
    } catch (error) {
      console.error('Erro ao inicializar dados:', error);
    }
  };

  // Configurar listener de pedidos em tempo real
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupRealtimeListener = () => {
      try {
        unsubscribe = subscribeToTodayOrders((realtimeOrders) => {
          setOrders(realtimeOrders);
          setIsLoading(false);
          
          // Recalcular estatísticas com dados em tempo real
          const newStats: DashboardStats = {
            todayOrders: realtimeOrders.length,
            pendingOrders: realtimeOrders.filter(order => 
              ['pending', 'confirmed', 'preparing'].includes(order.status)
            ).length,
            completedOrders: realtimeOrders.filter(order => 
              order.status === 'delivered'
            ).length,
            canceledOrders: realtimeOrders.filter(order => 
              order.status === 'canceled'
            ).length,
            todayRevenue: realtimeOrders
              .filter(order => order.status !== 'canceled')
              .reduce((sum, order) => sum + (order.total || 0), 0),
            averageOrderValue: 0,
          };

          // Calcular ticket médio
          const validOrders = realtimeOrders.filter(order => 
            order.status !== 'canceled'
          );
          
          if (validOrders.length > 0) {
            newStats.averageOrderValue = newStats.todayRevenue / validOrders.length;
          }

          setStats(newStats);
        });
      } catch (error) {
        console.error('Erro ao configurar listener:', error);
        setError('Erro ao conectar com dados em tempo real');
        setIsLoading(false);
      }
    };

    // Inicializar dados e configurar listener
    const initialize = async () => {
      await initializeSampleData();
      setupRealtimeListener();
    };

    initialize();

    // Cleanup
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [hasCreatedSampleData]);

  // Função para atualizar dados manualmente
  const refreshData = async () => {
    setIsLoading(true);
    await loadStats();
    setIsLoading(false);
  };

  // Função para criar novos dados de exemplo
  const createNewSampleData = async () => {
    try {
      setIsLoading(true);
      await createSampleData();
      await loadStats();
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao criar dados:', error);
      setError('Erro ao criar dados de exemplo');
      setIsLoading(false);
    }
  };

  return {
    stats,
    orders,
    isLoading,
    error,
    refreshData,
    createNewSampleData,
  };
};