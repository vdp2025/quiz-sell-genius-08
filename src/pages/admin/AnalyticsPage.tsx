
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { calculateQuizMetrics, getAnalyticsEvents, clearAnalyticsData, groupEventsByUser, getUserProgressData } from '@/utils/analytics';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, FileText, Download, RefreshCcw, Trash2, Search, User, Activity, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ReturnType<typeof calculateQuizMetrics> | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [userProgressData, setUserProgressData] = useState<any[]>([]);
  
  // Cores para os gráficos de funil
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    // Calcular métricas ao carregar ou atualizar
    const calculatedMetrics = calculateQuizMetrics();
    setMetrics(calculatedMetrics);
    
    // Calcular dados de progresso do usuário
    const events = getAnalyticsEvents();
    const progressData = getUserProgressData(events);
    setUserProgressData(progressData);
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
      'Tipo,Timestamp,Usuário,Email,SessionId,Detalhes\n' + 
      events.map(e => {
        const details = Object.entries(e)
          .filter(([key]) => !['type', 'timestamp', 'userName', 'userEmail', 'sessionId'].includes(key))
          .map(([key, value]) => `${key}:${value}`)
          .join(';');
        
        return `${e.type},${e.timestamp},${e.userName || ''},${e.userEmail || ''},"${e.sessionId || ''}","${details}"`;
      }).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quiz-analytics-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Visualizar detalhes de um usuário específico
  const handleViewUserDetails = (userId: string) => {
    const events = getAnalyticsEvents();
    const userEventGroups = groupEventsByUser(events);
    
    setSelectedUser(userId);
    
    if (userEventGroups[userId]) {
      // Ordenar eventos por timestamp
      const sortedEvents = [...userEventGroups[userId]].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setUserEvents(sortedEvents);
    } else {
      setUserEvents([]);
    }
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
  
  // Preparar dados para lista de usuários
  const prepareUsersList = () => {
    const events = getAnalyticsEvents();
    const userGroups = groupEventsByUser(events);
    
    return Object.entries(userGroups).map(([userId, userEvents]) => {
      // Encontrar o primeiro evento onde temos informações de usuário
      const userInfoEvent = userEvents.find(e => e.userName || e.userEmail);
      const startEvent = userEvents.find(e => e.type === 'quiz_start');
      const completeEvent = userEvents.find(e => e.type === 'quiz_complete');
      const latestEvent = [...userEvents].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];
      
      // Contar quantas perguntas o usuário respondeu
      const answeredQuestions = new Set();
      userEvents.forEach(e => {
        if (e.type === 'quiz_answer' && e.questionId) {
          answeredQuestions.add(e.questionId);
        }
      });
      
      return {
        id: userId,
        name: userInfoEvent?.userName || 'Usuário anônimo',
        email: userInfoEvent?.userEmail || 'Email não disponível',
        startTime: startEvent ? new Date(startEvent.timestamp) : null,
        completeTime: completeEvent ? new Date(completeEvent.timestamp) : null,
        lastActivity: latestEvent ? new Date(latestEvent.timestamp) : null,
        completed: !!completeEvent,
        totalQuestions: answeredQuestions.size,
        events: userEvents
      };
    }).filter(user => {
      // Filtrar usuários pela busca
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }).sort((a, b) => {
      // Ordenar por data de última atividade (mais recentes primeiro)
      if (!a.lastActivity) return 1;
      if (!b.lastActivity) return -1;
      return b.lastActivity.getTime() - a.lastActivity.getTime();
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  };
  
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'quiz_start':
        return <Badge variant="secondary" className="bg-blue-500 text-white">Início</Badge>;
      case 'quiz_answer':
        return <Badge variant="secondary" className="bg-green-500 text-white">Resposta</Badge>;
      case 'quiz_complete':
        return <Badge variant="secondary" className="bg-purple-500 text-white">Conclusão</Badge>;
      case 'result_view':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Resultado</Badge>;
      case 'lead_generated':
        return <Badge variant="secondary" className="bg-red-500 text-white">Lead</Badge>;
      case 'sale':
        return <Badge variant="secondary" className="bg-emerald-500 text-white">Venda</Badge>;
      default:
        return <Badge variant="secondary" className="bg-gray-500 text-white">Evento</Badge>;
    }
  };

  // Function to render custom tooltip content
  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload) return null;
    
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{props.label}</p>
        {props.payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  // Function to render custom legend content
  const renderLegendContent = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

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
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="funnel">Funil de Conversão</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="user-progress">Progresso por Questão</TabsTrigger>
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
                      <Tooltip content={renderTooltipContent} />
                      <Legend content={renderLegendContent} />
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
                      <Tooltip content={renderTooltipContent} />
                      <Legend content={renderLegendContent} />
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
          
          {/* Usuários */}
          <TabsContent value="users" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuários do Quiz</CardTitle>
                <CardDescription>Informações detalhadas sobre cada usuário que iniciou o quiz</CardDescription>
                <div className="flex items-center gap-2 mt-4">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    className="flex-1"
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última atividade</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perguntas</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {prepareUsersList().map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.startTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.lastActivity)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.completed ? (
                              <Badge className="bg-green-500 text-white">Concluído</Badge>
                            ) : (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-500">Em progresso</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {user.totalQuestions}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleViewUserDetails(user.id)}>
                                  <User className="h-4 w-4 mr-2" />
                                  Detalhes
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[800px]">
                                <DialogHeader>
                                  <DialogTitle>Detalhes do Usuário</DialogTitle>
                                  <DialogDescription>
                                    Histórico completo de atividades do usuário: {user.name}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Nome</p>
                                    <p className="text-base">{user.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="text-base">{user.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Início</p>
                                    <p className="text-base">{formatDate(user.startTime)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Conclusão</p>
                                    <p className="text-base">{formatDate(user.completeTime)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Perguntas Respondidas</p>
                                    <p className="text-base">{user.totalQuestions}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <p className="text-base">
                                      {user.completed ? (
                                        <Badge className="bg-green-500 text-white">Concluído</Badge>
                                      ) : (
                                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">Em progresso</Badge>
                                      )}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="border-t pt-4">
                                  <h4 className="text-sm font-medium text-gray-500 mb-2">Histórico de Eventos</h4>
                                  <ScrollArea className="h-[300px]">
                                    <div className="space-y-4">
                                      {userEvents.map((event, index) => (
                                        <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                                          <div className="flex-shrink-0 pt-1">
                                            {getEventIcon(event.type)}
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-sm font-medium">
                                              {event.type === 'quiz_answer' ? (
                                                <>Respondeu à questão {event.questionIndex + 1}</>
                                              ) : event.type === 'quiz_start' ? (
                                                <>Iniciou o quiz</>
                                              ) : event.type === 'quiz_complete' ? (
                                                <>Completou o quiz</>
                                              ) : event.type === 'result_view' ? (
                                                <>Visualizou o resultado: {event.resultType}</>
                                              ) : event.type === 'lead_generated' ? (
                                                <>Lead gerado: {event.email}</>
                                              ) : event.type === 'sale' ? (
                                                <>Realizou uma compra no valor de R$ {event.value}</>
                                              ) : (
                                                <>Evento: {event.type}</>
                                              )}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                              {new Date(event.timestamp).toLocaleString()}
                                            </p>
                                            {event.type === 'quiz_answer' && (
                                              <div className="mt-1 text-xs text-gray-600">
                                                <p>Opções selecionadas: {event.selectedOptions?.join(', ') || 'N/A'}</p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                      {userEvents.length === 0 && (
                                        <p className="text-sm text-gray-500">Nenhum evento encontrado para este usuário.</p>
                                      )}
                                    </div>
                                  </ScrollArea>
                                </div>
                                
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => {
                                      // Exportar dados deste usuário
                                      const csvContent = 'data:text/csv;charset=utf-8,' + 
                                        'Tipo,Timestamp,Detalhes\n' + 
                                        userEvents.map(e => {
                                          const details = Object.entries(e)
                                            .filter(([key]) => !['type', 'timestamp', 'userName', 'userEmail', 'sessionId'].includes(key))
                                            .map(([key, value]) => `${key}:${value}`)
                                            .join(';');
                                          
                                          return `${e.type},${e.timestamp},"${details}"`;
                                        }).join('\n');
                                      
                                      const encodedUri = encodeURI(csvContent);
                                      const link = document.createElement('a');
                                      link.setAttribute('href', encodedUri);
                                      link.setAttribute('download', `user-${user.name}-data.csv`);
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Exportar Dados do Usuário
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                      {prepareUsersList().length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                            {searchTerm ? 'Nenhum usuário encontrado para esta busca.' : 'Nenhum usuário encontrado.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progresso por Questão */}
          <TabsContent value="user-progress" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresso por Questão</CardTitle>
                <CardDescription>Análise de quantos usuários chegam a cada questão do quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={userProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="questionId" label={{ value: 'Questão', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Número de Usuários', angle: -90, position: 'insideLeft' }} />
                      <Tooltip content={renderTooltipContent} />
                      <Legend />
                      <Bar dataKey="uniqueUsers" fill="#4f46e5" name="Usuários Únicos" />
                    </BarChart>
                  </ChartContainer>
                </div>

                <div className="border rounded-md overflow-x-auto mt-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questão</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuários Únicos</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total de Respostas</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxa de Completude</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userProgressData.map((item, index) => (
                        <tr key={item.questionId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Questão {index + 1} ({item.questionId})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.uniqueUsers}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.totalAnswers}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.completionRate.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                      {userProgressData.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                            Nenhum dado de progresso disponível.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {event.userName || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {event.userEmail || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {Object.entries(event)
                              .filter(([key]) => !['type', 'timestamp', 'userName', 'userEmail', 'sessionId'].includes(key))
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
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
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
