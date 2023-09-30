import Button from "@mui/material/Button";
import DateViewer from "@/ui/DateViewer";
import url from "@/utils/url";
import Post from "@/type/Post";
import Tags from "@/ui/Tags";
import { Typography, Stack } from "@mui/material";

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
  return (
    <Button
      component={"a"}
      href={url("/post/" + props.post.date)}
      fullWidth={true}
      sx={{
        justifyContent: "left",
      }}
    >
      <Stack>
        <Typography variant="subtitle2">{props.post.name}</Typography>
        <Stack direction="row">
          <DateViewer date={props.post.date} />
          <Tags tags={props.post.tags} />
        </Stack>
      </Stack>
    </Button>
  );
};
export default Enum;
