'use client';

import ReactMarkdown from "react-markdown";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Link from "next/link";
import { ArrowLeft, Calendar, BookOpen, Loader2 } from "lucide-react";

interface Devocional {
    id: string;
    date: string;
    content: string;
}

export default function DevocionalPage() {
  const [devocionalAtual, setDevocionalAtual] = useState<Devocional | null>(null);
  const [devocionaisDoMes, setDevocionaisDoMes] = useState<Devocional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDevocional() {
      try {
        const [hojeRes, mesRes] = await Promise.all([
          fetch('/api/devocional/hoje'),
          fetch('/api/devocional/mes'),
        ]);

        const devocionalHoje = await hojeRes.json();
        const devocionaisMes = await mesRes.json();

        setDevocionalAtual(devocionalHoje);
        setDevocionaisDoMes(devocionaisMes);
      } catch (error) {
        console.error('Erro ao carregar devocional:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDevocional();
  }, []);

  function trocarDevocional(date: string) {
    const escolhido = devocionaisDoMes.find((d) => d.date === date);
    if (escolhido) {
      setDevocionalAtual(escolhido);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
       
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-600 hover:text-emerald-600 transition-colors duration-200 group mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Voltar ao início</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/25">
              <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Devocional
              </h1>
              <p className="text-slate-600 mt-1">Reflexões diárias na Palavra de Deus</p>
            </div>
          </div>
        </div>

        {loading ? (
          
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-12 backdrop-blur-sm border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full blur-3xl opacity-30 -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-200 rounded-full blur-2xl opacity-40 translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 text-center py-16">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
              <p className="text-xl text-slate-600">Carregando devocional...</p>
            </div>
          </div>
        ) : devocionalAtual ? (
          <div className="space-y-8">
            
            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-8 md:p-12 backdrop-blur-sm border border-white/20 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full blur-3xl opacity-30 -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-200 rounded-full blur-2xl opacity-40 translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                
                <div className="flex items-center justify-center mb-8">
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg shadow-emerald-500/25">
                    <Calendar className="w-5 h-5 mr-3" strokeWidth={2} />
                    <span className="font-semibold text-lg">
                      {format(new Date(devocionalAtual.date), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>

                
                <div className="prose prose-lg prose-slate max-w-none">
                  <div className="text-slate-700 leading-relaxed space-y-6">
                    <ReactMarkdown 
                      components={{
                        h1: ({children}) => <h1 className="text-3xl font-bold text-slate-800 mb-6">{children}</h1>,
                        h2: ({children}) => <h2 className="text-2xl font-semibold text-slate-800 mb-4 mt-8">{children}</h2>,
                        h3: ({children}) => <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">{children}</h3>,
                        p: ({children}) => <p className="text-lg leading-relaxed mb-4 text-slate-700">{children}</p>,
                        blockquote: ({children}) => (
                          <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 bg-emerald-50 rounded-r-lg my-6 italic text-emerald-800">
                            {children}
                          </blockquote>
                        ),
                        strong: ({children}) => <strong className="font-semibold text-slate-800">{children}</strong>,
                        em: ({children}) => <em className="italic text-emerald-700">{children}</em>,
                      }}
                    >
                      {devocionalAtual.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            
            {devocionaisDoMes.length >= 1 && (
              <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/30 p-8 backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full blur-2xl opacity-20 -translate-y-10 translate-x-10"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-emerald-600" strokeWidth={2} />
                    Outros devocionais do mês
                  </h3>
                  
                  <div className="relative">
                    <select
                      className="w-full px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl text-slate-700 font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 appearance-none cursor-pointer hover:border-emerald-400"
                      value={devocionalAtual.date}
                      onChange={(e) => trocarDevocional(e.target.value)}
                    >
                      {devocionaisDoMes.map((d) => (
                        <option key={d.id} value={d.date} className="py-2">
                          Devocional de {format(new Date(d.date), 'dd/MM/yyyy')}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-12 backdrop-blur-sm border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-orange-200 rounded-full blur-3xl opacity-30 -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10 text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Devocional não encontrado</h2>
              <p className="text-slate-600 mb-8">Não foi possível carregar o devocional no momento.</p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}
        
        
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Que a Palavra de Deus ilumine seu dia
          </p>
        </div>
      </div>
    </main>
  );
}