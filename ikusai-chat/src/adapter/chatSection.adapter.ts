import type { ChatMessage } from '../api/chatService';
import type { ChatSection, ChatMessageProps } from '../types/chat';

export function adaptMessagesToSections(
  messages: ChatMessage[]
): ChatSection[] {
  const sectionMap = new Map<string, ChatSection>();

  messages.forEach(msg => {
    const dateKey = msg.timestamp.split('T')[0];

    if (!sectionMap.has(dateKey)) {
      sectionMap.set(dateKey, {
        id: dateKey,
        label: formatLabel(dateKey),
        messages: []
      });
    }

    const section = sectionMap.get(dateKey)!;

    const uiMessage: ChatMessageProps = {
      id: msg.conversacion_id,
      author: msg.sender === 'ai' ? 'Ikusito' : 'You',
      content: msg.content,
      timestamp: formatTime(msg.timestamp),
      isAI: msg.sender === 'ai',
      avatarUrl: msg.sender === 'ai'
        ? '/src/icons/icons8-bot-200.png'
        : undefined,
      responseData: msg.data
    };

    section.messages.push(uiMessage);
  });

  return Array.from(sectionMap.values());
}

function formatLabel(date: string) {
  return date; // luego puedes cambiar a Hoy / Ayer
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
}