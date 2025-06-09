import Link from "next/link";
import { Book, MessageCircle, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-12 backdrop-blur-sm border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full blur-3xl opacity-30 -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-200 rounded-full blur-2xl opacity-40 translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 text-center">
 
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/25 mb-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Book className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Bíblia Viva
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-lg mx-auto">
              Uma plataforma cristã com IA baseada na <br />
              <span className="font-semibold text-emerald-700">Palavra de Deus</span>.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/chat"
                className="group relative inline-flex items-center justify-center w-full max-w-sm mx-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MessageCircle className="w-5 h-5 mr-3 relative z-10" strokeWidth={2} />
                <span className="relative z-10">Ir para o Chat</span>
              </Link>
              
              <div className="flex items-center justify-center py-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                <div className="mx-4 w-2 h-2 bg-slate-300 rounded-full"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              </div>
              
              <Link
                href="/devocional"
                className="group relative inline-flex items-center justify-center w-full max-w-sm mx-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Heart className="w-5 h-5 mr-3 relative z-10" strokeWidth={2} />
                <span className="relative z-10">Ir para o Devocional</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Conectando corações à Palavra através da tecnologia
          </p>
        </div>
      </div>
    </main>
  );
}