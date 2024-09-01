import { Mood } from '../types/moodTypes';
import { questions } from './questions';

export function determineMood(answers: { questionId: number, optionLabel: string }[]): Mood {
  const moodScores: { [key in Mood]?: number } = {};

  answers.forEach(({ questionId, optionLabel }) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const option = question.options.find(opt => opt.label === optionLabel);
    if (!option) return;

    // Accumuler les scores pour chaque état d'esprit
    for (const [mood, weight] of Object.entries(option.weights)) {
      if (!moodScores[mood as Mood]) {
        moodScores[mood as Mood] = 0;
      }
      moodScores[mood as Mood]! += weight!;
    }
  });

  // Trouver l'état d'esprit avec le score le plus élevé
  let dominantMood: Mood = 'Calme';
  let maxScore = 0;

  for (const [mood, score] of Object.entries(moodScores)) {
    if (score! > maxScore) {
      maxScore = score!;
      dominantMood = mood as Mood;
    }
  }

  return dominantMood;
}
