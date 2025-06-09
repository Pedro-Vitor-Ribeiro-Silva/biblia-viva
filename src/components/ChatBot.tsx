"use client";

import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2, Wifi, WifiOff } from "lucide-react";

interface Message {
  quemEnviou: "user" | "bot";
  texto: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const connectWebSocket = () => {
      socketRef.current = new WebSocket("ws://localhost:3001");

      socketRef.current.onopen = () => {
        console.log("Conectado ao servidor WebSocket");
        setConnected(true);
        setMessages((prev) => [
          ...prev,
          {
            quemEnviou: "bot",
            texto:
              "Sou seu conselheiro cristão baseado na Palavra de Deus. Como posso ajudá-lo hoje?",
          },
        ]);
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.answer) {
          setMessages((prev) => [
            ...prev,
            { quemEnviou: "bot", texto: data.answer },
          ]);
        } else if (data.error) {
          setMessages((prev) => [
            ...prev,
            { quemEnviou: "bot", texto: `Erro: ${data.error}` },
          ]);
        } else if (data.info) {
          setMessages((prev) => [
            ...prev,
            { quemEnviou: "bot", texto: data.info },
          ]);
        }
        setLoading(false);
      };

      socketRef.current.onclose = () => {
        setConnected(false);
        setLoading(false);
      };

      socketRef.current.onerror = () => {
        setTimeout(() => {
          if (
            !socketRef.current ||
            socketRef.current.readyState !== WebSocket.OPEN
          ) {
            setMessages((prev) => [
              ...prev,
              {
                quemEnviou: "bot",
                texto: "Erro de conexão com o servidor. Tentando reconectar...",
              },
            ]);
            setConnected(false);
            setLoading(false);
            connectWebSocket();
          }
        }, 500);
      };
    };

    connectWebSocket();

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current || !connected) return;

    const userMessage: Message = { quemEnviou: "user", texto: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    socketRef.current.send(input);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 backdrop-blur-sm border border-white/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full blur-3xl opacity-30 -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-200 rounded-full blur-2xl opacity-40 translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            {connected ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">
                  Conectado
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">
                  Desconectado
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-slate-500">
            {messages.length > 1
              ? `${messages.length - 1} mensagens`
              : "Conversa iniciada"}
          </div>
        </div>

        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start space-x-3 ${
                msg.quemEnviou === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.quemEnviou === "user"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                    : "bg-gradient-to-br from-emerald-500 to-teal-600"
                }`}
              >
                {msg.quemEnviou === "user" ? (
                  <User
                    className="w-4 h-4 text-white\"
                    strokeWidth={2}
                  />
                ) : (
                  <Bot
                    className="w-4 h-4 text-white"
                    strokeWidth={2}
                  />
                )}
              </div>

              <div
                className={`max-w-[80%] ${
                  msg.quemEnviou === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-3 rounded-2xl shadow-sm ${
                    msg.quemEnviou === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-lg font-bold mb-2">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-md font-semibold mb-1">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-sm font-semibold mb-1">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-emerald-800 my-2">
                            {children}
                          </blockquote>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-slate-800">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-emerald-700">
                            {children}
                          </em>
                        ),
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {msg.texto}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Bot
                  className="w-4 h-4 text-white"
                  strokeWidth={2}
                />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="text-sm text-slate-600">Pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <form
            onSubmit={handleSubmit}
            className="flex items-end space-x-4"
          >
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Pergunte algo com base bíblica..."
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height =
                    Math.min(target.scrollHeight, 120) + "px";
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !connected || !input.trim()}
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center"
            >
              {loading ? (
                <Loader2
                  className="w-5 h-5 animate-spin\"
                  strokeWidth={2}
                />
              ) : (
                <Send
                  className="w-5 h-5"
                  strokeWidth={2}
                />
              )}
            </button>
          </form>

          <div className=" hidden md:block  mt-3 text-center">
            <p className="text-xs text-slate-500">
              Pressione Enter para enviar • Shift + Enter para nova linha
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
