import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      <h1 className="text-4xl mb-4 font-medium">404</h1>
      <p className="text-xl mb-8">Page non trouvée</p>
      <Link to='/'>
        <button
          className={`flex p-2 uppercase justify-center items-center text-primary font-semibold rounded-full text-base px-6 py-3.5 overflow-hidden group bg-full relative hover:bg-gradient-to-r hover:from-secondary hover:to-modal  hover:ring-2 hover:ring-offset-2 hover:ring-secondary transition-all ease-in-out duration-300`}
        >
          Accueil
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-primary opacity-10 rotate-12 group-hover:-translate-x-80 ease-in-out"></span>
        </button>
      </Link>
    </div>
  )
}
