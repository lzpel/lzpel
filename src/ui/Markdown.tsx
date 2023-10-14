import * as fs from "fs";
import * as path from "path";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import url from "@/utils/url";

const Markdown = (props: { path: string }) => {
  const markdownPath = path.join(process.cwd(), props.path);
  const markdown = fs.readFileSync(markdownPath, "utf-8");
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkMath]}
      components={{
        img: (props) => {
          if (props.src && props.src.startsWith("/")) {
            const new_props = { ...props, src: url(props.src) };
            return <img {...new_props} />;
          }
          return <img {...props} />;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
export default Markdown;
