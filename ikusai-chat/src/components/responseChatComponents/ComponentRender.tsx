//import ChartRenderer from "./ChartRender";
import ChartRenderer from "./ChartRenderHig";
import TableRenderer from "./TableRenderer";
import ParagraphRenderer from "./ParagraphRenderer";
import ImageRenderer from "./ImageRender";


interface Props {
  data: {
    type: string;
    columns?: string[];
    rows?: any[][];
    details?: string;
    answer?: string;
    mapping?: { x_key: string | string[]; y_key: string | string[] };
  };
 setHasImages?: (flag: boolean) => void;
    preview?: string | null;
  setPreview?: (src: string | null) => void;

}


export default function MessageContent({ data,setHasImages}: Props) {
   if (!data) return null;
  switch (data.type?.toLowerCase()) {
    case "bar":
    case "line":
    case "pie":
    case "doughnut":
    case "radar":
      return <ChartRenderer data={data} />;
    case "table":
      return <TableRenderer data={data} />;
    case "text_with_image":
      return <ImageRenderer data={data} setHasImages={setHasImages} 
    />;
    case "paragraph":
      return <ParagraphRenderer data={data} />;
    default:
      return <ParagraphRenderer data={data} />;
  }
}







