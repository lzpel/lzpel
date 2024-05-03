import { tagsMap } from "@/utils/postArray";
import { Tag as TagEscape } from "antd";

const Tag = (props: { name: string }) => {
  return (
    <a href={`/?key=${props.name}`}>
      <TagEscape color="magenta">{`${props.name} (${tagsMap[props.name]})`}</TagEscape>
    </a>
  );
};

export default Tag;
