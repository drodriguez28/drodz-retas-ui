const STORAGE_KEY = 'team-splitter-rooms'
const CHANGE_EVENT = 'team-splitter-rooms:change'

function readRooms() {
  if (typeof window === 'undefined') {
    return {}
  }

  const savedRooms = window.localStorage.getItem(STORAGE_KEY)

  if (!savedRooms) {
    return {}
  }

  try {
    return JSON.parse(savedRooms)
  } catch {
    return {}
  }
}

function writeRooms(rooms) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms))
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

function createPlayerId() {
  return crypto.randomUUID()
}

export function createRoom() {
  const rooms = readRooms()
  const roomId = crypto.randomUUID().slice(0, 8)

  rooms[roomId] = {
    players: {},
    teams: [],
  }

  writeRooms(rooms)

  return roomId
}

export function getRoom(roomId) {
  const rooms = readRooms()
  return rooms[roomId] ?? null
}

export function addPlayer(roomId, playerName) {
  const rooms = readRooms()
  const room = rooms[roomId]

  if (!room) {
    throw new Error('Room not found')
  }

  room.players[createPlayerId()] = playerName
  writeRooms(rooms)
}

export function saveTeams(roomId, teams) {
  const rooms = readRooms()
  const room = rooms[roomId]

  if (!room) {
    throw new Error('Room not found')
  }

  room.teams = teams
  writeRooms(rooms)
}

export function subscribeToRoom(roomId, callback) {
  const emitRoom = () => {
    callback(getRoom(roomId))
  }

  const handleStorage = (event) => {
    if (event.key && event.key !== STORAGE_KEY) {
      return
    }

    emitRoom()
  }

  emitRoom()
  window.addEventListener('storage', handleStorage)
  window.addEventListener(CHANGE_EVENT, emitRoom)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(CHANGE_EVENT, emitRoom)
  }
}