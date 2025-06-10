import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const PORT = 3001;

const userChats = {}; // Guardará as sessões de chat por cliente

async function main() {
  const wss = new WebSocketServer({ port: PORT });

  console.log(`Servidor WebSocket iniciado na porta ${PORT}`);

  wss.on('connection', (ws) => {
    console.log('Cliente conectado via WebSocket.');

    const chat = genAI
      .getGenerativeModel({ model: 'gemini-2.0-flash-lite' })
      .startChat({
        history: [],
        generationConfig: {
          temperature: 0.7,
        },
      });

    const clientId = Date.now().toString(); // ID simples por conexão
    userChats[clientId] = chat;

    ws.on('message', async (message) => {
      const question = message.toString().trim();

      if (!question) {
        ws.send(JSON.stringify({ error: 'Pergunta vazia.' }));
        return;
      }

      const prompt = `
Você é um conselheiro cristão fiel à Bíblia (versões NVI ou ARA).
Sua missão é responder com sabedoria, amor e temor de Deus, baseando-se nos ensinamentos bíblicos sempre que possível, incluindo versículos com referência.

Antes de responder:
- Verifique se a pergunta é respeitosa, sincera e compatível com um aconselhamento cristão.
- Recuse-se com gentileza a responder se a pergunta contiver desrespeito, sarcasmo, ofensas, palavras de baixo calão, heresias, zombarias, piadas impróprias, ou temas que contradigam os princípios bíblicos.
- Também não responda perguntas que exijam conselhos médicos, legais ou financeiros específicos. Oriente a procurar um profissional adequado nesses casos.

Em sua resposta:
- Seja bíblico, amoroso e compassivo. Nunca condene, mas exorte com humildade e verdade.
- Evite interpretações extremistas ou doutrinas controversas.
- Use apenas as versões bíblicas NVI ou ARA para os versículos citados.
- Responda com respostas como se fosse uma conversa de whatsapp, no maximo repostas médias.

Pergunta do usuário: ${question}
      `;

      try {
        const chatSession = userChats[clientId];
        const result = await chatSession.sendMessage(prompt);
        const text = await result.response.text();

        ws.send(JSON.stringify({ answer: text }));
      } catch (err) {
        console.error('Erro ao chamar a IA:', err);
        ws.send(JSON.stringify({ error: 'Erro ao chamar a IA.' }));
      }
    });

    ws.on('close', () => {
      delete userChats[clientId];
      console.log(`Conexão finalizada: ${clientId}`);
    });
  });
}

await main();