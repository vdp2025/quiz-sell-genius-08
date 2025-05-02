
import React, { useState, useEffect, Suspense } from 'react';
import { DashboardHeader } from '@/components/analytics/DashboardHeader';
import { AnalyticsLoadingState } from '@/components/analytics/LoadingState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import { getAnalyticsEvents, calculateQuizMetrics, clearAnalyticsData, testFacebookPixel } from '@/utils/analytics';
import { toast } from '@/components/ui/use-toast';

// Lazy loaded tab components for better performance
const OverviewTab = React.lazy(() => import('@/components/analytics/tabs/OverviewTab'));
const FunnelTab = React.lazy(() => import('@/components/analytics/tabs/FunnelTab'));
const UsersTab = React.lazy(() => import('@/components/analytics/tabs/UsersTab'));
const ProgressTab = React.lazy(() => import('@/components/analytics/tabs/ProgressTab'));
const DataTab = React.lazy(() => import('@/components/analytics/tabs/DataTab'));
const UtmTab = React.lazy(() => import('@/components/analytics/tabs/UtmTab'));
const IntegrationTab = React.lazy(() => import('@/components/analytics/tabs/IntegrationTab'));

const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [metricsCalculated, setMetricsCalculated] = useState(false);
  const isLowPerformance = useIsLowPerformanceDevice();
  
  const { isLoading, setLoading, completeLoading } = useLoadingState({
    minDuration: 800,
    maxDuration: 10000
  });

  useEffect(() => {
    // Load analytics data
    setLoading(true);
    
    try {
      // Get events from localStorage
      const events = getAnalyticsEvents();
      
      // Apply time range filter
      const filteredEvents = filterEventsByTimeRange(events, timeRange);
      
      // Calculate metrics
      const metrics = calculateQuizMetrics();
      
      setAnalyticsData({ 
        events: filteredEvents,
        metrics,
        timeRange
      });
      
      setMetricsCalculated(true);
      completeLoading();
    } catch (error) {
      console.error('Error loading analytics data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analytics data. Please try again.',
        variant: 'destructive',
      });
      completeLoading();
    }
  }, [timeRange, setLoading, completeLoading]);

  // Filter events by time range
  const filterEventsByTimeRange = (events: any[], range: '7d' | '30d' | 'all') => {
    if (range === 'all') return events;
    
    const now = new Date();
    const daysBack = range === '7d' ? 7 : 30;
    const cutoffDate = new Date(now.setDate(now.getDate() - daysBack));
    
    return events.filter(event => {
      if (!event.timestamp) return true;
      const eventDate = new Date(event.timestamp);
      return eventDate >= cutoffDate;
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    // Re-fetch analytics data
    setTimeout(() => {
      const events = getAnalyticsEvents();
      const filteredEvents = filterEventsByTimeRange(events, timeRange);
      const metrics = calculateQuizMetrics();
      
      setAnalyticsData({ 
        events: filteredEvents,
        metrics,
        timeRange
      });
      
      toast({
        title: 'Refreshed',
        description: 'Analytics data has been refreshed.',
      });
      
      completeLoading();
    }, isLowPerformance ? 200 : 500); // Shorter time for low performance devices
  };

  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `quiz-analytics-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: 'Export successful',
        description: 'Analytics data has been exported successfully.',
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: 'Export failed',
        description: 'Failed to export analytics data.',
        variant: 'destructive',
      });
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      clearAnalyticsData();
      
      toast({
        title: 'Data cleared',
        description: 'All analytics data has been cleared.',
      });
      
      handleRefresh();
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Render loading skeleton if data is not ready
  if (isLoading || !analyticsData) {
    return (
      <div className="container mx-auto px-4 py-6">
        <AnalyticsLoadingState />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={handleRefresh}
        onExportData={handleExportData}
        onClearData={handleClearData}
      />
      
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="funnel"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Conversion Funnel
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            User Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="progress"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Quiz Progress
          </TabsTrigger>
          <TabsTrigger 
            value="utm"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            UTM Tracking
          </TabsTrigger>
          <TabsTrigger 
            value="integration"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="data"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Raw Data
          </TabsTrigger>
        </TabsList>
        
        <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
          <TabsContent value="overview" className="mt-6">
            <OverviewTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="funnel" className="mt-6">
            <FunnelTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <UsersTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-6">
            <ProgressTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="utm" className="mt-6">
            <UtmTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="integration" className="mt-6">
            <IntegrationTab analyticsData={analyticsData} testFunction={testFacebookPixel} />
          </TabsContent>
          
          <TabsContent value="data" className="mt-6">
            <DataTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
