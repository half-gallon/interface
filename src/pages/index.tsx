// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from 'react';

import { Container, Paper } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { Inter } from 'next/font/google';
import { useAccount } from 'wagmi';

import ConfirmScene from '~/components/confirmScene';
import LoadingScene from '~/components/loadingScene';
import LoadingDoneScene from '~/components/loadingScene/done';
import MainScene from '~/components/mainScnen';
import RegistrationScene from '~/components/registrationScene';
import SendScene from '~/components/sendScene';
import WalletConnectScene from '~/components/walletConnectScene';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [pageStep, setPageStep] = useAtom(pageStepAtom);

  return (
    <Container maxWidth="xs">
      {/* <ConnectButton /> */}
      <Paper
        sx={{
          width: '100%',
          p: 2,
          background:
            'linear-gradient(180deg, rgba(147, 207, 255, 0.20) 0%, rgba(182, 223, 255, 0.14) 34.9%, rgba(255, 255, 255, 0.00) 100%), #F9F9F9',
          boxShadow: '0px 5px 20px 3px rgba(0, 0, 0, 0.10)',
        }}
      >
        {pageStep === PAGE_STEPS.walletConnect && <WalletConnectScene />}
        {pageStep === PAGE_STEPS.registration && <RegistrationScene />}
        {pageStep === PAGE_STEPS.registration_pending && <LoadingScene />}
        {pageStep === PAGE_STEPS.registration_done && <LoadingDoneScene />}
        {pageStep === PAGE_STEPS.voiceVerification && <RegistrationScene />}
        {pageStep === PAGE_STEPS.main && <MainScene />}
        {pageStep === PAGE_STEPS.send && <SendScene />}
        {pageStep === PAGE_STEPS.confirm && <ConfirmScene />}
      </Paper>
    </Container>
  );
}
