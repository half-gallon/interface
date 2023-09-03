import { toast } from 'react-toastify';

import { MetaMaskInpageProvider } from '@metamask/providers';
import { MetaMaskSDK } from '@metamask/sdk';
import { WatchAssetParameters } from 'viem';
import 'viem/window';
import { Chain } from 'wagmi';

import { delay } from './delay';

interface handleWatchAssetProps {
  params: WatchAssetParameters;
  chain: Chain;
}
export function useAssetWatch() {
  const MMSDK = new MetaMaskSDK({
    dappMetadata: {},
    injectProvider:true,
  });

  const handleSwitchToChain = async (chain: Chain) => {
    const ethereum = MMSDK.getProvider();
    const { chainId: currentChainId } = ethereum;

    if (Number(currentChainId) !== chain.id) {
      const mitosisChainHexId = `0x${chain.id.toString(16)}`;
      await ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: mitosisChainHexId }],
        })
        .catch(async (switchError: any) => {
          console.info({ switchError });
          if (switchError.code === 4902 || switchError.code === -32603) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: mitosisChainHexId,
                    chainName: chain.name,
                    rpcUrls: [
                      chain.rpcUrls.default.http[0],
                      chain.rpcUrls.public.http[0],
                    ],
                    nativeCurrency: chain.nativeCurrency,
                  },
                ],
              });
            } catch (addError: any) {
              console.info({ addError });
              toast.error(addError.message);
              return;
            }
          }
        });
      // wait for chain to be changed
      await delay(1000);
    }
  };

  const handleWatchAsset = async ({ params, chain }: handleWatchAssetProps) => {
    await handleSwitchToChain(chain).then(async () => {
      const ethereum = MMSDK.getProvider();
      const { chainId: currentChainId } = ethereum;

      console.info(MMSDK, ethereum);

      if (Number(currentChainId) == chain.id) {
        await ethereum
          .request({
            method: 'wallet_watchAsset',
            params,
          })
          .catch((error: any) => {
            toast.error(error.message);
          });
      } else {
        toast.info(`Please switch network, ${currentChainId}, ${chain.id}`);
      }
    });
  };

  return {
    handleSwitchToChain,
    handleWatchAsset,
  };
}
