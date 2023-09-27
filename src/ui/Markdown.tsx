"use client";
import * as React from "react";
import fetchUrl from "@/utils/fetchUrl";
import ReactMarkdown from "react-markdown";
import "./github-markdown.css";

const Markdown = (props: { url: string; name?: string }) => {
  const [markdown, setMarkdown] = React.useState<string>();
  React.useEffect(() => {
    fetchUrl(props.url).then(async (v) => {
      const text = await v.text();
      setMarkdown(text);
    });
  }, [props.url]);
  return (
    <article
      className={"markdown-body"}
      style={{
        boxSizing: "border-box",
        minWidth: "200px",
        margin: "0 auto",
        padding: "45px",
      }}
    >
      {props.name && <h1>{props.name}</h1>}
      <ReactMarkdown className={""}>{markdown || "loading"}</ReactMarkdown>
    </article>
  );
};
export default Markdown;
