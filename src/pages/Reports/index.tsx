// src/pages/Reports/index.tsx
import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Toaster } from 'react-hot-toast';
import { useNotifications } from '../../hooks/useNotifications';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  ReportsContainer,
  ReportsHeader,
  ReportsTitle,
  ReportsActions,
  FilterContainer,
  FilterGroup,
  MetricsGrid,
  MetricCard,
  ChartsContainer,
  ChartSection,
  ChartTitle,
  ChartWrapper,
  TableSection,
  Table,
  EmptyState,
  LoadingContainer
} from './styles';

// Tipos
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

export const Reports: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('last7days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [metrics, setMetrics] = useState<ReportsMetrics | null>(null);
  const [dailySalesData, setDailySalesData] = useState<DailySales[]>([]);
  const [productSalesData, setProductSalesData] = useState<ProductSales[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const { notifications } = useNotifications();

  // Dados mock para demonstração - CORRIGIDOS
  const mockDailySales: DailySales[] = [
    { date: '15/01', sales: 1250.50, orders: 18, averageTicket: 69.47 },
    { date: '16/01', sales: 1580.30, orders: 23, averageTicket: 68.71 },
    { date: '17/01', sales: 980.75, orders: 15, averageTicket: 65.38 },
    { date: '18/01', sales: 2100.80, orders: 31, averageTicket: 67.77 },
    { date: '19/01', sales: 1750.20, orders: 26, averageTicket: 67.31 },
    { date: '20/01', sales: 2250.40, orders: 34, averageTicket: 66.19 },
    { date: '21/01', sales: 1890.60, orders: 28, averageTicket: 67.52 }
  ];

  const mockProductSales: ProductSales[] = [
    { name: 'Pizza Margherita', quantity: 45, revenue: 1480.50, color: '#FF6B35' },
    { name: 'Pizza Pepperoni', quantity: 38, revenue: 1478.20, color: '#F56565' },
    { name: 'Pizza Portuguesa', quantity: 28, revenue: 1201.20, color: '#48BB78' },
    { name: 'Coca-Cola 350ml', quantity: 85, revenue: 467.50, color: '#4299E1' },
    { name: 'Pizza Calabresa', quantity: 22, revenue: 790.80, color: '#9F7AEA' },
    { name: 'Pudim', quantity: 15, revenue: 133.50, color: '#ED8936' }
  ];

  const mockMetrics: ReportsMetrics = {
    totalRevenue: 11802.30,
    totalOrders: 175,
    averageTicket: 67.44,
    topProduct: 'Pizza Margherita',
    growth: 15.2,
    conversionRate: 78.5
  };

  // Carregar dados - CORRIGIDO
  useEffect(() => {
    const loadReportsData = async () => {
      try {
        setIsLoading(true);
        console.log('🔄 Carregando dados dos relatórios...');
        
        // Simular carregamento de dados
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics(mockMetrics);
        setDailySalesData(mockDailySales);
        setProductSalesData(mockProductSales);
        setTopProducts(mockProductSales.slice(0, 5));
        
        console.log('✅ Dados dos relatórios carregados com sucesso');
        
      } catch (error) {
        console.error('❌ Erro ao carregar relatórios:', error);
        notifications.error('Erro ao carregar dados dos relatórios');
      } finally {
        setIsLoading(false);
      }
    };

    loadReportsData();
  }, [notifications]); // Removido selectedPeriod da dependência para evitar loop

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    notifications.info(`Período alterado para: ${period}`);
  };

  const handleCustomDateFilter = () => {
    if (!startDate || !endDate) {
      notifications.warning('Selecione as datas de início e fim');
      return;
    }
    
    notifications.info(`Filtro aplicado: ${startDate} a ${endDate}`);
  };

  const handleGeneratePDF = async () => {
    if (!metrics || !dailySalesData || !topProducts) {
      notifications.warning('Dados insuficientes para gerar o relatório');
      return;
    }

    try {
      notifications.info('Gerando relatório em PDF...');
      
      // Importação dinâmica para evitar erros
      const module = await import('../../components/Reports/PDFGenerator');
      const { generateReportPDF } = module;
      
      const reportData = {
        period: selectedPeriod === 'last7days' ? 'Últimos 7 dias' : selectedPeriod,
        totalRevenue: metrics.totalRevenue,
        totalOrders: metrics.totalOrders,
        averageTicket: metrics.averageTicket,
        topProduct: metrics.topProduct,
        dailySales: dailySalesData.map(item => ({
          date: item.date,
          sales: item.sales,
          orders: item.orders
        })),
        topProducts: topProducts.map(item => ({
          name: item.name,
          quantity: item.quantity,
          revenue: item.revenue
        }))
      };
      
      await generateReportPDF(reportData);
      notifications.success('Relatório PDF gerado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      notifications.error('Erro ao gerar relatório PDF');
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (isLoading) {
    return (
      <ReportsContainer>
        <LoadingContainer>
          <div className="loading-spinner" />
          <h3>Carregando relatórios...</h3>
          <p>Processando dados de vendas</p>
        </LoadingContainer>
      </ReportsContainer>
    );
  }

  if (!metrics) {
    return (
      <ReportsContainer>
        <EmptyState>
          <h3>❌ Erro ao carregar dados</h3>
          <p>Não foi possível carregar os dados dos relatórios</p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </EmptyState>
      </ReportsContainer>
    );
  }

  return (
    <>
      <ReportsContainer>
        <ReportsHeader>
          <div>
            <ReportsTitle>📊 Relatórios e Analytics</ReportsTitle>
            <p style={{ color: '#718096', margin: 0 }}>
              Análise completa do desempenho da sua pizzaria
            </p>
          </div>
          <ReportsActions>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              🔄 Atualizar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleGeneratePDF}
            >
              📄 Exportar PDF
            </Button>
          </ReportsActions>
        </ReportsHeader>

        {/* Filtros */}
        <FilterContainer>
          <FilterGroup>
            <label>Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                minWidth: '150px'
              }}
            >
              <option value="today">Hoje</option>
              <option value="yesterday">Ontem</option>
              <option value="last7days">Últimos 7 dias</option>
              <option value="last30days">Últimos 30 dias</option>
              <option value="thisMonth">Este mês</option>
              <option value="lastMonth">Mês passado</option>
              <option value="custom">Período customizado</option>
            </select>
          </FilterGroup>

          {selectedPeriod === 'custom' && (
            <>
              <FilterGroup>
                <label>Data início</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  size="sm"
                />
              </FilterGroup>
              <FilterGroup>
                <label>Data fim</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  size="sm"
                />
              </FilterGroup>
              <FilterGroup>
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={handleCustomDateFilter}
                  style={{ marginTop: '20px' }}
                >
                  Aplicar Filtro
                </Button>
              </FilterGroup>
            </>
          )}
        </FilterContainer>

        {/* Métricas Principais */}
        <MetricsGrid>
          <MetricCard>
            <div className="icon">💰</div>
            <div className="content">
              <h3>Faturamento Total</h3>
              <span className="value">{formatCurrency(metrics.totalRevenue)}</span>
              <span className="growth positive">↗ {metrics.growth.toFixed(1)}%</span>
            </div>
          </MetricCard>
          
          <MetricCard>
            <div className="icon">📋</div>
            <div className="content">
              <h3>Total de Pedidos</h3>
              <span className="value">{metrics.totalOrders}</span>
              <span className="growth positive">↗ 12.5%</span>
            </div>
          </MetricCard>
          
          <MetricCard>
            <div className="icon">🎯</div>
            <div className="content">
              <h3>Ticket Médio</h3>
              <span className="value">{formatCurrency(metrics.averageTicket)}</span>
              <span className="growth neutral">→ 2.1%</span>
            </div>
          </MetricCard>
          
          <MetricCard>
            <div className="icon">🏆</div>
            <div className="content">
              <h3>Produto Top</h3>
              <span className="value">{metrics.topProduct}</span>
              <span className="growth positive">🔥 Tendência</span>
            </div>
          </MetricCard>
        </MetricsGrid>

        {/* Gráficos */}
        <ChartsContainer>
          {/* Gráfico de Vendas Diárias */}
          <ChartSection>
            <ChartTitle>📈 Vendas por Dia</ChartTitle>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#718096"
                  />
                  <YAxis stroke="#718096" />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      name === 'sales' ? formatCurrency(Number(value)) : value,
                      name === 'sales' ? 'Vendas' : name === 'orders' ? 'Pedidos' : 'Ticket Médio'
                    ]}
                    labelFormatter={(date) => `Data: ${date}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#FF6B35" 
                    strokeWidth={3}
                    name="Vendas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#4299E1" 
                    strokeWidth={2}
                    name="Pedidos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ChartSection>

          {/* Gráfico de Produtos Mais Vendidos */}
          <ChartSection>
            <ChartTitle>🍕 Produtos Mais Vendidos</ChartTitle>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productSalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#718096"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#718096" />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      name === 'revenue' ? formatCurrency(Number(value)) : value,
                      name === 'revenue' ? 'Faturamento' : 'Quantidade'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="quantity" fill="#48BB78" name="Quantidade" />
                  <Bar dataKey="revenue" fill="#FF6B35" name="Faturamento" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ChartSection>
        </ChartsContainer>

        {/* Gráfico Pizza */}
        <ChartSection>
          <ChartTitle>🥧 Distribuição de Vendas por Produto</ChartTitle>
          <ChartWrapper style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productSalesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="revenue"
                  label={(entry) => `${entry.name}: ${formatCurrency(entry.revenue)}`}
                >
                  {productSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Faturamento']}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </ChartSection>

        {/* Tabela de Top Produtos */}
        <TableSection>
          <ChartTitle>🏆 Top 5 Produtos</ChartTitle>
          <Table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Faturamento</th>
                <th>Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div 
                        style={{ 
                          width: '12px', 
                          height: '12px', 
                          borderRadius: '50%', 
                          backgroundColor: product.color 
                        }} 
                      />
                      {product.name}
                    </div>
                  </td>
                  <td>{product.quantity}</td>
                  <td>{formatCurrency(product.revenue)}</td>
                  <td>{formatCurrency(product.revenue / product.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableSection>
      </ReportsContainer>

      <Toaster position="top-right" />
    </>
  );
};

export default Reports;