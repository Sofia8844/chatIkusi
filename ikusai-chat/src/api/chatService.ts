export interface ChatResponse {
    data: {
        user_query: string;
        sql_statement: string;
        columns: string[];
        rows: any[][];
        type: string;
        details?: string;
        natural_language_summary?: string;
        mappin?: { x_key: string; y_key: string };
    }
};
const API_BASE_URL =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    "https://n8n.ikusico.waysolutions.co"
    //"http://192.168.50.125:8010";
//const ASK_ENDPOINT = `${API_BASE_URL.replace(/\/$/, "")}/api/ask`; // primera version
const ASK_ENDPOINT = `${API_BASE_URL.replace(/\/$/, "")}/webhook/ask`; // segunda version
export async function fetchChatResponse(query: string, userRole: string): Promise<ChatResponse["data"]> {
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
            body: JSON.stringify({ user_query: query, user_rol: userRole })
        });
        if (!response.ok) {
            throw new Error(`Error HTTP"${response.status}`);
        }
        const result: ChatResponse = await response.json();
     // return result.data;
      return result[0].data;
    } catch (error) {
        console.error("Error en el fetch", error);
        throw error;
    }
}