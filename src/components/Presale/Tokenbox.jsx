import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import bnb from "./assets/bnb.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Tokenbox = ({
  text,
  slect,
  setslect,
  amount,
  setAmount,
  wbamount,
  mode,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let matches = useMediaQuery("(max-width:760px)");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const inputStyle = {
    width: "100px",
    borderColor: "transparent",
    fontFamily: "'Nunito'",
    fontStyle: "normal",
    fontWeight: 400,
    background: "transparent",
    color: mode ? "#000000" : "white",
    fontSize: "15px",
  };

  // Function to get the image source based on the selected token
  const getTokenImage = (token) => {
    switch (token) {
      case "BNB":
        return "./BNB.svg";
      case "BUSD":
        return "./usdt.svg";
      default:
        return "./logo1.png"; // Default image
    }
  };

  return (
    <div>
      <Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "rgba(140, 140, 140, 0.40)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setslect("BNB");
            }}
            sx={{
              background: "transparent",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box px="10px">
                <img src="./BNB.svg" width="15px" height="25px" alt="eth" />
              </Box>
              <Box
                px="10px"
                sx={{
                  fontFamily: "'Nunito'",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: { xs: "15px", sm: "18px" },
                  color: mode ? "#000000" : "white",
                }}
              >
                BNB
              </Box>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setslect("BUSD");
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box px="10px">
                <img src="./usdt.svg" width="25px" height="25px" alt="usdt" />
              </Box>
              <Box
                px="10px"
                sx={{
                  fontFamily: "'Nunito'",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: { xs: "15px", sm: "18px" },
                  color: mode ? "#000000" : "white",
                }}
              >
                BUSD
              </Box>
            </Box>
          </MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          background: mode ? "#ffffff" : "#112D4E90",
          boxShadow: mode
            ? "0px 4px 4px #112D4E"
            : "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "30px",
          p: { xs: "15px", sm: "20px" },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Box>
              <Typography
                sx={{
                  color: mode ? "#000000" : "white",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "17px",
                }}
              >
                {text}
              </Typography>
            </Box>
            <Box mt={2}>
              <input
                style={inputStyle}
                value={text === "From" ? amount : wbamount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              onClick={text === "From" ? handleClick : null}
              sx={{ borderRadius: "5px" }}
            >
              <Box
                sx={{
                  background:
                    "#112D4E",
                  borderRadius: "10px",
                  p: "10px",
                  display: "flex",
                  alignItems: "center",
                 border: "0.4px solid rgba(140, 140, 140, 0.40)"
                }}
              >
                <Box px={{ md: "10px", xs: "3px" }}>
                  <img
                    src={text === "From" ? getTokenImage(slect) : "./logo1.png"}
                    alt={text === "From" ? slect : "IQOPY"}
                    width={matches ? 15 : 25}
                  />
                </Box>
                <Box
                  px={{ md: "10px", xs: "3px" }}
                  sx={{
                    fontFamily: "'Nunito'",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: { xs: "15px", sm: "18px" },
                    color: "white",
                  }}
                >
                  {text === "From" ? slect : "IQOPY"}
                </Box>
                <Box px={{ md: "10px", xs: "3px" }}>
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: { xs: "20px", sm: "30px" },
                      color: mode ? "#000000" : "white",
                    }}
                  />
                </Box>
              </Box>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Tokenbox;
