import { useState } from 'react'
import SiteFooter from './components/layout/SiteFooter'
import PlayersPanel from './components/room/PlayersPanel'
import TeamSplitPanel from './components/room/TeamSplitPanel'
import TeamsPanel from './components/room/TeamsPanel'
import { splitTeams } from './utils/splitTeams'

export default function App() {
  const [playerName, setPlayerName] = useState('')
  const [teamCount, setTeamCount] = useState(2)
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSplittingTeams, setIsSplittingTeams] = useState(false)

  const handleAddPlayer = (event) => {
    event.preventDefault()
    const trimmed = playerName.trim()
    if (!trimmed) return
    setPlayers((prev) => [...prev, { id: crypto.randomUUID(), name: trimmed }])
    setPlayerName('')
    setStatusMessage('')
    setErrorMessage('')
  }

  const handleRemovePlayer = (id) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id))
    setTeams([])
    setStatusMessage('')
  }

  const handleSplitTeams = () => {
    if (players.length < teamCount) return
    setIsSplittingTeams(true)
    setErrorMessage('')
    setStatusMessage('')
    try {
      const nextTeams = splitTeams(
        players.map((p) => p.name),
        teamCount,
      )
      setTeams(nextTeams)
      setStatusMessage(`Split into ${teamCount} teams!`)
    } catch {
      setErrorMessage('Unable to split teams. Try again.')
    } finally {
      setIsSplittingTeams(false)
    }
  }

  const handleReset = () => {
    setPlayers([])
    setTeams([])
    setStatusMessage('')
    setErrorMessage('')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <main className="min-h-screen bg-paper bg-haze px-6 py-8 text-ink">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <header className="rounded-[2rem] border border-ink/10 bg-white/85 p-6 shadow-card backdrop-blur md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">D-Rodz Retas Matchup</p>
                  <h1 className="mt-2 text-3xl font-black md:text-4xl">Divide your teams fast.</h1>
                </div>
                {players.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-2xl border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/60 transition hover:text-ink"
                  >
                    Reset
                  </button>
                )}
              </div>
            </header>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <PlayersPanel
                players={players}
                playerName={playerName}
                isSavingPlayer={false}
                onNameChange={(e) => setPlayerName(e.target.value)}
                onSubmit={handleAddPlayer}
                onRemovePlayer={handleRemovePlayer}
              />

              <div className="space-y-6">
                <TeamSplitPanel
                  playersCount={players.length}
                  teamCount={teamCount}
                  onTeamCountChange={(value) => {
                    setTeamCount(value)
                    setTeams([])
                    setStatusMessage('')
                  }}
                  isSplittingTeams={isSplittingTeams}
                  statusMessage={statusMessage}
                  errorMessage={errorMessage}
                  onSplitTeams={handleSplitTeams}
                />
                <TeamsPanel teams={teams} />
              </div>
            </section>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}