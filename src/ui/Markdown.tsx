"use client";
import * as React from "react";
import fetchUrl from "@/utils/fetchUrl";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Markdown = (props: { url: string; name?: string }) => {
  const [markdown, setMarkdown] = React.useState<string>();
  React.useEffect(() => {
    fetchUrl(props.url).then(async (v) => {
      const text = await v.text();
      setMarkdown(text);
    });
  }, [props.url]);
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {markdown || "loading"}
    </ReactMarkdown>
  );
};
export default Markdown;
