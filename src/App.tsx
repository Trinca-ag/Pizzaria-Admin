// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

// Importar apenas componentes básicos que sabemos que funcionam
import Button from './components/common/Button';
import Input from './components/common/Input';
import Loading from './components/common/Loading';

// Layout
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const SimpleHeader = styled.header`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing[4]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
  text-align: center;
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
`;

const DemoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const StatusCard = styled.div<{ color: string }>`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border-left: 4px solid ${({ color }) => color};
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <Router>
      <AppContainer>
        <SimpleHeader>
          <Title>🍕 Sistema Administrativo Pizzaria</Title>
        </SimpleHeader>
        
        <Main>
          {/* Status do Sistema */}
          <Section>
            <SectionTitle>📊 Status do Sistema</SectionTitle>
            <Grid>
              <StatusCard color="#48BB78">
                <h3>✅ Projeto Criado</h3>
                <p>Estrutura completa implementada</p>
              </StatusCard>
              
              <StatusCard color="#48BB78">
                <h3>✅ Tema Configurado</h3>
                <p>Design profissional ativo</p>
              </StatusCard>
              
              <StatusCard color="#48BB78">
                <h3>✅ Componentes Básicos</h3>
                <p>Button, Input, Loading funcionando</p>
              </StatusCard>
              
              <StatusCard color="#ED8936">
                <h3>⏳ Firebase</h3>
                <p>Próximo: Configuração do banco</p>
              </StatusCard>
              
              <StatusCard color="#4299E1">
                <h3>🚀 Pronto para Deploy</h3>
                <p>Sistema base funcionando</p>
              </StatusCard>
            </Grid>
          </Section>

          {/* Demo dos Componentes */}
          <Section>
            <SectionTitle>🧪 Teste dos Componentes</SectionTitle>
            <Grid>
              <DemoGroup>
                <h4>Botões</h4>
                <Button variant="primary">
                  Botão Principal
                </Button>
                <Button variant="secondary">
                  Botão Secundário
                </Button>
                <Button variant="success">
                  Sucesso
                </Button>
                <Button 
                  variant="warning"
                  isLoading={isLoading}
                  onClick={handleLoadingTest}
                >
                  {isLoading ? 'Testando...' : 'Testar Loading'}
                </Button>
              </DemoGroup>
              
              <DemoGroup>
                <h4>Inputs</h4>
                <Input
                  label="Nome do Produto"
                  placeholder="Digite aqui..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input
                  label="Preço"
                  type="number"
                  placeholder="0,00"
                  helpText="Valor em reais"
                />
                <Input
                  label="Campo Obrigatório"
                  error="Este campo é obrigatório"
                  isRequired
                />
              </DemoGroup>
              
              <DemoGroup>
                <h4>Loading States</h4>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <Loading type="spinner" size="sm" />
                  <Loading type="dots" size="md" />
                  <Loading type="bars" size="lg" />
                </div>
                <Loading type="pulse" text="Carregando dados..." />
              </DemoGroup>
            </Grid>
          </Section>

          {/* Navegação */}
          <Section>
            <SectionTitle>🛣️ Sistema de Rotas</SectionTitle>
            <p style={{ marginBottom: '24px', color: '#4a5568' }}>
              O sistema está preparado para todas as funcionalidades principais:
            </p>
            
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <h3>📊 Dashboard</h3>
                  <p>Aqui será o painel principal com estatísticas em tempo real.</p>
                  <ul>
                    <li>Total de pedidos do dia</li>
                    <li>Faturamento em tempo real</li>
                    <li>Gráficos de performance</li>
                    <li>Pedidos pendentes</li>
                  </ul>
                </div>
              } />
              <Route path="/products" element={
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <h3>🛒 Produtos</h3>
                  <p>Sistema completo de gerenciamento de produtos.</p>
                  <ul>
                    <li>Cadastro de produtos</li>
                    <li>Categorias e variações</li>
                    <li>Upload de imagens</li>
                    <li>Controle de estoque</li>
                  </ul>
                </div>
              } />
              <Route path="/orders" element={
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <h3>📋 Pedidos</h3>
                  <p>Controle total dos pedidos em tempo real.</p>
                  <ul>
                    <li>Pedidos em tempo real</li>
                    <li>Controle de status</li>
                    <li>Histórico completo</li>
                    <li>Filtros por período</li>
                  </ul>
                </div>
              } />
              <Route path="/reports" element={
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <h3>📈 Relatórios</h3>
                  <p>Análise completa do negócio.</p>
                  <ul>
                    <li>Gráficos de vendas</li>
                    <li>Relatórios em PDF</li>
                    <li>Métricas de performance</li>
                    <li>Produtos mais vendidos</li>
                  </ul>
                </div>
              } />
              <Route path="/settings" element={
                <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
                  <h3>⚙️ Configurações</h3>
                  <p>Configurações completas do sistema.</p>
                  <ul>
                    <li>Dados da pizzaria</li>
                    <li>Horários de funcionamento</li>
                    <li>Métodos de pagamento</li>
                    <li>Notificações</li>
                  </ul>
                </div>
              } />
            </Routes>
          </Section>

          {/* Próximos Passos */}
          <Section>
            <SectionTitle>🎯 Próximos Passos</SectionTitle>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
              <h4 style={{ color: '#0369a1', marginTop: 0 }}>Sistema Pronto para Evolução!</h4>
              <p style={{ color: '#0c4a6e', marginBottom: '16px' }}>
                Agora podemos implementar qualquer módulo:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>🔥 <strong>Firebase</strong> - Auth + Database</div>
                <div>🏠 <strong>Dashboard</strong> - Estatísticas</div>
                <div>🛒 <strong>Produtos</strong> - CRUD completo</div>
                <div>📋 <strong>Pedidos</strong> - Tempo real</div>
                <div>📊 <strong>Relatórios</strong> - Gráficos + PDF</div>
                <div>⚙️ <strong>Configurações</strong> - Sistema</div>
              </div>
            </div>
          </Section>
        </Main>
      </AppContainer>
    </Router>
  );
}

export default App;