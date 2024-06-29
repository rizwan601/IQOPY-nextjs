import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function Timer({ days, hours, minutes, seconds, mode }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {/* cashbull timer  box 1*/}

      <Stack justifyContent="center" alignItems="center">
        <Box elevation={3}>
          <Typography
            variant="body2"
            sx={{
              color: mode ? "#00AEEF" : "#ffffff",
            }}
          >
            {days < 10 ? `0${days}` : days}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: mode ? "#00AEEF" : "#ffffff",
          }}
          textAlign="center"
          color="#ffffff"
        >
          dd
        </Typography>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Box elevation={3}>
          <Typography
            variant="body2"
            sx={{
              color: mode ? "#00AEEF" : "#ffffff",
            }}
          >
            {hours < 10 ? `0${hours}` : hours}{" "}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: mode ? "#00AEEF" : "#ffffff",
          }}
        >
          hr
        </Typography>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Box elevation={3}>
          <Typography
            variant="body2"
            sx={{
              color: mode ? "#00AEEF" : "#ffffff",
            }}
          >
            {minutes < 10 ? `0${minutes}` : minutes}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: mode ? "#00AEEF" : "#ffffff",
          }}
        >
          min
        </Typography>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Box elevation={3}>
          <Typography
            variant="body2"
            sx={{
              color: mode ? "#00AEEF" : "#ffffff",
            }}
          >
            {seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            color: mode ? "#00AEEF" : "#ffffff",
          }}
        >
          sec
        </Typography>
      </Stack>
    </Box>
  );
}

export default Timer;
