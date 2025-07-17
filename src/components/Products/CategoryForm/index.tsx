// src/components/Products/CategoryForm/index.tsx
import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import {
  FormContainer,
  FormSection,
  FormRow,
  FormGroup,
  FormLabel,
  FormActions,
  CheckboxGroup,
  TextArea,
  ColorPicker,
  IconPicker,
  IconGrid,
  IconOption,
  ColorGrid,
  ColorOption
} from './styles';

interface Category {
  id?: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
}

interface CategoryFormProps {
  category?: Category | null;
  onSave: (categoryData: any) => void;
  onCancel: () => void;
}

// Ícones disponíveis
const availableIcons = [
  '🍕', '🍔', '🥤', '🍰', '🥗', '🍝', '🍗', '🌮',
  '🍟', '🍻', '☕', '🧊', '🔥', '🌶️', '🧀', '🥩',
  '🐟', '🥬', '🌿', '⭐', '🎉', '💝', '🏆', '📦'
];

// Cores disponíveis
const availableColors = [
  '#FF6B35', '#F56565', '#48BB78', '#4299E1', '#9F7AEA', '#ED8936',
  '#38B2AC', '#EC4899', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'
];

export const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🍕',
    color: '#FF6B35',
    isActive: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        icon: category.icon || '🍕',
        color: category.color || '#FF6B35',
        isActive: category.isActive
      });
    }
  }, [category]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando alterado
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da categoria é obrigatório';
    }

    if (formData.name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <h3>📂 Informações da Categoria</h3>
          
          <FormRow>
            <FormGroup className="full-width">
              <Input
                label="Nome da Categoria"
                placeholder="Ex: Pizzas Tradicionais"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup className="full-width">
              <FormLabel>Descrição (opcional)</FormLabel>
              <TextArea
                placeholder="Descreva esta categoria..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={2}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <CheckboxGroup>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <span>Categoria ativa</span>
                </label>
              </CheckboxGroup>
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <h3>🎨 Personalização Visual</h3>
          
          <FormGroup>
            <FormLabel>Ícone da Categoria</FormLabel>
            <IconPicker>
              <div className="selected-icon">
                <span>Selecionado: {formData.icon}</span>
              </div>
              <IconGrid>
                {availableIcons.map(icon => (
                  <IconOption
                    key={icon}
                    isSelected={formData.icon === icon}
                    onClick={() => handleInputChange('icon', icon)}
                  >
                    {icon}
                  </IconOption>
                ))}
              </IconGrid>
            </IconPicker>
          </FormGroup>

          <FormGroup>
            <FormLabel>Cor da Categoria</FormLabel>
            <ColorPicker>
              <div className="selected-color">
                <div 
                  className="color-preview" 
                  style={{ backgroundColor: formData.color }}
                />
                <span>{formData.color}</span>
              </div>
              <ColorGrid>
                {availableColors.map(color => (
                  <ColorOption
                    key={color}
                    color={color}
                    isSelected={formData.color === color}
                    onClick={() => handleInputChange('color', color)}
                  />
                ))}
              </ColorGrid>
            </ColorPicker>
          </FormGroup>
        </FormSection>

        <FormSection>
          <h3>👀 Pré-visualização</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: '#f7fafc',
            borderRadius: '8px',
            border: `2px solid ${formData.color}20`
          }}>
            <span style={{ fontSize: '24px' }}>{formData.icon}</span>
            <div>
              <div style={{ 
                fontWeight: '600', 
                color: '#1a202c',
                marginBottom: '4px' 
              }}>
                {formData.name || 'Nome da categoria'}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#718096' 
              }}>
                {formData.description || 'Descrição da categoria'}
              </div>
            </div>
            <div style={{
              marginLeft: 'auto',
              padding: '4px 8px',
              borderRadius: '12px',
              background: formData.color,
              color: 'white',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {formData.isActive ? 'Ativa' : 'Inativa'}
            </div>
          </div>
        </FormSection>

        <FormActions>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            loadingText="Salvando..."
          >
            {category ? 'Atualizar Categoria' : 'Criar Categoria'}
          </Button>
        </FormActions>
      </form>
    </FormContainer>
  );
};

export default CategoryForm;