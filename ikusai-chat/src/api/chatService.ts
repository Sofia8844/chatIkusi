export interface ChatResponse {
    data: {
        user_query: string;
        sql_statement: string;
        columns: string[];
        rows: any[][];
        type: string;
        details?: string;
        natural_language_summary?: string;
        mapping?: { x_key: string; y_key: string };
    }
};
//Interface New Conversation
export interface NewConversationResponse{
    conversation_id: string;
    created_at: string;
}
//Interface Chat History Conversation
export interface ChatHistoryItem {
  conversation_id: string;
  title: string;
  last_message: string;
  updated_at: string;
}
//Interface ChatMessage
 export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
  data?: {
    type: string;
    sql_statement?: string;
    columns?: string[];
    rows?: any[][];
    mapping?: { x_key: string | string[]; y_key: string | string[] };
    natural_language_summary?: string;
    details?: string;
    answer?: string;
  };
}

const API_BASE_URL =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    "https://n8n.ikusico.waysolutions.co"
    //"http://192.168.50.125:8010";
//const ASK_ENDPOINT = `${API_BASE_URL.replace(/\/$/, "")}/api/ask`; // primera version
const ASK_ENDPOINT = `${API_BASE_URL.replace(/\/$/, "")}/webhook/ask`; // segunda version
const NEW_CONVERSATION_ENDPOINT =  `${API_BASE_URL.replace(/\/$/, "")}/webhook/conversations`; // Endpoint- New Conversation
const HISTORY_CONVERSATION_ENDPOINT =  `${API_BASE_URL.replace(/\/$/, "")}/webhook/conversations`;// Endpoint - History  Conversation

// ======================================================
// 2️⃣ ENVIAR MENSAJE Y OBTENER RESPUESTA
// ======================================================
export async function fetchChatResponse(query: string, userRole: string,userId:string, chatId:string): Promise<ChatResponse["data"]> {
    try {
        const username = "ikusi_frontend";
        const password = "Ikusi2025*";

        // Si no necesitas base64, solo concatenas:
        const authValue = btoa(`${username}:${password}`);
        const response = await fetch(ASK_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" ,
             "Authorization": `Basic ${authValue}`},
           // headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ user_query: query, user_rol: userRole, user_id: userId, chat_id: chatId })
        });
        if (!response.ok) {
            throw new Error(`Error HTTP"${response.status}`);
        }
        const result: ChatResponse[] = await response.json();
     // return result.data;
      return result[0].data;
    } catch (error) {
        console.error("Error en el fetch", error);
        throw error;
    }
}
// ======================================================
// CREAR UNA NUEVA CONVERSACIÓN
// ======================================================

export async function fectNewConversation(userId:string): Promise<NewConversationResponse> {
    try {
        const username = "ikusi_frontend";
        const password = "Ikusi2025*";

        const authValue = btoa(`${username}:${password}`);
        const response = await fetch(NEW_CONVERSATION_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" ,
             "Authorization": `Basic ${authValue}`},
           // headers: { "Content-Type": "application/json"},
            body: JSON.stringify({  ser_id: userId})
        });
        if (!response.ok) {
            throw new Error(`Error HTTP"${response.status}`);
        }
        const result = await response.json();
     // return result.data;
      return result;
    } catch (error) {
        console.error("Error en el fetch", error);
        throw error;
    }
}
// ======================================================
// Historial Chat
// ======================================================
export async function fetchChatHistory(userId:string): Promise<ChatHistoryItem[]> {
    try {
        const username = "ikusi_frontend";
        const password = "Ikusi2025*";

        const authValue = btoa(`${username}:${password}`);
        const response = await fetch(HISTORY_CONVERSATION_ENDPOINT, {
            method: "GET",
            headers: { "Content-Type": "application/json" ,
             "Authorization": `Basic ${authValue}`},
           // headers: { "Content-Type": "application/json"},
            body: JSON.stringify({  user_id: userId})
        });
        if (!response.ok) {
            throw new Error(`Error HTTP"${response.status}`);
        }
        const result: ChatHistoryItem[] = await response.json();

     // return result.data;
      return result;
    } catch (error) {
        console.error("Error en el fetch", error);
        throw error;
    }
}
// Chat Id 
export async function fetchChatId(chatId:string): Promise<ChatMessage[]> {
    try {
        const username = "ikusi_frontend";
        const password = "Ikusi2025*";

        const authValue = btoa(`${username}:${password}`);
        const response = await fetch(HISTORY_CONVERSATION_ENDPOINT, {
            method: "GET",
            headers: { "Content-Type": "application/json" ,
             "Authorization": `Basic ${authValue}`},
           // headers: { "Content-Type": "application/json"},
            body: JSON.stringify({  chat_id: chatId})
        });
        if (!response.ok) {
            throw new Error(`Error HTTP"${response.status}`);
        }
        const result: ChatMessage[] = await response.json();
     // return result.data;
      return result;
    } catch (error) {
        console.error("Error en el fetch", error);
        throw error;
    }
}

