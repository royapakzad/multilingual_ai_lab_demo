// services/localStorageService.ts
import { EvaluationRecord, User } from '../types';

const EVALUATIONS_KEY = 'demo_evaluations';

/**
 * Fetches evaluations from localStorage.
 * In demo mode, all users can see all evaluations.
 * @param user The current user (not used in demo mode, but kept for compatibility).
 * @returns A promise that resolves to an array of EvaluationRecords.
 */
export const getEvaluations = async (user: User): Promise<EvaluationRecord[]> => {
  try {
    const stored = localStorage.getItem(EVALUATIONS_KEY);
    if (!stored) return [];

    const evaluations: EvaluationRecord[] = JSON.parse(stored);
    // Sort by timestamp descending (newest first)
    return evaluations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error('Error fetching evaluations from localStorage:', error);
    return [];
  }
};

/**
 * Saves a new evaluation to localStorage.
 * @param evaluation The new evaluation record to add.
 * @returns A promise that resolves to the saved evaluation record.
 */
export const addEvaluation = async (evaluation: EvaluationRecord): Promise<EvaluationRecord> => {
  try {
    const existingEvaluations = await getEvaluations({} as User);

    // Generate a simple ID if one doesn't exist
    const newEvaluation = {
      ...evaluation,
      id: evaluation.id || `eval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    const updatedEvaluations = [newEvaluation, ...existingEvaluations];
    localStorage.setItem(EVALUATIONS_KEY, JSON.stringify(updatedEvaluations));

    console.log(`Evaluation ${newEvaluation.id} added to localStorage successfully.`);
    return newEvaluation;
  } catch (error) {
    console.error('Error adding evaluation to localStorage:', error);
    throw new Error(`Failed to save evaluation: ${error}`);
  }
};

/**
 * Updates an existing evaluation in localStorage.
 * @param updatedEvaluation The evaluation record with updates.
 * @returns A promise that resolves to the updated evaluation record.
 */
export const updateEvaluation = async (updatedEvaluation: EvaluationRecord): Promise<EvaluationRecord> => {
  try {
    const evaluations = await getEvaluations({} as User);
    const index = evaluations.findIndex(evaluation => evaluation.id === updatedEvaluation.id);

    if (index === -1) {
      throw new Error('Evaluation not found');
    }

    evaluations[index] = updatedEvaluation;
    localStorage.setItem(EVALUATIONS_KEY, JSON.stringify(evaluations));

    console.log(`Evaluation ${updatedEvaluation.id} updated in localStorage.`);
    return updatedEvaluation;
  } catch (error) {
    console.error('Error updating evaluation in localStorage:', error);
    throw new Error('Failed to update evaluation');
  }
};

/**
 * Deletes an evaluation from localStorage.
 * @param evaluationId The ID of the evaluation to delete.
 * @returns A promise that resolves when the operation is complete.
 */
export const deleteEvaluation = async (evaluationId: string): Promise<void> => {
  try {
    const evaluations = await getEvaluations({} as User);
    const filteredEvaluations = evaluations.filter(evaluation => evaluation.id !== evaluationId);

    localStorage.setItem(EVALUATIONS_KEY, JSON.stringify(filteredEvaluations));
    console.log(`Evaluation ${evaluationId} deleted from localStorage.`);
  } catch (error) {
    console.error('Error deleting evaluation from localStorage:', error);
    throw new Error('Failed to delete evaluation');
  }
};
