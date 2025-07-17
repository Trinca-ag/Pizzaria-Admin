// src/components/Products/CategoryForm/styles.ts
import styled from 'styled-components';

interface IconOptionProps {
  isSelected: boolean;
}

interface ColorOptionProps {
  color: string;
  isSelected: boolean;
}

export const FormContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;

    &:hover {
      background: #a0aec0;
    }
  }
`;

export const FormSection = styled.div`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  &:last-child {
    margin-bottom: 0;
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

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  color: #1a202c;
  background: white;
  resize: vertical;
  min-height: 60px;
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

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;

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

export const IconPicker = styled.div`
  .selected-icon {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding: 8px 12px;
    background: #f7fafc;
    border-radius: 6px;
    font-size: 14px;
    color: #4a5568;
  }
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  max-height: 120px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 2px;
  }
`;

export const IconOption = styled.button<IconOptionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ isSelected }) => isSelected ? '#ff6b35' : '#e2e8f0'};
  border-radius: 8px;
  background: ${({ isSelected }) => isSelected ? '#ff6b35' + '10' : 'white'};
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff6b35;
    background: #ff6b35 + '20';
  }
`;

export const ColorPicker = styled.div`
  .selected-color {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding: 8px 12px;
    background: #f7fafc;
    border-radius: 6px;
    font-size: 14px;
    color: #4a5568;

    .color-preview {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }
  }
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
`;

export const ColorOption = styled.button<ColorOptionProps>`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ isSelected }) => isSelected ? '#1a202c' : 'transparent'};
  border-radius: 8px;
  background: ${({ color }) => color};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${({ isSelected }) => isSelected && `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
  `}
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    
    button {
      width: 100%;
    }
  }
`;