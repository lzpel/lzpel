"use client";
import Canvas from "@/three/canvas";
import render from "@/three/render";

export default function Background() {
  return <Canvas render={render} />;
}
