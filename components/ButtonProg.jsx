// Kopiert von https://mui.com/material-ui/react-button/, angepasst auf dei hier Vorliegenden Bedürfnisse

import { Button } from "@mui/material";

export const ButtonProg = ({ abschaltung, knopfdruck }) => {
  return (
    <div>
      <Button
        variant="contained"
        sx={{ m: 1, minWidth: 518 }}
        disabled={abschaltung}
        onClick={knopfdruck}
      >
        Transformierung
      </Button>
    </div>
  );
};
