
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
