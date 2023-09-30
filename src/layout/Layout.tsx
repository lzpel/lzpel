import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Layout = (props: { main: React.ReactNode; navi: React.ReactNode }) => {
  const width = "300px";
  return (
    <Container
      sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
    >
      <Box
        component={"nav"}
        sx={{
          display: { xs: "none", sm: "block" },
          width: width,
          minWidth: width,
        }}
      >
        {props.navi}
      </Box>
      <Box
        component={"main"}
        sx={{
          display: { xs: "block" },
          flexGrow: 1,
          minWidth: 0, //Prevent flex items from overflowing a container https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container
        }}
      >
        {props.main}
      </Box>
    </Container>
  );
};
export default Layout;
