import ChartRenderer from "./ChartRender";
import TableRenderer from "./TableRenderer";
import ParagraphRenderer from "./ParagraphRenderer";


interface Props {
  data: {
    type: string;
    columns?: string[];
    rows?: any[][];
    details?: string;
    answer?: string;
    mapping?: { x_key: string; y_key: string };
  };
}


export default function MessageContent({ data }: Props) {
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
    case "paragraph":
      return <ParagraphRenderer data={data} />;
    default:
      return <ParagraphRenderer data={data} />;
  }
}







