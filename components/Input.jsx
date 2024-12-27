// Kopiert von https://mui.com/material-ui/react-text-field/, angepasst auf dei hier Vorliegenden Bedürfnisse

import TextField from "@mui/material/TextField";

export const Input = ({
  inputLable,
  schreibrecht,
  inputFunction,
  inputValue,
}) => {
  return (
    <div>
      <TextField
        sx={{ m: 1, minWidth: 250 }}
        variant="outlined"
        label={inputLable}
        // slotProps={{ input: { readOnly: schreibrecht } }}
        onChange={inputFunction}
        value={inputValue}
        disabled={schreibrecht}
      />
    </div>
  );
};
