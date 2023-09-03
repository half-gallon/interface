import { useState } from 'react';

import { MetaMaskSDK } from '@metamask/sdk';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, CircularProgress, Divider, Paper, Typography } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { goerli } from 'wagmi/chains';

import TransactionItem from './transactionItem';
import { TOKEN } from '~/constants';
// import { useGetUSDC } from '~/hooks/useGetUSDC';
import { useSelectedAssetBalance } from '~/hooks/useSelectedAssetBalance';
import { Heading, SceneLayout, SubHeading } from '~/layout';
import {
  isTokenClaimedAtom,
  isVoiceOnboardingDoneAtom,
  numberOfSendItemTestAtom,
  pageStepAtom,
} from '~/state';
import { PAGE_STEPS } from '~/state/types';
import { useAccount } from 'wagmi';
import { useDisconnect } from 'wagmi'
import { delay } from '~/hooks/delay';

const MainScene = () => {
  const {disconnect} = useDisconnect();
  const {address} = useAccount()
  const isVoiceOnboardingDone = useAtomValue(isVoiceOnboardingDoneAtom);
  const setPageStep = useSetAtom(pageStepAtom);
  const numberOfSendItemTest = useAtomValue(numberOfSendItemTestAtom);


  const [isLoading, setIsLoading] = useState(false);

  const [isTokenClaimed, setIsTokenClaimed] = useAtom(isTokenClaimedAtom);
  // const { handleGetUSDC } = useGetUSDC({});

  const { data } = useSelectedAssetBalance({
    chainId: goerli.id,
    token: TOKEN[goerli.id],
  });

  const handleGetFaucet = async () => {
    // handleGetUSDC();
    setIsLoading(true);
    await delay(1000);
    setIsTokenClaimed(true);
    setIsLoading(false);
  };

  const handleOnboarding = () => {
    setPageStep(PAGE_STEPS.registration);
  };

  const handleClickSend = () => {
    setPageStep(PAGE_STEPS.send);
  };

  return (
    <SceneLayout
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Heading sx={{ mt: '42px', mb: '20px' }}>Welcome to MooyAAho</Heading>

      <Paper
        sx={{
          padding: '6px 16px',
          borderRadius: 'var(--borderRadius, 4px)',
          border: '1px solid var(--info-main, #0288D1)',
          width: '100%',

          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Typography>AA Wallet Address</Typography>
        <Typography>{address}</Typography>
      </Paper>

      {!isVoiceOnboardingDone && (
        <Button
          variant="outlined"
          onClick={handleOnboarding}
          fullWidth
          sx={{
            mt: '12px',
          }}
        >
          register your voice with security
        </Button>
      )}

      <Button
        variant="outlined"
        onClick={handleGetFaucet}
        fullWidth
        sx={{
          mt: '12px',
        }}
        disabled={isTokenClaimed || isLoading}
      >
        get test token
        {isLoading && <CircularProgress size={12} sx={{ml: 2}}/>}
      </Button>

      <Button
        variant="contained"
        fullWidth
        onClick={handleClickSend}
        sx={{
          mt: '12px',
        }}
      >
        send
      </Button>
      <Button
        variant="contained"
        fullWidth
        color='error'
        onClick={() => {
          disconnect?.();
          setPageStep(PAGE_STEPS.walletConnect);
        }}
        sx={{
          mt: '12px',
        }}
      >
        disconnect
      </Button>

      <Divider
        sx={{
          mx: 0,
          my: '24px',
          background: 'var(--primary, #4465DA)',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <SubHeading>Activities</SubHeading>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            mt: 4,
            gap: 1,
            flexDirection: 'column',
          }}
        >
          {isTokenClaimed && <TransactionItem type="receive" />}
          {numberOfSendItemTest > 0 && <TransactionItem type="send" />}
          {/* <TransactionItem type="send" />  */}
        </Box>
      </Box>
    </SceneLayout>
  );
};

export default MainScene;
