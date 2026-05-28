function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
      
      <h1 className="text-6xl font-bold text-white tracking-widest mb-2">ViZi</h1>
      <p className="text-gray-400 text-lg mb-12">Visibilidade comercial em tempo real</p>

      <div className="flex gap-6">
        
        <div className="bg-gray-800 rounded-2xl p-8 w-56 text-center shadow-lg">
          <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Orçamentos Solicitados</h2>
          <p className="text-5xl font-bold text-white">12</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 w-56 text-center shadow-lg">
          <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Orçamentos Encaminhados</h2>
          <p className="text-5xl font-bold text-green-400">5</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 w-56 text-center shadow-lg">
          <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Mensagens Paradas</h2>
          <p className="text-5xl font-bold text-red-400">8</p>
        </div>

      </div>
    </div>
  );
}

export default App;