import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
  },

  palette: {
    primary: {
      light: "#E4D6A7",
      main: "#E9B44C",
      dark: "#1C110A",
      contrastText: "#fff",
    },
  },
});

export default theme;
