
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateQuizMetrics, getAnalyticsEvents, clearAnalyticsData } from '@/utils/analytics';
import { ChartConfig, ChartContainer, ChartLegendContent, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, FileText, Download, RefreshCcw, Trash2 } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ReturnType<typeof calculateQuizMetrics> | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Calcular métricas ao carregar ou atualizar
    const calculatedMetrics = calculateQuizMetrics();
    setMetrics(calculatedMetrics);
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados de analytics? Esta ação não pode ser desfeita.')) {
      clearAnalyticsData();
      handleRefresh();
    }
  };

  const handleExportData = () => {
    const events = getAnalyticsEvents();
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Tipo,Timestamp,Detalhes\n' + 
      events.map(e => {
        const details = Object.entries(e)
          .filter(([key]) => key !== 'type' && key !== 'timestamp')
          .map(([key, value]) => `${key}:${value}`)
          .join(';');
        
        return `${e.type},${e.timestamp},"${details}"`;
      }).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quiz-analytics-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Preparar dados para gráficos
  const prepareChartData = () => {
    if (!metrics?.eventsByDay) return [];
    
    const today = new Date();
    const dates = [];
    
    // Determinar o número de dias com base no intervalo de tempo selecionado
    let daysToInclude = 7;
    if (timeRange === '30d') daysToInclude = 30;
    else if (timeRange === 'all') daysToInclude = 90; // mostrar até 90 dias para "all"
    
    // Criar um array de datas para os últimos X dias
    for (let i = daysToInclude - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dates.push(dateString);
    }
    
    // Mapear dados para cada data
    return dates.map(date => {
      return {
        date,
        inicios: metrics.eventsByDay[date]?.quiz_start || 0,
        conclusoes: metrics.eventsByDay[date]?.quiz_complete || 0,
        resultados: metrics.eventsByDay[date]?.result_view || 0,
        leads: metrics.eventsByDay[date]?.lead_generated || 0
      };
    });
  };

  const chartData = prepareChartData();
  
  // Configuração para o gráfico
  const chartConfig: ChartConfig = {
    inicios: {
      label: "Inicios do Quiz",
      theme: {
        light: "#4f46e5",
        dark: "#818cf8"
      }
    },
    conclusoes: {
      label: "Conclusões",
      theme: {
        light: "#10b981",
        dark: "#34d399"
      }
    },
    resultados: {
      label: "Visualizações de Resultado",
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24"
      }
    },
    leads: {
      label: "Leads Gerados",
      theme: {
        light: "#ef4444",
        dark: "#f87171"
      }
    }
  };

  // Calcular dados para o funil
  const funnelData = metrics ? [
    { name: 'Inicios', value: metrics.totalStarts },
    { name: 'Conclusões', value: metrics.totalCompletes },
    { name: 'Visualizações de Resultado', value: metrics.totalResultViews },
    { name: 'Leads Gerados', value: metrics.totalLeads }
  ] : [];

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#432818]">Dashboard de Analytics</h1>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="all">Todo o período</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            
            <Button variant="destructive" size="sm" onClick={handleClearData}>
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Dados
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="funnel">Funil de Conversão</TabsTrigger>
            <TabsTrigger value="data">Dados Brutos</TabsTrigger>
          </TabsList>
          
          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total de Inicios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{metrics?.totalStarts || 0}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Taxa de Conclusão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{metrics?.completionRate.toFixed(1) || 0}%</p>
                  <p className="text-xs text-gray-500">{metrics?.totalCompletes || 0} conclusões</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Taxa de Conversão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{metrics?.conversionRate.toFixed(1) || 0}%</p>
                  <p className="text-xs text-gray-500">{metrics?.totalLeads || 0} leads gerados</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Taxa de Vendas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{metrics?.salesRate.toFixed(1) || 0}%</p>
                  <p className="text-xs text-gray-500">{metrics?.totalSales || 0} vendas realizadas</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Gráfico de Tendências */}
            <Card>
              <CardHeader>
                <CardTitle>Tendências</CardTitle>
                <CardDescription>Acompanhe a evolução do funil de conversão</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
                      <Legend content={(props) => <ChartLegendContent {...props} />} />
                      <Line type="monotone" dataKey="inicios" stroke="#4f46e5" strokeWidth={2} />
                      <Line type="monotone" dataKey="conclusoes" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="resultados" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="leads" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Funil de Conversão */}
          <TabsContent value="funnel" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Funil de Conversão</CardTitle>
                <CardDescription>Visualize a performance do seu funil de conversão</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={funnelData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
                      <Legend content={(props) => <ChartLegendContent {...props} />} />
                      <Bar dataKey="value" fill="#4f46e5" />
                    </BarChart>
                  </ChartContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Início → Conclusão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{metrics?.completionRate.toFixed(1) || 0}%</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Conclusão → Visualização</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {metrics?.totalCompletes ? ((metrics.totalResultViews / metrics.totalCompletes) * 100).toFixed(1) : 0}%
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Visualização → Lead</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        {metrics?.totalResultViews ? ((metrics.totalLeads / metrics.totalResultViews) * 100).toFixed(1) : 0}%
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Dados Brutos */}
          <TabsContent value="data" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados Brutos de Analytics</CardTitle>
                <CardDescription>Explore todos os eventos rastreados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Evento</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data e Hora</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalhes</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getAnalyticsEvents().slice(0, 50).map((event, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {event.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {Object.entries(event)
                              .filter(([key]) => key !== 'type' && key !== 'timestamp')
                              .map(([key, value]) => (
                                <div key={key}>
                                  <span className="font-medium">{key}:</span> {JSON.stringify(value)}
                                </div>
                              ))}
                          </td>
                        </tr>
                      ))}
                      {getAnalyticsEvents().length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                            Nenhum dado de analytics encontrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {getAnalyticsEvents().length > 50 && (
                  <div className="text-center mt-4 text-sm text-gray-500">
                    Mostrando os 50 eventos mais recentes. Exporte o CSV para visualizar todos os dados.
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <FileText className="h-4 w-4 mr-2" />
                  Exportar todos os dados
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
