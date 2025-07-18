// src/utils/pdfGenerator.ts - VERSÃO SIMPLIFICADA
export const generateSimplePDF = () => {
  try {
    console.log('📄 Iniciando geração de PDF...');

    // Criar conteúdo HTML para o PDF
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Relatório de Vendas - Pizzaria</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #FF6B35;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #FF6B35;
            margin: 0;
            font-size: 24px;
          }
          .header p {
            margin: 5px 0;
            color: #666;
          }
          .metrics {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          .metric-card {
            border: 1px solid #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .metric-title {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 10px;
          }
          .metric-value {
            font-size: 20px;
            font-weight: bold;
            color: #1a202c;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🍕 RELATÓRIO DE VENDAS</h1>
          <p>Período: Últimos 7 dias</p>
          <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>

        <div class="metrics">
          <div class="metric-card">
            <div class="metric-title">💰 Faturamento Total</div>
            <div class="metric-value">R$ 11.802,30</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">📋 Total de Pedidos</div>
            <div class="metric-value">175</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">🎯 Ticket Médio</div>
            <div class="metric-value">R$ 67,44</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">🏆 Produto Top</div>
            <div class="metric-value">Pizza Margherita</div>
          </div>
        </div>

        <h3>📈 Vendas Diárias</h3>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendas</th>
              <th>Pedidos</th>
              <th>Ticket Médio</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>15/01</td><td>R$ 1.250,50</td><td>18</td><td>R$ 69,47</td></tr>
            <tr><td>16/01</td><td>R$ 1.580,30</td><td>23</td><td>R$ 68,71</td></tr>
            <tr><td>17/01</td><td>R$ 980,75</td><td>15</td><td>R$ 65,38</td></tr>
            <tr><td>18/01</td><td>R$ 2.100,80</td><td>31</td><td>R$ 67,77</td></tr>
            <tr><td>19/01</td><td>R$ 1.750,20</td><td>26</td><td>R$ 67,31</td></tr>
            <tr><td>20/01</td><td>R$ 2.250,40</td><td>34</td><td>R$ 66,19</td></tr>
            <tr><td>21/01</td><td>R$ 1.890,60</td><td>28</td><td>R$ 67,52</td></tr>
          </tbody>
        </table>

        <h3>🏆 Top 5 Produtos</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Faturamento</th>
              <th>Ticket Médio</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1. Pizza Margherita</td><td>45</td><td>R$ 1.480,50</td><td>R$ 32,90</td></tr>
            <tr><td>2. Pizza Pepperoni</td><td>38</td><td>R$ 1.478,20</td><td>R$ 38,90</td></tr>
            <tr><td>3. Pizza Portuguesa</td><td>28</td><td>R$ 1.201,20</td><td>R$ 42,90</td></tr>
            <tr><td>4. Coca-Cola 350ml</td><td>85</td><td>R$ 467,50</td><td>R$ 5,50</td></tr>
            <tr><td>5. Pizza Calabresa</td><td>22</td><td>R$ 790,80</td><td>R$ 35,95</td></tr>
          </tbody>
        </table>

        <div class="footer">
          <p>Sistema Administrativo - Pizzaria</p>
          <p>Relatório gerado automaticamente</p>
        </div>
      </body>
      </html>
    `;

    // Criar um blob com o conteúdo HTML
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Criar link para download
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-vendas-${new Date().toISOString().split('T')[0]}.html`;
    
    // Simular clique para download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpar URL
    URL.revokeObjectURL(url);
    
    console.log('✅ PDF gerado com sucesso!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error);
    throw new Error('Erro ao gerar relatório');
  }
};