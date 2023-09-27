import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DateViewer from "@/ui/DateViewer";
import url from "@/utils/url";
import Post from "@/type/Post";

const Enum = (props: { item: Post[] }) => {
  return (
    <>
      {props.item.map((v) => {
        return <EnumItem post={v} key={v.date} />;
      })}
    </>
  );
};
const EnumItem = (props: { post: Post }) => {
  const tags = props.post.tags.map((value) => {
    return <Chip label={value} variant="outlined" key={value} />;
  });
  return (
    <Button component={"a"} href={url("/post/" + props.post.date)}>
      {props.post.name}
      <DateViewer date={props.post.date} />
      {tags}
    </Button>
  );
};
export default Enum;
