import { styled } from "@mui/material/styles";
import { Box, FormControl, Select, TextField, Typography } from "@mui/material";

export const SwapContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3.5),
  width: 450,
  margin: "auto",
  padding: theme.spacing(4),
  borderRadius: 16,
  backgroundColor: "#1E1E2D",
  color: "white",
  paddingBottom: theme.spacing(8),
}));

export const Title = styled(Typography)(() => ({
  color: "#fff",
  textAlign: "center",
  fontSize: 24,
  fontWeight: "bold",
}));

export const StyledFormControl = styled(FormControl)({
  width: "100%",
  display: "flex",
});

export const StyledSelect = styled(Select)(() => ({
  backgroundColor: "#2B2B3C",
  color: "white",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3F3F4D",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#4A4A5C",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6F6F8C",
  },
  ".MuiSvgIcon-root ": {
    fill: "white",
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2B2B3C",
    color: "white",
    "& fieldset": {
      borderColor: "#3F3F4D",
    },
    "&:hover fieldset": {
      borderColor: "#4A4A5C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F6F8C",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#8A8A9C",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#ADADC2",
  },
}));

export const SwapResult = styled(Box)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  color: "#7C3AED",
  fontSize: 16,
  wordBreak: "break-all",
  position: "absolute",
  bottom: theme.spacing(2),
}));

export const FormHelperText = styled(Box)({
  color: "#ef4444",
  fontSize: 14,
  marginTop: 4,
});

export const SwapIconWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "-12px 0",
  zIndex: 1,
});

export const StyledBoxContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
}));
