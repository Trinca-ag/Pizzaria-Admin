// src/pages/Dashboard/index.tsx
import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';
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
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
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

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuthContext();
  const { stats, orders, isLoading, refreshData, createNewSampleData } = useDashboard();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <DashboardContainer>
      <Header>
        <WelcomeText>
          <h1>🍕 Dashboard - Sistema Pizzaria</h1>
          <p>Bem-vindo, <strong>{user?.name}</strong>! ({user?.role})</p>
        </WelcomeText>
        <HeaderActions>
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            isLoading={isLoading}
          >
            Atualizar
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={createNewSampleData}
          >
            + Dados Demo
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

        {/* Informações do Sistema */}
        <div>
          <InfoCard>
            <h3>🔥 Firebase em Tempo Real</h3>
            <ul>
              <li>✅ Autenticação funcionando</li>
              <li>✅ Firestore conectado</li>
              <li>✅ Dados em tempo real</li>
              <li>✅ Pedidos sincronizados</li>
              <li>✅ Estatísticas atualizadas</li>
            </ul>
          </InfoCard>

          <InfoCard style={{ marginTop: '20px' }}>
            <h3>📊 Dashboard Completo</h3>
            <ul>
              <li>📈 Estatísticas em tempo real</li>
              <li>📋 Lista de pedidos atualizada</li>
              <li>🔄 Atualização de status</li>
              <li>💳 Informações de pagamento</li>
              <li>🚚 Controle de entrega</li>
            </ul>
          </InfoCard>

          <InfoCard style={{ marginTop: '20px' }}>
            <h3>🎯 Próximas Funcionalidades</h3>
            <ul>
              <li>📊 Gráficos interativos</li>
              <li>🔔 Notificações sonoras</li>
              <li>🛒 Sistema de produtos</li>
              <li>📈 Relatórios avançados</li>
              <li>⚙️ Configurações completas</li>
            </ul>
          </InfoCard>
        </div>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;