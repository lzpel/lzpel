const DateViewer = (props: { date: string }) => {
  return DateString(props.date);
};
const DateString = (yyyymmdd: string) => {
  return (
    yyyymmdd.slice(0, 4) +
    "/" +
    Number(yyyymmdd.slice(4, 6)) +
    "/" +
    Number(yyyymmdd.slice(6, 8))
  );
};
export default DateViewer;
