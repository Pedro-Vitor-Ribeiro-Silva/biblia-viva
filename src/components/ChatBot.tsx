'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  quemEnviou: 'user' | 'bot';
  texto: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Conectando ao servidor WebSocket
    socketRef.current = new WebSocket('ws://localhost:3001'); // Troque a URL se for produção

    socketRef.current.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.answer) {
        setMessages((prev) => [...prev, { quemEnviou: 'bot', texto: data.answer }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { quemEnviou: 'bot', texto: data.error }]);
      } else if (data.info) {
        setMessages((prev) => [...prev, { quemEnviou: 'bot', texto: data.info }]);
      }
      setLoading(false);
    };

    socketRef.current.onerror = () => {
      setMessages((prev) => [
        ...prev,
        { quemEnviou: 'bot', texto: 'Erro de conexão com o servidor WebSocket.' },
      ]);
      setLoading(false);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    const userMessage: Message = { quemEnviou: 'user', texto: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    socketRef.current.send(input); // Envia apenas o texto da pergunta
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col gap-4">
      <div className="bg-gray-100 p-4 rounded h-[400px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.quemEnviou === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.quemEnviou === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-green-100 text-black'
              }`}
            >
              {msg.texto}
            </div>
          </div>
        ))}
        {loading && (
          <div className="texto-left">
            <div className="inline-block px-3 py-2 text-black bg-green-100 rounded-lg">
              Pensando...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="texto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Pergunte algo com base bíblica..."
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 texto-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}