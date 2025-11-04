// services/supabaseService.ts
import { supabase } from '../lib/supabase';
import { EvaluationRecord, User } from '../types';

/**
 * Fetches evaluations from Supabase.
 * In demo mode, all users can see all evaluations.
 * @param user The current user (not used in demo mode, but kept for compatibility).
 * @returns A promise that resolves to an array of EvaluationRecords.
 */
export const getEvaluations = async (user: User): Promise<EvaluationRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching evaluations from Supabase:', error);
      throw error;
    }

    // Transform Supabase data to match our EvaluationRecord interface
    const evaluations: EvaluationRecord[] = (data || []).map(row => ({
      id: row.id,
      userEmail: row.user_email,
      promptA: row.prompt_a,
      promptB: row.prompt_b,
      scenarioContext: row.scenario_context,
      titleA: row.title_a,
      titleB: row.title_b,
      modelType: row.model_type,
      responseA: row.response_a,
      responseB: row.response_b,
      reasoningA: row.reasoning_a,
      reasoningB: row.reasoning_b,
      languageSpecificRubricScores: row.language_specific_rubric_scores,
      harmDisparityMetrics: row.harm_disparity_metrics,
      finalAnalysis: row.final_analysis,
      isFlaggedForReview: row.is_flagged_for_review || false,
      timestamp: row.timestamp
    }));

    console.log(`Retrieved ${evaluations.length} evaluations from Supabase successfully.`);
    return evaluations;
  } catch (error) {
    console.error('Error fetching evaluations from Supabase:', error);
    return [];
  }
};

/**
 * Saves a new evaluation to Supabase.
 * @param evaluation The new evaluation record to add.
 * @returns A promise that resolves to the saved evaluation record.
 */
export const addEvaluation = async (evaluation: EvaluationRecord): Promise<EvaluationRecord> => {
  try {
    // Transform our EvaluationRecord to match Supabase schema
    const { id, ...evaluationData } = evaluation;
    const supabaseData = {
      user_email: evaluationData.userEmail,
      prompt_a: evaluationData.promptA,
      prompt_b: evaluationData.promptB,
      scenario_context: evaluationData.scenarioContext,
      title_a: evaluationData.titleA,
      title_b: evaluationData.titleB,
      model_type: evaluationData.modelType,
      response_a: evaluationData.responseA,
      response_b: evaluationData.responseB,
      reasoning_a: evaluationData.reasoningA,
      reasoning_b: evaluationData.reasoningB,
      language_specific_rubric_scores: evaluationData.languageSpecificRubricScores,
      harm_disparity_metrics: evaluationData.harmDisparityMetrics,
      final_analysis: evaluationData.finalAnalysis,
      is_flagged_for_review: evaluationData.isFlaggedForReview || false,
      timestamp: evaluationData.timestamp
    };

    const { data, error } = await supabase
      .from('evaluations')
      .insert([supabaseData])
      .select()
      .single();

    if (error) {
      console.error('Error adding evaluation to Supabase:', error);
      throw error;
    }

    // Transform back to our interface
    const savedEvaluation: EvaluationRecord = {
      id: data.id,
      userEmail: data.user_email,
      promptA: data.prompt_a,
      promptB: data.prompt_b,
      scenarioContext: data.scenario_context,
      titleA: data.title_a,
      titleB: data.title_b,
      modelType: data.model_type,
      responseA: data.response_a,
      responseB: data.response_b,
      reasoningA: data.reasoning_a,
      reasoningB: data.reasoning_b,
      languageSpecificRubricScores: data.language_specific_rubric_scores,
      harmDisparityMetrics: data.harm_disparity_metrics,
      finalAnalysis: data.final_analysis,
      isFlaggedForReview: data.is_flagged_for_review || false,
      timestamp: data.timestamp
    };

    console.log(`Evaluation ${savedEvaluation.id} added to Supabase successfully.`);
    return savedEvaluation;
  } catch (error) {
    console.error('Error adding evaluation to Supabase:', error);
    throw new Error(`Failed to save evaluation: ${error}`);
  }
};

/**
 * Updates an existing evaluation in Supabase.
 * @param updatedEvaluation The evaluation record with updates.
 * @returns A promise that resolves to the updated evaluation record.
 */
export const updateEvaluation = async (updatedEvaluation: EvaluationRecord): Promise<EvaluationRecord> => {
  try {
    const { id, ...evaluationData } = updatedEvaluation;
    const supabaseData = {
      user_email: evaluationData.userEmail,
      prompt_a: evaluationData.promptA,
      prompt_b: evaluationData.promptB,
      scenario_context: evaluationData.scenarioContext,
      title_a: evaluationData.titleA,
      title_b: evaluationData.titleB,
      model_type: evaluationData.modelType,
      response_a: evaluationData.responseA,
      response_b: evaluationData.responseB,
      reasoning_a: evaluationData.reasoningA,
      reasoning_b: evaluationData.reasoningB,
      language_specific_rubric_scores: evaluationData.languageSpecificRubricScores,
      harm_disparity_metrics: evaluationData.harmDisparityMetrics,
      final_analysis: evaluationData.finalAnalysis,
      is_flagged_for_review: evaluationData.isFlaggedForReview || false,
      timestamp: evaluationData.timestamp
    };

    const { data, error } = await supabase
      .from('evaluations')
      .update(supabaseData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating evaluation in Supabase:', error);
      throw error;
    }

    // Transform back to our interface
    const savedEvaluation: EvaluationRecord = {
      id: data.id,
      userEmail: data.user_email,
      promptA: data.prompt_a,
      promptB: data.prompt_b,
      scenarioContext: data.scenario_context,
      titleA: data.title_a,
      titleB: data.title_b,
      modelType: data.model_type,
      responseA: data.response_a,
      responseB: data.response_b,
      reasoningA: data.reasoning_a,
      reasoningB: data.reasoning_b,
      languageSpecificRubricScores: data.language_specific_rubric_scores,
      harmDisparityMetrics: data.harm_disparity_metrics,
      finalAnalysis: data.final_analysis,
      isFlaggedForReview: data.is_flagged_for_review || false,
      timestamp: data.timestamp
    };

    console.log(`Evaluation ${savedEvaluation.id} updated in Supabase successfully.`);
    return savedEvaluation;
  } catch (error) {
    console.error('Error updating evaluation in Supabase:', error);
    throw new Error('Failed to update evaluation');
  }
};

/**
 * Deletes an evaluation from Supabase.
 * @param evaluationId The ID of the evaluation to delete.
 * @returns A promise that resolves when the operation is complete.
 */
export const deleteEvaluation = async (evaluationId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('evaluations')
      .delete()
      .eq('id', evaluationId);

    if (error) {
      console.error('Error deleting evaluation from Supabase:', error);
      throw error;
    }

    console.log(`Evaluation ${evaluationId} deleted from Supabase successfully.`);
  } catch (error) {
    console.error('Error deleting evaluation from Supabase:', error);
    throw new Error('Failed to delete evaluation');
  }
};