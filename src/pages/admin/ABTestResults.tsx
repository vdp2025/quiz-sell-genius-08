import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ABTestEvent {
  event: string;
  variant: 'A' | 'B';
  timestamp: string;
  page: string;
  action?: string;
  value?: number;
}

const ABTestResults: React.FC = () => {
  const [views, setViews] = useState<ABTestEvent[]>([]);
  const [conversions, setConversions] = useState<ABTestEvent[]>([]);
  
  useEffect(() => {
    // Carregar dados do localStorage
    const storedViews = JSON.parse(localStorage.getItem('ab_test_events') || '[]');
    const storedConversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
    
    setViews(storedViews);
    setConversions(storedConversions);
  }, []);
  
  // Calcular métricas
  const variantAViews = views.filter(v => v.variant === 'A').length;
  const variantBViews = views.filter(v => v.variant === 'B').length;
  
  const variantAConversions = conversions.filter(c => c.variant === 'A').length;
  const variantBConversions = conversions.filter(c => c.variant === 'B').length;
  
  const variantAConversionRate = variantAViews > 0 ? (variantAConversions / variantAViews) * 100 : 0;
  const variantBConversionRate = variantBViews > 0 ? (variantBConversions / variantBViews) * 100 : 0;
  
  const exportData = () => {
    const data = {
      views,
      conversions,
      summary: {
        variantA: {
          views: variantAViews,
          conversions: variantAConversions,
          conversionRate: variantAConversionRate
        },
        variantB: {
          views: variantBViews,
          conversions: variantBConversions,
          conversionRate: variantBConversionRate
        }
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ab_test_results_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Resultados do Teste A/B</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Variante A</h2>
          <div className="space-y-2">
            <p>Visualizações: {variantAViews}</p>
            <p>Conversões: {variantAConversions}</p>
            <p>Taxa de Conversão: {variantAConversionRate.toFixed(2)}%</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Variante B</h2>
          <div className="space-y-2">
            <p>Visualizações: {variantBViews}</p>
            <p>Conversões: {variantBConversions}</p>
            <p>Taxa de Conversão: {variantBConversionRate.toFixed(2)}%</p>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center mb-8">
        <Button onClick={exportData}>Exportar Dados</Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Visualizações</h2>
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Variante</th>
                  <th className="text-left">Data</th>
                  <th className="text-left">Página</th>
                </tr>
              </thead>
              <tbody>
                {views.slice(-10).reverse().map((view, index) => (
                  <tr key={index}>
                    <td>{view.variant}</td>
                    <td>{new Date(view.timestamp).toLocaleString()}</td>
                    <td>{view.page}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Conversões</h2>
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Variante</th>
                  <th className="text-left">Ação</th>
                  <th className="text-left">Data</th>
                </tr>
              </thead>
              <tbody>
                {conversions.slice(-10).reverse().map((conversion, index) => (
                  <tr key={index}>
                    <td>{conversion.variant}</td>
                    <td>{conversion.action}</td>
                    <td>{new Date(conversion.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ABTestResults;