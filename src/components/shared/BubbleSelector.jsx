export default function BubbleSelector({
  label,
  value,
  options,
  onChange,
  getOptionLabel = (option) => String(option),
}) {
  return (
    <div>
      {label ? <p className="text-sm font-semibold text-ink/70">{label}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option === value

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-gold bg-gold text-ink'
                  : 'border-ink/10 bg-white text-ink/70 hover:border-gold/60 hover:text-ink'
              }`}
              aria-pressed={isActive}
            >
              {getOptionLabel(option)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
