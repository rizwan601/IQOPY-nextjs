import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NotificationModal from "../NotificationModal/NotificationModal";
import { useAccount, useConfig } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  getCommas,
  // kafaStaking,
  iqopyStaking,
} from "../../constants/environment";
import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { formatEther } from "viem";

const columns = [
  { id: "StartTime", label: "Start Time", minWidth: 200, align: "center" },
  {
    id: "StakedAmount",
    label: "Staked Amount",
    minWidth: 200,
    align: "center",
  },
  {
    id: "AmountWithdrawn",
    label: "Amount Withdrawn",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "WithdrawableAmount",
    label: "Withdrawable Amount",
    minWidth: 200,
    align: "center",
  },
  {
    id: "Withdraw",
    label: "Withdraw",
    minWidth: 200,
    align: "center",
  },
];

const Staking = ({ mode }) => {
  const color = mode ? "#b99a45" : "#E0F7FA";
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [loading, setLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [unstakedLoading, setUnstakedLoading] = useState(false);
  const config = useConfig();
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const [userBalance, setUserBalance] = useState(0);
  const [usersAirdrops, setUsersAirdrops] = useState(0);
  const [stakingDetails, setStakingDetails] = useState([]);
  const [withdrawableAmount, setWithdrwableAmount] = useState(0);

  const stakeTokens = async () => {
    try {
      setLoading(true);
      // First transaction: Approve
      let approveHash = await writeContract(config, {
        ...iqopyStaking,
        functionName: "stakeTokens",
        args: [address],
      });
      await waitForTransactionReceipt(config, { hash: approveHash });
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: false,
        message: "Staked successfully",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: error.message,
      });
      console.log("error", error);
    }
  };
  const unstakeTokens = async () => {
    try {
      setUnstakedLoading(true);
      // First transaction: Approve
      let approveHash = await writeContract(config, {
        ...iqopyStaking,
        functionName: "stopStake",
        args: [address],
      });
      await waitForTransactionReceipt(config, { hash: approveHash });
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: false,
        message: "Unsaked successfully",
      });
      setUnstakedLoading(false);
    } catch (error) {
      setUnstakedLoading(false);
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: error.message,
      });
      console.log("error", error);
    }
  };

  const withdrawTokens = async (index) => {
    try {
      setWithdrawLoading(true);
      let withdrawHash = await writeContract(config, {
        ...iqopyStaking,
        functionName: "withdraw",
      });
      await waitForTransactionReceipt(config, { hash: withdrawHash });
      setnotificationProps({
        modal: true,
        error: false,
        message: "Withdrawal successfully completed.",
      });
      setWithdrawLoading(false);
    } catch (error) {
      setWithdrawLoading(false);
      setnotificationProps({
        modal: true,
        error: true,
        message: error.message,
      });
      console.log("error", error);
    }
  };

  const init = async () => {
    if (!address) {
      return;
    }
    try {
      const [
        _getUserBalance,
        _getUserAirdrop,
        _stakingDetails,
        _withdrawableAmount,
      ] = await Promise.all([
        readContract(config, {
          ...iqopyStaking,
          functionName: "getUserBala",
          args: [address],
        }),
        readContract(config, {
          ...iqopyStaking,
          functionName: "getUserAirdrop",
          args: [address],
        }),
        readContract(config, {
          ...iqopyStaking,
          functionName: "airdrops",
          args: [address],
        }),
        readContract(config, {
          ...iqopyStaking,
          functionName: "calcStake",
          args: [address],
        }),
      ]);
      setUsersAirdrops(_getUserAirdrop);
      setUserBalance(_getUserBalance);
      setStakingDetails(_stakingDetails);
      setWithdrwableAmount(_withdrawableAmount);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("usersAirdrops", usersAirdrops);
  console.log("userBalance", userBalance);
  console.log("stakingDetails", stakingDetails);

  useEffect(() => {
    init();
  }, [address]);

  const [startTime, withdrawnAmount] = stakingDetails;

  return (
    <Container id="chart" maxWidth="lg" sx={{ py: "50px" }}>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Container maxWidth="md">
        <Typography variant="h2" textAlign="center">
          Staking
        </Typography>
        <Divider color={color} sx={{ mt: "10px" }} />
        <Grid container sx={{ mt: "10px" }} spacing={4}>
          <Grid item xs={12} md={6}>
            {/* <TextField
              fullWidth
              label="Airdrop balance"
              value={formatEther(usersAirdrops)}
              focused
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
            /> */}
                     <Box
        sx={{
          mb: 3,
          backgroundColor: mode ? "#ffffff" : "#112e50", // Adjust the last value (0.7) to change transparency
          padding: "10px",
          borderRadius: "10px",
          border: mode
            ? "0.4px solid #081524"
            : "0.4px solid #28558c",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Typography sx={{ color: mode ? "#000000" : "#ffffff" }} variant="h6">
        Airdrop balance
        </Typography>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: { xs: "20", md: "25px" },
            color: "#b5a36c",
          }}
        >
          { formatEther(usersAirdrops)}
        </Typography>
      </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <TextField
              fullWidth
              label="User balance"
              focused
              value={formatEther(userBalance)}
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
            /> */}
             <Box
        sx={{
          mb: 3,
          backgroundColor: mode ? "#ffffff" : "#112e50", // Adjust the last value (0.7) to change transparency
          padding: "10px",
          borderRadius: "10px",
          border: mode
            ? "0.4px solid #28558c"
            : "0.4px solid #28558c",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Typography sx={{ color: mode ? "#000000" : "#ffffff" }} variant="h6">
        User balance
        </Typography>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: { xs: "20", md: "25px" },
            color: "#b5a36c",
          }}
        >
          {formatEther(userBalance)} 
        </Typography>
      </Box>
            <Stack direction="row" justifyContent="space-between">
              <LoadingButton
                variant="contained"
                loading={loading}
                disabled={loading}
                loadingPosition="end"
                sx={{
                  background: mode ? "#b99a45 " : "#b5a36c",
                  transition: "background 0.3s",
                  px: "30px",
                  py: "10px",
                  mt: "20px",
                  maxWidth: "200px",
                }}
                color="primary"
                onClick={ stakeTokens}
              >
                {
                  loading
                    ?"Processing"
                    : "Stake"
                  }
              </LoadingButton>
              <LoadingButton
                variant="contained"
                loading={unstakedLoading}
                disabled={unstakedLoading}
                loadingPosition="end"
                sx={{
                  background: mode ? "#b99a45 " : "#b5a36c",
                  transition: "background 0.3s",
                  px: "30px",
                  py: "10px",
                  mt: "20px",
                  maxWidth: "200px",
                }}
                color="primary"
                onClick={unstakeTokens}
              >
                {
  unstakedLoading ? "Processing" : "Unstake"
}

              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "transparent",
          mx: "auto",
          border: mode ? "1px solid #b99a45" : "1px solid #28558c",
          my: "40px",
        }}
        align="center"
      >
        <Box my={4}>
          <Typography fontWeight="600" mb={1} variant="h2" textAlign="center">
            Deposit Details
          </Typography>
        </Box>
        <TableContainer
          sx={{
            maxWidth: "100%",
            overflowX: "auto",
            display: "block",
            "@media screen and (max-width: 600px)": {
              width: "100vw",
            },
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ minWidth: "100%" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      background:
                        "linear-gradient(293.69deg, #b5a36c -1.22%, #1a4578 100%)",
                    }}
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Number(stakingDetails[0]) > 0 ? (
                <TableRow>
                  <TableCell sx={{ color: mode ? "#b99a45" : "#ffffff" }}>
                    {moment.unix(Number(startTime)).format("lll")}
                  </TableCell>
                  <TableCell sx={{ color: mode ? "#b99a45" : "#ffffff" }}>
                    {formatEther(usersAirdrops + userBalance)}
                  </TableCell>
                  <TableCell sx={{ color: mode ? "#b99a45" : "#ffffff" }}>
                    &nbsp;{getCommas(formatEther(withdrawnAmount))}
                  </TableCell>
                  <TableCell sx={{ color: mode ? "#b99a45" : "#ffffff" }}>
                    &nbsp;
                    {getCommas(formatEther(withdrawableAmount))}
                  </TableCell>
                  <TableCell sx={{ color: mode ? "#b99a45" : "#ffffff" }}>
                    <LoadingButton
                      variant="contained"
                      loading={withdrawLoading}
                      disabled={withdrawLoading}
                      loadingPosition="end"
                      sx={{
                        background: "#b99a45",
                        transition: "background 0.3s",
                        px: "30px",
                        py: "10px",
                        mt: "20px",
                        maxWidth: "150px",
                        borderRadius: "22px",
                        fontSize: "10px",
                      }}
                      color="primary"
                      onClick={address ? () => withdrawTokens() : open}
                    >
                      {address
                        ? withdrawLoading
                          ? "Processing"
                          : "Withdraw"
                        : "Connect Wallet"}
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    sx={{ color: mode ? "#b99a45" : "#ffffff" }}
                    colSpan={6}
                    style={{ textAlign: "center" }}
                  >
                    No deposit data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Staking;
