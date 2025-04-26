export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("pt-BR").format(num);
};

export const formatCurrency = (num: number) => {
  return `$${num.toFixed(2)}`;
};

export const formatVideoAge = (days: number): string => {
  if (days < 1) {
    const hours = Math.round(days * 24);
    return `${hours} h`;
  } else if (days < 30) {
    return `${Math.round(days)} d`;
  } else if (days < 365) {
    const months = Math.round(days / 30);
    return `${months} m`;
  } else {
    const years = Math.round(days / 365);
    return `${years} a`;
  }
};

export const formatLanguage = (languageCode: string): string => {
  const languageMap: Record<string, string> = {
    "pt-BR": "Português (BR)",
    "en-US": "Inglês (EUA)",
    "es-ES": "Espanhol",
    "fr-FR": "Francês",
    "de-DE": "Alemão",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "ko-KR": "Coreano",
    "ru-RU": "Russo",
    "zh-CN": "Chinês"
  };
  
  return languageMap[languageCode] || languageCode;
};

export const analyzeSaturation = (results: any[], keyword: string) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentVideos = results.filter(video => {
    const videoAge = video.videoAge; // already in days
    return videoAge <= 30;
  });

  const keywordVideos = recentVideos.filter(video => 
    video.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (keywordVideos.length > 20) {
    return {
      status: 'high',
      message: 'Alta saturação: mais de 20 vídeos nos últimos 30 dias',
      count: keywordVideos.length
    };
  } else if (keywordVideos.length > 10) {
    return {
      status: 'medium',
      message: 'Saturação média: entre 10-20 vídeos nos últimos 30 dias',
      count: keywordVideos.length
    };
  } else {
    return {
      status: 'low',
      message: 'Espaço aberto: menos de 10 vídeos nos últimos 30 dias',
      count: keywordVideos.length
    };
  }
};
