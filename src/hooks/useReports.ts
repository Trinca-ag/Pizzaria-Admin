// src/hooks/useReports.ts
import { useState, useEffect } from 'react';

// Interfaces
interface DailySales {
  date: string;
  sales: number;
  orders: number;
  averageTicket: number;
}

interface ProductSales {
  name: string;
  quantity: number;
  revenue: number;
  color: string;
}

interface ReportsMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageTicket: number;
  topProduct: string;
  growth: number;
  conversionRate: number;
}

interface ReportsData {
  metrics: ReportsMetrics;
  dailySales: DailySales[];
  productSales: ProductSales[];
  topProducts: ProductSales[];
}

interface UseReportsReturn {
  data: ReportsData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  generatePDF: () => Promise<void>;
}

export const useReports = (period: string = 'last7days'): UseReportsReturn => {
  const [data, setData] = useState<ReportsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dados mock realistas
  const generateMockData = (): ReportsData => {
    const today = new Date();
    const dailySales: DailySales[] = [];
    
    // Gerar dados dos últimos 7 dias
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const baseOrders = 15 + Math.floor(Math.random() * 20);
      const baseTicket = 60 + Math.random() * 20;
      const sales = baseOrders * baseTicket;
      
      dailySales.push({
        date: date.toISOString().split('T')[0],
        sales: Math.round(sales * 100) / 100,
        orders: baseOrders,
        averageTicket: Math.round(baseTicket * 100) / 100
      });
    }

    const productSales: ProductSales[] = [
      { name: 'Pizza Margherita', quantity: 45, revenue: 1480.50, color: '#FF6B35' },
      { name: 'Pizza Pepperoni', quantity: 38, revenue: 1478.20, color: '#F56565' },
      { name: 'Pizza Portuguesa', quantity: 28, revenue: 1201.20, color: '#48BB78' },
      { name: 'Coca-Cola 350ml', quantity: 85, revenue: 467.50, color: '#4299E1' },
      { name: 'Pizza Calabresa', quantity: 22, revenue: 790.80, color: '#9F7AEA' },
      { name: 'Pudim', quantity: 15, revenue: 133.50, color: '#ED8936' },
      { name: 'Pizza Frango', quantity: 32, revenue: 1152.00, color: '#38B2AC' },
      { name: 'Guaraná 350ml', quantity: 67, revenue: 368.50, color: '#10B981' }
    ];

    const totalRevenue = dailySales.reduce((sum, day) => sum + day.sales, 0);
    const totalOrders = dailySales.reduce((sum, day) => sum + day.orders, 0);
    const averageTicket = totalRevenue / totalOrders;

    const metrics: ReportsMetrics = {
      totalRevenue,
      totalOrders,
      averageTicket,
      topProduct: productSales[0].name,
      growth: 12.5 + Math.random() * 10,
      conversionRate: 75 + Math.random() * 15
    };

    return {
      metrics,
      dailySales,
      productSales,
      topProducts: productSales.slice(0, 5)
    };
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular carregamento da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = generateMockData();
      setData(mockData);
      
    } catch (err) {
      setError('Erro ao carregar dados dos relatórios');
      console.error('Erro nos relatórios:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar dados quando o período mudar
  useEffect(() => {
    loadData();
  }, [period]);

  const refreshData = async () => {
    await loadData();
  };

  const generatePDF = async () => {
    if (!data) return;
    
    try {
      // Importar a função de geração de PDF
      const { generateReportPDF } = await import('../components/Reports/PDFGenerator');
      
      const reportData = {
        period,
        totalRevenue: data.metrics.totalRevenue,
        totalOrders: data.metrics.totalOrders,
        averageTicket: data.metrics.averageTicket,
        topProduct: data.metrics.topProduct,
        dailySales: data.dailySales,
        topProducts: data.topProducts
      };
      
      await generateReportPDF(reportData);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw new Error('Erro ao gerar relatório PDF');
    }
  };

  return {
    data,
    isLoading,
    error,
    refreshData,
    generatePDF
  };
};

// Hook para métricas específicas
export const useReportsMetrics = (period: string) => {
  const { data, isLoading, error } = useReports(period);
  
  return {
    metrics: data?.metrics || null,
    isLoading,
    error
  };
};

// Hook para dados de gráficos
export const useChartsData = (period: string) => {
  const { data, isLoading, error } = useReports(period);
  
  return {
    dailySales: data?.dailySales || [],
    productSales: data?.productSales || [],
    isLoading,
    error
  };
};