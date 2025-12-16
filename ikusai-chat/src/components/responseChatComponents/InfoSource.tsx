interface InfoSourcesProps {
    data: { info_source?: string[]; };
}

export default function InfoSources({ data }: InfoSourcesProps) {
    const sources = data.info_source;
    if (!sources || sources.length === 0) return null;
    function getFileMeta(path: string) {
        const file = decodeURIComponent(path.split("/").pop() || path);
        const ext = file.split(".").pop()?.toUpperCase() ?? "FILE";

        return { file, ext };
    }
    return (
        <div className="mt-6 border-t pt-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                📚 Fuentes
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sources.map((src, index) => {
                    const { file, ext } = getFileMeta(src);

                    return (
                        <a
                            key={index}
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                group flex items-center gap-3
                rounded-xl border
                bg-white dark:bg-zinc-900
                p-3
                hover:shadow-md hover:border-blue-400
                transition
              "
                        >
                            {/* ICONO */}
                            <div
                                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-lg
                  bg-blue-50 text-blue-600
                  dark:bg-blue-900/30 dark:text-blue-400
                  font-bold text-xs
                "
                            >
                                {ext === "PDF" ? (
                                    <img src="/src/icons/icons8-pdf-96.png" />

                                ) : (
                                    <span className="font-bold text-xs">{ext}</span>
                                )}
                            </div>

                            {/* TEXTO */}
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                                    {file}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Fuente {index + 1}
                                </p>
                            </div>

                            {/* CHEVRON */}
                            <span className="ml-auto text-gray-400 group-hover:text-blue-500 transition">
                                ↗
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
