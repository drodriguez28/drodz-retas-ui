import BubbleSelector from '../shared/BubbleSelector'

export default function TeamSplitPanel({
  playersCount,
  teamCount,
  onTeamCountChange,
  isSplittingTeams,
  statusMessage,
  errorMessage,
  onSplitTeams,
}) {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white/85 p-6 shadow-card backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">Admin</p>
      <h2 className="mt-2 text-2xl font-black">Split into teams</h2>

      <div className="mt-5">
        <BubbleSelector
          label="Number of teams"
          value={teamCount}
          options={[2, 3, 4, 5]}
          onChange={onTeamCountChange}
          getOptionLabel={(option) => `${option} Teams`}
        />
      </div>

      <button
        type="button"
        onClick={onSplitTeams}
        disabled={isSplittingTeams || playersCount < teamCount}
        className="mt-5 w-full rounded-2xl bg-gold px-5 py-4 font-semibold text-ink transition hover:bg-[#e8b83a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSplittingTeams ? 'Splitting Teams...' : 'Split Teams'}
      </button>
      {playersCount < teamCount ? (
        <p className="mt-3 text-sm text-ink/60">
          Add at least {teamCount} players to split into {teamCount} teams.
        </p>
      ) : null}
      {statusMessage ? <p className="mt-4 text-sm font-medium text-charcoal">{statusMessage}</p> : null}
      {errorMessage ? <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p> : null}
    </section>
  )
}
