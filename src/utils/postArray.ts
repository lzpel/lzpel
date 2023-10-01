import Post from "@/type/Post";
import publicArticle from "@/publicArticle.json";
const path: string[] = publicArticle.reverse();
const postArray: Post[] = path.map((v) => {
  const filename = v.split("/")[1].split(".")[0];
  const args = filename.split("-");
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
export const tagsMap = postArray.reduce(
  (prev, current) => {
    current.tags.map((v) => {
      prev[v] = (prev[v] ?? 0) + 1;
    });
    return prev;
  },
  {} as { [p: string]: number },
);
export default postArray;
