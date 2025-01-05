// Vorlage von https://mui.com/material-ui/react-select/ und Hausaufgabe 11

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const DropdownComp = ({ label, list, selectedItemFunction }) => {
  //
  // Festlegung der Variabeln
  const noItem = "Keine Auswahl";

  //
  // Return-Statement
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 250, textAlign: "left" }}>
        <InputLabel>{label}</InputLabel>
        <Select onChange={selectedItemFunction} label={label}>
          <MenuItem>
            <em>{noItem}</em>
          </MenuItem>
          {list.map((element) => {
            const key = Object.keys(element)[0];
            const value = element[key];
            return (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
