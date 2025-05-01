
declare global {
  interface Window {
    fbq: any;
  }
}

// Facebook Pixel ID - Substituir pelo ID real de produção quando disponível
const FB_PIXEL_ID = '123456789012345';

// Inicialização do Facebook Pixel
export const initFacebookPixel = () => {
  try {
    if (typeof window !== 'undefined') {
      // Check if fbq is already defined
      if (!window.fbq) {
        window.fbq = function() {
          window.fbq.callMethod 
            ? window.fbq.callMethod.apply(window.fbq, arguments) 
            : window.fbq.queue.push(arguments);
        };
        
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = [];
        
        // Add the Facebook Pixel script to the document
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        } else {
          document.head.appendChild(script);
        }
        
        window.fbq('init', FB_PIXEL_ID);
        window.fbq('track', 'PageView');
        console.log('Facebook Pixel initialized successfully');
      }
    }
  } catch (error) {
    console.error('Error initializing Facebook Pixel:', error);
  }
};

// Safe wrapper for fbq calls
const safeFbq = (event: string, name: string, params?: any) => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq(event, name, params);
    } else {
      console.log(`Facebook Pixel not available. Would track: ${event}, ${name}`, params);
    }
  } catch (error) {
    console.error('Error calling Facebook Pixel:', error);
  }
};

// Funções para rastreamento de eventos do quiz
export const trackQuizStart = (userName?: string, userEmail?: string) => {
  console.log('Quiz iniciado - evento registrado');
  safeFbq('trackCustom', 'QuizStart', {
    content_name: 'Quiz Iniciado'
  });
  
  // Armazenar o evento no localStorage para o dashboard com dados do usuário
  saveAnalyticsEvent({
    type: 'quiz_start',
    userName: userName || 'Anônimo',
    userEmail: userEmail || 'não informado',
    timestamp: new Date().toISOString(),
    sessionId: getOrCreateSessionId()
  });
};

export const trackQuizAnswer = (questionId: string, selectedOptions: string[], questionIndex: number, totalQuestions: number) => {
  console.log(`Resposta registrada - Questão ${questionId}`);
  safeFbq('trackCustom', 'QuizAnswer', {
    question_id: questionId,
    selected_options: selectedOptions,
    question_index: questionIndex,
    total_questions: totalQuestions
  });
  
  // Armazenar o evento no localStorage para o dashboard
  saveAnalyticsEvent({
    type: 'quiz_answer',
    questionId,
    selectedOptions,
    questionIndex,
    totalQuestions,
    timestamp: new Date().toISOString(),
    sessionId: getOrCreateSessionId()
  });
};

export const trackQuizComplete = () => {
  console.log('Quiz completo - evento registrado');
  safeFbq('trackCustom', 'QuizComplete', {
    content_name: 'Quiz Completo'
  });
  
  // Armazenar o evento no localStorage para o dashboard
  saveAnalyticsEvent({
    type: 'quiz_complete',
    timestamp: new Date().toISOString()
  });
};

export const trackResultView = (resultType: string) => {
  console.log(`Resultado visualizado - Tipo: ${resultType}`);
  safeFbq('trackCustom', 'ResultView', {
    result_type: resultType
  });
  
  // Armazenar o evento no localStorage para o dashboard
  saveAnalyticsEvent({
    type: 'result_view',
    resultType,
    timestamp: new Date().toISOString()
  });
};

export const trackLeadGeneration = (email: string) => {
  console.log('Lead gerado - evento registrado');
  safeFbq('track', 'Lead', {
    content_name: 'Lead Quiz'
  });
  
  // Armazenar o evento no localStorage para o dashboard
  saveAnalyticsEvent({
    type: 'lead_generated',
    emailDomain: email.split('@')[1] || 'unknown',
    email: email, // Adicionar email completo para identificação
    timestamp: new Date().toISOString(),
    sessionId: getOrCreateSessionId()
  });
};

export const trackSaleConversion = (value: number) => {
  console.log(`Conversão de venda registrada - Valor: ${value}`);
  safeFbq('track', 'Purchase', {
    value: value,
    currency: 'BRL'
  });
  
  // Armazenar o evento no localStorage para o dashboard
  saveAnalyticsEvent({
    type: 'sale',
    value,
    timestamp: new Date().toISOString()
  });
};

// Track button clicks
export const trackButtonClick = (buttonId: string, buttonText?: string, buttonLocation?: string) => {
  console.log(`Botão clicado - ID: ${buttonId}, Texto: ${buttonText || 'N/A'}, Local: ${buttonLocation || 'N/A'}`);
  safeFbq('trackCustom', 'ButtonClick', {
    button_id: buttonId,
    button_text: buttonText || '',
    button_location: buttonLocation || '',
    timestamp: new Date().toISOString()
  });
  
  // Store the event in localStorage for the dashboard
  saveAnalyticsEvent({
    type: 'button_click',
    buttonId,
    buttonText,
    buttonLocation,
    timestamp: new Date().toISOString()
  });
};

// Função para obter ou criar um ID de sessão único para o usuário
const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('quiz_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('quiz_session_id', sessionId);
  }
  return sessionId;
};

// Funções para armazenar e recuperar eventos de analytics para o dashboard interno
interface AnalyticsEvent {
  type: string;
  timestamp: string;
  sessionId?: string;
  userName?: string;
  userEmail?: string;
  [key: string]: any;
}

// Salvar evento no localStorage
const saveAnalyticsEvent = (event: AnalyticsEvent) => {
  try {
    // Adicione nome do usuário ao evento, se disponível
    if (!event.userName) {
      const userName = localStorage.getItem('userName');
      if (userName) {
        event.userName = userName;
      }
    }
    
    // Adicione email do usuário ao evento, se disponível
    if (!event.userEmail && event.type !== 'lead_generated') {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        event.userEmail = userEmail;
      }
    }
    
    const existingEvents = getAnalyticsEvents();
    existingEvents.push(event);
    localStorage.setItem('quiz_analytics_events', JSON.stringify(existingEvents));
  } catch (error) {
    console.error('Erro ao salvar evento de analytics:', error);
  }
};

// Obter todos os eventos do localStorage
export const getAnalyticsEvents = (): AnalyticsEvent[] => {
  try {
    const eventsJson = localStorage.getItem('quiz_analytics_events');
    return eventsJson ? JSON.parse(eventsJson) : [];
  } catch (error) {
    console.error('Erro ao recuperar eventos de analytics:', error);
    return [];
  }
};

// Função para limpar todos os dados de analytics (apenas para administradores)
export const clearAnalyticsData = () => {
  localStorage.removeItem('quiz_analytics_events');
  localStorage.removeItem('quiz_session_id');
  console.log('Dados de analytics limpos com sucesso');
};

// Funções para cálculo de métricas para o dashboard
export const calculateQuizMetrics = () => {
  const events = getAnalyticsEvents();
  
  const starts = events.filter(event => event.type === 'quiz_start').length;
  const completes = events.filter(event => event.type === 'quiz_complete').length;
  const resultViews = events.filter(event => event.type === 'result_view').length;
  const leads = events.filter(event => event.type === 'lead_generated').length;
  const sales = events.filter(event => event.type === 'sale').length;
  
  const completionRate = starts > 0 ? (completes / starts) * 100 : 0;
  const conversionRate = starts > 0 ? (leads / starts) * 100 : 0;
  const salesRate = leads > 0 ? (sales / leads) * 100 : 0;
  
  // Calcular eventos por dia para gráficos
  const eventsByDay = groupEventsByDay(events);
  
  return {
    totalStarts: starts,
    totalCompletes: completes,
    totalResultViews: resultViews,
    totalLeads: leads,
    totalSales: sales,
    completionRate,
    conversionRate,
    salesRate,
    eventsByDay
  };
};

// Agrupar eventos por dia para gráficos
const groupEventsByDay = (events: AnalyticsEvent[]) => {
  const grouped: Record<string, Record<string, number>> = {};
  
  events.forEach(event => {
    const date = new Date(event.timestamp).toISOString().split('T')[0];
    if (!grouped[date]) {
      grouped[date] = {
        'quiz_start': 0,
        'quiz_complete': 0,
        'result_view': 0,
        'lead_generated': 0,
        'sale': 0
      };
    }
    
    if (grouped[date][event.type] !== undefined) {
      grouped[date][event.type]++;
    }
  });
  
  return grouped;
};

// Agrupar eventos por usuário
export const groupEventsByUser = (events: AnalyticsEvent[]): Record<string, AnalyticsEvent[]> => {
  const grouped: Record<string, AnalyticsEvent[]> = {};
  
  events.forEach(event => {
    // Usar sessionId como identificador principal, fallback para userEmail ou userName
    const userId = event.sessionId || event.userEmail || event.userName || 'unknown';
    
    if (!grouped[userId]) {
      grouped[userId] = [];
    }
    
    grouped[userId].push(event);
  });
  
  return grouped;
};

// Obter dados sobre progresso do usuário por pergunta
export const getUserProgressData = (events: AnalyticsEvent[]): any[] => {
  const usersByQuestion: Record<string, Set<string>> = {};
  const questionCounts: Record<string, number> = {};
  let totalUsers = 0;
  
  // Identificar usuários únicos pela sessão
  const uniqueSessions = new Set<string>();
  
  events.forEach(event => {
    if (event.sessionId) {
      uniqueSessions.add(event.sessionId);
    }
    
    if (event.type === 'quiz_answer' && event.questionId) {
      if (!usersByQuestion[event.questionId]) {
        usersByQuestion[event.questionId] = new Set<string>();
        questionCounts[event.questionId] = 0;
      }
      
      if (event.sessionId) {
        usersByQuestion[event.questionId].add(event.sessionId);
      }
      
      questionCounts[event.questionId]++;
    }
  });
  
  totalUsers = uniqueSessions.size;
  
  // Converter para formato para visualização
  const progressData = Object.entries(usersByQuestion).map(([questionId, users]) => {
    return {
      questionId,
      uniqueUsers: users.size,
      totalAnswers: questionCounts[questionId],
      completionRate: totalUsers > 0 ? (users.size / totalUsers) * 100 : 0
    };
  });
  
  // Ordenar por questionId (assumindo que está em ordem numérica)
  return progressData.sort((a, b) => {
    return a.questionId.localeCompare(b.questionId, undefined, { numeric: true });
  });
};

// Função para capturar UTM parameters para analytics de marketing
export const captureUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  if (utmSource || utmMedium || utmCampaign) {
    const utmData = {
      utm_source: utmSource || 'direct',
      utm_medium: utmMedium || 'none',
      utm_campaign: utmCampaign || 'none',
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('quiz_utm_data', JSON.stringify(utmData));
    return utmData;
  }
  
  return null;
};

// Obter dados UTM armazenados
export const getUTMData = () => {
  try {
    const utmJson = localStorage.getItem('quiz_utm_data');
    return utmJson ? JSON.parse(utmJson) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados UTM:', error);
    return null;
  }
};
