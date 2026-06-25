import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Júl. 13. 00:00 Budapest (CEST = UTC+2) → UTC: júl. 12. 22:00
const TARGET = new Date('2026-07-12T22:00:00Z')

interface Countdown { days: number; hours: number; minutes: number; seconds: number }

function getCountdown(): Countdown | null {
  const diff = TARGET.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  }
}

function getMiamiTime(): string {
  return new Date().toLocaleTimeString('hu-HU', {
    timeZone: 'America/New_York',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Niki() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState<Countdown | null>(getCountdown())
  const [miamiTime, setMiamiTime] = useState(getMiamiTime())

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(getCountdown())
      setMiamiTime(getMiamiTime())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 flex flex-col items-center justify-center gap-8 p-6">
      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 text-pink-400 hover:text-pink-600 font-bold text-lg transition-colors"
      >
        ← Vissza
      </button>

      <div className="float-anim">
        <img
          src="https://gifdb.com/images/high/mocha-comforting-sad-milk-bear-miss-you-too-44bfs4q8j4xq6thk.gif"
          alt="waiting cute"
          className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-pink-300"
        />
      </div>

      {countdown ? (
        <div className="flex flex-col items-center gap-5 w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-extrabold text-pink-500 text-center leading-snug">
            🏡 Bubi még ennyi idő múlva ér haza 🏡
          </h1>
          <div className="countdown-card rounded-3xl shadow-xl p-6 w-full">
            <div className="grid grid-cols-4 gap-3 text-center">
              {([['nap', countdown.days], ['óra', countdown.hours], ['perc', countdown.minutes], ['mp', countdown.seconds]] as [string, number][]).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-black text-pink-500 tabular-nums">{pad(value)}</span>
                  <span className="text-xs font-bold text-pink-300 uppercase tracking-widest mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-6xl heart-pulse">🎉</span>
          <h1 className="text-4xl md:text-5xl font-black text-pink-500 animate-bounce">BUBI MA JÖN HAZA!</h1>
          <p className="text-2xl">🥳🎊💕</p>
        </div>
      )}

      <div className="clock-card rounded-3xl shadow-xl p-6 w-full max-w-md text-center">
        <p className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-2">
          🌴 Miami, Florida — Szabinál most ennyi az idő
        </p>
        <p className="text-5xl md:text-6xl font-black text-pink-500 tabular-nums tracking-wide">{miamiTime}</p>
        {/* <p className="text-pink-300 text-xs mt-2 font-semibold">EDT (UTC−4)</p> */}
      </div>
    </div>
  )
}
