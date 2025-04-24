
import { useState, useEffect } from 'react';

export const useUtmParams = () => {
  const [utmSource, setUtmSource] = useState<string | null>(null);
  const [utmMedium, setUtmMedium] = useState<string | null>(null);
  const [utmCampaign, setUtmCampaign] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source'));
    setUtmMedium(params.get('utm_medium'));
    setUtmCampaign(params.get('utm_campaign'));
  }, []);

  return { utmSource, utmMedium, utmCampaign };
};
