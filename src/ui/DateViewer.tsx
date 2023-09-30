import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
const DateViewer = (props: { date: string }) => {
  return (
    <Tooltip title={props.date}>
      <Typography typography={"body2"} color={"text.secondary"}>
        {DateString(props.date)}
      </Typography>
    </Tooltip>
  );
};
const DateString = (yyyymmdd: string) => {
  return (
    yyyymmdd.slice(0, 4) +
    "年" +
    Number(yyyymmdd.slice(4, 6)) +
    "月" +
    Number(yyyymmdd.slice(6, 8)) +
    "日"
  );
};
export default DateViewer;
