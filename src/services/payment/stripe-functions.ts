
import Stripe from 'stripe';
import { toast } from "@/hooks/use-toast";

// Initialize Stripe with the secret key and configure API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-04-30.basil',
});

export const createCheckoutSession = async (priceId: string, customerId?: string) => {
  try {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/billing?canceled=true`,
    };

    if (customerId) {
      sessionParams.customer = customerId;
    } else {
      // Alterado para o tipo correto aceito pelo Stripe
      sessionParams.customer_creation = 'always' as Stripe.Checkout.SessionCreateParams.CustomerCreation;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return session.url;
  } catch (error: any) {
    console.error("Erro ao criar sessão de checkout:", error);
    toast({
      title: "Erro ao iniciar o pagamento",
      description: error.message || "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.",
      variant: "destructive",
    });
    return null;
  }
};

export const handleSubscriptionUpdateOrCancel = async (action: 'update' | 'cancel', subscriptionId: string) => {
  try {
    if (!subscriptionId) {
      throw new Error("Subscription ID não fornecido.");
    }

    if (action === 'cancel') {
      await stripe.subscriptions.cancel(subscriptionId);
      toast({
        title: "Assinatura cancelada",
        description: "Sua assinatura foi cancelada com sucesso.",
      });
    } else if (action === 'update') {
      // Implementar lógica de atualização se necessário
      console.log("Atualização de assinatura não implementada.");
      toast({
        title: "Atualização não suportada",
        description: "A atualização da assinatura não está disponível no momento.",
        // Alterado para um valor válido para o tipo
        variant: "destructive",
      });
      return;
    } else {
      throw new Error("Ação inválida especificada.");
    }
    return { success: true, message: `Subscription ${action} initiated successfully.` };
  } catch (error: any) {
    console.error(`Erro ao ${action} assinatura:`, error);
    toast({
      title: `Erro ao ${action} assinatura`,
      description: error.message || `Ocorreu um erro ao ${action} a assinatura. Por favor, tente novamente.`,
      variant: "destructive",
    });
    return { success: false, message: `Failed to ${action} subscription.`, error: error.message };
  }
};
