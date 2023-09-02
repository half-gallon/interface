// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from 'react';

import { Container, Paper } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { Inter } from 'next/font/google';
import { useAccount } from 'wagmi';

import MainScene from '~/components/mainScnen';
import RegistrationScene from '~/components/registrationScene';
import SendScene from '~/components/sendScene';
import WalletConnectScene from '~/components/walletConnectScene';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import ConfirmScene from '~/components/confirmScene';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { isConnected } = useAccount();
  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const isVoiceOnboardingDone = useAtomValue(isVoiceOnboardingDoneAtom);

  useEffect(() => {
    if (isConnected) {
        setPageStep(PAGE_STEPS.main);
    } else {
      setPageStep(PAGE_STEPS.walletConnect);
    }
  }, [setPageStep, isConnected, isVoiceOnboardingDone]);

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
        {pageStep === PAGE_STEPS.voiceVerification && <RegistrationScene />}
        {pageStep === PAGE_STEPS.main && <MainScene />}
        {pageStep === PAGE_STEPS.send && <SendScene />}
        {pageStep === PAGE_STEPS.confirm && <ConfirmScene />}
      </Paper>
    </Container>
  );
}
