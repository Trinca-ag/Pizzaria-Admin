// src/pages/Settings/styles.ts
import styled from 'styled-components';

export const SettingsContainer = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f7fafc;
`;

export const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

export const SettingsTitle = styled.h1`
  color: #ff6b35;
  font-family: 'Poppins', sans-serif;
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
`;

export const SettingsActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SettingsContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const SettingsSidebar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 24px;

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto;
    gap: 12px;
    padding-bottom: 8px;
  }
`;

export const SidebarMenuItem = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: ${({ isActive }) => isActive ? '#ff6b35' : 'transparent'};
  color: ${({ isActive }) => isActive ? 'white' : '#4a5568'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    background: ${({ isActive }) => isActive ? '#ff5722' : '#f7fafc'};
    color: ${({ isActive }) => isActive ? 'white' : '#ff6b35'};
  }

  .icon {
    font-size: 18px;
    min-width: 18px;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
  }
`;

export const SettingsMain = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const SettingsSection = styled.div`
  padding: 32px;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionDescription = styled.p`
  color: #718096;
  margin: 0;
  font-size: 14px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #1a202c;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  color: #1a202c;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff6b35;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  color: #1a202c;
  background: white;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff6b35;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  color: #1a202c;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff6b35;
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  option {
    padding: 8px;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #4a5568;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #ff6b35;
      cursor: pointer;
    }

    span {
      font-weight: 500;
    }
  }
`;

export const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f7fafc;
  border-radius: 8px;
  margin-bottom: 12px;

  .switch-info {
    flex: 1;

    .switch-title {
      font-size: 14px;
      font-weight: 500;
      color: #1a202c;
      margin-bottom: 4px;
    }

    .switch-description {
      font-size: 12px;
      color: #718096;
    }
  }
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cbd5e0;
    transition: 0.3s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background-color: #ff6b35;
  }

  input:checked + .slider:before {
    transform: translateX(24px);
  }
`;

export const ImageUpload = styled.div`
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #ff6b35;
    background: rgba(255, 107, 53, 0.02);
  }

  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .upload-icon {
      font-size: 32px;
      opacity: 0.6;
    }

    .upload-text {
      font-size: 16px;
      font-weight: 500;
      color: #4a5568;
    }

    .upload-hint {
      font-size: 12px;
      color: #a0aec0;
    }
  }

  input[type="file"] {
    display: none;
  }
`;

export const SaveButton = styled.button`
  background: linear-gradient(135deg, #ff6b35 0%, #ff8a5b 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(135deg, #ff5722 0%, #ff6b35 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 107, 53, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const AlertBox = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;

  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: #c6f6d5;
          color: #22543d;
          border: 1px solid #9ae6b4;
        `;
      case 'error':
        return `
          background: #fed7d7;
          color: #822727;
          border: 1px solid #fc8181;
        `;
      case 'warning':
        return `
          background: #fefcbf;
          color: #744210;
          border: 1px solid #f6e05e;
        `;
      case 'info':
        return `
          background: #bee3f8;
          color: #2a4365;
          border: 1px solid #90cdf4;
        `;
      default:
        return '';
    }
  }}

  .alert-icon {
    font-size: 18px;
  }
`;