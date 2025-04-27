
export { extrairSubnichos } from '../services/youtube/services/subnicho-extractor';
export { extrairCanaisPromissores } from '../services/youtube/services/promising-channels';
export { calcularMetricasSubnicho } from './metrics/subnicho-metrics';
export { validarSubnicho } from './validation/subnicho-validation';
export { priorizarSubniches } from './recommendations/subnicho-recommendations';
export type {
  Canal,
  Subnicho,
} from '../services/youtube/types/channel-types';
export type {
  MetricasSubnicho,
  SubnichoValidado,
  SubnichoPriorizado,
  CriteriosValidacao
} from './types/youtube-types';
