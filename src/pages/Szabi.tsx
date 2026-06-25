import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

function getBudapestTime(): string {
  return new Date().toLocaleTimeString('hu-HU', {
    timeZone: 'Europe/Budapest',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Szabi() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState<Countdown | null>(getCountdown())
  const [budapestTime, setBudapestTime] = useState(getBudapestTime())

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(getCountdown())
      setBudapestTime(getBudapestTime())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center gap-8 p-6">
      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 text-fuchsia-400 hover:text-fuchsia-600 font-bold text-lg transition-colors"
      >
        ← Vissza
      </button>

      <div className="float-anim">
        <img
          src="https://gifdb.com/images/high/milk-mocha-bear-love-couple-cuddle-acxywzcpdpee2t32.gif"
          alt="travel cute"
          className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-fuchsia-300"
        />
      </div>

      {countdown ? (
        <div className="flex flex-col items-center gap-5 w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-extrabold text-fuchsia-500 text-center leading-snug">
            💜 Ennyi idő múlva láthatom leghamarabb bubukámat 💜
          </h1>
          <div className="rounded-3xl shadow-xl p-6 w-full" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(216,180,254,0.5)' }}>
            <div className="grid grid-cols-4 gap-3 text-center">
              {([['nap', countdown.days], ['óra', countdown.hours], ['perc', countdown.minutes], ['mp', countdown.seconds]] as [string, number][]).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-black text-fuchsia-500 tabular-nums">{pad(value)}</span>
                  <span className="text-xs font-bold text-fuchsia-300 uppercase tracking-widest mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-6xl heart-pulse">🎉</span>
          <h1 className="text-4xl md:text-5xl font-black text-fuchsia-500 animate-bounce">MÁMA MEGYEK HAZA TE KIS GÖRCS HA EZT OLVASOD NAGYON SZERETLEK!</h1>
          <p className="text-2xl">🥳🎊💕</p>
        </div>
      )}

      <div className="rounded-3xl shadow-xl p-6 w-full max-w-md text-center" style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.55)', border: '2px solid rgba(216,180,254,0.4)' }}>
        <p className="text-fuchsia-400 font-bold text-sm uppercase tracking-widest mb-2">
          Tiszalök - Nikinél most ennyi az idő
        </p>
        <p className="text-5xl md:text-6xl font-black text-fuchsia-500 tabular-nums tracking-wide">{budapestTime}</p>
        {/* <p className="text-fuchsia-300 text-xs mt-2 font-semibold">CEST (UTC+2)</p> */}
      </div>
    </div>
  )
}
