import { Col, Row } from "antd";
import * as React from "react";
const ret = (props: { main: React.ReactNode; navi: React.ReactNode }) => {
  return (
    <Row>
      <Col span={6}>{props.navi}</Col>
      <Col span={18}>{props.main}</Col>
    </Row>
  );
};
export default ret;
