-- Supabase database schema for AI Safety Evaluation Lab
-- Run this SQL in your Supabase SQL Editor to create the required table

-- Create the evaluations table
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_email TEXT NOT NULL,
    prompt_a TEXT NOT NULL,
    prompt_b TEXT NOT NULL,
    scenario_context TEXT,
    title_a TEXT NOT NULL,
    title_b TEXT NOT NULL,
    model_type TEXT NOT NULL,
    response_a TEXT,
    response_b TEXT,
    reasoning_a TEXT,
    reasoning_b TEXT,
    language_specific_rubric_scores JSONB,
    harm_disparity_metrics JSONB,
    final_analysis TEXT,
    is_flagged_for_review BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_email for faster queries
CREATE INDEX IF NOT EXISTS idx_evaluations_user_email ON public.evaluations(user_email);

-- Create an index on timestamp for faster sorting
CREATE INDEX IF NOT EXISTS idx_evaluations_timestamp ON public.evaluations(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for demo purposes
-- In production, you might want more restrictive policies
CREATE POLICY "Allow all operations for demo" ON public.evaluations
    FOR ALL USING (true);

-- Grant permissions to anon and authenticated users
GRANT ALL ON public.evaluations TO anon;
GRANT ALL ON public.evaluations TO authenticated;