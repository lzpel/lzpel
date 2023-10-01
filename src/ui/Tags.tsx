import Tag from "@/ui/Tag";

const Tags = (props: { tags: string[] }) => {
  return props.tags.sort().map((value) => <Tag name={value} key={value} />);
};
export default Tags;
