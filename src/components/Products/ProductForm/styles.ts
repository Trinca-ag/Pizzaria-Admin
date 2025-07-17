// src/components/Products/ProductForm/styles.ts
import styled from 'styled-components';

export const FormContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;

  /* Scrollbar customizada */
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

export const Select = styled.select`
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

export const ImageUploadArea = styled.div`
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

  label {
    cursor: pointer;
    display: block;

    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .icon {
        font-size: 32px;
        opacity: 0.6;
      }

      span {
        font-size: 16px;
        font-weight: 500;
        color: #4a5568;
      }

      small {
        font-size: 12px;
        color: #a0aec0;
      }
    }
  }
`;

export const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
  margin-top: 12px;

  .image-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background: #f7fafc;

    img {
      width: 100%;
      height: 100px;
      object-fit: cover;
    }

    .remove-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(0, 0, 0, 0.7);
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 12px;
      transition: background-color 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.9);
      }
    }
  }
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