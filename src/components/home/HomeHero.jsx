export default function HomeHero({ isCreating, error, onCreateGame }) {
  return (
    <main className="min-h-screen bg-paper bg-haze px-6 py-10 text-ink">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80 p-8 shadow-card backdrop-blur md:p-12">
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-ink md:text-6xl">
            Drodz Retas
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink/70 md:text-lg">
            Divide your players into 2 balanced teams in seconds and start playing fast.
          </p>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onCreateGame}
              disabled={isCreating}
              className="inline-flex items-center justify-center rounded-2xl bg-gold px-6 py-4 text-base font-semibold text-ink transition hover:bg-[#e8b83a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isCreating ? 'Creating Room...' : 'Create Game'}
            </button>
          </div>
          {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
        </section>
      </div>
    </main>
  )
}
