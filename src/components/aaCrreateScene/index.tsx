import { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useAccount } from 'wagmi';

import Logo from './logo.png';
import { Numbers, SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const AAcreateScene = () => {
  const { isConnected } = useAccount();

  const [pageStep, setPageStep] = useAtom(pageStepAtom);

  const handleClickConnect = () => {
    setPageStep(PAGE_STEPS.main);
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
      <Numbers
        sx={{
          textAlign: 'left',
        }}
      >
        Create my
        <br />
        Abstract Account
      </Numbers>

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
      >
        Create wallet
      </Button>
    </SceneLayout>
  );
};

export default AAcreateScene;
