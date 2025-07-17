// src/components/Products/ProductForm/index.tsx
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
  ImageUploadArea,
  ImagePreview,
  CheckboxGroup,
  TextArea,
  Select
} from './styles';

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images?: any[];
  isActive: boolean;
  preparationTime: number;
}

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  onSave: (productData: any) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    isActive: true,
    preparationTime: 30,
    images: [] as File[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        isActive: product.isActive,
        preparationTime: product.preparationTime,
        images: []
      });
    }
  }, [product]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Categoria é obrigatória';
    }

    if (formData.preparationTime <= 0) {
      newErrors.preparationTime = 'Tempo de preparo deve ser maior que zero';
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
      // Encontrar categoria selecionada para incluir o nome
      const selectedCategory = categories.find(c => c.id === formData.categoryId);
      
      const productData = {
        ...formData,
        categoryName: selectedCategory?.name || '',
        price: Number(formData.price),
        preparationTime: Number(formData.preparationTime)
      };

      await onSave(productData);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <h3>📝 Informações Básicas</h3>
          
          <FormRow>
            <FormGroup>
              <Input
                label="Nome do Produto"
                placeholder="Ex: Pizza Margherita"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Descrição</FormLabel>
              <TextArea
                placeholder="Descreva os ingredientes e características do produto..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                style={{ borderColor: errors.description ? '#f56565' : '#e2e8f0' }}
              />
              {errors.description && (
                <span style={{ color: '#f56565', fontSize: '14px' }}>
                  {errors.description}
                </span>
              )}
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Input
                label="Preço (R$)"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
                error={errors.price}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Categoria</FormLabel>
              <Select
                value={formData.categoryId}
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
                style={{ borderColor: errors.categoryId ? '#f56565' : '#e2e8f0' }}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </Select>
              {errors.categoryId && (
                <span style={{ color: '#f56565', fontSize: '14px' }}>
                  {errors.categoryId}
                </span>
              )}
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Input
                label="Tempo de Preparo (minutos)"
                type="number"
                min="1"
                placeholder="30"
                value={formData.preparationTime || ''}
                onChange={(e) => handleInputChange('preparationTime', e.target.value)}
                error={errors.preparationTime}
                required
              />
            </FormGroup>
            <FormGroup>
              <CheckboxGroup>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <span>Produto ativo</span>
                </label>
              </CheckboxGroup>
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <h3>📷 Imagens do Produto</h3>
          
          <ImageUploadArea>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <div className="upload-placeholder">
                <span className="icon">📷</span>
                <span>Clique para adicionar imagens</span>
                <small>PNG, JPG até 5MB cada</small>
              </div>
            </label>
          </ImageUploadArea>

          {formData.images.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h4>Imagens selecionadas:</h4>
              <ImagePreview>
                {formData.images.map((file, index) => (
                  <div key={index} className="image-item">
                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="remove-btn"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </ImagePreview>
            </div>
          )}
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
            {product ? 'Atualizar Produto' : 'Criar Produto'}
          </Button>
        </FormActions>
      </form>
    </FormContainer>
  );
};

export default ProductForm;