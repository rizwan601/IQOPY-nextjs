"use client"
import { Box, Container, Grid, Typography, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ActiveChain, airdropContract } from "../../constants/environment";
import { useAccount, useConfig, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
import { formatEther } from "viem";

import moment from "moment";
import CommonButton from "../CommonButton";

const Airdrops = ({ mode }) => {
  const color = mode ? "#b99a45" : "#E0F7FA";
  const [loading, setLoading] = useState(false);
  const [airdropDetails, setAirdropDetails] = useState([]);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [notificationProps, setNotificationProps] = useState({});
  const { isConnected, chain, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { open } = useWeb3Modal();
  const [isClaimed, setIsClaimed] = useState(0); // Assuming isClaimed is initially set to 0
  const config = useConfig();

  const init = async () => {
    if (!address) {
      return;
    }
    try {
      const [_airdropDetails, _claimableAmount] = await Promise.all([
        readContract(config, {
          ...airdropContract,
          functionName: "airdrops",
          args: [address],
        }),
        readContract(config, {
          ...airdropContract,
          functionName: "calcAirDrop",
          args: [address],
        }),
      ]);
      setAirdropDetails(_airdropDetails);
      setClaimableAmount(_claimableAmount);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("airdropDetails", airdropDetails);
  console.log("claimableAmount", claimableAmount);
  useEffect(() => {
    init();
  }, [address]);

  const [freezedAmount, claimedAmount, startTime] = airdropDetails;

  const claimHandler = async () => {
    try {
      setLoading(true);
      let claimHash = await writeContract(config, {
        ...airdropContract,
        functionName: "releaseAirdrop",
      });
      await waitForTransactionReceipt({ hash: claimHash });
      console.log("claimHash", claimHash);
      setNotificationProps({
        ...notificationProps,
        modal: true,
        error: false,
        message: "Airdrop request successfully sent.",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: error.message,
      });
      console.log("Error:", error);
    }
  };
  console.log("Number(claimedAmount)", claimedAmount);

  return (
    <Container id="feature" maxWidth="md">
      <Box
        sx={{
          backgroundColor: mode ? "#ffffff" : "#112D4E",
          px: "20px",
          borderRadius: "10px",
          border: "0.4px solid #081524",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
          textAlign: "center",
          py: "40px",
          mt: "70px",
          mb: "50px",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            textAlign="center"
            variant="h5"
            sx={{
              color: mode ? "#000000" : "#fff",
              fontSize: { md: "30px", xs: "15px" },
            }}
          >
            Welcome to our token airdrop!
          </Typography>
          <Typography
            textAlign="center"
            variant="h6"
            sx={{
              color: "#B97D05",
              // mb: "10px",
              fontSize: { md: "25px", xs: "15px" },
            }}
          >
            Secure your share 100 token of worth 15$ per wallet.
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            <Grid item xs={12} md={12}>
              <Box>
                <TextField
                  label="Freezed Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    sx: {
                      color: color,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                    },
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    sx: {
                      color: color,
                      "&.Mui-focused": {
                        color: color,
                      },
                    },
                  }}
                  sx={{
                    "& label.Mui-focused": {
                      color: color,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: color,
                      },
                      "&:hover fieldset": {
                        borderColor: color,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: color,
                      },
                    },
                  }}
                  value={
                    freezedAmount === claimedAmount
                      ? 0
                      : formatEther(Number(freezedAmount))
                  }
                />
                <TextField
                  label="claimed Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    sx: {
                      color: color,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                    },
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    sx: {
                      color: color,
                      "&.Mui-focused": {
                        color: color,
                      },
                    },
                  }}
                  sx={{
                    "& label.Mui-focused": {
                      color: color,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: color,
                      },
                      "&:hover fieldset": {
                        borderColor: color,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: color,
                      },
                    },
                  }}
                  value={claimedAmount ? formatEther(Number(claimedAmount)) : 0}
                />
                <TextField
                  label="Start Time"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    sx: {
                      color: color,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                      },
                    },
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    sx: {
                      color: color,
                      "&.Mui-focused": {
                        color: color,
                      },
                    },
                  }}
                  sx={{
                    "& label.Mui-focused": {
                      color: color,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: color,
                      },
                      "&:hover fieldset": {
                        borderColor: color,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: color,
                      },
                    },
                  }}
                  value={
                    Number(startTime) > 0
                      ? moment.unix(Number(startTime)).format("lll")
                      : "Start Time"
                  }
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  backgroundColor: mode ? "#ffffff" : "#112D4E",
                  padding: "30px",
                  borderRadius: "10px",
                  border: "0.4px solid #081524",
                  boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: mode ? "#000000" : "#fff" }}
                >
                  Claimable Amount = {formatEther(claimableAmount)}
                </Typography>
                <CommonButton
                  disabled={loading}
                  onClick={() =>
                    !isConnected
                      ? open()
                      : chain?.id !== ActiveChain
                      ? switchChain({ chainId: ActiveChain })
                      : claimHandler()
                  }
                >
                  {isConnected
                    ? chain?.id !== ActiveChain
                      ? "Wrong Network"
                      : loading
                      ? "Processing..."
                      : isClaimed === 1
                      ? "Fully Claimed"
                      : "Request Airdrop"
                    : "Connect Wallet"}
                </CommonButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default Airdrops;
