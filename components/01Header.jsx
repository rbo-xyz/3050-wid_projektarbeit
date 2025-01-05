// Vorlage von https://mui.com/material-ui/react-app-bar/

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          minHeight: "75px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(208, 208, 208)",
        }}
      >
        <Toolbar>
          <div>
            <img src="logo_header.svg" width="50" />
          </div>
          <Typography
            variant="h4"
            align="center"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              display: { xs: "none", sm: "block" },
            }}
          >
            3050 WID - Projektarbeit
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
