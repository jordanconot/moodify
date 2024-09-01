export type Mood =
'Calme' | 
'Énergique' | 
'Nostalgique' | 
'Heureux' | 
'Triste' | 
'Concentré' | 
'Anxieux' | 
'Excité' | 
'Fatigué' | 
'Motivé' | 
'Rêveur' | 
'Agressif' | 
'Indifférent' | 
'Stressé' | 
'Frustré' | 
'Optimiste' | 
'Pessimiste';

export interface SpotifyPlayerProps {
  mood: Mood; // Typage explicite pour la prop mood
}

export interface Option {
  label: string;
  weights: { [key in Mood]?: number }; // Poids pour chaque état d'esprit
  nextQuestionId?: number; // ID de la question suivante si conditionnelle
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}