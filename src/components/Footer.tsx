import Logo from "./logo/Logo";

export default function Footer() {
  return (
    <>
      <footer className="bg-primary px-8 py-10 mt-52">
        <div className="flex flex-col justify-center items-center gap-8">
          {/* Section Logo et Description */}
          <div className="w-full sm:w-1/2 mx-auto text-center">
            <Logo />
            <p className="text-grey text-xs sm:text-base font-normal mt-4">
              Votre destination pour une musique personnalisée axée sur le bien-être. Élevez vos moments avec nos playlists soigneusement adaptées à votre état d'esprit. Simplifiez votre expérience musicale et harmonisez vos émotions. Rejoignez-nous dès aujourd'hui pour un voyage sonore unique !
            </p>
          </div>

          {/* Section Contact */}
          <div className="w-full sm:w-1/2 mx-auto text-center">
            <h3 className="text-white text-lg sm:text-2xl font-semibold mb-4">Contact</h3>
            <p className="text-grey text-xs sm:text-base font-normal">
              Pour toute question ou assistance, n'hésitez pas à nous contacter à l'adresse suivante :
            </p>
            <p className="text-grey text-xs sm:text-base font-normal mt-2">
              <a href="mailto:moodify.contact34@gmail.com" className="hover:underline">support@moodify.com</a>
            </p>
          </div>
        </div>
      </footer>

      <div className="text-center mt-8 mb-8">
        <span className="text-grey-2 text-xs">Copyright © Moodify</span>
      </div>
    </>
  );
}