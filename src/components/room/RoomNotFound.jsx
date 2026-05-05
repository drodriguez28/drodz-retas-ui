import { Link } from 'react-router-dom'

export default function RoomNotFound() {
  return (
    <main className="min-h-screen bg-paper px-6 py-10 text-ink">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">Room</p>
        <h1 className="mt-3 text-3xl font-black">Room not found.</h1>
        <p className="mt-4 text-ink/70">Create a new game and share that link instead.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-gold px-5 py-3 font-semibold text-ink transition hover:bg-[#e8b83a]"
        >
          Back Home
        </Link>
      </div>
    </main>
  )
}
