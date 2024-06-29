import { LoadingButton } from "@mui/lab";
import React from "react";

const CommonButton = (props) => {
  const {
    children,
    loading,
    backgroundColor,
    color,
    LeftIcon,
    RightIcon,
    disabled,
  } = props;
  return (
    <>
      <LoadingButton
        loadingPosition="end"
        type="submit"
        loading={loading}
        disabled={loading || disabled}
        sx={{
          fontSize: {
            md: "14px",
            xs: "10px",
          },
          fontWeight: "bold",
          padding: "5px 30px",

          backgroundColor: backgroundColor || "#b5a36c",
          color: color || "#fff",

          "&:hover": {
            backgroundColor: backgroundColor || "#b5a36c",
            color: color || "#fff",
          },
          "&:disabled": {
            backgroundColor: backgroundColor || "#b5a36c",
            color: color ? color + "80" : "#fff80", // Dim the color (reduce opacity)
            cursor: "not-allowed", // Change cursor when disabled
          },
        }}
        {...props}
      >
        {LeftIcon ?? false}
        {loading ? "Processing" : children}
        {RightIcon ?? false}
      </LoadingButton>
    </>
  );
};
export default CommonButton;
