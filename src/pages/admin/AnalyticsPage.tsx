import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateQuizMetrics, getAnalyticsEvents, clearAnalyticsData, groupEventsByUser, getUserProgressData } from '@/utils/analytics';
import { ChartConfig } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

// Import our new components
import { DashboardHeader } from '@/components/analytics/DashboardHeader';
import { OverviewTab } from '@/components/analytics/tabs/OverviewTab';
import { FunnelTab } from '@/components/analytics/tabs/FunnelTab';
import { UsersTab } from '@/components/analytics/tabs/UsersTab';
import { ProgressTab } from '@/components/analytics/tabs/ProgressTab';
import { DataTab } from '@/components/analytics/tabs/DataTab';

const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ReturnType<typeof calculateQuizMetrics> | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [userProgressData, setUserProgressData] = useState<any[]>([]);
  
  // Enhanced colors for charts
  const COLORS = {
    inicios: '#4f46e5',     // Indigo
    conclusoes: '#10b981',  // Emerald
    resultados: '#f59e0b',  // Amber
    leads: '#ef4444',       // Red
    sales: '#8b5cf6',       // Purple
  };

  useEffect(() => {
    // Calculate metrics on load or refresh
    const calculatedMetrics = calculateQuizMetrics();
    setMetrics(calculatedMetrics);
    
    // Calculate user progress data
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

  // View details of a specific user
  const handleViewUserDetails = (userId: string) => {
    const events = getAnalyticsEvents();
    const userEventGroups = groupEventsByUser(events);
    
    setSelectedUser(userId);
    
    if (userEventGroups[userId]) {
      // Sort events by timestamp
      const sortedEvents = [...userEventGroups[userId]].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setUserEvents(sortedEvents);
    } else {
      setUserEvents([]);
    }
  };

  // Prepare data for charts
  const prepareChartData = () => {
    if (!metrics?.eventsByDay) return [];
    
    const today = new Date();
    const dates = [];
    
    // Determine number of days based on selected time range
    let daysToInclude = 7;
    if (timeRange === '30d') daysToInclude = 30;
    else if (timeRange === 'all') daysToInclude = 90; // show up to 90 days for "all"
    
    // Create an array of dates for the last X days
    for (let i = daysToInclude - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dates.push(dateString);
    }
    
    // Map data for each date
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
  
  // Enhanced chart configuration with improved colors and labels
  const chartConfig: ChartConfig = {
    inicios: {
      label: "Inicios do Quiz",
      theme: {
        light: COLORS.inicios,
        dark: "#818cf8"
      }
    },
    conclusoes: {
      label: "Conclusões",
      theme: {
        light: COLORS.conclusoes,
        dark: "#34d399"
      }
    },
    resultados: {
      label: "Visualizações de Resultado",
      theme: {
        light: COLORS.resultados,
        dark: "#fbbf24"
      }
    },
    leads: {
      label: "Leads Gerados",
      theme: {
        light: COLORS.leads,
        dark: "#f87171"
      }
    }
  };

  // Calculate funnel data
  const funnelData = metrics ? [
    { name: 'Inicios', value: metrics.totalStarts },
    { name: 'Conclusões', value: metrics.totalCompletes },
    { name: 'Visualizações de Resultado', value: metrics.totalResultViews },
    { name: 'Leads Gerados', value: metrics.totalLeads }
  ] : [];
  
  // Prepare users list data
  const prepareUsersList = () => {
    const events = getAnalyticsEvents();
    const userGroups = groupEventsByUser(events);
    
    return Object.entries(userGroups).map(([userId, userEvents]) => {
      // Find the first event where we have user information
      const userInfoEvent = userEvents.find(e => e.userName || e.userEmail);
      const startEvent = userEvents.find(e => e.type === 'quiz_start');
      const completeEvent = userEvents.find(e => e.type === 'quiz_complete');
      const latestEvent = [...userEvents].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];
      
      // Count how many questions the user answered
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
      // Filter users by search term
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }).sort((a, b) => {
      // Sort by last activity date (most recent first)
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

  // Custom tooltip renderer with improved styling
  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload) return null;
    
    return (
      <div className="bg-white p-3 border border-border/60 shadow-lg rounded-md min-w-[180px]">
        <p className="font-medium text-sm border-b pb-1 mb-1 text-foreground/80">{props.label}</p>
        {props.payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="flex items-center justify-between py-0.5 text-sm">
            <span className="flex items-center gap-1">
              <span 
                className="inline-block w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}: 
            </span>
            <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  };

  // Custom legend renderer with improved styling
  const renderLegendContent = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-5 pt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-foreground/80">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <DashboardHeader 
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onRefresh={handleRefresh}
          onExportData={handleExportData}
          onClearData={handleClearData}
        />
        
        <div className="mt-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="funnel">Funil de Conversão</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="user-progress">Progresso por Questão</TabsTrigger>
              <TabsTrigger value="data">Dados Brutos</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <OverviewTab 
                metrics={metrics} 
                chartData={chartData} 
                chartConfig={chartConfig} 
                renderTooltipContent={renderTooltipContent} 
                renderLegendContent={renderLegendContent} 
              />
            </TabsContent>
            
            {/* Funnel Tab */}
            <TabsContent value="funnel" className="mt-6">
              <FunnelTab 
                metrics={metrics} 
                funnelData={funnelData} 
                chartConfig={chartConfig} 
                renderTooltipContent={renderTooltipContent} 
                renderLegendContent={renderLegendContent} 
              />
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users" className="mt-6">
              <UsersTab 
                prepareUsersList={prepareUsersList} 
                handleViewUserDetails={handleViewUserDetails} 
                userEvents={userEvents} 
                selectedUser={selectedUser} 
                formatDate={formatDate} 
                getEventIcon={getEventIcon} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
            </TabsContent>
            
            {/* User Progress Tab */}
            <TabsContent value="user-progress" className="mt-6">
              <ProgressTab 
                userProgressData={userProgressData} 
                chartConfig={chartConfig} 
                renderTooltipContent={renderTooltipContent} 
              />
            </TabsContent>
            
            {/* Raw Data Tab */}
            <TabsContent value="data" className="mt-6">
              <DataTab 
                getAnalyticsEvents={getAnalyticsEvents} 
                handleExportData={handleExportData} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
