function shufflePlayers(players) {
  const shuffled = [...players]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

export function splitTeams(players, teamCount = 2) {
  const shuffledPlayers = shufflePlayers(players)
  const safeTeamCount = Math.max(2, Number(teamCount) || 2)
  const teams = Array.from({ length: safeTeamCount }, (_, index) => ({
    id: `team-${index + 1}`,
    name: `Team ${index + 1}`,
    players: [],
  }))

  shuffledPlayers.forEach((player, index) => {
    const teamIndex = index % safeTeamCount
    teams[teamIndex].players.push(player)
  })

  return teams
}