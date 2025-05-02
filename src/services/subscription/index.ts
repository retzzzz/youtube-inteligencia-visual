
import { SubscriptionDetails } from './types';
import { getCurrentSubscription, startSubscription } from './subscription-api';
import { getDaysRemaining, formatEndDate } from './date-utils';

// Export the subscription service with all functions
export const subscriptionService = {
  getCurrentSubscription,
  startSubscription,
  getDaysRemaining,
  formatEndDate
};

// Export types and individual functions for direct imports
export { SubscriptionDetails } from './types';
export { getDaysRemaining, formatEndDate } from './date-utils';
