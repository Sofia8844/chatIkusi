interface Props{
    data: {answer?: string; natural_languaje_summary?: string; details?: string};
}

export default function ParagraphRenderer({data}: Props){
        return (
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-[17px] text-gray-800 dark:text-gray-100 leading-relaxed 
                   tracking-normal font-[400] antialiased">{data.answer || data.natural_languaje_summary || data.details || "Sin descripción disponible."}</p>
            </div>
        )
}