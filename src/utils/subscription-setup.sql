
-- This is a SQL script for Supabase to create the subscriptions table
-- Run this in the Supabase SQL editor

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL DEFAULT 'Monthly',
  price DECIMAL(10, 2) NOT NULL DEFAULT 69.99,
  currency TEXT NOT NULL DEFAULT 'BRL',
  is_active BOOLEAN NOT NULL DEFAULT false,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  subscription_start TIMESTAMPTZ,
  subscription_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read only their own subscription
CREATE POLICY "Users can view their own subscription" 
  ON public.subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for inserting subscription data
CREATE POLICY "Users can insert their own subscription" 
  ON public.subscriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating subscription data
CREATE POLICY "Users can update their own subscription" 
  ON public.subscriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Function to create a trial subscription when a user signs up
CREATE OR REPLACE FUNCTION public.create_trial_subscription()
RETURNS TRIGGER AS $$
DECLARE
  trial_days INTEGER := 7;
BEGIN
  INSERT INTO public.subscriptions (
    user_id,
    is_active,
    trial_start,
    trial_end
  ) VALUES (
    NEW.id,
    true,
    now(),
    now() + (trial_days * INTERVAL '1 day')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create trial subscription when a new user signs up
CREATE OR REPLACE TRIGGER after_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_trial_subscription();
