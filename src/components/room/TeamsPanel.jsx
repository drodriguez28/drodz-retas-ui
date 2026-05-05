export default function TeamsPanel({ teams }) {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white/85 p-6 shadow-card backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">Teams</p>
          <h2 className="mt-2 text-2xl font-black">Results</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {teams.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-paper px-5 py-8 text-center text-ink/55">
            Teams will appear here after the split.
          </div>
        ) : (
          teams.map((team) => (
            <article key={team.id} className="rounded-2xl bg-charcoal px-5 py-5 text-white">
              <h3 className="text-lg font-black">{team.name}</h3>
              <ul className="mt-4 space-y-2">
                {team.players.length === 0 ? (
                  <li className="text-sm text-white/65">No players assigned</li>
                ) : (
                  team.players.map((player, i) => (
                    <li key={`${team.id}-${i}`} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-medium">
                      {player}
                    </li>
                  ))
                )}
              </ul>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
