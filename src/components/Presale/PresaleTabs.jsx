import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PrivateSale from "./PrivateSale";
import Balance from "./Balance";
// import PhasesInfo from "./PhasesInfo";

const PresaleTabs = ({ mode }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabContent = [<PrivateSale mode={mode} />, <Balance mode={mode} />];
  const hoverStyle = {
    "&:hover": {
      bgcolor: "#b5a36c",
    },
  };

  return (
    <>
        <Box sx={{textAlign:"center"}}>
        <Typography
          variant="h1"
          sx={{ color: mode ? "#b99a45" : "#b5a36c", mb: "10px" }}
          fontWeight="600"
        >
          Token Sale Announcement
        </Typography>
        <Typography
          variant="h3"
          sx={{ color: mode ? "#b99a45" : "#ffffff" }}
          fontWeight="400"
        >
          We are excited to announce our token sale! Here's the breakdown:
        </Typography>
        <Typography
          variant="h3"
          sx={{ color: mode ? "#b99a45" : "#ffffff" }}
          fontWeight="400"
        >
          - Total Tokens: 200 million
        </Typography>
        <Typography
          variant="h3"
          sx={{ color: mode ? "#b99a45" : "#ffffff" }}
          fontWeight="400"
        >
          - Initial Price: $0.001 per token
        </Typography>
        <Typography
          variant="h3"
          sx={{ color: mode ? "#b99a45" : "#ffffff" }}
          fontWeight="400"
        >
          - Phases: 9 phases, each with 20 million tokens
        </Typography>
        <Typography
          variant="h3"
          sx={{ color: mode ? "#b99a45" : "#ffffff" }}
          fontWeight="400"
        >
          - Price Increase: 10% after each phase
        </Typography>
        <Typography
          variant="h3"
          sx={{ color: mode ? "#b99a45" : "#ffffff" }}
          fontWeight="400"
        >
          Get in early to buy at the lowest price! Stay tuned for more details
          on how to participate.
        </Typography>
        </Box>
      <Container maxWidth="md" sx={{ paddingY: "40px" }}>
    
        <Box
          sx={{
            flexGrow: 1,
            mx: "auto",
            marginTop: "20px",
            backgroundColor: mode ? "#ffffff" : "#112D4E50", // Adjust the last value (0.7) to change transparency
            borderRadius: "10px",
            border: mode ? "0.4px solid red" : "0.4px solid #28558c",
            boxShadow: mode
              ? "0px 2px 9px 0px rgba(151, 151, 151, 0.19)"
              : "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs example"
            textColor="#ffffff"
            indicatorColor="transparent"
          >
            <Tab
              label={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: mode ? "#b99a45" : "#ffffff" }}
                    fontWeight="600"
                  >
                    Private Sale
                  </Typography>
                </div>
              }
              sx={{
                borderRadius: "5px",
                m: 1,
                bgcolor: value === 0 ? "#ffffff70" : "transparent",
                ...hoverStyle,
              }}
            />
            <Tab
              label={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: mode ? "#b99a45" : "#ffffff" }}
                    fontWeight="600"
                  >
                    Balance
                  </Typography>
                </div>
              }
              sx={{
                borderRadius: "5px",
                m: 1,
                bgcolor: value === 1 ? "#ffffff70" : "transparent",
                ...hoverStyle,
              }}
            />
          </Tabs>
          <Divider
            sx={{
              width: "100%",
              borderBottom: "1.5px solid #737373D4",
            }}
          />
          <Box sx={{ py: 2 }}>
            {tabContent.map((content, index) => (
              <div
                key={index}
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
              >
                {value === index && <div>{content}</div>}
              </div>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PresaleTabs;
