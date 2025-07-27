// src/components/Skills.jsx
export default function Skills() {
  return (
    <section className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Galaxia de Habilidades</h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {/* Galaxia iOS */}
        <div className="flex-1 bg-gradient-to-br from-[#1e1e5a] to-[#0c0c2e] rounded-2xl p-4 shadow-md min-h-[200px]">
          <h3 className="text-lg font-semibold mb-2">Galaxia iOS 🚀</h3>
          <ul className="flex flex-wrap gap-3">
            <li className="text-sm bg-black/30 px-2 py-1 rounded">Swift</li>
            <li className="text-sm bg-black/30 px-2 py-1 rounded">SwiftUI</li>
            <li className="text-sm bg-black/30 px-2 py-1 rounded">SwiftData</li>
            <li className="text-sm bg-black/30 px-2 py-1 rounded">Sockets</li>
          </ul>
        </div>

        {/* Galaxia Web */}
        <div className="flex-1 bg-gradient-to-br from-[#1e1e5a] to-[#0c0c2e] rounded-2xl p-4 shadow-md min-h-[200px]">
          <h3 className="text-lg font-semibold mb-2">Galaxia Web 🌐</h3>
          <ul className="flex flex-wrap gap-3">
            <li className="text-sm bg-black/30 px-2 py-1 rounded">React</li>
            <li className="text-sm bg-black/30 px-2 py-1 rounded">TailwindCSS</li>
            <li className="text-sm bg-black/30 px-2 py-1 rounded">Vite</li>
          </ul>
        </div>

        {/* Galaxia IA */}
        <div className="flex-1 bg-gradient-to-br from-[#1e1e5a] to-[#0c0c2e] rounded-2xl p-4 shadow-md min-h-[200px]">
          <h3 className="text-lg font-semibold mb-2">Galaxia IA 🤖</h3>
          <ul className="flex flex-wrap gap-3">
            <li className="text-sm bg-black/30 px-2 py-1 rounded">Jupyter</li>
            <li className="text-sm bg-black/30 px-2 py-1 rounded">Python</li>
            <li className="text-sm bg-black/30 px-2 py-1 rounded">ChatGPT</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
