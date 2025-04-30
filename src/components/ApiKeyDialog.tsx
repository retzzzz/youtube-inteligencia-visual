
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ApiKeyInput from './dialog/ApiKeyInput';
import ApiKeyInstructions from './dialog/ApiKeyInstructions';
import ApiKeyAlerts from './dialog/ApiKeyAlerts';
import RememberKeyCheckbox from './dialog/RememberKeyCheckbox';

const ApiKeyDialog = () => {
  const { isLoggedIn, youtubeApiKey, setYoutubeApiKey, needsApiKey, setNeedsApiKey } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [rememberApiKey, setRememberApiKey] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar se precisa mostrar o diálogo
  useEffect(() => {
    if (isLoggedIn && needsApiKey && !youtubeApiKey) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isLoggedIn, needsApiKey, youtubeApiKey]);

  // Salvar a chave API e fechar o diálogo
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      setYoutubeApiKey(apiKey);
      setIsOpen(false);

      // Verificar se o usuário está na página inicial e redirecionar para o dashboard
      if (location.pathname === '/' || location.pathname === '/login') {
        navigate('/dashboard');
      }
    }
  };

  // Fechar o diálogo sem salvar (cancelar)
  const handleSkip = () => {
    setIsOpen(false);
    setNeedsApiKey(false);
    
    // Verificar se o usuário está na página inicial e redirecionar para o dashboard
    if (location.pathname === '/' || location.pathname === '/login') {
      navigate('/dashboard');
    }
  };

  // Não mostrar o diálogo se não estiver logado
  if (!isLoggedIn) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurar Chave API do YouTube</DialogTitle>
          <DialogDescription>
            Você precisa de uma chave API do YouTube para usar os recursos de análise de vídeos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <ApiKeyAlerts />
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          <RememberKeyCheckbox checked={rememberApiKey} onChange={setRememberApiKey} />
          <ApiKeyInstructions />
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="secondary" 
            onClick={handleSkip}
            className="sm:w-auto w-full"
          >
            Configurar depois
          </Button>
          <Button 
            onClick={handleSaveApiKey} 
            className="sm:w-auto w-full"
            disabled={!apiKey.trim()}
          >
            Salvar chave API
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
