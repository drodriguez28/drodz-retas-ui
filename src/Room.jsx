import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlayersPanel from './components/room/PlayersPanel'
import RoomHeader from './components/room/RoomHeader'
import RoomNotFound from './components/room/RoomNotFound'
import TeamsPanel from './components/room/TeamsPanel'
import TeamSplitPanel from './components/room/TeamSplitPanel'
import { addPlayer, saveTeams, subscribeToRoom } from './localRooms'
import { splitTeams } from './utils/splitTeams'

function normalizePlayers(playersObject) {
  if (!playersObject) {
    return []
  }

  return Object.entries(playersObject).map(([id, playerName]) => ({
    id,
    name: playerName,
  }))
}

export default function Room() {
  const { roomId } = useParams()
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [roomExists, setRoomExists] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSavingPlayer, setIsSavingPlayer] = useState(false)
  const [isSplittingTeams, setIsSplittingTeams] = useState(false)

  useEffect(() => {
    if (!roomId) {
      setRoomExists(false)
      return undefined
    }

    const unsubscribe = subscribeToRoom(roomId, (room) => {
      if (!room) {
        setRoomExists(false)
        setPlayers([])
        setTeams([])
        return
      }

      setRoomExists(true)
      setPlayers(normalizePlayers(room.players))
      setTeams(Array.isArray(room.teams) ? room.teams : [])
    })

    return () => unsubscribe()
  }, [roomId])

  const handleAddPlayer = async (event) => {
    event.preventDefault()

    const trimmedName = playerName.trim()

    if (!trimmedName || !roomId) {
      return
    }

    setIsSavingPlayer(true)
    setErrorMessage('')
    setStatusMessage('')

    try {
      addPlayer(roomId, trimmedName)

      setPlayerName('')
    } catch (addError) {
      setErrorMessage('Unable to add player. Try again.')
    } finally {
      setIsSavingPlayer(false)
    }
  }

  const handleSplitTeams = async () => {
    if (players.length < 2 || !roomId) {
      return
    }

    setIsSplittingTeams(true)
    setErrorMessage('')
    setStatusMessage('')

    try {
      const nextTeams = splitTeams(players.map((player) => player.name))
      saveTeams(roomId, nextTeams)
      setStatusMessage('Teams split!')
    } catch (splitError) {
      setErrorMessage('Unable to split teams. Try again.')
    } finally {
      setIsSplittingTeams(false)
    }
  }

  if (!roomExists) {
    return <RoomNotFound />
  }

  return (
    <main className="min-h-screen bg-paper bg-haze px-6 py-8 text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <RoomHeader roomId={roomId} />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PlayersPanel
            players={players}
            playerName={playerName}
            isSavingPlayer={isSavingPlayer}
            onNameChange={(event) => setPlayerName(event.target.value)}
            onSubmit={handleAddPlayer}
          />

          <div className="space-y-6">
            <TeamSplitPanel
              playersCount={players.length}
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
  )
}