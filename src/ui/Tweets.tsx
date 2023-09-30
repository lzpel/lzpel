"use client";
import * as React from "react";

const Tweets = (props: {}) => {
  const scriptId = "tweet";
  React.useEffect(() => {
    if (document.getElementById(scriptId)) return;
    const s = document.createElement("script");
    s.setAttribute("id", scriptId);
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.body.appendChild(s);
    console.log("a");
  }, []);
  return (
    <a
      className="twitter-timeline"
      href="https://twitter.com/lzpel?ref_src=twsrc%5Etfw"
    >
      Tweets by lzpel
    </a>
  );
};
export default Tweets;
