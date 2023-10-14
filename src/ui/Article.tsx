import * as React from "react";
import "./github-markdown.css";
import "./customize-markdown.css";
import Post from "@/type/Post";
import Tags from "@/ui/Tags";
import Markdown from "@/ui/Markdown";

const Article = (props: { post: Post }) => {
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
      <h1>{props.post.name}</h1>
      <Tags tags={props.post.tags} />
      <Markdown path={props.post.path}></Markdown>
    </article>
  );
};
export default Article;
