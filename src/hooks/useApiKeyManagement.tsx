
import { useState, useCallback } from 'react';
import { saveApiKeyToLocalStorage, getStoredApiKey } from '@/utils/authUtils';

export const useApiKeyManagement = () => {
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(getStoredApiKey());
  const [needsApiKey, setNeedsApiKey] = useState<boolean>(false);

  const handleSetYoutubeApiKey = useCallback((key: string) => {
    setYoutubeApiKey(key);
    saveApiKeyToLocalStorage(key);
    setNeedsApiKey(false);
  }, []);

  const initializeApiKeyState = useCallback(() => {
    // Check if there's API key in local storage
    const savedApiKey = getStoredApiKey();
    if (savedApiKey) {
      setYoutubeApiKey(savedApiKey);
      setNeedsApiKey(false);
    } else {
      setNeedsApiKey(true);
    }
  }, []);

  return {
    youtubeApiKey,
    setYoutubeApiKey: handleSetYoutubeApiKey,
    needsApiKey,
    setNeedsApiKey,
    initializeApiKeyState
  };
};
