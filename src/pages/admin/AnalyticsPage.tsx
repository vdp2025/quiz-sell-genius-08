
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateQuizMetrics, getAnalyticsEvents, clearAnalyticsData, groupEventsByUser, getUserProgressData, getUTMData } from '@/utils/analytics';
import { ChartConfig } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

// Import components
import { DashboardHeader } from '@/components/analytics/DashboardHeader';
import { OverviewTab } from '@/components/analytics/tabs/OverviewTab';
import { FunnelTab } from '@/components/analytics/tabs/FunnelTab';
import { UsersTab } from '@/components/analytics/tabs/UsersTab';
import { ProgressTab } from '@/components/analytics/tabs/ProgressTab';
import { DataTab } from '@/components/analytics/tabs/DataTab';
import { UtmTab } from '@/components/analytics/tabs/UtmTab';
import { IntegrationTab } from '@/components/analytics/tabs/IntegrationTab';

const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ReturnType<typeof calculateQuizMetrics> | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [userProgressData, setUserProgressData] = useState<any[]>([]);
  const [utmData, setUtmData] = useState<any[]>([]);
  
  // Enhanced colors for charts
  const COLORS = {
    inicios: '#8B5CF6',    // Purple
    conclusoes: '#10b981', // Green
    resultados: '#f59e0b', // Amber
    leads: '#ef4444',      // Red
    sales: '#0ea5e9',      // Blue
  };

  useEffect(() => {
    // Calculate metrics on load or refresh
    const calculatedMetrics = calculateQuizMetrics();
    setMetrics(calculatedMetrics);
    
    // Calculate user progress data
    const events = getAnalyticsEvents();
    const progressData = getUserProgressData(events);
    setUserProgressData(progressData);
    
    // Process UTM data
    const utmDataRaw = getUTMData() ? [getUTMData()] : [];
    // Transform UTM data for visualization
    const processedUtmData = [
      {
        source: utmDataRaw[0]?.utm_source || 'direct',
        medium: utmDataRaw[0]?.utm_medium || 'none',
        campaign: utmDataRaw[0]?.utm_campaign || 'none',
        users: 1,
        conversions: 0,
        conversionRate: 0
      },
      // Add some sample UTM data for demonstration
      {
        source: 'google',
        medium: 'cpc',
        campaign: 'brand_awareness',
        users: 25,
        conversions: 5,
        conversionRate: 20
      },
      {
        source: 'facebook',
        medium: 'social',
        campaign: 'summer_promo',
        users: 40,
        conversions: 8,
        conversionRate: 20
      },
      {
        source: 'email',
        medium: 'newsletter',
        campaign: 'weekly_digest',
        users: 15,
        conversions: 6,
        conversionRate: 40
      },
      {
        source: 'instagram',
        medium: 'social',
        campaign: 'influencer',
        users: 30,
        conversions: 12,
        conversionRate: 40
      }
    ];
    
    setUtmData(processedUtmData);
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      clearAnalyticsData();
      handleRefresh();
    }
  };

  const handleExportData = () => {
    const events = getAnalyticsEvents();
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Type,Timestamp,User,Email,SessionId,Details\n' + 
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
      label: "Quiz Starts",
      theme: {
        light: COLORS.inicios,
        dark: "#818cf8"
      }
    },
    conclusoes: {
      label: "Completions",
      theme: {
        light: COLORS.conclusoes,
        dark: "#34d399"
      }
    },
    resultados: {
      label: "Result Views",
      theme: {
        light: COLORS.resultados,
        dark: "#fbbf24"
      }
    },
    leads: {
      label: "Leads Generated",
      theme: {
        light: COLORS.leads,
        dark: "#f87171"
      }
    }
  };

  // Calculate funnel data
  const funnelData = metrics ? [
    { name: 'Starts', value: metrics.totalStarts },
    { name: 'Completions', value: metrics.totalCompletes },
    { name: 'Result Views', value: metrics.totalResultViews },
    { name: 'Leads Generated', value: metrics.totalLeads }
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
        name: userInfoEvent?.userName || 'Anonymous user',
        email: userInfoEvent?.userEmail || 'Email not available',
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
        return <Badge variant="secondary" className="bg-blue-500 text-white">Start</Badge>;
      case 'quiz_answer':
        return <Badge variant="secondary" className="bg-green-500 text-white">Answer</Badge>;
      case 'quiz_complete':
        return <Badge variant="secondary" className="bg-purple-500 text-white">Complete</Badge>;
      case 'result_view':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Result</Badge>;
      case 'lead_generated':
        return <Badge variant="secondary" className="bg-red-500 text-white">Lead</Badge>;
      case 'sale':
        return <Badge variant="secondary" className="bg-emerald-500 text-white">Sale</Badge>;
      default:
        return <Badge variant="secondary" className="bg-gray-500 text-white">Event</Badge>;
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
            <TabsList className="grid w-full grid-cols-7 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="user-progress">Question Progress</TabsTrigger>
              <TabsTrigger value="utm">UTM Analytics</TabsTrigger>
              <TabsTrigger value="integrations">API Integrations</TabsTrigger>
              <TabsTrigger value="data">Raw Data</TabsTrigger>
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
            
            {/* UTM Analytics Tab */}
            <TabsContent value="utm" className="mt-6">
              <UtmTab
                utmData={utmData}
                chartConfig={chartConfig}
                renderTooltipContent={renderTooltipContent}
              />
            </TabsContent>
            
            {/* API Integrations Tab */}
            <TabsContent value="integrations" className="mt-6">
              <IntegrationTab />
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
