// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from 'react';

import { Container, Paper } from '@mui/material';
import { useAtom } from 'jotai';
import { Inter } from 'next/font/google';
import { useAccount } from 'wagmi';

import RegistrationScene from '~/components/registrationScene';
import WalletConnectScene from '~/components/walletConnectScene';
import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { isConnected } = useAccount();
  const [pageStep, setPageStep] = useAtom(pageStepAtom);

  useEffect(() => {
    if (isConnected) {
      // todo - check if user has already onboarded
      setPageStep(PAGE_STEPS.registration);
    } else {
      setPageStep(PAGE_STEPS.walletConnect);
    }
  }, [setPageStep, isConnected]);

  return (
    <Container maxWidth="xs">
      {/* <ConnectButton /> */}
      <Paper
        sx={{
          width: '100%',
          p: 2,
        }}
      >
        {pageStep === PAGE_STEPS.walletConnect && <WalletConnectScene />}
        {pageStep === PAGE_STEPS.registration && <RegistrationScene />}
      </Paper>
    </Container>
  );
}
