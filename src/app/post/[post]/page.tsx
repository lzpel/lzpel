import post from "@/utils/post";
import * as React from "react";
import url from "@/utils/url";
import Markdown from "@/app/post/[post]/Markdown";
/*
Markdownを副作用として読み込むため"use client"をつけたいが、
静的サイトとして出力されるためにはurlとパスは対応させる必要があり
urlとパスを対応させる（可能性があるページを全て出力する）ためにgenerateStaticParamsが必要で
generateStaticParamsと"use client"は共存できない

そこでサーバーサイトでレンダリングされるPostと、その内部でクライアント側でレンダリングされるMarkdownに分割して解決した
 */
const Post = (props: { params: { post: string } }) => {
  return (
    <Markdown url={url("/note/20230925@最初の記事のテスト@blog,tech.md")} />
  );
};
export async function generateStaticParams() {
  return post.map((post) => ({
    post: post[0],
  }));
}
export default Post;
