"use client";
import * as React from "react";
import fetchUrl from "@/utils/fetchUrl";
import ReactMarkdown from "react-markdown";
import classes from "./markdown.module.css";

const Markdown = (props: { url: string }) => {
  const [markdown, setMarkdown] = React.useState<string>();
  React.useEffect(() => {
    fetchUrl(props.url).then(async (v) => {
      const text = await v.text();
      setMarkdown(text);
    });
  }, [props.url]);
  return (
    <article className={classes.Markdown}>
      <ReactMarkdown className={""}>{markdown || "loading"}</ReactMarkdown>
    </article>
  );
};
export default Markdown;