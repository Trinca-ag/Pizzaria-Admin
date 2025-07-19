// src/pages/Dashboard/index.tsx - SEM CONFIGURAÇÕES DE NOTIFICAÇÃO
import React, { useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../contexts/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';
import { useNotifications } from '../../hooks/useNotifications';
import Button from '../../components/common/Button';
import StatCard from '../../components/Dashboard/StatCard';
import OrdersList from '../../components/Dashboard/OrdersList';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f7fafc;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const WelcomeText = styled.div`
  h1 {
    color: #ff6b35;
    font-family: 'Poppins', sans-serif;
    margin: 0 0 8px;
    font-size: 28px;
  }
  
  p {
    color: #718096;
    margin: 0;
    font-size: 16px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const NotificationIndicator = styled.div<{ hasPermission: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ hasPermission }) => hasPermission ? '#C6F6D5' : '#FED7D7'};
  color: ${({ hasPermission }) => hasPermission ? '#22543D' : '#822727'};
  font-size: 12px;
  font-weight: 600;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  h3 {
    color: #1a202c;
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    color: #4a5568;

    li {
      margin-bottom: 8px;
    }
  }
`;

const TestButtonsGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuthContext();
  const { stats, orders, isLoading, refreshData, createNewSampleData } = useDashboard();
  const { hasPermission, notifications } = useNotifications();
  
  // Ref para controlar pedidos anteriores
  const previousOrdersRef = useRef<string[]>([]);

  const handleLogout = async () => {
    try {
      await signOut();
      notifications.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro no logout:', error);
      notifications.error('Erro ao fazer logout');
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Detectar novos pedidos e enviar notificações
  useEffect(() => {
    if (!isLoading && orders.length > 0) {
      const currentOrderIds = orders.map(order => order.id);
      const previousOrderIds = previousOrdersRef.current;
      
      // Encontrar novos pedidos
      const newOrders = orders.filter(order => 
        !previousOrderIds.includes(order.id) && 
        order.status === 'pending'
      );
      
      // Notificar sobre novos pedidos
      newOrders.forEach(order => {
        notifications.newOrder(order.orderNumber, order.customerInfo.name);
      });
      
      // Atualizar ref
      previousOrdersRef.current = currentOrderIds;
    }
  }, [orders, isLoading, notifications]);

  // Função para criar dados demo com notificação
  const handleCreateSampleData = async () => {
    try {
      await createNewSampleData();
      notifications.success('Dados de demonstração criados!');
    } catch (error) {
      notifications.error('Erro ao criar dados de demonstração');
    }
  };

  // Função para atualizar dados com notificação
  const handleRefreshData = async () => {
    try {
      await refreshData();
      notifications.success('Dados atualizados!');
    } catch (error) {
      notifications.error('Erro ao atualizar dados');
    }
  };

  return (
    <>
      <DashboardContainer>
        <Header>
          <WelcomeText>
            <h1>🍕 Dashboard - Sistema Pizzaria</h1>
            <p>
              Bem-vindo, <strong>{user?.name}</strong>! ({user?.role})
              <NotificationIndicator hasPermission={hasPermission}>
                {hasPermission ? '🔔 Notificações ON' : '🔕 Notificações OFF'}
              </NotificationIndicator>
            </p>
          </WelcomeText>
          <HeaderActions>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefreshData}
              isLoading={isLoading}
            >
              Atualizar
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleCreateSampleData}
            >
              + Dados Demo
            </Button>
            <Button 
              variant="warning" 
              size="sm"
              onClick={() => notifications.clear()}
            >
              Limpar Notificações
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </HeaderActions>
        </Header>

        {/* Estatísticas */}
        <StatsGrid>
          <StatCard
            title="Pedidos Hoje"
            value={stats.todayOrders}
            icon="📋"
            color="#4299e1"
            isLoading={isLoading}
          />
          <StatCard
            title="Pedidos Pendentes"
            value={stats.pendingOrders}
            icon="⏳"
            color="#ed8936"
            isLoading={isLoading}
          />
          <StatCard
            title="Faturamento Hoje"
            value={formatCurrency(stats.todayRevenue)}
            icon="💰"
            color="#48bb78"
            isLoading={isLoading}
          />
          <StatCard
            title="Ticket Médio"
            value={formatCurrency(stats.averageOrderValue)}
            icon="📊"
            color="#9f7aea"
            isLoading={isLoading}
          />
        </StatsGrid>

        {/* Conteúdo Principal */}
        <ContentGrid>
          {/* Lista de Pedidos */}
          <OrdersList orders={orders} isLoading={isLoading} />

          {/* Informações e Testes do Sistema */}
          <div>
            <InfoCard>
              <h3>🔥 Sistema de Notificações</h3>
              <ul>
                <li>✅ Notificações visuais (toasts)</li>
                <li>✅ Notificações sonoras</li>
                <li>✅ Notificações do navegador</li>
                <li>✅ Novos pedidos em tempo real</li>
                <li>✅ Status atualizados automaticamente</li>
              </ul>
              <p style={{ 
                margin: '12px 0 0', 
                fontSize: '13px', 
                color: '#718096',
                fontStyle: 'italic' 
              }}>
                💡 Configure as notificações em <strong>Configurações → Notificações</strong>
              </p>
            </InfoCard>

            <InfoCard>
              <h3>🎯 Teste as Funcionalidades</h3>
              <TestButtonsGroup>
                <Button 
                  size="sm" 
                  variant="success"
                  onClick={() => notifications.success('Teste de sucesso!')}
                >
                  ✅ Sucesso
                </Button>
                <Button 
                  size="sm" 
                  variant="error"
                  onClick={() => notifications.error('Teste de erro!')}
                >
                  ❌ Erro
                </Button>
                <Button 
                  size="sm" 
                  variant="warning"
                  onClick={() => notifications.warning('Teste de aviso!')}
                >
                  ⚠️ Aviso
                </Button>
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => notifications.info('Teste de informação!')}
                >
                  ℹ️ Info
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => notifications.newOrder('999', 'Cliente Teste')}
                >
                  🍕 Novo Pedido
                </Button>
              </TestButtonsGroup>
            </InfoCard>

            <InfoCard>
              <h3>🚀 Próximas Funcionalidades</h3>
              <ul>
                <li>📊 Gráficos interativos com Recharts</li>
                <li>🛒 Sistema completo de produtos</li>
                <li>📈 Relatórios avançados em PDF</li>
                <li>⚙️ Configurações da pizzaria</li>
                <li>🧭 Navegação lateral completa</li>
                <li>📱 App do cliente integrado</li>
              </ul>
            </InfoCard>

            <InfoCard>
              <h3>📱 Status do Sistema</h3>
              <ul>
                <li>✅ Dashboard funcionando</li>
                <li>✅ Produtos cadastrados</li>
                <li>✅ Relatórios com gráficos</li>
                <li>✅ Configurações implementadas</li>
                <li>🔄 Pedidos em desenvolvimento</li>
                <li>🔄 Deploy em preparação</li>
              </ul>
            </InfoCard>
          </div>
        </ContentGrid>
      </DashboardContainer>

      {/* Sistema de Toasts */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
    </>
  );
};

export default Dashboard;