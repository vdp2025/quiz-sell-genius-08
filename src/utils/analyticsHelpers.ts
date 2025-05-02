
import { getAnalyticsEvents } from './analytics';

// Mock implementation of analyticsHelpers
export const getCachedMetrics = (timeRange: '7d' | '30d' | 'all') => {
  try {
    const cacheKey = `analytics_metrics_cache_${timeRange}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    // If no cache, calculate metrics
    const events = getAnalyticsEvents();
    const filteredEvents = filterEventsByTimeRange(events, timeRange);
    
    // Calculate metrics based on events
    const metrics = {
      totalVisitors: calculateTotalVisitors(filteredEvents),
      completionRate: calculateCompletionRate(filteredEvents),
      conversionRate: calculateConversionRate(filteredEvents),
      averageTimeSpent: calculateAverageTimeSpent(filteredEvents),
      // Add more metrics as needed
    };
    
    // Cache the calculated metrics
    localStorage.setItem(cacheKey, JSON.stringify(metrics));
    
    return metrics;
  } catch (error) {
    console.error('Error getting cached metrics:', error);
    return {};
  }
};

export const resetMetricsCache = () => {
  try {
    localStorage.removeItem('analytics_metrics_cache_7d');
    localStorage.removeItem('analytics_metrics_cache_30d');
    localStorage.removeItem('analytics_metrics_cache_all');
    console.log('Metrics cache reset');
  } catch (error) {
    console.error('Error resetting metrics cache:', error);
  }
};

export const filterEventsByTimeRange = (events: any[], timeRange: '7d' | '30d' | 'all') => {
  if (timeRange === 'all') return events;
  
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;
  const timeLimit = timeRange === '7d' ? 7 * dayInMs : 30 * dayInMs;
  
  return events.filter(event => {
    const eventTime = new Date(event.timestamp).getTime();
    return (now - eventTime) <= timeLimit;
  });
};

// Helper functions for metrics calculation
const calculateTotalVisitors = (events: any[]) => {
  // Count unique visitors based on user IDs or sessions
  const uniqueUsers = new Set();
  events.forEach(event => {
    if (event.userId) uniqueUsers.add(event.userId);
    else if (event.sessionId) uniqueUsers.add(event.sessionId);
  });
  return uniqueUsers.size;
};

const calculateCompletionRate = (events: any[]) => {
  const starts = events.filter(e => e.type === 'quiz_start').length;
  const completes = events.filter(e => e.type === 'quiz_complete').length;
  return starts > 0 ? (completes / starts) * 100 : 0;
};

const calculateConversionRate = (events: any[]) => {
  const completes = events.filter(e => e.type === 'quiz_complete').length;
  const conversions = events.filter(e => e.type === 'purchase').length;
  return completes > 0 ? (conversions / completes) * 100 : 0;
};

const calculateAverageTimeSpent = (events: any[]) => {
  // Find start and complete pairs for the same user/session
  const sessions: Record<string, { start?: number, complete?: number }> = {};
  
  events.forEach(event => {
    const id = event.userId || event.sessionId || 'anonymous';
    if (!sessions[id]) sessions[id] = {};
    
    if (event.type === 'quiz_start' && event.timestamp) {
      sessions[id].start = new Date(event.timestamp).getTime();
    }
    if (event.type === 'quiz_complete' && event.timestamp) {
      sessions[id].complete = new Date(event.timestamp).getTime();
    }
  });
  
  // Calculate average time for completed sessions
  let totalTime = 0;
  let completedSessions = 0;
  
  Object.values(sessions).forEach(session => {
    if (session.start && session.complete && session.complete > session.start) {
      totalTime += (session.complete - session.start) / 1000; // Convert to seconds
      completedSessions++;
    }
  });
  
  return completedSessions > 0 ? totalTime / completedSessions : 0;
};
