import { Link } from 'react-router-dom'

export default function RoomHeader({ roomId }) {
  return (
    <header className="rounded-[2rem] border border-ink/10 bg-white/85 p-6 shadow-card backdrop-blur md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <Link to="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">
            Drodz Retas
          </Link>
          <h1 className="mt-3 text-3xl font-black md:text-4xl">Session {roomId}</h1>
        </div>
      </div>
    </header>
  )
}
