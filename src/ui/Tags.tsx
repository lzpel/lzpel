import Tag from "@/ui/Tag";

const Tags = (props: { tags: string[] }) => {
  return props.tags
    .sort()
    .map((value) => <Tag name={value} delete={false} key={value} />);
};
export default Tags;
