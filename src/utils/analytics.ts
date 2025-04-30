declare global {
  interface Window {
    fbq: any;
  }
}

// ID do Pixel de exemplo (substituir pelo real posteriormente)
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

// Funções para rastreamento de eventos
export const trackQuizStart = () => {
  window.fbq('track', 'ViewContent', {
    content_name: 'Quiz Início',
    content_category: 'Quiz'
  });
};

export const trackQuizAnswer = (questionId: string, selectedOptions: string[]) => {
  window.fbq('trackCustom', 'QuizAnswer', {
    question_id: questionId,
    selected_options: selectedOptions
  });
};

export const trackQuizComplete = () => {
  window.fbq('track', 'CompleteRegistration', {
    content_name: 'Quiz Completo',
    status: 'success'
  });
};

export const trackResultView = (resultType: string) => {
  window.fbq('track', 'ViewContent', {
    content_name: 'Resultado do Quiz',
    content_category: 'Resultado',
    content_type: resultType
  });
};

export const trackLeadGeneration = () => {
  window.fbq('track', 'Lead', {
    content_name: 'Lead Quiz',
    content_category: 'Quiz'
  });
};