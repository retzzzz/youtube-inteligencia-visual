
import { useSubnicheState } from './microSubniche/useSubnicheState';
import { useSubnicheActions } from './microSubniche/useSubnicheActions';
import { useFormatters } from './microSubniche/useFormatters';
import { MicroSubnicheHookReturn } from './microSubniche/types';

export const useMicroSubnicheAnalyzer = (): MicroSubnicheHookReturn => {
  // Get all state and state updaters
  const state = useSubnicheState();
  
  // Get all action handlers
  const actions = useSubnicheActions(state);
  
  // Get formatting utilities
  const formatters = useFormatters();

  // Return everything combined
  return {
    ...state,
    ...actions,
    ...formatters
  };
};
