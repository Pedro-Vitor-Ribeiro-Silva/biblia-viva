import ChatBot from "@/components/ChatBot";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200 group mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Voltar ao início</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25">
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Conselheiro Cristão
              </h1>
              <p className="text-slate-600 mt-1">Converse com nossa IA baseada na Palavra de Deus</p>
            </div>
          </div>
        </div>
        <ChatBot />
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Todas as respostas são baseadas nos ensinamentos bíblicos
          </p>
        </div>
      </div>
    </main>
  );
}