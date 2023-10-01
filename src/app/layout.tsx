import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Layout from "@/layout/Layout";
import url from "@/utils/url";
import Avatar from "@mui/material/Avatar";
import Tweets from "@/ui/Tweets";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import { tagsMap } from "@/utils/postArray";
import Tags from "@/ui/Tags";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  //スクロールバーの幅に依存しないスタイル指定 https://qiita.com/nanocloudx/items/0efba5d35fe5a4cc7230
  // 理屈は把握していないが100%だと読み込み後にスクロールバー分ずれる
  return (
    <html lang="jp">
      <body className={inter.className} style={{ width: "100vw" }}>
        <Layout main={props.children} navi={<Navi />} />
      </body>
    </html>
  );
}
const Navi = () => {
  return (
    <>
      <Avatar
        component={"a"}
        href={url("/")}
        sx={{ width: "100%", height: "auto" }}
        src="https://avatars.githubusercontent.com/u/18492524"
        alt="lzpel"
      />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={"Github"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Tags tags={Object.keys(tagsMap)} />
      <Tweets />
    </>
  );
};
