import { parseUnits } from 'viem';
import { useAccount, useContractWrite } from 'wagmi';
import { goerli } from 'wagmi/chains';

import { USDC_ABI } from '~/abi/usdc';
import { FAUCET, TOKEN } from '~/constants';

interface UseGetUSDCProps {
  chainId?: number;
}
export function useGetUSDC({ chainId = goerli.id }) {
  const { address } = useAccount();
  const { write } = useContractWrite({
    address: FAUCET[chainId],
    abi: USDC_ABI,
    functionName: 'mint',
    chainId: chainId,
  });

  const handleGetUSDC = async () => {
    await write?.({
      args: [address, parseUnits('1000', 6)],
    });
  };

  return { handleGetUSDC };
}
