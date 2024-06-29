import {
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Tokenbox from "./Tokenbox";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { useEffect } from "react";
import { useAccount, useConfig, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
// import NotificationModal from "../NotificationModal/NotificationModal";
import {
  ActiveChain,
  presaleContract,
  tokenContract,
  usdtContract,
} from "../../constants/environment";
import { formatEther, parseUnits } from "viem";
import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
import CommonButton from "../CommonButton";
const PrivateSale = ({ mode }) => {
  const { address, isConnected, chain } = useAccount();
  const { open } = useWeb3Modal();
  const { switchChain } = useSwitchChain();
  const [slect, setslect] = useState("BNB");
  const [wbamount, setwbamount] = useState("");
  const [onebnb, setonebnb] = useState("");
  const [onebusd, setOneBUSD] = useState("");
  const [loading, setloading] = useState(false);
  const config = useConfig();
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [amount, setAmount] = useState(0);

  const init = async () => {
    try {
      const usdtDecimals = await readContract(config, {
        ...usdtContract,
        functionName: "decimals",
      });
      console.log(usdtDecimals, "usdtDecimals");
      let amountsend = parseUnits("1", 18);
      const [busdToToken, bnbToToken] = await Promise.all([
        readContract(config, {
          ...presaleContract,
          functionName: "busdToToken",
          args: [amountsend],
        }),
        readContract(config, {
          ...presaleContract,
          functionName: "bnbToToken",
          args: [parseUnits("1", 18)],
        }),
      ]);
      console.log("onebusd", onebusd);
      setOneBUSD(formatEther(busdToToken));
      setonebnb(formatEther(bnbToToken));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const onchangehendler = async () => {
      if (
        !isNaN(+amount && +amount != undefined && !+amount <= 0 && amount != "")
      ) {
        try {
          if (slect == "BNB") {
            let amountsend = parseUnits(amount.toString(), 18);
            const [bnbToToken] = await Promise.all([
              readContract(config, {
                ...presaleContract,
                functionName: "bnbToToken",
                args: [amountsend],
              }),
            ]);
            setwbamount(parseFloat(formatEther(bnbToToken)).toFixed(2));
          } else {
            let amountsend = parseUnits(amount.toString(), 18);
            const [busdToToken] = await Promise.all([
              readContract(config, {
                ...presaleContract,
                functionName: "busdToToken",
                args: [amountsend],
              }),
            ]);
            setwbamount(parseFloat(formatEther(busdToToken)).toFixed(2));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    onchangehendler();
  }, [amount, slect]);

  const buytokens = async () => {
    if (!amount || isNaN(amount) || amount < 0 || amount === 0) {
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: "Please enter a valid amount.",
      });
    } else {
      try {
        setloading(true);
        console.log("amountCD", amount);
        if (slect == "BNB") {
          let buyHash = await writeContract(config, {
            ...presaleContract,
            functionName: "buyTokenBNB",
            value: parseUnits(amount.toString(), 18),
          });
          await waitForTransactionReceipt(config, { hash: buyHash });
        } else {
          let approveHash = await writeContract(config, {
            ...usdtContract,
            functionName: "approve",
            args: [presaleContract.address, parseUnits(amount.toString(), 18)],
          });
          await waitForTransactionReceipt(config, { hash: approveHash });
          let buyHash = await writeContract(config, {
            ...presaleContract,
            functionName: "buyTokenbusd",
            args: [parseUnits(amount.toString(), 18)],
          });
          await waitForTransactionReceipt(config, { hash: buyHash });
        }
        setnotificationProps({
          ...notificationProps,
          modal: true,
          error: false,
          message: "Purchase successfuly completed.",
        });
        setloading(false);
      } catch (error) {
        setloading(false);
        setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: error.message,
        });
        console.log("e", error);
      }
    }
  };

  return (
    <div>
      {/* <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      /> */}
      <Box
        sx={{
          backgroundColor: mode ? "#ffffff" : "#112D4E50", 
          padding: "20px",
          borderRadius: "10px",
          // border: mode
          //   ? "0.4px solid #112D4E"
          //   : "0.4px solid rgba(140, 140, 140, 0.40)",
          // boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'Nunito'",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "25px",
                color: mode ? "#000000" : "white",
              }}
            >
              PRESALE
            </Typography>
          </Box>
          <IconButton
            sx={{ color: mode ? "#000000" : "white", fontSize: "30px" }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
        <Box>
          <Tokenbox
            setslect={setslect}
            slect={slect}
            amount={amount}
            setAmount={setAmount}
            text={"From"}
            mode={mode}
          />
        </Box>
        <Box textAlign="center" my="10px">
          <IconButton
            sx={{ color: "white", fontSize: { xs: "20px", sm: "40px" } }}
          >
            <ArrowDownwardIcon
              sx={{
                fontSize: { xs: "20px", sm: "40px" },
                color: mode ? "#000000" : "#ffffff",
              }}
            />
          </IconButton>
        </Box>
        <Box>
          <Tokenbox text={"To"} slect={"WB"} wbamount={wbamount} mode={mode} />
        </Box>
        <Box
          mt="20px"
          sx={{
            display: "flex ",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Box
            sx={{
              fontFamily: "'Nunito'",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: { md: "17px", xs: "12px" },
              color: mode ? "#000000" : "#ffffff",
            }}
          >
            Price:
          </Box>
          <Box
            sx={{
              fontFamily: "'Nunito'",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: { md: "17px", xs: "12px" },
              color: mode ? "#000000" : "#ffffff",
            }}
          >
            {slect == "BNB"
              ? ` ${onebnb} IQOPY per BNB`
              : ` ${onebusd} IQOPY per BUSD`}
          </Box>
        </Box>
        <Stack mt="20px">
          <CommonButton
            onClick={() =>
              !isConnected
                ? open()
                : chain?.id !== ActiveChain
                ? switchChain({ chainId: ActiveChain })
                : buytokens()
            }
            disabled={loading}
          >
            {isConnected
              ? chain?.id !== ActiveChain
                ? "Wrong Network"
                : loading
                ? "processing..."
                : "Buy IQOPY"
              : "Connect Wallet"}
          </CommonButton>
        </Stack>
        <Box
          sx={{
            fontFamily: "'Nunito'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: { md: "17px", xs: "12px" },
            color: mode ? "#000000" : "white",
            my: 1,
          }}
        >
          TOKEN ADDRESS: {tokenContract.address}
        </Box>
      </Box>
    </div>
  );
};

export default PrivateSale;
