// src/pages/Reports/styles.ts
import styled from 'styled-components';

export const ReportsContainer = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f7fafc;
`;

export const ReportsHeader = styled.div`
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

export const ReportsTitle = styled.h1`
  color: #ff6b35;
  font-family: 'Poppins', sans-serif;
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
`;

export const ReportsActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
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

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

export const MetricCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 40px;
    opacity: 0.8;
  }

  .content {
    flex: 1;

    h3 {
      font-size: 14px;
      font-weight: 500;
      color: #718096;
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      display: block;
      font-size: 24px;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 4px;
    }

    .growth {
      font-size: 12px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 12px;

      &.positive {
        color: #48bb78;
        background: #c6f6d5;
      }

      &.negative {
        color: #f56565;
        background: #fed7d7;
      }

      &.neutral {
        color: #4299e1;
        background: #bee3f8;
      }
    }
  }
`;

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;

  .recharts-tooltip-wrapper {
    .recharts-default-tooltip {
      background: white !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 8px !important;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
    }
  }

  .recharts-legend-wrapper {
    padding-top: 20px !important;
  }
`;

export const TableSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #f7fafc;
    border-bottom: 2px solid #e2e8f0;
    font-weight: 600;
    color: #4a5568;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    color: #1a202c;
    font-size: 14px;

    &:first-child {
      font-weight: 500;
    }
  }

  tr:hover {
    background: #f7fafc;
  }

  tr:last-child td {
    border-bottom: none;
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
  min-height: 60vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;
  }

  h3 {
    color: #1a202c;
    margin-bottom: 8px;
    font-size: 20px;
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