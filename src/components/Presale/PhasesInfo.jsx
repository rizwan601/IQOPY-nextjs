import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Stack } from "@mui/material";
import { readContract } from "@wagmi/core";
import { presaleContract } from "../../constants/environment";
import { formatEther } from "viem";
import { useAccount, useConfig } from "wagmi";

const PhasesInfo = () => {
  const config = useConfig();
  const { address } = useAccount();
  const [activePhase, setActivePhase] = useState(0);
  const [phaseDetails, setPhaseDetails] = useState(0);
  const totalTokens = formatEther(phaseDetails[1] ?? 0);
  const soldTokens = formatEther(phaseDetails[2] ?? 0);
  const soldPercentage = (soldTokens / totalTokens) * 100;
  const [phaseOneDetails, setPhaseOneDetails] = useState(0);
  const phaseOneEstPrice = formatEther(phaseOneDetails[0] ?? 0);
  const CalcPhaseOneEstPrice =
    phaseOneEstPrice > 0 ? (1 / phaseOneEstPrice).toFixed(2) : "0";
  const [phaseTwoDetails, setPhaseTwoDetails] = useState(0);
  const phaseTwoEstPrice = formatEther(phaseTwoDetails[0] ?? 0);
  const CalcPhaseTwoEstPrice =
    phaseTwoEstPrice > 0 ? (1 / phaseTwoEstPrice).toFixed(2) : "0";
  const totalTokensPhaseOne = formatEther(phaseOneDetails[1] ?? 0);
  const totalTokensPhaseTwo = formatEther(phaseTwoDetails[1] ?? 0);

  console.log("CalcPhaseOneEstPrice", CalcPhaseOneEstPrice);
  console.log("CalcPhaseTwoEstPrice", CalcPhaseTwoEstPrice);

  console.log("totalTokensPhaseOne", totalTokensPhaseOne);
  console.log("totalTokensPhaseTwo", totalTokensPhaseTwo);

  const init = async () => {
    try {
      const [phase, phaseDetail, phaseOneDetail, phaseTwoDetail] =
        await Promise.all([
          readContract(config, {
            ...presaleContract,
            functionName: "getActivePhase",
          }),
          readContract(config, {
            ...presaleContract,
            functionName: "getPhaseDetails",
            args: [activePhase],
          }),
          readContract(config, {
            ...presaleContract,
            functionName: "getPhaseDetails",
            args: [0],
          }),
          readContract(config, {
            ...presaleContract,
            functionName: "getPhaseDetails",
            args: [1],
          }),
        ]);

      setActivePhase(phase);
      setPhaseDetails(phaseDetail);
      setPhaseOneDetails(phaseOneDetail);
      setPhaseTwoDetails(phaseTwoDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, [config, address, activePhase]);

  console.log("phaseOneDetails", phaseOneDetails);

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
          backgroundColor:
            activePhase === 0 ? "rgba(37, 45, 48, 0.9)" : "#ffffff30",
          padding: "10px",
          borderRadius: "10px",
          border: "0.4px solid rgba(140, 140, 140, 0.40)",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              variant: "h3",
              fontWeight: "bold",
              color: "#b99a45",
            }}
          >
            {activePhase === 0 ? "Current phase: " : ""}
            phase 1
          </Typography>
        </Stack>
        <Stack direction="row" gap={4} mt="5px">
          <Typography color="#ffffff" variant="h6">
            Price {CalcPhaseOneEstPrice} MATIC
          </Typography>
          <Typography color="#ffffff" variant="h6">
            Tokens to sale {totalTokensPhaseOne} KAFA
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          mb: 3,
          backgroundColor:
            activePhase === 1 ? "rgba(37, 45, 48, 0.9)" : "#ffffff30",
          padding: "10px",
          borderRadius: "10px",
          border: "0.4px solid rgba(140, 140, 140, 0.40)",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              variant: "h3",
              fontWeight: "bold",
              color: "#b99a45",
            }}
          >
            {activePhase === 1 ? "Current phase: " : ""} phase 2
          </Typography>
        </Stack>
        <Stack direction="row" gap={4} mt="5px">
          <Typography color="#ffffff" variant="h6">
            Price {CalcPhaseTwoEstPrice} MATIC
          </Typography>
          <Typography color="#ffffff" variant="h6">
            Tokens to sale {totalTokensPhaseTwo} KAFA
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ width: "100%", mt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" color="#b99a45">
            Private Sale Progress
          </Typography>
          <Box
            sx={{
              background: "#00AEEF",
              px: "5px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="500" color="#ffffff">
              Phase {activePhase + 1}
            </Typography>
          </Box>
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
          >{`${totalTokens} KAFA`}</Typography>
        </Box>
        <LinearProgress
          height="30px"
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#00AEEF",
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
        >{`${soldTokens} KAFA`}</Typography>
      </Box>
    </Box>
  );
};

export default PhasesInfo;
