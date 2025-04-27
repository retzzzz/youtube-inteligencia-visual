
export { extrairSubnichos, extrairCanaisPromissores } from './api/youtube-api';
export { calcularMetricasSubnicho } from './metrics/subnicho-metrics';
export { validarSubnicho } from './validation/subnicho-validation';
export { priorizarSubniches } from './recommendations/subnicho-recommendations';
export type {
  Canal,
  Subnicho,
  MetricasSubnicho,
  SubnichoValidado,
  SubnichoPriorizado,
  CriteriosValidacao
} from './types/youtube-types';

