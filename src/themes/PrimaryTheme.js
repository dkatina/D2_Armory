import { createTheme } from "@mui/material/styles";

export const primaryTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#DB3A34',
    },
    secondary: {
      main: '#4BBEA7',
    },
    background: {
      default: '#FBF9FF',
      paper: '#FBF9FF',
    },
    error: {
      main: '#086788',
    },
  },
};

const theme=createTheme(primaryTheme);
export default theme