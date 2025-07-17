// src/components/Dashboard/OrdersList/index.tsx
import React from 'react';
import { Order, orderStatusLabels, orderStatusColors } from '../../../types/order';
import { updateOrderStatus } from '../../../services/firebase/firestore';
import Button from '../../common/Button';
import {
  OrdersContainer,
  OrdersHeader,
  OrdersTitle,
  OrderCard,
  OrderHeader,
  OrderNumber,
  OrderStatus,
  OrderCustomer,
  OrderItems,
  OrderItem,
  OrderTotal,
  OrderActions,
  EmptyState
} from './styles';

interface OrdersListProps {
  orders: Order[];
  isLoading?: boolean;
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders, isLoading = false }) => {
  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      console.log('✅ Status atualizado:', newStatus);
    } catch (error) {
      console.error('❌ Erro ao atualizar status:', error);
    }
  };

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return (
          <>
            <Button 
              size="sm" 
              variant="success"
              onClick={() => handleStatusUpdate(order.id, 'confirmed')}
            >
              Aceitar
            </Button>
            <Button 
              size="sm" 
              variant="error"
              onClick={() => handleStatusUpdate(order.id, 'canceled')}
            >
              Recusar
            </Button>
          </>
        );
      case 'confirmed':
        return (
          <Button 
            size="sm" 
            variant="warning"
            onClick={() => handleStatusUpdate(order.id, 'preparing')}
          >
            Iniciar Preparo
          </Button>
        );
      case 'preparing':
        return (
          <Button 
            size="sm" 
            variant="primary"
            onClick={() => handleStatusUpdate(order.id, 'ready')}
          >
            Marcar Pronto
          </Button>
        );
      case 'ready':
        return (
          <Button 
            size="sm" 
            variant="success"
            onClick={() => handleStatusUpdate(order.id, 'out_for_delivery')}
          >
            Saiu p/ Entrega
          </Button>
        );
      case 'out_for_delivery':
        return (
          <Button 
            size="sm" 
            variant="success"
            onClick={() => handleStatusUpdate(order.id, 'delivered')}
          >
            Marcar Entregue
          </Button>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <OrdersContainer>
        <OrdersHeader>
          <OrdersTitle>📋 Pedidos de Hoje</OrdersTitle>
        </OrdersHeader>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Carregando pedidos...
        </div>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <OrdersHeader>
        <OrdersTitle>📋 Pedidos de Hoje ({orders.length})</OrdersTitle>
      </OrdersHeader>

      {orders.length === 0 ? (
        <EmptyState>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <h3>Nenhum pedido hoje</h3>
          <p>Os pedidos aparecerão aqui em tempo real</p>
        </EmptyState>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderCard key={order.id} status={order.status}>
              <OrderHeader>
                <div>
                  <OrderNumber>#{order.orderNumber}</OrderNumber>
                  <OrderStatus color={orderStatusColors[order.status]}>
                    {orderStatusLabels[order.status]}
                  </OrderStatus>
                </div>
                <div style={{ fontSize: '12px', color: '#718096' }}>
                  {formatTime(order.createdAt)}
                </div>
              </OrderHeader>

              <OrderCustomer>
                <strong>{order.customerInfo.name}</strong>
                <span>{order.customerInfo.phone}</span>
                {order.deliveryMethod === 'delivery' ? '🚚 Entrega' : '🏪 Retirada'}
              </OrderCustomer>

              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItem key={index}>
                    <span>{item.quantity}x {item.productName}</span>
                    <span>{formatCurrency(item.totalPrice)}</span>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderTotal>
                <strong>Total: {formatCurrency(order.total)}</strong>
                <span>
                  {order.paymentMethod === 'card' && '💳'}
                  {order.paymentMethod === 'pix' && '📱'}
                  {order.paymentMethod === 'cash' && '💵'}
                  {order.paymentMethod === 'online' && '🌐'}
                  {order.paymentMethod === 'bank_transfer' && '🏦'}
                </span>
              </OrderTotal>

              <OrderActions>
                {getStatusActions(order)}
              </OrderActions>
            </OrderCard>
          ))}
        </div>
      )}
    </OrdersContainer>
  );
};

export default OrdersList;