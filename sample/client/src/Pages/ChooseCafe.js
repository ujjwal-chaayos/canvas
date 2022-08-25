import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {Box, Select, OutlinedInput, InputLabel, MenuItem, FormControl, Chip, Typography} from "@mui/material";
import "./Home.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
  "Oliver Hanse",
  "Van Henr",
  "April Tuckr",
  "Ralph Hubbrd",
  "Omar Alexnder",
  "Carlos Abbtt",
  "MiriaWagner",
  "Bradley Wilkrson",
  "Virginia Anrews",
  "Kelly Snyer",
  "Over Hansen",
  "n Henry",
  "Ail Tucker",
  "lph Hubbard",
  "Omar Alander",
  "rlos Abbott",
  "Mim Wagner",
  "Bradley Werson",
  "Virginia Aews",
  "Kly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ChooseCafe = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Box
        position="fixed"
        top={0}
        left={0}
        height="100%"
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "primary.light",
        }}
      >
        
        <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            align="center"
            sx={{ color: "#303030", p: 3 }}
          >
            SELECT CAFES
          </Typography>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Box
        position="fixed"
        top=
        height="50%"
        width="50%"
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "primary.dark",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >

      </Box> */}
      </Box>
    </div>
  );
};

export default ChooseCafe;