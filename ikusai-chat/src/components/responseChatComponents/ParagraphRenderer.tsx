interface Props{
    data: {natural_languaje_summary?: string; details?: string};
}

export default function ParagraphRenderer({data}: Props){
        return (
            <div className="prose dark:prose-invert max-w-none">
                <p>{data.natural_language_summary || data.details || "Sin descripción disponible."}</p>
            </div>
        )
}