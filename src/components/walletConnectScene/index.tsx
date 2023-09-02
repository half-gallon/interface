import { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAtom, useAtomValue } from 'jotai';
import { useAccount } from 'wagmi';

import { SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const WalletConnectScene = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const isVoiceOnboardingDone = useAtomValue(isVoiceOnboardingDoneAtom);

  useEffect(() => {
    if (isConnected) {
      setPageStep(PAGE_STEPS.main);
    } else {
      setPageStep(PAGE_STEPS.walletConnect);
    }
  }, [setPageStep, isConnected, isVoiceOnboardingDone]);

  const handleClickConnect = () => {
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
      }}
    >
      <Typography
        component="h1"
        align="center"
        sx={{
          fontSize: '2rem',
        }}
      >
        Moo<strong>AA</strong>ho
      </Typography>

      <Button
        fullWidth
        variant="contained"
        sx={{
          // alignSelf: 'flex-end !important',
          justifySelf: 'flex-end',
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
