// src/components/Dashboard/OrdersList/index.tsx
import React from 'react';
import { Order, orderStatusLabels, orderStatusColors } from '../../../types/order';
import { updateOrderStatus } from '../../../services/firebase/firestore';
import { useNotifications } from '../../../hooks/useNotifications';
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
  const { notifications } = useNotifications();

  const handleStatusUpdate = async (orderId: string, newStatus: string, orderNumber: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      // Notificar sobre a mudança de status
      await notifications.statusUpdate(orderNumber, newStatus);
      
      console.log('✅ Status atualizado:', newStatus);
    } catch (error) {
      console.error('❌ Erro ao atualizar status:', error);
      notifications.error(`Erro ao atualizar pedido #${orderNumber}`);
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
              onClick={() => handleStatusUpdate(order.id, 'confirmed', order.orderNumber)}
            >
              ✅ Aceitar
            </Button>
            <Button 
              size="sm" 
              variant="error"
              onClick={() => handleStatusUpdate(order.id, 'canceled', order.orderNumber)}
            >
              ❌ Recusar
            </Button>
          </>
        );
      case 'confirmed':
        return (
          <Button 
            size="sm" 
            variant="warning"
            onClick={() => handleStatusUpdate(order.id, 'preparing', order.orderNumber)}
          >
            👨‍🍳 Iniciar Preparo
          </Button>
        );
      case 'preparing':
        return (
          <Button 
            size="sm" 
            variant="primary"
            onClick={() => handleStatusUpdate(order.id, 'ready', order.orderNumber)}
          >
            🍕 Marcar Pronto
          </Button>
        );
      case 'ready':
        return (
          <Button 
            size="sm" 
            variant="success"
            onClick={() => handleStatusUpdate(order.id, 'out_for_delivery', order.orderNumber)}
          >
            🚚 Saiu p/ Entrega
          </Button>
        );
      case 'out_for_delivery':
        return (
          <Button 
            size="sm" 
            variant="success"
            onClick={() => handleStatusUpdate(order.id, 'delivered', order.orderNumber)}
          >
            ✅ Marcar Entregue
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
          🔄 Carregando pedidos...
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
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
            💡 Clique em "+ Dados Demo" para criar pedidos de exemplo
          </p>
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
                <span style={{ 
                  background: order.deliveryMethod === 'delivery' ? '#3182CE20' : '#D69E2E20',
                  color: order.deliveryMethod === 'delivery' ? '#3182CE' : '#D69E2E',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {order.deliveryMethod === 'delivery' ? '🚚 Entrega' : '🏪 Retirada'}
                </span>
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
                <span style={{ fontSize: '20px' }}>
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