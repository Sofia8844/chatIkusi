import type { ChatHistoryItem, ChatHistorySection } from '../types/chat';
export function groupChatHistoryByDate(items: ChatHistoryItem[]): ChatHistorySection[] {
  if (!items || items.length === 0) return [];

  const sectionsMap: Record<string, ChatHistoryItem[]> = {};

  items.forEach((item) => {
    // Obtener fecha legible, ej: 'Hoy', 'Ayer' o 'dd/MM/yyyy'
    const updatedDate = new Date(item.updated_at);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let sectionTitle: string;

    if (
      updatedDate.toDateString() === today.toDateString()
    ) {
      sectionTitle = 'Hoy';
    } else if (
      updatedDate.toDateString() === yesterday.toDateString()
    ) {
      sectionTitle = 'Ayer';
    } else {
      sectionTitle = updatedDate.toLocaleDateString(); // formato local, ej: 16/12/2025
    }

    if (!sectionsMap[sectionTitle]) {
      sectionsMap[sectionTitle] = [];
    }

    sectionsMap[sectionTitle].push(item);
  });

  // Convertir el map a array de sections
  return Object.entries(sectionsMap).map(([title, items], index) => ({
    id: `section-${index}`,
    title,
    items,
  }));
}