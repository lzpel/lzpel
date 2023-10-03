"use client";
import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import DateViewer from "@/ui/DateViewer";
import Post from "@/type/Post";
import Tag from "@/ui/Tag";
import Tags from "@/ui/Tags";
import postArray from "@/utils/postArray";
import { Typography, Stack } from "@mui/material";

const Enum = () => {
  const key = useSearchParams().get("key");
  const filter = key ? (
    <>
      Filter by
      <Tag name={key} />
    </>
  ) : (
    <>All posts</>
  );
  const items = postArray
    .filter((v) => !key || v.tags.includes(key))
    .map((v) => {
      return <EnumItem post={v} key={v.date} />;
    });
  return (
    <>
      {filter}
      {items}
    </>
  );
};
const EnumItem = (props: { post: Post }) => {
  return (
    <Button
      fullWidth={true}
      sx={{
        justifyContent: "left",
        textTransform: "none",
      }}
    >
      <Stack>
        <Link href={`/${props.post.date}`}>
          <Typography variant="subtitle2" textAlign={"left"}>
            {props.post.name}
          </Typography>
        </Link>
        <Stack direction="row">
          <DateViewer date={props.post.date} />
          <Tags tags={props.post.tags} />
        </Stack>
      </Stack>
    </Button>
  );
};
export default Enum;
