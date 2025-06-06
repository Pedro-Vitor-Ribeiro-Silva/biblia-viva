export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Bíblia Viva</h1>
      <p className="mt-2">Uma plataforma cristã com IA baseada na Palavra de Deus.</p>
      <a
        href="/chat"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Ir para o Chat
      </a>
    </main>
  );
}