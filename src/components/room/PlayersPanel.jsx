export default function PlayersPanel({
  players,
  playerName,
  isSavingPlayer,
  onNameChange,
  onSubmit,
  onRemovePlayer,
}) {
  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white/85 p-6 shadow-card backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">Players</p>
          <h2 className="mt-2 text-2xl font-black">Live player list</h2>
        </div>
        <div className="rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-ink">
          {players.length} total
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={playerName}
          onChange={onNameChange}
          placeholder="Enter player name"
          className="min-w-0 flex-1 rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-base outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        <button
          type="submit"
          disabled={isSavingPlayer || !playerName.trim()}
          className="rounded-2xl bg-charcoal px-5 py-3 font-semibold text-white transition hover:bg-[#1e1e1e] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSavingPlayer ? 'Adding...' : 'Add Player'}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {players.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-paper px-5 py-8 text-center text-ink/55">
            No players yet. Add the first one.
          </div>
        ) : (
          players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-2xl border border-ink/10 bg-paper px-4 py-3"
            >
              <span className="font-semibold text-ink">{player.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-ink/45">#{index + 1}</span>
                <button
                  type="button"
                  onClick={() => onRemovePlayer(player.id)}
                  className="text-sm text-ink/40 transition hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
