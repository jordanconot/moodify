

export default function Logo() {
  return (
    <div className="flex gap-1 justify-center sm:gap-4">
      <img src="/assets/svg/logo.svg" alt="Moodify" className="h-auto w-auto" />
      <span className="text-lg sm:text-3xl font-bold leading-8 text-primary">Moodify</span>
    </div>
  )
}
