import getConfig from "next/config";
export type postType = [string, string, string[]];
const rawpPst: string[] = getConfig().publicRuntimeConfig.noteList;
const post: postType[] = rawpPst.map((v) => {
  const filename = v.split(".", 1);
  const args = filename[0].split("@", 3);
  const tags = args[2].split(",");
  return [args[0], args[1], tags] as postType;
});
export default post;
