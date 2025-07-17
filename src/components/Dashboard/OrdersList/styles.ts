// src/components/Dashboard/OrdersList/styles.ts
import styled from 'styled-components';

interface OrderCardProps {
  status: string;
}

interface OrderStatusProps {
  color: string;
}

export const OrdersContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-height: 600px;
  overflow-y: auto;
`;

export const OrdersHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`;

export const OrdersTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

export const OrderCard = styled.div<OrderCardProps>`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  
  ${({ status }) => {
    if (status === 'pending') {
      return `
        border-left: 4px solid #ed8936;
        background: #fefcbf10;
      `;
    }
    if (status === 'preparing') {
      return `
        border-left: 4px solid #9f7aea;
        background: #e9d5ff10;
      `;
    }
    if (status === 'ready') {
      return `
        border-left: 4px solid #48bb78;
        background: #c6f6d510;
      `;
    }
    return '';
  }}
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const OrderNumber = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1a202c;
  margin-right: 12px;
`;

export const OrderStatus = styled.span<OrderStatusProps>`
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const OrderCustomer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 8px;
  background: #f7fafc;
  border-radius: 6px;
  
  strong {
    color: #1a202c;
  }
  
  span {
    color: #718096;
    font-size: 14px;
  }
`;

export const OrderItems = styled.div`
  margin-bottom: 12px;
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 14px;
  
  span:first-child {
    color: #4a5568;
  }
  
  span:last-child {
    color: #1a202c;
    font-weight: 600;
  }
`;

export const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid #e2e8f0;
  margin-bottom: 12px;
  
  strong {
    color: #1a202c;
    font-size: 16px;
  }
  
  span {
    font-size: 20px;
  }
`;

export const OrderActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #718096;
  
  h3 {
    color: #4a5568;
    margin-bottom: 8px;
  }
  
  p {
    margin: 0;
  }
`;