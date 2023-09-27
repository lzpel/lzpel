import postArray, { postMap } from "@/utils/PostArray";
import * as React from "react";
import url from "@/utils/url";
import Markdown from "@/app/post/[date]/Markdown";
/*
Markdownを副作用として読み込むため"use client"をつけたいが、
静的サイトとして出力されるためにはurlとパスは対応させる必要があり
urlとパスを対応させる（可能性があるページを全て出力する）ためにgenerateStaticParamsが必要で
generateStaticParamsと"use client"は共存できない

そこでサーバーサイトでレンダリングされるPostと、その内部でクライアント側でレンダリングされるMarkdownに分割して解決した
 */
const Post = (props: { params: { date: string } }) => {
  return <Markdown url={url(postMap[props.params.date].path)} />;
};
export async function generateStaticParams() {
  return postArray.map((post) => ({
    date: post.date,
  }));
}
export default Post;
