// src/components/Reports/PDFGenerator/index.tsx
import React from 'react';
import jsPDF from 'jspdf';
import Button from '../../common/Button';

interface ReportData {
  period: string;
  totalRevenue: number;
  totalOrders: number;
  averageTicket: number;
  topProduct: string;
  dailySales: Array<{
    date: string;
    sales: number;
    orders: number;
  }>;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

interface PDFGeneratorProps {
  data: ReportData;
  onGenerateComplete?: () => void;
}

// Função para gerar PDF (não é uma classe)
export const generateReportPDF = async (data: ReportData) => {
  try {
    // Criar novo documento PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Configurações
    const margin = 20;
    let currentY = margin;

    // Função para adicionar nova página se necessário
    const checkPageBreak = (neededHeight: number) => {
      if (currentY + neededHeight > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
        return true;
      }
      return false;
    };

    // Função para formatar moeda
    const formatCurrency = (value: number) => {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    };

    // Função para formatar data
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    };

    // CABEÇALHO
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 107, 53); // Cor laranja
    pdf.text('🍕 RELATÓRIO DE VENDAS', margin, currentY);
    currentY += 15;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Período: ${data.period}`, margin, currentY);
    currentY += 10;

    pdf.setTextColor(150, 150, 150);
    pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, margin, currentY);
    currentY += 15;

    // Linha separadora
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 10;

    // MÉTRICAS PRINCIPAIS
    checkPageBreak(30);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(26, 32, 44);
    pdf.text('📊 MÉTRICAS PRINCIPAIS', margin, currentY);
    currentY += 12;

    // Grid de métricas
    const metricsData = [
      { label: 'Faturamento Total', value: formatCurrency(data.totalRevenue), icon: '💰' },
      { label: 'Total de Pedidos', value: data.totalOrders.toString(), icon: '📋' },
      { label: 'Ticket Médio', value: formatCurrency(data.averageTicket), icon: '🎯' },
      { label: 'Produto Top', value: data.topProduct, icon: '🏆' }
    ];

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    metricsData.forEach((metric, index) => {
      const x = margin + (index % 2) * (pageWidth / 2 - margin);
      const y = currentY + Math.floor(index / 2) * 20;
      
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${metric.icon} ${metric.label}:`, x, y);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(26, 32, 44);
      pdf.text(metric.value, x, y + 6);
      pdf.setFont('helvetica', 'normal');
    });
    
    currentY += 50;

    // VENDAS DIÁRIAS
    checkPageBreak(40);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(26, 32, 44);
    pdf.text('📈 VENDAS DIÁRIAS', margin, currentY);
    currentY += 15;

    // Cabeçalho da tabela
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(74, 85, 104);
    
    const tableHeaders = ['Data', 'Vendas', 'Pedidos', 'Ticket Médio'];
    const colWidths = [40, 40, 30, 40];
    let tableX = margin;
    
    tableHeaders.forEach((header, index) => {
      pdf.text(header, tableX, currentY);
      tableX += colWidths[index];
    });
    
    currentY += 8;
    
    // Linha do cabeçalho
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, currentY, margin + 150, currentY);
    currentY += 5;

    // Dados da tabela
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(26, 32, 44);
    
    data.dailySales.forEach((sale) => {
      checkPageBreak(8);
      
      tableX = margin;
      const rowData = [
        formatDate(sale.date),
        formatCurrency(sale.sales),
        sale.orders.toString(),
        formatCurrency(sale.sales / sale.orders)
      ];
      
      rowData.forEach((cell, index) => {
        pdf.text(cell, tableX, currentY);
        tableX += colWidths[index];
      });
      
      currentY += 6;
    });

    currentY += 10;

    // TOP PRODUTOS
    checkPageBreak(40);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(26, 32, 44);
    pdf.text('🏆 TOP PRODUTOS', margin, currentY);
    currentY += 15;

    // Cabeçalho da tabela de produtos
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(74, 85, 104);
    
    const productHeaders = ['Produto', 'Quantidade', 'Faturamento', 'Ticket Médio'];
    const productColWidths = [60, 30, 40, 40];
    tableX = margin;
    
    productHeaders.forEach((header, index) => {
      pdf.text(header, tableX, currentY);
      tableX += productColWidths[index];
    });
    
    currentY += 8;
    
    // Linha do cabeçalho
    pdf.line(margin, currentY, margin + 170, currentY);
    currentY += 5;

    // Dados dos produtos
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(26, 32, 44);
    
    data.topProducts.forEach((product, index) => {
      checkPageBreak(8);
      
      tableX = margin;
      const productRowData = [
        `${index + 1}. ${product.name}`,
        product.quantity.toString(),
        formatCurrency(product.revenue),
        formatCurrency(product.revenue / product.quantity)
      ];
      
      productRowData.forEach((cell, colIndex) => {
        pdf.text(cell, tableX, currentY);
        tableX += productColWidths[colIndex];
      });
      
      currentY += 6;
    });

    // RODAPÉ
    const footerY = pageHeight - 20;
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Sistema Administrativo - Pizzaria', margin, footerY);
    pdf.text(`Página 1 de ${pdf.getNumberOfPages()}`, pageWidth - margin - 30, footerY);

    // Salvar o PDF
    const fileName = `relatorio-vendas-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    return { success: true, fileName };
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Erro ao gerar relatório PDF');
  }
};

// Componente React para o botão de PDF
export const PDFGenerator: React.FC<PDFGeneratorProps> = ({ 
  data, 
  onGenerateComplete 
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      await generateReportPDF(data);
      
      if (onGenerateComplete) {
        onGenerateComplete();
      }
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar relatório PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleGeneratePDF}
      isLoading={isGenerating}
      loadingText="Gerando PDF..."
      leftIcon={<span>📄</span>}
    >
      Exportar PDF
    </Button>
  );
};

export default PDFGenerator;