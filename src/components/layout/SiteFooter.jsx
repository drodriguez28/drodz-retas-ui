export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 bg-gold px-6 py-4 text-center text-xs text-black">
      © {currentYear} Deivid R. Business Web™
    </footer>
  )
}
