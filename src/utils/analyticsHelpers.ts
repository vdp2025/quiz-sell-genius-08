
import { getAnalyticsEvents } from './analytics';

// Cache for expensive operations
const analyticsCache = {
  metrics: null as any | null,
  timestamp: 0,
  timeRange: null as string | null
};

// Cache expiration time (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000;

/**
 * Get cached analytics data or calculate new metrics if needed
 */
export const getCachedMetrics = (timeRange = 'all') => {
  const now = Date.now();
  const cacheExpired = now - analyticsCache.timestamp > CACHE_EXPIRY;
  const rangeMismatch = analyticsCache.timeRange !== timeRange;
  
  if (!analyticsCache.metrics || cacheExpired || rangeMismatch) {
    // Get fresh data
    const events = getAnalyticsEvents();
    const filteredEvents = filterEventsByTimeRange(events, timeRange);
    
    analyticsCache.metrics = calculateMetrics(filteredEvents);
    analyticsCache.timestamp = now;
    analyticsCache.timeRange = timeRange;
  }
  
  return analyticsCache.metrics;
};

/**
 * Reset the metrics cache
 */
export const resetMetricsCache = () => {
  analyticsCache.metrics = null;
  analyticsCache.timestamp = 0;
  analyticsCache.timeRange = null;
};

/**
 * Filter events by time range
 */
export const filterEventsByTimeRange = (events: any[], range: string) => {
  if (range === 'all') return events;
  
  const now = new Date();
  const daysBack = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const cutoffDate = new Date(now.setDate(now.getDate() - daysBack));
  
  return events.filter(event => {
    if (!event.timestamp) return true;
    const eventDate = new Date(event.timestamp);
    return eventDate >= cutoffDate;
  });
};

/**
 * Calculate metrics from events
 */
export const calculateMetrics = (events: any[]) => {
  // Cache common calculations to avoid repeated processing
  const eventsByType = groupEventsByType(events);
  
  // Get counts for different event types
  const starts = (eventsByType['quiz_start'] || []).length;
  const completes = (eventsByType['quiz_complete'] || []).length;
  const resultViews = (eventsByType['result_view'] || []).length;
  const leads = (eventsByType['lead_generated'] || []).length;
  const sales = (eventsByType['sale'] || []).length;
  
  // Calculate rates
  const completionRate = starts > 0 ? (completes / starts) * 100 : 0;
  const conversionRate = starts > 0 ? (leads / starts) * 100 : 0;
  const salesRate = leads > 0 ? (sales / leads) * 100 : 0;
  
  // Calculate events by day for charts
  const eventsByDay = groupEventsByDay(events);
  
  // Calculate unique users
  const uniqueUsers = countUniqueUsers(events);
  
  // Calculate average completion time
  const avgCompletionTime = calculateAverageCompletionTime(events);
  
  return {
    totalStarts: starts,
    totalCompletes: completes,
    totalResultViews: resultViews,
    totalLeads: leads,
    totalSales: sales,
    completionRate,
    conversionRate,
    salesRate,
    eventsByDay,
    uniqueUsers,
    avgCompletionTime
  };
};

/**
 * Group events by type for faster lookups
 */
const groupEventsByType = (events: any[]) => {
  const grouped: Record<string, any[]> = {};
  
  events.forEach(event => {
    if (!grouped[event.type]) {
      grouped[event.type] = [];
    }
    
    grouped[event.type].push(event);
  });
  
  return grouped;
};

/**
 * Group events by day for charts
 */
export const groupEventsByDay = (events: any[]) => {
  const grouped: Record<string, Record<string, number>> = {};
  
  events.forEach(event => {
    if (!event.timestamp) return;
    
    const date = new Date(event.timestamp).toISOString().split('T')[0];
    if (!grouped[date]) {
      grouped[date] = {
        'quiz_start': 0,
        'quiz_complete': 0,
        'result_view': 0,
        'lead_generated': 0,
        'sale': 0,
        'button_click': 0
      };
    }
    
    if (grouped[date][event.type] !== undefined) {
      grouped[date][event.type]++;
    }
  });
  
  // Sort dates
  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .reduce((acc, [date, values]) => {
      acc[date] = values;
      return acc;
    }, {} as Record<string, Record<string, number>>);
};

/**
 * Count unique users from events
 */
const countUniqueUsers = (events: any[]) => {
  const uniqueSessions = new Set<string>();
  const uniqueEmails = new Set<string>();
  
  events.forEach(event => {
    if (event.sessionId) {
      uniqueSessions.add(event.sessionId);
    }
    if (event.email) {
      uniqueEmails.add(event.email);
    } else if (event.userEmail) {
      uniqueEmails.add(event.userEmail);
    }
  });
  
  return {
    sessions: uniqueSessions.size,
    emails: uniqueEmails.size
  };
};

/**
 * Calculate average time to complete quiz
 */
const calculateAverageCompletionTime = (events: any[]) => {
  const sessionCompletionTimes: Record<string, { start: number, complete: number }> = {};
  
  // Find start and completion times for each session
  events.forEach(event => {
    if (!event.sessionId || !event.timestamp) return;
    
    const timestamp = new Date(event.timestamp).getTime();
    
    if (event.type === 'quiz_start') {
      if (!sessionCompletionTimes[event.sessionId]) {
        sessionCompletionTimes[event.sessionId] = { start: timestamp, complete: 0 };
      } else {
        sessionCompletionTimes[event.sessionId].start = timestamp;
      }
    } else if (event.type === 'quiz_complete') {
      if (!sessionCompletionTimes[event.sessionId]) {
        sessionCompletionTimes[event.sessionId] = { start: 0, complete: timestamp };
      } else {
        sessionCompletionTimes[event.sessionId].complete = timestamp;
      }
    }
  });
  
  // Calculate completion times
  let totalTime = 0;
  let count = 0;
  
  Object.values(sessionCompletionTimes).forEach(({ start, complete }) => {
    if (start && complete && start < complete) {
      totalTime += complete - start;
      count++;
    }
  });
  
  if (count === 0) return '00:00';
  
  // Format as mm:ss
  const avgSeconds = Math.floor(totalTime / count / 1000);
  const minutes = Math.floor(avgSeconds / 60);
  const seconds = avgSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
