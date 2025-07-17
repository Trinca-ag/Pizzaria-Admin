// src/components/common/NotificationSettings/index.tsx
import React from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import Button from '../Button';
import Input from '../Input';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const SettingsHeader = styled.div`
  margin-bottom: 24px;
  
  h3 {
    color: #1a202c;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    color: #718096;
    margin: 0;
    font-size: 14px;
  }
`;

const SettingGroup = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SettingLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #ff6b35;
  }
  
  span {
    color: #1a202c;
    font-weight: 500;
  }
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const VolumeSlider = styled.input`
  flex: 1;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    background: #ff6b35;
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #ff6b35;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const TestButtonsGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const PermissionStatus = styled.div<{ hasPermission: boolean }>`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  background: ${({ hasPermission }) => hasPermission ? '#C6F6D5' : '#FED7D7'};
  color: ${({ hasPermission }) => hasPermission ? '#22543D' : '#822727'};
  font-size: 14px;
  font-weight: 500;
`;

export const NotificationSettings: React.FC = () => {
  const { config, hasPermission, updateConfig, requestPermission, testSound } = useNotifications();

  const handleSoundToggle = (enabled: boolean) => {
    updateConfig({ enableSound: enabled });
  };

  const handleBrowserToggle = (enabled: boolean) => {
    updateConfig({ enableBrowser: enabled });
    if (enabled && !hasPermission) {
      requestPermission();
    }
  };

  const handleVolumeChange = (volume: number) => {
    updateConfig({ soundVolume: volume });
  };

  const handlePositionChange = (position: any) => {
    updateConfig({ position });
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <h3>🔔 Configurações de Notificação</h3>
        <p>Configure como você quer receber notificações do sistema</p>
      </SettingsHeader>

      {/* Status de Permissão */}
      <PermissionStatus hasPermission={hasPermission}>
        {hasPermission 
          ? '✅ Notificações do navegador habilitadas' 
          : '⚠️ Notificações do navegador desabilitadas'}
      </PermissionStatus>

      {/* Configurações de Som */}
      <SettingGroup>
        <SettingLabel>
          <input
            type="checkbox"
            checked={config.enableSound}
            onChange={(e) => handleSoundToggle(e.target.checked)}
          />
          <span>🎵 Sons de Notificação</span>
        </SettingLabel>
        
        {config.enableSound && (
          <VolumeContainer>
            <span style={{ fontSize: '14px', color: '#718096' }}>🔈</span>
            <VolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.soundVolume || 0.7}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            />
            <span style={{ fontSize: '14px', color: '#718096' }}>🔊</span>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => testSound('newOrder')}
            >
              Testar
            </Button>
          </VolumeContainer>
        )}
      </SettingGroup>

      {/* Configurações do Navegador */}
      <SettingGroup>
        <SettingLabel>
          <input
            type="checkbox"
            checked={config.enableBrowser}
            onChange={(e) => handleBrowserToggle(e.target.checked)}
          />
          <span>🌐 Notificações do Navegador</span>
        </SettingLabel>
        
        {config.enableBrowser && !hasPermission && (
          <Button 
            size="sm" 
            variant="primary"
            onClick={requestPermission}
          >
            Solicitar Permissão
          </Button>
        )}
      </SettingGroup>

      {/* Posição das Notificações */}
      <SettingGroup>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#1a202c', fontWeight: '500' }}>📍 Posição das Notificações</span>
        </div>
        <select
          value={config.position || 'top-right'}
          onChange={(e) => handlePositionChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            background: 'white',
            color: '#1a202c',
          }}
        >
          <option value="top-center">Superior Centro</option>
          <option value="top-right">Superior Direita</option>
          <option value="bottom-center">Inferior Centro</option>
          <option value="bottom-right">Inferior Direita</option>
        </select>
      </SettingGroup>

      {/* Testes de Notificação */}
      <SettingGroup>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#1a202c', fontWeight: '500' }}>🧪 Testar Notificações</span>
        </div>
        <TestButtonsGroup>
          <Button 
            size="sm" 
            variant="success"
            onClick={() => testSound('success')}
          >
            ✅ Sucesso
          </Button>
          <Button 
            size="sm" 
            variant="error"
            onClick={() => testSound('error')}
          >
            ❌ Erro
          </Button>
          <Button 
            size="sm" 
            variant="warning"
            onClick={() => testSound('warning')}
          >
            ⚠️ Aviso
          </Button>
          <Button 
            size="sm" 
            variant="primary"
            onClick={() => testSound('newOrder')}
          >
            🍕 Novo Pedido
          </Button>
        </TestButtonsGroup>
      </SettingGroup>
    </SettingsContainer>
  );
};

export default NotificationSettings;