interface BtnTryFreeProps {
  onClick: () => void;
}

export default function BtnTryFree({ onClick }: BtnTryFreeProps){

  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="relative flex min-w-36 p-2 px-6 justify-center items-center border-solid border-2 w-full max-w-xs border-[#37C25E] rounded-full hover:text-primary text-secondary font-semibold uppercase overflow-hidden group"
      >
        {/* Pseudo-élément pour l'effet de remplissage */}
        <span className="absolute inset-0 bg-green-600 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0"></span>
        
        {/* Contenu du bouton, mis au-dessus du pseudo-élément */}
        <span className="relative z-10">Répondre au questionnaire</span>
      </button>
    </div>
  )
}
