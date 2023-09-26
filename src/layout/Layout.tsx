import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Layout = (props: {
  header: React.Component;
  main: React.Component;
  navi: React.Component;
}) => {
  const width = "200px";
  return (
    <>
      <AppBar component={"header"} position="fixed" sx={{ zIndex: 100 }}>
        <BaseContainer>
          <Toolbar>{props.header}</Toolbar>
        </BaseContainer>
      </AppBar>
      <Toolbar />
      <BaseContainer>
        <Box
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
            }}
          >
            {props.main}
          </Box>
        </Box>
      </BaseContainer>
    </>
  );
};
const BaseContainer = (props: { children: React.Component }) => {
  return <Container>{props.children}</Container>;
};
export default Layout;
