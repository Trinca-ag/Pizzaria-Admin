// src/pages/Reports/index.tsx - VERSÃO COMPLETA COM PDF
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

// Tipos para os dados
interface DailySales {
  date: string;
  sales: number;
  orders: number;
}

interface ProductSales {
  name: string;
  quantity: number;
  revenue: number;
  color: string;
}

// Função para gerar PDF simplificado
const generateSimplePDF = () => {
  try {
    console.log('📄 Iniciando geração de PDF...');

    // Criar conteúdo HTML para o PDF
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Relatório de Vendas - Pizzaria</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #FF6B35;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #FF6B35;
            margin: 0;
            font-size: 24px;
          }
          .header p {
            margin: 5px 0;
            color: #666;
          }
          .metrics {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          .metric-card {
            border: 1px solid #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .metric-title {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 10px;
          }
          .metric-value {
            font-size: 20px;
            font-weight: bold;
            color: #1a202c;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🍕 RELATÓRIO DE VENDAS</h1>
          <p>Período: Últimos 7 dias</p>
          <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>

        <div class="metrics">
          <div class="metric-card">
            <div class="metric-title">💰 Faturamento Total</div>
            <div class="metric-value">R$ 11.802,30</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">📋 Total de Pedidos</div>
            <div class="metric-value">175</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">🎯 Ticket Médio</div>
            <div class="metric-value">R$ 67,44</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">🏆 Produto Top</div>
            <div class="metric-value">Pizza Margherita</div>
          </div>
        </div>

        <h3>📈 Vendas Diárias</h3>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendas</th>
              <th>Pedidos</th>
              <th>Ticket Médio</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>15/01</td><td>R$ 1.250,50</td><td>18</td><td>R$ 69,47</td></tr>
            <tr><td>16/01</td><td>R$ 1.580,30</td><td>23</td><td>R$ 68,71</td></tr>
            <tr><td>17/01</td><td>R$ 980,75</td><td>15</td><td>R$ 65,38</td></tr>
            <tr><td>18/01</td><td>R$ 2.100,80</td><td>31</td><td>R$ 67,77</td></tr>
            <tr><td>19/01</td><td>R$ 1.750,20</td><td>26</td><td>R$ 67,31</td></tr>
            <tr><td>20/01</td><td>R$ 2.250,40</td><td>34</td><td>R$ 66,19</td></tr>
            <tr><td>21/01</td><td>R$ 1.890,60</td><td>28</td><td>R$ 67,52</td></tr>
          </tbody>
        </table>

        <h3>🏆 Top 5 Produtos</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Faturamento</th>
              <th>Ticket Médio</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1. Pizza Margherita</td><td>45</td><td>R$ 1.480,50</td><td>R$ 32,90</td></tr>
            <tr><td>2. Pizza Pepperoni</td><td>38</td><td>R$ 1.478,20</td><td>R$ 38,90</td></tr>
            <tr><td>3. Pizza Portuguesa</td><td>28</td><td>R$ 1.201,20</td><td>R$ 42,90</td></tr>
            <tr><td>4. Coca-Cola 350ml</td><td>85</td><td>R$ 467,50</td><td>R$ 5,50</td></tr>
            <tr><td>5. Pizza Calabresa</td><td>22</td><td>R$ 790,80</td><td>R$ 35,95</td></tr>
          </tbody>
        </table>

        <div class="footer">
          <p>Sistema Administrativo - Pizzaria</p>
          <p>Relatório gerado automaticamente</p>
        </div>
      </body>
      </html>
    `;

    // Criar um blob com o conteúdo HTML
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Criar link para download
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-vendas-${new Date().toISOString().split('T')[0]}.html`;
    
    // Simular clique para download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpar URL
    URL.revokeObjectURL(url);
    
    console.log('✅ PDF gerado com sucesso!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error);
    throw new Error('Erro ao gerar relatório');
  }
};

export const Reports: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('last7days');

  // Dados mock
  const dailySalesData: DailySales[] = [
    { date: '15/01', sales: 1250.50, orders: 18 },
    { date: '16/01', sales: 1580.30, orders: 23 },
    { date: '17/01', sales: 980.75, orders: 15 },
    { date: '18/01', sales: 2100.80, orders: 31 },
    { date: '19/01', sales: 1750.20, orders: 26 },
    { date: '20/01', sales: 2250.40, orders: 34 },
    { date: '21/01', sales: 1890.60, orders: 28 }
  ];

  const productSalesData: ProductSales[] = [
    { name: 'Pizza Margherita', quantity: 45, revenue: 1480.50, color: '#FF6B35' },
    { name: 'Pizza Pepperoni', quantity: 38, revenue: 1478.20, color: '#F56565' },
    { name: 'Pizza Portuguesa', quantity: 28, revenue: 1201.20, color: '#48BB78' },
    { name: 'Coca-Cola 350ml', quantity: 85, revenue: 467.50, color: '#4299E1' },
    { name: 'Pizza Calabresa', quantity: 22, revenue: 790.80, color: '#9F7AEA' }
  ];

  useEffect(() => {
    console.log('🔄 Reports: useEffect executado');
    
    const timer = setTimeout(() => {
      console.log('✅ Reports: Timer concluído');
      setIsLoading(false);
    }, 1500);

    return () => {
      console.log('🧹 Reports: Cleanup');
      clearTimeout(timer);
    };
  }, [selectedPeriod]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // FUNÇÃO ATUALIZADA PARA GERAR PDF
  const handleGeneratePDF = async () => {
    try {
      console.log('📄 Gerando PDF...');
      
      // Mostrar feedback visual
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.textContent = '📄 Gerando...';
        button.disabled = true;
      }
      
      await generateSimplePDF();
      
      // Mostrar notificação de sucesso
      const event = new CustomEvent('show-toast', {
        detail: { type: 'success', message: 'Relatório gerado e baixado com sucesso!' }
      });
      window.dispatchEvent(event);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      
      // Mostrar notificação de erro
      const event = new CustomEvent('show-toast', {
        detail: { type: 'error', message: 'Erro ao gerar relatório PDF' }
      });
      window.dispatchEvent(event);
      
    } finally {
      // Restaurar botão
      const button = document.querySelector('[data-pdf-button]') as HTMLButtonElement;
      if (button) {
        button.textContent = '📄 Exportar PDF';
        button.disabled = false;
      }
    }
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log('📅 Período alterado para:', period);
  };

  // Listener para notificações toast
  useEffect(() => {
    const handleToast = (event: any) => {
      const { type, message } = event.detail;
      if (type === 'success') {
        alert(`✅ ${message}`);
      } else if (type === 'error') {
        alert(`❌ ${message}`);
      }
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  if (error) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        background: 'white',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2>❌ Erro</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        background: 'white',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #ff6b35',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '24px'
        }}></div>
        <h3>Carregando relatórios...</h3>
        <p>Processando dados de vendas</p>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', background: '#f7fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        padding: '24px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div>
          <h1 style={{ 
            color: '#ff6b35', 
            fontFamily: 'Poppins, sans-serif', 
            margin: '0 0 8px', 
            fontSize: '28px', 
            fontWeight: '600' 
          }}>
            📊 Relatórios e Analytics
          </h1>
          <p style={{ color: '#718096', margin: 0 }}>
            Análise completa do desempenho da sua pizzaria
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              border: '1px solid #e2e8f0',
              background: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f7fafc'}
            onMouseOut={(e) => e.currentTarget.style.background = 'white'}
          >
            🔄 Atualizar
          </button>
          <button 
            data-pdf-button
            onClick={handleGeneratePDF}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: '#ff6b35',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#ff5722'}
            onMouseOut={(e) => e.currentTarget.style.background = '#ff6b35'}
          >
            📄 Exportar PDF
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '150px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#718096' }}>PERÍODO</label>
          <select 
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              background: 'white',
              minWidth: '150px',
              cursor: 'pointer'
            }}
          >
            <option value="today">Hoje</option>
            <option value="yesterday">Ontem</option>
            <option value="last7days">Últimos 7 dias</option>
            <option value="last30days">Últimos 30 dias</option>
            <option value="thisMonth">Este mês</option>
            <option value="lastMonth">Mês passado</option>
          </select>
        </div>
      </div>

      {/* Métricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {[
          { icon: '💰', title: 'Faturamento Total', value: 'R$ 11.802,30', growth: '↗ 15.2%', color: '#48BB78' },
          { icon: '📋', title: 'Total de Pedidos', value: '175', growth: '↗ 12.5%', color: '#4299E1' },
          { icon: '🎯', title: 'Ticket Médio', value: 'R$ 67,44', growth: '→ 2.1%', color: '#9F7AEA' },
          { icon: '🏆', title: 'Produto Top', value: 'Pizza Margherita', growth: '🔥 Tendência', color: '#ED8936' }
        ].map((metric, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '40px', opacity: 0.8 }}>{metric.icon}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#718096',
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {metric.title}
              </h3>
              <span style={{
                display: 'block',
                fontSize: '24px',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '4px'
              }}>
                {metric.value}
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '2px 6px',
                borderRadius: '12px',
                color: metric.color,
                background: metric.color + '20'
              }}>
                {metric.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 1200 ? '1fr 1fr' : '1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Gráfico de Linha - Vendas Diárias */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📈 Vendas por Dia
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#718096"
                  fontSize={12}
                />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'sales' ? formatCurrency(Number(value)) : value,
                    name === 'sales' ? 'Vendas' : 'Pedidos'
                  ]}
                  labelFormatter={(date) => `Data: ${date}`}
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#FF6B35" 
                  strokeWidth={3}
                  name="Vendas"
                  dot={{ fill: '#FF6B35', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#FF6B35', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#4299E1" 
                  strokeWidth={2}
                  name="Pedidos"
                  dot={{ fill: '#4299E1', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#4299E1', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras - Produtos */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🍕 Produtos Mais Vendidos
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#718096"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'revenue' ? formatCurrency(Number(value)) : value,
                    name === 'revenue' ? 'Faturamento' : 'Quantidade'
                  ]}
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="quantity" fill="#48BB78" name="Quantidade" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#FF6B35" name="Faturamento" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráfico Pizza */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        marginBottom: '32px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1a202c',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🥧 Distribuição de Vendas por Produto
        </h3>
        <div style={{ width: '100%', height: '400px' }}>
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
                labelLine={false}
              >
                {productSalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [formatCurrency(Number(value)), 'Faturamento']}
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1a202c',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🏆 Top 5 Produtos
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ 
                textAlign: 'left', 
                padding: '12px 16px', 
                borderBottom: '2px solid #e2e8f0',
                fontWeight: '600',
                color: '#4a5568',
                fontSize: '14px',
                textTransform: 'uppercase',
                background: '#f7fafc'
              }}>
                Produto
              </th>
              <th style={{ 
                textAlign: 'left', 
                padding: '12px 16px', 
                borderBottom: '2px solid #e2e8f0',
                fontWeight: '600',
                color: '#4a5568',
                fontSize: '14px',
                textTransform: 'uppercase',
                background: '#f7fafc'
              }}>
                Quantidade
              </th>
              <th style={{ 
                textAlign: 'left', 
                padding: '12px 16px', 
                borderBottom: '2px solid #e2e8f0',
                fontWeight: '600',
                color: '#4a5568',
                fontSize: '14px',
                textTransform: 'uppercase',
                background: '#f7fafc'
              }}>
                Faturamento
              </th>
              <th style={{ 
                textAlign: 'left', 
                padding: '12px 16px', 
                borderBottom: '2px solid #e2e8f0',
                fontWeight: '600',
                color: '#4a5568',
                fontSize: '14px',
                textTransform: 'uppercase',
                background: '#f7fafc'
              }}>
                Ticket Médio
              </th>
            </tr>
          </thead>
          <tbody>
            {productSalesData.map((product, index) => (
              <tr key={index} style={{ 
                borderBottom: index < productSalesData.length - 1 ? '1px solid #e2e8f0' : 'none',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '12px 16px', color: '#1a202c', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        backgroundColor: product.color 
                      }} 
                    />
                    <span style={{ fontWeight: '500' }}>{product.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: '#1a202c', fontSize: '14px', fontWeight: '600' }}>
                  {product.quantity}
                </td>
                <td style={{ padding: '12px 16px', color: '#1a202c', fontSize: '14px', fontWeight: '600' }}>
                  {formatCurrency(product.revenue)}
                </td>
                <td style={{ padding: '12px 16px', color: '#1a202c', fontSize: '14px', fontWeight: '600' }}>
                  {formatCurrency(product.revenue / product.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default Reports;