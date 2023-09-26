"use client";
import * as React from "react";
import { CSSProperties } from "react";

const Canvas = (props: {
  render: (canvas: HTMLCanvasElement, over: HTMLDivElement) => void;
}) => {
  const canvasElement = React.useRef<HTMLCanvasElement>(null);
  const overElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (canvasElement.current && overElement.current) {
      props.render(canvasElement.current, overElement.current);
    }
  }, [props]);
  const full_style: CSSProperties = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    zIndex: -1,
  };
  return (
    <div style={full_style} ref={overElement}>
      <canvas style={full_style} ref={canvasElement}></canvas>
    </div>
  );
};
export default Canvas;
