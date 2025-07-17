// src/pages/Products/styles.ts
import styled from 'styled-components';

export const ProductsContainer = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f7fafc;
`;

export const ProductsHeader = styled.div`
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

export const ProductsTitle = styled.h1`
  color: #ff6b35;
  font-family: 'Poppins', sans-serif;
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
`;

export const ProductsActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 32px;
    opacity: 0.8;
  }

  .content {
    flex: 1;

    h3 {
      font-size: 14px;
      font-weight: 500;
      color: #718096;
      margin: 0 0 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 24px;
      font-weight: 700;
      color: #1a202c;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  select {
    &:focus {
      outline: 2px solid #ff6b35;
      border-color: #ff6b35;
    }
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h3 {
    color: #4a5568;
    margin-bottom: 8px;
    font-size: 20px;
  }

  p {
    color: #718096;
    margin: 0 0 16px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  p {
    color: #718096;
    margin: 0;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;