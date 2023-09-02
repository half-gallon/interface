// import { toast } from 'react-toastify';

// import { parseUnits } from 'viem';
// import {
//   useAccount,
//   useContractWrite,
//   useNetwork,
//   useSwitchNetwork,
// } from 'wagmi';
// import { goerli } from 'wagmi/chains';

// import { USDC_ABI } from '~/abi';
// import { FAUCET, TOKEN } from '~/constants';

// interface UseGetUSDCProps {
//   chainId?: number;
// }
// export function useGetUSDC({ chainId = goerli.id }) {
//   const { address } = useAccount();
//   const { chain } = useNetwork();

//   const { switchNetworkAsync, isLoading: isNetworkChanging } = useSwitchNetwork(
//     {
//       onError(e) {
//         console.info(e.constructor.name);
//         toast.error('Failed to switch network');
//       },
//     },
//   );

//   const { write } = useContractWrite({
//     address: TOKEN[chainId],
//     abi: USDC_ABI,
//     functionName: 'mint',
//     chainId: chainId,
//   });

//   const handleGetUSDC = async () => {
//     if (switchNetworkAsync === undefined) return;

//     if (chainId !== chain?.id) {
//       await switchNetworkAsync(chainId);
//     }

//     // check 해야함
//     await write?.({
//       args: [address, '1000000'],
//     });
//   };

//   return { handleGetUSDC };
// }

const a = 1