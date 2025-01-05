// Vorlage von https://mui.com/material-ui/react-button/

import { Button } from "@mui/material";

export const ButtonComp = ({ knopfdruck, beschriftung }) => {
  const abschaltung = false;

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ m: 1, minWidth: 200 }}
        disabled={abschaltung}
        onClick={knopfdruck}
      >
        {beschriftung}
      </Button>
    </div>
  );
};
