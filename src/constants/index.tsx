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
type contractOnChain = {[key in number]: Address;}

export const TOKEN: contractOnChain = {
  [anvil.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
};

export const Verifier: contractOnChain = {
  [anvil.id]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
}

export const FAUCET: contractOnChain= {
  [goerli.id]: '0xe27658a36ca8a59fe5cc76a14bde34a51e587ab4',
};
