// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from 'react';

import { Container, Paper } from '@mui/material';
import { useAtomValue } from 'jotai';

import AAcreateScene from '~/components/aaCrreateScene';
import ConfirmScene from '~/components/confirmScene';
import LoadingScene from '~/components/loadingScene';
import LoadingDoneScene from '~/components/loadingScene/done';
import LoadingFailedScene from '~/components/loadingScene/failed';
import MainScene from '~/components/mainScnen';
import SendScene from '~/components/sendScene';
import TestBox from '~/components/testbox';
import WalletConnectScene from '~/components/walletConnectScene';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import dynamic from 'next/dynamic'

const RegistrationScene = dynamic(() => import('~/components/registrationScene'), {
    ssr: false
})


export default function Home() {
  const pageStep = useAtomValue(pageStepAtom);

  return (
    <>
      <Container maxWidth="xs">
        <Paper
          sx={{
            width: '100%',
            p: 2,
            background:
              pageStep === PAGE_STEPS.registration_failed
                ? 'linear-gradient(180deg, rgba(255, 0, 92, 0.20) 0%, rgba(255, 118, 192, 0.20) 50%, rgba(255, 255, 255, 0.00) 100%), #F9F9F9'
                : 'linear-gradient(180deg, rgba(147, 207, 255, 0.20) 0%, rgba(182, 223, 255, 0.14) 34.9%, rgba(255, 255, 255, 0.00) 100%), #F9F9F9',
            boxShadow: '0px 5px 20px 3px rgba(0, 0, 0, 0.10)',
          }}
        >
          {pageStep === PAGE_STEPS.walletConnect && <WalletConnectScene />}
          {pageStep === PAGE_STEPS.aaCreate && <AAcreateScene />}
          {pageStep === PAGE_STEPS.registration && <RegistrationScene />}
          {pageStep === PAGE_STEPS.registration_pending && <LoadingScene />}
          {pageStep === PAGE_STEPS.registration_done && <LoadingDoneScene />}
          {pageStep === PAGE_STEPS.registration_failed && (
            <LoadingFailedScene />
          )}
          {pageStep === PAGE_STEPS.voiceVerification && <RegistrationScene />}
          {pageStep === PAGE_STEPS.main && <MainScene />}
          {pageStep === PAGE_STEPS.send && <SendScene />}
          {pageStep === PAGE_STEPS.confirm && <ConfirmScene />}
        </Paper>
      </Container>
      <TestBox />
    </>
  );
}
