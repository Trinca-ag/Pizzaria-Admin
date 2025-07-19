// src/pages/Settings/index.tsx - COM NOTIFICAÇÕES COMPLETAS E TEMA INTEGRADO
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNotifications } from '../../hooks/useNotifications';
import { useTheme } from '../../contexts/ThemeContext'; // NOVO IMPORT
import {
  SettingsContainer,
  SettingsHeader,
  SettingsTitle,
  SettingsActions,
  SettingsContent,
  SettingsSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SettingsMain,
  SettingsSection,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  FormGrid,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelect,
  CheckboxGroup,
  SwitchGroup,
  Switch,
  ImageUpload,
  SaveButton,
  AlertBox
} from './styles';

// Tipos para configurações
interface BusinessSettings {
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  logo: string;
}

interface DeliverySettings {
  enableDelivery: boolean;
  deliveryFee: number;
  freeDeliveryMinimum: number;
  maxDeliveryDistance: number;
  estimatedTime: number;
}

interface PaymentSettings {
  acceptCash: boolean;
  acceptCard: boolean;
  acceptPix: boolean;
  minimumOrderValue: number;
  pixKey: string;
}

interface SystemSettings {
  language: string;
  timezone: string;
  autoBackup: boolean;
  maintenanceMode: boolean;
}

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('business');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Hook de notificações
  const { config, hasPermission, updateConfig, requestPermission, testSound, notifications } = useNotifications();
  
  // NOVO: Hook de tema
  const { theme, actualTheme, setTheme } = useTheme();

  // Estados das configurações
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    name: 'Pizzaria Delícia',
    description: 'A melhor pizzaria da cidade com ingredientes frescos e sabores únicos',
    phone: '(11) 99999-9999',
    email: 'contato@pizzariadelicia.com.br',
    website: 'www.pizzariadelicia.com.br',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    logo: ''
  });

  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>({
    enableDelivery: true,
    deliveryFee: 5.00,
    freeDeliveryMinimum: 50.00,
    maxDeliveryDistance: 10,
    estimatedTime: 45
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    acceptCash: true,
    acceptCard: true,
    acceptPix: true,
    minimumOrderValue: 20.00,
    pixKey: 'pizzaria@email.com'
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    autoBackup: true,
    maintenanceMode: false
  });

  // Menu lateral
  const menuItems = [
    { id: 'business', label: 'Dados da Pizzaria', icon: '🏪' },
    { id: 'delivery', label: 'Entrega', icon: '🚚' },
    { id: 'payment', label: 'Pagamentos', icon: '💳' },
    { id: 'notifications', label: 'Notificações', icon: '🔔' },
    { id: 'system', label: 'Sistema', icon: '⚙️' }
  ];

  // Função para salvar configurações
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simular salvamento no Firebase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('💾 Configurações salvas:', {
        business: businessSettings,
        delivery: deliverySettings,
        payment: paymentSettings,
        notifications: config,
        system: systemSettings,
        theme: theme
      });

      setSaveMessage({ type: 'success', message: 'Configurações salvas com sucesso!' });
      notifications.success('Configurações salvas com sucesso!');
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSaveMessage(null), 3000);
      
    } catch (error) {
      console.error('❌ Erro ao salvar:', error);
      setSaveMessage({ type: 'error', message: 'Erro ao salvar configurações' });
      notifications.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  // Função para upload de logo
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBusinessSettings(prev => ({
          ...prev,
          logo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Renderizar seção de dados da pizzaria
  const renderBusinessSection = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>🏪 Dados da Pizzaria</SectionTitle>
        <SectionDescription>
          Informações básicas sobre sua pizzaria que aparecerão para os clientes
        </SectionDescription>
      </SectionHeader>

      <FormGrid>
        <FormGroup>
          <FormLabel>Nome da Pizzaria</FormLabel>
          <FormInput
            type="text"
            value={businessSettings.name}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              name: e.target.value
            }))}
            placeholder="Ex: Pizzaria Delícia"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Telefone</FormLabel>
          <FormInput
            type="tel"
            value={businessSettings.phone}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              phone: e.target.value
            }))}
            placeholder="(11) 99999-9999"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormInput
            type="email"
            value={businessSettings.email}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              email: e.target.value
            }))}
            placeholder="contato@pizzaria.com"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Website (opcional)</FormLabel>
          <FormInput
            type="url"
            value={businessSettings.website}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              website: e.target.value
            }))}
            placeholder="www.pizzaria.com"
          />
        </FormGroup>

        <FormGroup className="full-width">
          <FormLabel>Descrição</FormLabel>
          <FormTextArea
            value={businessSettings.description}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              description: e.target.value
            }))}
            placeholder="Descreva sua pizzaria..."
            rows={3}
          />
        </FormGroup>
      </FormGrid>

      <h3 style={{ color: '#1a202c', marginBottom: '16px', fontSize: '16px' }}>📍 Endereço</h3>
      <FormGrid>
        <FormGroup>
          <FormLabel>Rua</FormLabel>
          <FormInput
            type="text"
            value={businessSettings.address.street}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value }
            }))}
            placeholder="Rua das Flores"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Número</FormLabel>
          <FormInput
            type="text"
            value={businessSettings.address.number}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              address: { ...prev.address, number: e.target.value }
            }))}
            placeholder="123"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Bairro</FormLabel>
          <FormInput
            type="text"
            value={businessSettings.address.neighborhood}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              address: { ...prev.address, neighborhood: e.target.value }
            }))}
            placeholder="Centro"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Cidade</FormLabel>
          <FormInput
            type="text"
            value={businessSettings.address.city}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value }
            }))}
            placeholder="São Paulo"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Estado</FormLabel>
          <FormSelect
            value={businessSettings.address.state}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              address: { ...prev.address, state: e.target.value }
            }))}
          >
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="PR">Paraná</option>
            <option value="SC">Santa Catarina</option>
            <option value="RS">Rio Grande do Sul</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>CEP</FormLabel>
          <FormInput
            type="text"
            value={businessSettings.address.zipCode}
            onChange={(e) => setBusinessSettings(prev => ({
              ...prev,
              address: { ...prev.address, zipCode: e.target.value }
            }))}
            placeholder="01234-567"
          />
        </FormGroup>
      </FormGrid>

      <h3 style={{ color: '#1a202c', marginBottom: '16px', fontSize: '16px' }}>🖼️ Logo da Pizzaria</h3>
      <ImageUpload>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          id="logo-upload"
        />
        <label htmlFor="logo-upload">
          <div className="upload-content">
            {businessSettings.logo ? (
              <img 
                src={businessSettings.logo} 
                alt="Logo" 
                style={{ 
                  maxWidth: '150px', 
                  maxHeight: '150px', 
                  borderRadius: '8px',
                  marginBottom: '12px'
                }} 
              />
            ) : (
              <div className="upload-icon">🖼️</div>
            )}
            <div className="upload-text">
              {businessSettings.logo ? 'Clique para alterar a logo' : 'Clique para adicionar uma logo'}
            </div>
            <div className="upload-hint">PNG, JPG até 2MB</div>
          </div>
        </label>
      </ImageUpload>
    </SettingsSection>
  );

  // Renderizar seção de entrega
  const renderDeliverySection = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>🚚 Configurações de Entrega</SectionTitle>
        <SectionDescription>
          Configure como funcionará o sistema de entregas da sua pizzaria
        </SectionDescription>
      </SectionHeader>

      <SwitchGroup>
        <div className="switch-info">
          <div className="switch-title">Habilitar Entrega</div>
          <div className="switch-description">Permitir que clientes solicitem entrega</div>
        </div>
        <Switch>
          <input
            type="checkbox"
            checked={deliverySettings.enableDelivery}
            onChange={(e) => setDeliverySettings(prev => ({
              ...prev,
              enableDelivery: e.target.checked
            }))}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      {deliverySettings.enableDelivery && (
        <FormGrid>
          <FormGroup>
            <FormLabel>Taxa de Entrega (R$)</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={deliverySettings.deliveryFee}
              onChange={(e) => setDeliverySettings(prev => ({
                ...prev,
                deliveryFee: parseFloat(e.target.value) || 0
              }))}
              placeholder="5.00"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Entrega Grátis Acima de (R$)</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={deliverySettings.freeDeliveryMinimum}
              onChange={(e) => setDeliverySettings(prev => ({
                ...prev,
                freeDeliveryMinimum: parseFloat(e.target.value) || 0
              }))}
              placeholder="50.00"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Distância Máxima (km)</FormLabel>
            <FormInput
              type="number"
              min="1"
              value={deliverySettings.maxDeliveryDistance}
              onChange={(e) => setDeliverySettings(prev => ({
                ...prev,
                maxDeliveryDistance: parseInt(e.target.value) || 0
              }))}
              placeholder="10"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Tempo Estimado (minutos)</FormLabel>
            <FormInput
              type="number"
              min="10"
              value={deliverySettings.estimatedTime}
              onChange={(e) => setDeliverySettings(prev => ({
                ...prev,
                estimatedTime: parseInt(e.target.value) || 0
              }))}
              placeholder="45"
            />
          </FormGroup>
        </FormGrid>
      )}
    </SettingsSection>
  );

  // Renderizar seção de pagamentos
  const renderPaymentSection = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>💳 Métodos de Pagamento</SectionTitle>
        <SectionDescription>
          Configure quais métodos de pagamento sua pizzaria aceita
        </SectionDescription>
      </SectionHeader>

      <h3 style={{ color: '#1a202c', marginBottom: '16px', fontSize: '16px' }}>💰 Métodos Aceitos</h3>
      
      <CheckboxGroup>
        <label>
          <input
            type="checkbox"
            checked={paymentSettings.acceptCash}
            onChange={(e) => setPaymentSettings(prev => ({
              ...prev,
              acceptCash: e.target.checked
            }))}
          />
          <span>💵 Dinheiro</span>
        </label>
      </CheckboxGroup>

      <CheckboxGroup>
        <label>
          <input
            type="checkbox"
            checked={paymentSettings.acceptCard}
            onChange={(e) => setPaymentSettings(prev => ({
              ...prev,
              acceptCard: e.target.checked
            }))}
          />
          <span>💳 Cartão (Débito/Crédito)</span>
        </label>
      </CheckboxGroup>

      <CheckboxGroup>
        <label>
          <input
            type="checkbox"
            checked={paymentSettings.acceptPix}
            onChange={(e) => setPaymentSettings(prev => ({
              ...prev,
              acceptPix: e.target.checked
            }))}
          />
          <span>📱 PIX</span>
        </label>
      </CheckboxGroup>

      <FormGrid style={{ marginTop: '24px' }}>
        <FormGroup>
          <FormLabel>Valor Mínimo do Pedido (R$)</FormLabel>
          <FormInput
            type="number"
            step="0.01"
            min="0"
            value={paymentSettings.minimumOrderValue}
            onChange={(e) => setPaymentSettings(prev => ({
              ...prev,
              minimumOrderValue: parseFloat(e.target.value) || 0
            }))}
            placeholder="20.00"
          />
        </FormGroup>

        {paymentSettings.acceptPix && (
          <FormGroup>
            <FormLabel>Chave PIX</FormLabel>
            <FormInput
              type="text"
              value={paymentSettings.pixKey}
              onChange={(e) => setPaymentSettings(prev => ({
                ...prev,
                pixKey: e.target.value
              }))}
              placeholder="email@pizzaria.com"
            />
          </FormGroup>
        )}
      </FormGrid>
    </SettingsSection>
  );

  // Renderizar seção de notificações COMPLETA
  const renderNotificationSection = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>🔔 Configurações de Notificação</SectionTitle>
        <SectionDescription>
          Configure como você quer receber notificações sobre novos pedidos e atualizações do sistema
        </SectionDescription>
      </SectionHeader>

      {/* Status de Permissão */}
      <AlertBox type={hasPermission ? 'success' : 'warning'}>
        <div className="alert-icon">
          {hasPermission ? '✅' : '⚠️'}
        </div>
        <div>
          <strong>Status das Notificações do Navegador:</strong><br />
          {hasPermission 
            ? 'Notificações do navegador estão habilitadas' 
            : 'Notificações do navegador estão desabilitadas. Clique no botão abaixo para habilitar.'}
        </div>
      </AlertBox>

      {/* Configurações de Som */}
      <SwitchGroup>
        <div className="switch-info">
          <div className="switch-title">🎵 Sons de Notificação</div>
          <div className="switch-description">Reproduzir som quando chegarem novos pedidos</div>
        </div>
        <Switch>
          <input
            type="checkbox"
            checked={config.enableSound ?? true}
            onChange={(e) => updateConfig({ enableSound: e.target.checked })}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      {(config.enableSound ?? true) && (
        <FormGroup style={{ marginBottom: '20px' }}>
          <FormLabel>Volume do Som ({Math.round((config.soundVolume ?? 0.7) * 100)}%)</FormLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: '#718096' }}>🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.soundVolume ?? 0.7}
              onChange={(e) => updateConfig({ soundVolume: parseFloat(e.target.value) })}
              style={{
                flex: 1,
                height: '6px',
                background: '#e2e8f0',
                borderRadius: '3px',
                outline: 'none',
                accentColor: '#ff6b35'
              }}
            />
            <span style={{ fontSize: '14px', color: '#718096' }}>🔊</span>
            <SaveButton 
              onClick={() => testSound('newOrder')}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              Testar
            </SaveButton>
          </div>
        </FormGroup>
      )}

      {/* Configurações do Navegador */}
      <SwitchGroup>
        <div className="switch-info">
          <div className="switch-title">🌐 Notificações do Navegador</div>
          <div className="switch-description">Mostrar notificações na área de trabalho</div>
        </div>
        <Switch>
          <input
            type="checkbox"
            checked={config.enableBrowser ?? false}
            onChange={(e) => {
              updateConfig({ enableBrowser: e.target.checked });
              if (e.target.checked && !hasPermission) {
                requestPermission();
              }
            }}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      {(config.enableBrowser ?? false) && !hasPermission && (
        <div style={{ marginBottom: '20px' }}>
          <SaveButton onClick={requestPermission}>
            🔔 Solicitar Permissão para Notificações
          </SaveButton>
        </div>
      )}

      {/* Posição das Notificações */}
      <FormGroup>
        <FormLabel>📍 Posição das Notificações na Tela</FormLabel>
        <FormSelect
          value={config.position || 'top-right'}
          onChange={(e) => updateConfig({ position: e.target.value as any })}
        >
          <option value="top-center">Superior Centro</option>
          <option value="top-right">Superior Direita</option>
          <option value="bottom-center">Inferior Centro</option>
          <option value="bottom-right">Inferior Direita</option>
        </FormSelect>
      </FormGroup>

      {/* Testes de Notificação */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ color: '#1a202c', marginBottom: '16px', fontSize: '16px' }}>🧪 Testar Notificações</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <SaveButton 
            onClick={() => {
              testSound('success');
              notifications.success('Teste de sucesso!');
            }}
            style={{ background: '#48BB78' }}
          >
            ✅ Sucesso
          </SaveButton>
          <SaveButton 
            onClick={() => {
              testSound('error');
              notifications.error('Teste de erro!');
            }}
            style={{ background: '#F56565' }}
          >
            ❌ Erro
          </SaveButton>
          <SaveButton 
            onClick={() => {
              testSound('warning');
              notifications.warning('Teste de aviso!');
            }}
            style={{ background: '#ED8936' }}
          >
            ⚠️ Aviso
          </SaveButton>
          <SaveButton 
            onClick={() => {
              testSound('newOrder');
              notifications.newOrder('123', 'Cliente Teste');
            }}
            style={{ background: '#4299E1' }}
          >
            🍕 Novo Pedido
          </SaveButton>
        </div>
      </div>

      {/* Configurações Avançadas */}
      <div style={{ 
        marginTop: '32px',
        padding: '20px',
        background: '#f7fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h4 style={{ 
          color: '#1a202c', 
          marginBottom: '16px', 
          fontSize: '14px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          ⚙️ Configurações Avançadas
        </h4>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <SaveButton 
            onClick={() => notifications.clear()}
            style={{ background: '#718096', fontSize: '12px', padding: '8px 12px' }}
          >
            🧹 Limpar Todas Notificações
          </SaveButton>
          <SaveButton 
            onClick={() => {
              updateConfig({ 
                enableSound: true, 
                enableBrowser: true, 
                soundVolume: 0.7,
                position: 'top-right'
              });
              notifications.success('Configurações restauradas!');
            }}
            style={{ background: '#9F7AEA', fontSize: '12px', padding: '8px 12px' }}
          >
            🔄 Restaurar Padrões
          </SaveButton>
        </div>
      </div>

      {/* Informações do Sistema */}
      <div style={{ 
        marginTop: '24px',
        padding: '16px',
        background: '#EDF2F7',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#4A5568'
      }}>
        <strong>💡 Informações:</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
          <li>As notificações de som funcionam mesmo com a aba minimizada</li>
          <li>Notificações do navegador podem precisar de permissão manual</li>
          <li>Configure a posição das notificações conforme sua preferência</li>
          <li>Teste regularmente para garantir que tudo está funcionando</li>
        </ul>
      </div>
    </SettingsSection>
  );

  // SEÇÃO DO SISTEMA ATUALIZADA COM TEMA INTEGRADO
  const renderSystemSection = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>⚙️ Configurações do Sistema</SectionTitle>
        <SectionDescription>
          Configurações gerais do sistema administrativo
        </SectionDescription>
      </SectionHeader>

      {/* Indicador do tema atual */}
      <div style={{ 
        marginBottom: '24px',
        padding: '16px',
        background: 'var(--bg-tertiary)',
        borderRadius: '8px',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px' }}>
            {actualTheme === 'dark' ? '🌙' : '🌞'}
          </span>
          <strong style={{ color: 'var(--text-primary)' }}>
            Tema Atual: {actualTheme === 'dark' ? 'Escuro' : 'Claro'}
          </strong>
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: '13px', 
          color: 'var(--text-muted)' 
        }}>
          {theme === 'auto' 
            ? 'Seguindo preferência do sistema automaticamente' 
            : `Tema ${theme} selecionado manualmente`
          }
        </p>
      </div>

      <FormGrid>
        <FormGroup>
          <FormLabel>Tema da Interface</FormLabel>
          <FormSelect
            value={theme}
            onChange={(e) => {
              const newTheme = e.target.value as 'light' | 'dark' | 'auto';
              setTheme(newTheme);
              notifications.success(`Tema alterado para: ${newTheme === 'light' ? 'Claro' : newTheme === 'dark' ? 'Escuro' : 'Automático'}`);
            }}
            style={{
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-light)'
            }}
          >
            <option value="light">🌞 Claro</option>
            <option value="dark">🌙 Escuro</option>
            <option value="auto">🔄 Automático (Sistema)</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Idioma</FormLabel>
          <FormSelect
            value={systemSettings.language}
            onChange={(e) => setSystemSettings(prev => ({
              ...prev,
              language: e.target.value
            }))}
            style={{
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-light)'
            }}
          >
            <option value="pt-BR">🇧🇷 Português (Brasil)</option>
            <option value="en-US">🇺🇸 English (US)</option>
            <option value="es-ES">🇪🇸 Español</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Fuso Horário</FormLabel>
          <FormSelect
            value={systemSettings.timezone}
            onChange={(e) => setSystemSettings(prev => ({
              ...prev,
              timezone: e.target.value
            }))}
            style={{
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-light)'
            }}
          >
            <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
            <option value="America/New_York">New York (UTC-5)</option>
            <option value="Europe/London">London (UTC+0)</option>
          </FormSelect>
        </FormGroup>
      </FormGrid>

      {/* Teste rápido de tema */}
      <div style={{ 
        marginTop: '24px',
        padding: '16px',
        background: 'var(--bg-primary)',
        borderRadius: '8px',
        border: '1px solid var(--border-light)'
      }}>
        <h4 style={{ 
          color: 'var(--text-primary)', 
          marginBottom: '12px', 
          fontSize: '14px',
          fontWeight: '600'
        }}>
          🎨 Teste Rápido de Tema
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <SaveButton 
            onClick={() => setTheme('light')}
            style={{ 
              background: theme === 'light' ? 'var(--color-primary)' : 'var(--bg-tertiary)',
              color: theme === 'light' ? 'white' : 'var(--text-primary)',
              fontSize: '12px', 
              padding: '6px 12px' 
            }}
          >
            🌞 Claro
          </SaveButton>
          <SaveButton 
            onClick={() => setTheme('dark')}
            style={{ 
              background: theme === 'dark' ? 'var(--color-primary)' : 'var(--bg-tertiary)',
              color: theme === 'dark' ? 'white' : 'var(--text-primary)',
              fontSize: '12px', 
              padding: '6px 12px' 
            }}
          >
            🌙 Escuro
          </SaveButton>
          <SaveButton 
            onClick={() => setTheme('auto')}
            style={{ 
              background: theme === 'auto' ? 'var(--color-primary)' : 'var(--bg-tertiary)',
              color: theme === 'auto' ? 'white' : 'var(--text-primary)',
              fontSize: '12px', 
              padding: '6px 12px' 
            }}
          >
            🔄 Auto
          </SaveButton>
        </div>
      </div>

      <SwitchGroup>
        <div className="switch-info">
          <div className="switch-title">Backup Automático</div>
          <div className="switch-description">Fazer backup automático dos dados diariamente</div>
        </div>
        <Switch>
          <input
            type="checkbox"
            checked={systemSettings.autoBackup}
            onChange={(e) => setSystemSettings(prev => ({
              ...prev,
              autoBackup: e.target.checked
            }))}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      <SwitchGroup>
        <div className="switch-info">
          <div className="switch-title">Modo Manutenção</div>
          <div className="switch-description">Temporariamente desabilitar pedidos online</div>
        </div>
        <Switch>
          <input
            type="checkbox"
            checked={systemSettings.maintenanceMode}
            onChange={(e) => setSystemSettings(prev => ({
              ...prev,
              maintenanceMode: e.target.checked
            }))}
          />
          <span className="slider"></span>
        </Switch>
      </SwitchGroup>

      {systemSettings.maintenanceMode && (
        <AlertBox type="warning">
          <div className="alert-icon">⚠️</div>
          <div>
            <strong>Modo manutenção ativo!</strong><br />
            Os clientes não conseguirão fazer novos pedidos enquanto este modo estiver ativo.
          </div>
        </AlertBox>
      )}
    </SettingsSection>
  );

  // Renderizar seção ativa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'business':
        return renderBusinessSection();
      case 'delivery':
        return renderDeliverySection();
      case 'payment':
        return renderPaymentSection();
      case 'notifications':
        return renderNotificationSection();
      case 'system':
        return renderSystemSection();
      default:
        return renderBusinessSection();
    }
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <div>
          <SettingsTitle>⚙️ Configurações</SettingsTitle>
          <p style={{ color: '#718096', margin: 0 }}>
            Gerencie todas as configurações da sua pizzaria
          </p>
        </div>
        <SettingsActions>
          <SaveButton onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="loading-spinner" />
                Salvando...
              </>
            ) : (
              <>
                💾 Salvar Configurações
              </>
            )}
          </SaveButton>
        </SettingsActions>
      </SettingsHeader>

      {saveMessage && (
        <AlertBox type={saveMessage.type}>
          <div className="alert-icon">
            {saveMessage.type === 'success' ? '✅' : '❌'}
          </div>
          <div>{saveMessage.message}</div>
        </AlertBox>
      )}

      <SettingsContent>
        <SettingsSidebar>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.id}
                isActive={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SettingsSidebar>

        <SettingsMain>
          {renderActiveSection()}
        </SettingsMain>
      </SettingsContent>

      <Toaster position="top-right" />
    </SettingsContainer>
  );
};

export default Settings;