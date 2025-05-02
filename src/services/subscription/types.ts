
export interface SubscriptionDetails {
  isActive: boolean;
  isTrialing: boolean;
  trialEnd: Date | null;
  subscriptionEnd: Date | null;
  planName: string;
  price: number;
  trialStartDate: Date | null;
}
