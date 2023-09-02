import { Address, Chain } from 'viem';
import {
  goerli,
  optimismGoerli,
  lineaTestnet,
  taikoTestnetSepolia,
} from 'wagmi/chains';

export const CHAIN = [
  goerli,
  optimismGoerli,
  lineaTestnet,
  taikoTestnetSepolia,
];

export const anvil = {
  id: 31337,
  name: 'Mitosis',
  network: 'mitosis',
  nativeCurrency: {
    decimals: 18,
    name: 'gmito',
    symbol: 'MITO',
  },
  rpcUrls: {
    public: { http: ['http://192.168.50.45:8545'] },
    default: { http: ['http://192.168.50.45:8545'] },
  },
  
  contracts: {},
} as const satisfies Chain;

export const LOCAL_CHAIN = [anvil];

export const TOKEN: {
  [key in number]: Address;
} = {
  [goerli.id]: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
};

export const FAUCET: {
  [key in number]: Address;
} = {
  [goerli.id]: '0xe27658a36ca8a59fe5cc76a14bde34a51e587ab4',
};
