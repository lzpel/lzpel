import getConfig from "next/config";
import Post from "@/type/Post";
const path: string[] = getConfig().publicRuntimeConfig.note;
const postArray: Post[] = path.map((v) => {
  const filename = v.split("/")[2].split(".")[0];
  const args = filename.split("@", 3);
  return {
    path: v,
    name: args[1],
    date: args[0],
    tags: args[2].split(","),
  } as Post;
});
export const postMap: { [p: string]: Post } = Object.fromEntries<Post>(
  postArray.map((v) => [v.date, v]),
);
export default postArray;
