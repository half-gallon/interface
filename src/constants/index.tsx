import { Address } from 'viem';
import { arbitrumGoerli, goerli, optimismGoerli } from 'wagmi/chains';

export const TOKEN: {
  [key in number]: Address;
} = {
  [goerli.id]: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
};

export const FAUCET: {
  [key in number]: Address;
} = {
  [goerli.id]: '0xca6b4c00831ffb77afe22e734a6101b268b7fcbe',
};
