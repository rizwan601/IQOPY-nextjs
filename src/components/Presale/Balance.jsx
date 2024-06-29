import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { readContract } from "@wagmi/core";
import { presaleContract } from "../../constants/environment";
import { formatEther } from "viem";
import { useAccount, useConfig } from "wagmi";
let soldTokens = 90;
let totalTokens = 90;
let amountRaisedMATIC = 90;
const Balance = ({ mode }) => {
  const config = useConfig();
  const { address } = useAccount();
  const [userBalance, setUserBalance] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const estPrice = formatEther(tokenPrice ?? 0);
  console.log("estPrice", estPrice);
  const estimatedPrice = estPrice > 0 ? 1 / estPrice : "0";

  const soldPercentage = (soldTokens / totalTokens) * 100;

  const totalFormatedBalance = formatEther(userBalance);
  const totalBalanceNum = Number(totalFormatedBalance).toFixed(2);
  console.log("amountRaisedMATIC", amountRaisedMATIC);

  const init = async () => {
    try {
      const [_tokenPrice, _userBalance] = await Promise.all([
        readContract(config, {
          ...presaleContract,
          functionName: "tokenPrice",
        }),
        address
          ? readContract(config, {
              ...presaleContract,
              functionName: "userBalance",
              args: [address],
            })
          : Promise.resolve(0), // Return 0 if address is not valid
      ]);

      setTokenPrice(_tokenPrice);
      setUserBalance(_userBalance);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(tokenPrice, userBalance, "mehboob");
  console.log(estimatedPrice, "estimatedPrice");
  useEffect(() => {
    init();
  }, [address]);
  return (
    <Box
      sx={{
        mx: "auto",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          mb: 3,
          backgroundColor: mode ? "#ffffff" : "#112D4E",
          padding: "10px",
          borderRadius: "10px",
          border: mode
            ? "0.4px solid #081524"
            : "0.4px solid rgba(140, 140, 140, 0.40)",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Typography sx={{ color: mode ? "#000000" : "#ffffff" }} variant="h6">
          Your Freezed Balance
        </Typography>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: { xs: "20", md: "25px" },
            color: "#b99a45",
          }}
        >
          {totalBalanceNum} iQOPY
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 3,
          backgroundColor: mode ? "#ffffff" : "#112D4E", // Adjust the last value (0.7) to change transparency
          padding: "10px",
          borderRadius: "10px",
          border: mode
            ? "0.4px solid #081524"
            : "0.4px solid rgba(140, 140, 140, 0.40)",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Typography sx={{ color: mode ? "#000000" : "#ffffff" }} variant="h6">
          Estimated Selling Price at Launch
        </Typography>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: { xs: "20", md: "25px" },
            color: "#b99a45",
          }}
        >
          {estimatedPrice} BUSD
        </Typography>
      </Box>
      {/* <Box sx={{ width: "100%", mt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" color="#B97D05">
            Private Sale Progress
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="h5" color="#ffffff" fontWeight="500">
            0
          </Typography>
          <Typography
            variant="h5"
            color="#ffffff"
            fontWeight="500"
          >{`${totalTokens} XPP`}</Typography>
        </Box>
        <LinearProgress
          height="30px"
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#B97D05",
              borderRadius: 5,
            },
            background: "#8E939C",
            height: 9,
            borderRadius: 5,
            my: 1,
          }}
          variant="determinate"
          value={soldPercentage}
        />
        <Typography
          textAlign="center"
          variant="h5"
          color="#ffffff"
          fontWeight="500"
        >{`${soldTokens} IQOPY Sold`}</Typography>
      </Box> */}
    </Box>
  );
};

export default Balance;
