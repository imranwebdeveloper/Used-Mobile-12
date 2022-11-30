import { Box, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import DrawerAppBar from "./DrawerAppBar";
import DrawerBox from "./DrawerBox";

const drawerWidth = 240;

const DashboardWrapper = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <DrawerBox
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardWrapper;
