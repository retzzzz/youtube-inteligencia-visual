
import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

// Chave pública do Stripe (deve ser substituída pela sua chave real)
const STRIPE_PUBLIC_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

// Inicialização do Stripe
let stripePromise: ReturnType<typeof loadStripe> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export interface SubscriptionDetails {
  isActive: boolean;
  isTrialing: boolean;
  trialEnd: Date | null;
  subscriptionEnd: Date | null;
  planName: string;
  price: number;
}

export const subscriptionService = {
  /**
   * Fetch the current user's subscription details
   */
  async getCurrentSubscription(): Promise<SubscriptionDetails | null> {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        return null;
      }
      
      if (!sessionData?.session) {
        return null;
      }
      
      const userId = sessionData.session.user.id;
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching subscription:", error);
        return null;
      }
      
      if (!data) {
        return null;
      }
      
      const now = new Date();
      const trialEnd = data.trial_end ? new Date(data.trial_end) : null;
      const subscriptionEnd = data.subscription_end ? new Date(data.subscription_end) : null;
      
      // Check if in trial period
      const isTrialing = trialEnd ? now < trialEnd : false;
      
      // Check if subscription is active
      const isActive = isTrialing || (subscriptionEnd ? now < subscriptionEnd : false);
      
      return {
        isActive,
        isTrialing,
        trialEnd,
        subscriptionEnd,
        planName: data.plan_name,
        price: data.price
      };
    } catch (error) {
      console.error("Error in getCurrentSubscription:", error);
      return null;
    }
  },
  
  /**
   * Start the subscription process
   * Redirects to Stripe checkout
   */
  async startSubscription() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        throw new Error("Usuário não está logado");
      }
      
      const userId = sessionData.session.user.id;
      
      // Chamar uma função do backend para criar uma sessão de checkout do Stripe
      // Normalmente seria uma API ou função Edge do Supabase
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          priceId: 'price_monthly_plan', // ID do seu plano no Stripe
        }),
      });
      
      const session = await response.json();
      
      if (!session || !session.id) {
        throw new Error("Não foi possível criar a sessão de checkout");
      }
      
      // Redirecionar para o checkout do Stripe
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (error) {
        console.error("Stripe redirect error:", error);
        throw new Error(error.message);
      }
      
      // Retornar a URL para fins de compatibilidade com a API existente
      return {
        url: '/subscribe/checkout'
      };
    } catch (error) {
      console.error("Erro ao iniciar assinatura:", error);
      throw error;
    }
  },
  
  /**
   * Calculate days remaining in trial or subscription
   */
  getDaysRemaining(endDate: Date | null): number {
    if (!endDate) return 0;
    
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  },
  
  /**
   * Format end date to a readable string
   */
  formatEndDate(date: Date | null): string {
    if (!date) return '';
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }
};
