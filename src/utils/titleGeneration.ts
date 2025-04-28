
/**
 * Centralizes access to title generation utilities
 * This file re-exports functions from specialized utility files
 */

// Re-export from titleVariationUtils
export { 
  gerarVariacoesTitulo, 
  gerarVariacoesEstruturadas,
  extrairComponentesTitulo,
  embaralharArray,
  type TitleVariations 
} from './titleVariationUtils';

// Re-export from titleSubnicheUtils
export { subnichearTitulos } from './titleSubnicheUtils';

// Re-export from titleGenerationModern
export { generateTitleVariations } from './titleGenerationModern';
