import * as React from "react";
import { Inter } from "next/font/google";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Layout from "@/layout/Layout";
import url from "@/utils/url";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { tagsMap } from "@/utils/postArray";
import Tags from "@/ui/Tags";
import CustomMetadata from "@/utils/CustomMetadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = CustomMetadata();

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
        src={url("/profile.jpg")}
        alt="lzpel"
      />
      <List>
        <ListItem disablePadding>
          <ListItemButton href={url("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href={"https://github.com/lzpel"}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={"@lzpel"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href={"https://twitter.com/lzpel"}>
            <ListItemIcon>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary={"@lzpel"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Tags tags={Object.keys(tagsMap)} />
    </>
  );
};
