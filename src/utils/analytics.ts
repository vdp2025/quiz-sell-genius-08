
declare global {
  interface Window {
    fbq: any;
  }
}

// Facebook Pixel ID - Substituir pelo ID real de produção quando disponível
const FB_PIXEL_ID = '123456789012345';

// Inicialização do Facebook Pixel
export const initFacebookPixel = () => {
  if (!window.fbq) {
    window.fbq = function() {
      window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];
  }
  
  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Funções para rastreamento de eventos do quiz
export const trackQuizStart = () => {
  console.log('Quiz iniciado - evento registrado');
  window.fbq('trackCustom', 'QuizStart', {
    content_name: 'Quiz Iniciado'
  });
  
  // Armazenar o evento no localStorage para o dashboard
  saveAnalyticsEvent({
    type: 'quiz_start',
    timestamp: new Date().toISOString()
  });
};

export const trackQuizAnswer = (questionId: string, selectedOptions: string[], questionIndex: number, totalQuestions: number) => {
  console.log(`Resposta registrada - Questão ${questionId}`);
  window.fbq('trackCustom', 'QuizAnswer', {
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
    timestamp: new Date().toISOString()
  });
};

export const trackQuizComplete = () => {
  console.log('Quiz completo - evento registrado');
  window.fbq('trackCustom', 'QuizComplete', {
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
  window.fbq('trackCustom', 'ResultView', {
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
  window.fbq('track', 'Lead', {
    content_name: 'Lead Quiz'
  });
  
  // Armazenar o evento no localStorage para o dashboard (sem armazenar o email completo para privacidade)
  saveAnalyticsEvent({
    type: 'lead_generated',
    emailDomain: email.split('@')[1] || 'unknown',
    timestamp: new Date().toISOString()
  });
};

export const trackSaleConversion = (value: number) => {
  console.log(`Conversão de venda registrada - Valor: ${value}`);
  window.fbq('track', 'Purchase', {
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

// Funções para armazenar e recuperar eventos de analytics para o dashboard interno
interface AnalyticsEvent {
  type: string;
  timestamp: string;
  [key: string]: any;
}

// Salvar evento no localStorage
const saveAnalyticsEvent = (event: AnalyticsEvent) => {
  try {
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
