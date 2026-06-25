import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100 flex flex-col items-center justify-center gap-10 p-6">
      <div className="float-anim">
        <img
          src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
          alt="cute bear"
          className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-pink-300"
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-pink-500 text-center drop-shadow-sm">
        💕 Ki vagy te? 💕
      </h1>

      <p className="text-pink-400 text-lg font-semibold -mt-4">Kattints a nevedre!</p>

      <div className="flex flex-col sm:flex-row gap-5 mt-2">
        <button
          onClick={() => navigate('/niki')}
          className="px-12 py-5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white text-2xl font-extrabold rounded-full shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          🌸 Niki
        </button>
        <button
          onClick={() => navigate('/szabi')}
          className="px-12 py-5 bg-gradient-to-r from-fuchsia-400 to-purple-400 hover:from-fuchsia-500 hover:to-purple-500 text-white text-2xl font-extrabold rounded-full shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          ✈️ Szabi
        </button>
      </div>
    </div>
  )
}
