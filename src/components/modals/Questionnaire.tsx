import { useEffect, useState } from 'react';
import { Mood } from '../../types/moodTypes';
import { determineMood } from '../../utils/determineMood';
import { questions } from '../../utils/questions';

interface QuestionnaireProps {
  isOpen: boolean;
  onClose: (mood?: Mood) => void;
}

export default function Questionnaire({ isOpen, onClose }: QuestionnaireProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [answers, setAnswers] = useState<{ questionId: number, optionLabel: string }[]>([]);
  const [determinedMood, setDeterminedMood] = useState<string | null>(null);
  const [isFinalQuestion, setIsFinalQuestion] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleNext = (optionLabel: string) => {
    if (isFinalQuestion) {
      handleFinalResponse(optionLabel === 'Oui');
      return;
    }

    const question = questions.find(q => q.id === currentQuestionId);
    if (!question) return;

    setAnswers([...answers, { questionId: currentQuestionId, optionLabel }]);

    const selectedOption = question.options.find(opt => opt.label === optionLabel);
    if (selectedOption?.nextQuestionId) {
      setCurrentQuestionId(selectedOption.nextQuestionId);
    } else if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    } else {
      const mood = determineMood(answers);
      setDeterminedMood(mood);
      setIsFinalQuestion(true); // Passer à la question finale de confirmation
    }
  };

  const handleFinalResponse = (isAgree: boolean) => {
    if (isAgree) {
      // Valider que `determinedMood` est bien un `Mood`
      if (determinedMood && isMood(determinedMood)) {
        onClose(determinedMood); // Ferme la modale avec l'état d'esprit final
      } else {
        console.error("L'état d'esprit déterminé n'est pas valide.");
        onClose(undefined); // Si la validation échoue, fermer sans passer de `Mood`
      }
    } else {
      resetQuestionnaire(); // Réinitialiser le questionnaire
      setCurrentQuestionId(1); // Retour à la première question
      setIsFinalQuestion(false); // Revenir à l'état de questionnaire normal
    }
  };
  const resetQuestionnaire = () => {
    setCurrentQuestionId(1);
    setAnswers([]);
    setDeterminedMood(null);
    setIsFinalQuestion(false);
  };

  const handleClose = (mood?: string) => {
    resetQuestionnaire();
    onClose(mood as Mood | undefined);
  };

  if (!isOpen) return null;

  function isMood(value: string): value is Mood {
    return [
      'Calme',
      'Énergique',
      'Nostalgique',
      'Heureux',
      'Triste',
      'Concentré',
      'Anxieux',
      'Excité',
      'Fatigué',
      'Motivé',
      'Rêveur',
      'Agressif',
      'Indifférent',
      'Stressé',
      'Frustré',
      'Optimiste',
      'Pessimiste'
    ].includes(value);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full relative overflow-y-auto h-screen sm:max-h-[80vh] animate__animated animate__slideInDown animate__faster">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => handleClose()}
        >
          <img 
          src='/assets/svg/circle-x.svg' 
          alt='Fermer' 
          className='hover:opacity-60'
          />
        </button>

        {isFinalQuestion ? (
          <>
            <h2 className="text-modal text-2xl font-semibold mb-4">Votre état d'esprit actuel</h2>
            <p className="text-lg text-gray-700 mb-6">Nous avons déterminé que vous vous sentez <strong>{determinedMood}</strong>. Est-ce que cela correspond à votre état d'esprit ?</p>
            <div className="flex space-x-4 justify-center">
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                onClick={() => handleNext('Oui')}
              >
                Oui
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                onClick={() => handleNext('Non')}
              >
                Non
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-modal text-2xl font-semibold mb-4">Question {currentQuestionId}/{questions.length}</h2>
            <p className="text-lg text-gray-700 mb-6">{questions.find(q => q.id === currentQuestionId)?.text}</p>
            <div className="grid grid-cols-2 gap-4 justify-center">
              {questions.find(q => q.id === currentQuestionId)?.options.map((option) => (
                <button
                  key={option.label}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-60"
                  onClick={() => handleNext(option.label)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
