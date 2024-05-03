import Tag from "@/ui/Tag";
import { Flex } from "antd";

const Tags = (props: { tags: string[] }) => {
  return (
    <Flex gap="4px 0" wrap>
      {props.tags.sort().map((value) => (
        <Tag name={value} key={value} />
      ))}
    </Flex>
  );
};
export default Tags;
