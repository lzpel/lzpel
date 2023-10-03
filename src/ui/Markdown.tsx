import * as fs from "fs";
import * as path from "path";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const Markdown = (props: { path: string }) => {
  const markdownPath = path.join(process.cwd(), props.path);
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkMath]}
    >
      {markdown}
    </ReactMarkdown>
  );
};
export default Markdown;
