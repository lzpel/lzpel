"use client";
import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DateViewer from "@/ui/DateViewer";
import Post from "@/type/Post";
import Tag from "@/ui/Tag";
import Tags from "@/ui/Tags";
import postArray from "@/utils/postArray";
import { Card, Col, Row, Space } from "antd";

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
      <Space direction="vertical" size={16}>
        {items}
      </Space>
    </>
  );
};
const EnumItem = (props: { post: Post }) => {
  return (
    <Card size="small">
      <Row>
        <Col span={24}>
          <Link href={`/${props.post.date}`}>{props.post.name}</Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DateViewer date={props.post.date} />
          <Tags tags={props.post.tags} />
        </Col>
      </Row>
    </Card>
  );
};
export default Enum;
