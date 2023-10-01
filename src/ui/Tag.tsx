import Link from "next/link";
import Chip from "@mui/material/Chip";
import { tagsMap } from "@/utils/postArray";

const Tag = (props: { name: string }) => {
  return (
    <Link href={`/?key=${props.name}`}>
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
