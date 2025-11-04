// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import * as config from '../env.js';

// Demo Supabase project credentials
// You'll need to replace these with your actual Supabase project URL and anon key
const supabaseUrl = config.SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = config.SUPABASE_ANON_KEY || 'your-anon-key'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema for reference:
// Table: evaluations
// Columns:
// - id (uuid, primary key)
// - created_at (timestamp)
// - user_email (text)
// - prompt_a (text)
// - prompt_b (text)
// - scenario_context (text)
// - title_a (text)
// - title_b (text)
// - model_type (text)
// - response_a (text)
// - response_b (text)
// - reasoning_a (text)
// - reasoning_b (text)
// - language_specific_rubric_scores (jsonb)
// - harm_disparity_metrics (jsonb)
// - final_analysis (text)
// - is_flagged_for_review (boolean)
// - timestamp (timestamp)