import * as React from "react";
import Layout from "@/layout/Layout";
import url from "@/utils/url";
import { tagsMap } from "@/utils/postArray";
import Tags from "@/ui/Tags";
import CustomMetadata from "@/utils/CustomMetadata";
import { GithubOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";

export const metadata = CustomMetadata();

export default function RootLayout(props: { children: React.ReactNode }) {
  //スクロールバーの幅に依存しないスタイル指定 https://qiita.com/nanocloudx/items/0efba5d35fe5a4cc7230
  // 理屈は把握していないが100%だと読み込み後にスクロールバー分ずれる
  return (
    <html lang="ja">
      <body>
        <Layout main={props.children} navi={<Navi />} />
      </body>
    </html>
  );
}
const Navi = () => {
  return (
    <>
      <Image
        src={url("/profile.jpg")}
        alt="lzpel"
        style={{
          borderRadius: "50%",
        }}
      />
      <Button type="text" icon={<HomeOutlined />} href={url("/")} block>
        Home
      </Button>
      <Button
        type="text"
        icon={<GithubOutlined />}
        href="https://github.com/lzpel"
        block
      >
        GitHub
      </Button>
      <Tags tags={Object.keys(tagsMap)} />
    </>
  );
};
