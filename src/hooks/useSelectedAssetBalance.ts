import { Address, useAccount, useBalance } from 'wagmi';

interface UseSelectedAssetBalanceProps {
  chainId: number;
  token?: Address;
}

export function useSelectedAssetBalance({
  chainId,
  token,
}: UseSelectedAssetBalanceProps) {
  const { address } = useAccount();

  console.info({
    address,
    chainId,
    token,
  });
  return useBalance({
    address,
    chainId,
    token,
    watch: true,
    enabled: token !== undefined,
  });
}
