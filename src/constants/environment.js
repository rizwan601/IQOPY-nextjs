import tokenAbi from "./tokenAbi.json";
import stakingAbi from "./stakingAbi.json";
import airdropAbi from "./airdropAbi.json";
import presaleAbi from "./presaleAbi.json";
import usdtTokenAbi from "./usdtTokenAbi.json";
import { http, createConfig } from "@wagmi/core";
import { bscTestnet } from "@wagmi/core/chains";

export const presaleContract = {
  address: "0x3363537daf8ED635576D0810B22eC306330F4a2D", //testnet
  abi: presaleAbi,
};
export const airdropContract = {
  address: "0x7bd12FA6C0B04D20F4046470D0cC8FCDE8340766", //testnet
  abi: airdropAbi,
};

export const kafaStaking = {
  address: "0x665e6346C5118d342894a94BA08874661071Aa09", //testnet
  abi: stakingAbi,
};

export const iqopyStaking = {
  address: "0xdaD7DC7823882498584a547005A43C11b4984013", //testnet
  abi: stakingAbi,
};

export const usdtContract = {
  address: "0x35BD1509a00CE3D6a7969A97cB075e0086A943cB", //testnet
  abi: usdtTokenAbi,
};
export const tokenContract = {
  address: "0x7197F5027DC8E53551400679247977959ba6dfd0", //testnet
  abi: tokenAbi,
};

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});

export const bscUrl = "https://testnet.bscscan.com/address/";
export const ActiveChain = 97;
export let getSliceAddress = (address) =>
  address?.slice(0, 4) + "..." + address?.slice(-4);
export const getCommas = (value, percision = 2) => {
  value = parseFloat(value).toFixed(percision);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
