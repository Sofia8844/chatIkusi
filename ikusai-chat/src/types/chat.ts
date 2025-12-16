export interface ChatMessageProps {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  isAI: boolean;
  avatarUrl?: string;
  userInitial?: string;
  type?: "text" | "diagram",// nuevo campo opcional que indica el tipo de mensaje
  diagramData?: any, // datos del gráfico o del diagrama
  isLoading?: boolean,
  responseData?: any
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  icon: string;
  preview: string;
  isActive?: boolean;
}

export interface ChatHistorySection {
  id: string;
  title: string;
  items: ChatHistoryItem[];
}

export interface ChatSection {
  id: string;
  label: string;
  messages: ChatMessageProps[];
}

export interface QuickAction {
  id: string;
  icon: string;
  label: string;
  message: string;
}

export interface Widget {
  id: string;
  type: string;
  label: string;
  diagramData: any;
  x: number;
  y: number;
  width: number;
  height: number;
  chartRef?: React.RefObject<any>;
}