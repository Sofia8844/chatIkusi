import { useState } from "react";
import TemplateCard from "./TemplateCard";
import type { TemplatePreview } from "../editPage/types";
import { TemplatePreviewModal } from "./TemplatePreview";
import { DesignProvider } from "../../../providers/DesignProvider";

interface CarouselProps {
    title: string;
    items: {
        thumbnailUrl: string;
        title: string;
        description: string;
    }[];
}

export default function Carousel({ title, items }: CarouselProps) {
    const [index, setIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplatePreview | null>(null);

    const cardsPerView = 4;
    const maxIndex = Math.ceil(items.length / cardsPerView) - 1;

    const prev = () => setIndex((i) => Math.max(0, i - 1));
    const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

    return (
        <div className="relative w-full max-w-5xl mx-auto">
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-6 text-text-primary-light dark:text-text-primary-dark">
                {title}
            </h2>

            <div className="overflow-hidden px-2">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {Array.from({ length: maxIndex + 1 }).map((_, groupIndex) => (
                        <div key={groupIndex} className="flex items-stretch p-4 gap-4 min-w-full">
                            {items.slice(
                                groupIndex * cardsPerView,
                                groupIndex * cardsPerView + cardsPerView
                            )
                                .map((t, i) => (
                                    <div key={i} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer">
                                        <div onClick={() => setSelectedTemplate(t)}>
                                           <TemplateCard
                                            img={t.thumbnailUrl}
                                            title={t.title}
                                            description={t.description}
                                        />
                                           </div>
                                        
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones */}
            <button
                onClick={prev}
                className="
                    absolute top-1/2 left-2 -translate-y-1/2
                    flex items-center justify-center
                    w-10 h-10
                    bg-white/80 dark:bg-surface-dark/80
                    text-text-primary-light
                    rounded-full
                    shadow-md
                    hover:bg-white dark:hover:bg-surface-dark
                    hover:scale-110
                    active:scale-95
                    transition-all duration-200
                    focus:outline-none
                    z-10
  "
            >
                ◀
            </button>
            <button
                onClick={next}
                className="
                        absolute top-1/2 right-0 -translate-y-1/2
                        flex items-center justify-center
                        w-10 h-10
                        bg-white/80 dark:bg-surface-dark/80
                        text-text-primary-light
                        rounded-full
                        shadow-md
                        hover:bg-white dark:hover:bg-surface-dark
                        hover:scale-110
                        active:scale-95
                        transition-all duration-200
                        focus:outline-none
                        z-10
  "
            >  ▶

            </button>
             {/* Preview tipo Canva */}
      {selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onUseTemplate={() => {
            console.log("Usando plantilla:", selectedTemplate.title);
            setSelectedTemplate(null);
          }}
        />
        
      )}
        </div>

    );
}
