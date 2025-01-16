// Vorlage von https://mui.com/material-ui/react-app-bar/

import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const ToTheTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fab
      color="rgb(150, 150, 150)"
      size="medium"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 25,
        right: 20,
        zIndex: 1000,
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};
