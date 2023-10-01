import Link from "next/link";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { tagsMap } from "@/utils/postArray";
import url from "@/utils/url";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Tag = (props: { name: string }) => {
  return (
    <Link href={url(`/?key=${props.name}`)}>
      <Chip
        label={`${props.name} (${tagsMap[props.name]})`}
        color={"warning"}
        variant="outlined"
        size="small"
        sx={{
          mx: 0.3,
          textTransform: "none",
        }}
      />
    </Link>
  );
};

export default Tag;
