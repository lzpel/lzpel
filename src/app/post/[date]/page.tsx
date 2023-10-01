import postArray, { postMap } from "@/utils/postArray";
import * as React from "react";
import url from "@/utils/url";
import Markdown from "@/ui/Markdown";
import { Metadata } from "next";
/*
Markdownを副作用として読み込むため"use client"をつけたいが、
静的サイトとして出力されるためにはurlとパスは対応させる必要があり
urlとパスを対応させる（可能性があるページを全て出力する）ためにgenerateStaticParamsが必要で
generateStaticParamsと"use client"は共存できない

そこでサーバーサイトでレンダリングされるPostと、その内部でクライアント側でレンダリングされるMarkdownに分割して解決した
 */
type Props = { params: { date: string } };
const Post = (props: Props) => {
  const data = postMap[props.params.date];
  return <Markdown url={url(`/${data.path}`)} name={data.name} />;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  // read route params
  return {
    title: postMap[props.params.date].name,
  };
}
export async function generateStaticParams() {
  return postArray.map((post) => ({
    date: post.date,
  }));
}
export default Post;
