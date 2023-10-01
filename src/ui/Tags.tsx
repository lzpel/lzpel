import Chip from "@mui/material/Chip";
import { tagsMap } from "@/utils/postArray";
import Link from "next/link";

const Tags = (props: { tags: string[] }) => {
  return props.tags.sort().map((value) => {
    return (
      <Link href="/about" key={value}>
        <Chip
          label={`${value} (${tagsMap[value]})`}
          color={"warning"}
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
          }}
        />
      </Link>
    );
  });
};
export default Tags;
