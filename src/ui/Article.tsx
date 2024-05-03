import * as React from "react";
import "./github-markdown.css";
import "./customize-markdown.css";
import Post from "@/type/Post";
import Tags from "@/ui/Tags";
import Markdown from "@/ui/Markdown";
import { TwitterOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import url from "@/utils/url";

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
      <h1>
        {props.post.name}
        <FloatButton
          shape="circle"
          style={{ right: 94 }}
          icon={<TwitterOutlined />}
          href={`https://twitter.com/intent/tweet?url=${url(
            props.post,
            true,
          )}&text=${props.post.name + " @lzpel"}`}
        />
      </h1>
      <Tags tags={props.post.tags} />
      <Markdown path={props.post.path}></Markdown>
    </article>
  );
};
export default Article;
