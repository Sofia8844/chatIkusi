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

export async function fetchChatResponse(query: string): Promise<ChatResponse["data"]> {
    try {
        const response = await fetch("http://192.168.50.125:8010/api/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_query:query })
        });
        if (!response.ok) {
            throw new Error(`Error HTTP"${response.status}`);
        }
        const result: ChatResponse = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error en el fetch", error);
        throw error;
    }
}