// src/utils/questions.ts
import { Question } from '../types/moodTypes';

export const questions: Question[] = [
  // Section sur l'état émotionnel général
  {
    id: 1,
    text: "Comment vous sentez-vous aujourd'hui ?",
    options: [
      { label: "Calme", weights: { Calme: 2, Concentré: 1 } },
      { label: "Énergique", weights: { Énergique: 3, Excité: 1 } },
      { label: "Nostalgique", weights: { Nostalgique: 3, Triste: 1 } },
      { label: "Anxieux", weights: { Anxieux: 3, Fatigué: 1 } },
      { label: "Heureux", weights: { Heureux: 3, Motivé: 2 } },
      { label: "Fatigué", weights: { Fatigué: 3, Anxieux: 1 } },
      { label: "Rêveur", weights: { Rêveur: 3, Calme: 2 } },
      { label: "Agressif", weights: { Agressif: 3, Énergique: 2 } },
      { label: "Triste", weights: { Triste: 3, Nostalgique: 2 } },
      { label: "Motivé", weights: { Motivé: 3, Concentré: 2 } },
      { label: "Excité", weights: { Excité: 3, Heureux: 2 } },
      { label: "Indifférent", weights: { Fatigué: 2, Calme: 2 } },
      { label: "Frustré", weights: { Agressif: 3, Anxieux: 2 } },
      { label: "Optimiste", weights: { Motivé: 3, Heureux: 2 } },
      { label: "Pessimiste", weights: { Triste: 3, Anxieux: 2 } },
    ],
  },
  {
    id: 2,
    text: "Quel mot décrit le mieux votre état d'esprit actuellement ?",
    options: [
      { label: "Motivé", weights: { Motivé: 3, Concentré: 2 } },
      { label: "Fatigué", weights: { Fatigué: 3, Anxieux: 2 } },
      { label: "Excité", weights: { Excité: 3, Heureux: 2 } },
      { label: "Rêveur", weights: { Rêveur: 3, Calme: 2 } },
      { label: "Optimiste", weights: { Motivé: 3, Heureux: 2 } },
      { label: "Stressé", weights: { Anxieux: 3, Fatigué: 2 } },
      { label: "Content", weights: { Heureux: 3, Calme: 2 } },
      { label: "Apathique", weights: { Indifférent: 3, Fatigué: 2 } },
    ],
  },

  // Section sur les préférences musicales
  {
    id: 3,
    text: "Quel type de musique préférez-vous écouter en ce moment ?",
    options: [
      { label: "Ambiante", weights: { Calme: 3, Rêveur: 1 } },
      { label: "Rock", weights: { Énergique: 2, Agressif: 2 } },
      { label: "Classique", weights: { Concentré: 2, Nostalgique: 1 } },
      { label: "Pop", weights: { Heureux: 2, Excité: 1 } },
      { label: "Électronique", weights: { Excité: 2, Motivé: 2 } },
      { label: "Jazz", weights: { Calme: 2, Rêveur: 1 } },
      { label: "Hip-Hop", weights: { Énergique: 3, Motivé: 2 } },
      { label: "Folk", weights: { Nostalgique: 3, Calme: 2 } },
      { label: "R&B", weights: { Heureux: 2, Rêveur: 1 } },
    ],
  },
  {
    id: 4,
    text: "Quelle intensité musicale recherchez-vous ?",
    options: [
      { label: "Douce", weights: { Calme: 3, Rêveur: 2 } },
      { label: "Modérée", weights: { Concentré: 2, Heureux: 2 } },
      { label: "Intense", weights: { Énergique: 3, Agressif: 2 } },
      { label: "Variable", weights: { Excité: 2, Anxieux: 2 } },
    ],
  },

  // Section sur les activités quotidiennes
  {
    id: 5,
    text: "Quelle activité faites-vous en ce moment ?",
    options: [
      { label: "Travailler", weights: { Concentré: 3, Motivé: 2 } },
      { label: "Faire du sport", weights: { Énergique: 2, Motivé: 1 } },
      { label: "Se détendre", weights: { Calme: 2, Rêveur: 1 } },
      { label: "Sortir avec des amis", weights: { Heureux: 3, Excité: 2 } },
      { label: "Lire un livre", weights: { Rêveur: 2, Concentré: 2 } },
      { label: "Méditer", weights: { Calme: 3, Concentré: 1 } },
      { label: "Cuisiner", weights: { Heureux: 2, Concentré: 1 } },
      { label: "Regarder un film", weights: { Rêveur: 2, Fatigué: 1 } },
    ],
  },
  {
    id: 6,
    text: "Quelle est votre principale source de stress actuellement ?",
    options: [
      { label: "Travail", weights: { Anxieux: 3, Fatigué: 2 } },
      { label: "Vie personnelle", weights: { Triste: 3, Anxieux: 2 } },
      { label: "Santé", weights: { Fatigué: 3, Anxieux: 2 } },
      { label: "Finances", weights: { Anxieux: 3, Stressé: 2 } },
      { label: "Relations", weights: { Triste: 3, Frustré: 2 } },
      { label: "Aucune", weights: { Calme: 3, Heureux: 2 } },
    ],
  },

  // Section sur les préférences de relaxation
  {
    id: 7,
    text: "Comment préférez-vous vous détendre ?",
    options: [
      { label: "Écouter de la musique", weights: { Calme: 3, Nostalgique: 1 } },
      { label: "Regarder un film", weights: { Rêveur: 2, Fatigué: 1 } },
      { label: "Faire du yoga", weights: { Calme: 3, Concentré: 1 } },
      { label: "Sortir pour une balade", weights: { Calme: 2, Heureux: 1 } },
      { label: "Prendre un bain", weights: { Calme: 2, Fatigué: 2 } },
      { label: "Lire un livre", weights: { Rêveur: 3, Concentré: 1 } },
      { label: "Méditer", weights: { Calme: 3, Rêveur: 2 } },
    ],
  },
  {
    id: 8,
    text: "Quelle ambiance recherchez-vous pour vous relaxer ?",
    options: [
      { label: "Silencieuse", weights: { Calme: 3, Fatigué: 2 } },
      { label: "Avec une musique douce", weights: { Rêveur: 2, Calme: 2 } },
      { label: "En pleine nature", weights: { Heureux: 3, Calme: 2 } },
      { label: "Avec des amis", weights: { Heureux: 3, Excité: 2 } },
      { label: "Chaleureuse et confortable", weights: { Calme: 3, Fatigué: 2 } },
      { label: "Minimaliste", weights: { Concentré: 2, Rêveur: 1 } },
    ],
  },

  // Section sur les émotions et l'état mental
  {
    id: 9,
    text: "Comment décririez-vous votre niveau de bonheur actuel ?",
    options: [
      { label: "Très heureux", weights: { Heureux: 3, Excité: 1 } },
      { label: "Heureux", weights: { Heureux: 2, Calme: 2 } },
      { label: "Neutre", weights: { Concentré: 2, Fatigué: 1 } },
      { label: "Plutôt triste", weights: { Triste: 3, Nostalgique: 2 } },
    ],
  },
  {
    id: 10,
    text: "Quel est votre principal objectif pour la journée ?",
    options: [
      { label: "Accomplir une tâche importante", weights: { Concentré: 3, Motivé: 2 } },
      { label: "Me détendre", weights: { Calme: 3, Rêveur: 2 } },
      { label: "Passer du temps avec des proches", weights: { Heureux: 3, Excité: 2 } },
      { label: "Réfléchir ou méditer", weights: { Rêveur: 3, Concentré: 1 } },
      { label: "Être productif", weights: { Motivé: 3, Concentré: 2 } },
      { label: "Prendre soin de moi", weights: { Fatigué: 3, Calme: 2 } },
    ],
  },
];
