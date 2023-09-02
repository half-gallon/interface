import { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useAccount, useSwitchNetwork } from 'wagmi';

import Logo from './logo.png';
import { SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import { CHAIN } from '~/constants';

const WalletConnectScene = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { switchNetwork } = useSwitchNetwork();

  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const isVoiceOnboardingDone = useAtomValue(isVoiceOnboardingDoneAtom);

  useEffect(() => {
    if (isConnected) {
      // setPageStep(PAGE_STEPS.main);
      setPageStep(PAGE_STEPS.aaCreate);
      if(switchNetwork) {
        switchNetwork(CHAIN[0].id);
      }
    } else {
      setPageStep(PAGE_STEPS.walletConnect);
    }
  }, [setPageStep, isConnected, isVoiceOnboardingDone, switchNetwork]);

  const handleClickConnect = async () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <SceneLayout
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Image src={Logo} width={358} height={84} alt="logo" />

      <Button
        fullWidth
        variant="contained"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onClick={handleClickConnect}
        disabled={!openConnectModal}
      >
        connect wallet
      </Button>
    </SceneLayout>
  );
};

export default WalletConnectScene;
