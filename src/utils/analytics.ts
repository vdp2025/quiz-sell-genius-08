// Tipos para o Facebook Pixel
interface FacebookPixelEvent {
  eventName: string;
  params?: Record<string, any>;
}

// Inicialização do Facebook Pixel
export const initializeFacebookPixel = (pixelId: string): void => {
  // Código de inicialização do Facebook Pixel
  (function(f: any, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  fbq('init', pixelId);
  fbq('track', 'PageView');
};

// Funções para rastreamento de eventos
export const trackQuizStart = (): void => {
  fbq('track', 'ViewContent', {
    content_name: 'Quiz de Estilo',
    content_category: 'Quiz',
    content_type: 'quiz_start'
  });
};

export const trackQuizAnswer = (questionId: string, answer: string): void => {
  fbq('trackCustom', 'QuizAnswer', {
    question_id: questionId,
    answer: answer
  });
};

export const trackQuizComplete = (result: string): void => {
  fbq('track', 'CompleteRegistration', {
    content_name: 'Quiz de Estilo',
    status: 'completed',
    result: result
  });
};

export const trackResultView = (styleType: string): void => {
  fbq('track', 'ViewContent', {
    content_name: 'Resultado do Quiz',
    content_category: 'Quiz Result',
    style_type: styleType
  });
};

export const trackCTAClick = (ctaType: string): void => {
  fbq('track', 'Lead', {
    content_name: 'CTA Click',
    content_category: 'Conversion',
    cta_type: ctaType
  });
};