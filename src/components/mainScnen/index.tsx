import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { goerli } from 'wagmi/chains';

import TransactionItem from './transactionItem';
import { TOKEN } from '~/constants';
import { useGetUSDC } from '~/hooks/useGetUSDC';
import { useSelectedAssetBalance } from '~/hooks/useSelectedAssetBalance';
import { SceneLayout } from '~/layout';
import {
  isVoiceOnboardingDoneAtom,
  numberOfSendItemTestAtom,
  pageStepAtom,
} from '~/state';
import { PAGE_STEPS } from '~/state/types';

const MainScene = () => {
  const isVoiceOnboardingDone = useAtomValue(isVoiceOnboardingDoneAtom);
  const setPageStep = useSetAtom(pageStepAtom);
  const numberOfSendItemTest = useAtomValue(numberOfSendItemTestAtom);
  const { handleGetUSDC } = useGetUSDC({});

  const { data } = useSelectedAssetBalance({
    chainId: goerli.id,
    token: TOKEN[goerli.id],
  });

  const handleGetFaucet = () => {
    handleGetUSDC();
  };

  const handleOnboarding = () => {
    setPageStep(PAGE_STEPS.registration);
  };

  const handleClickSend = () => {
    setPageStep(PAGE_STEPS.send);
  };

  console.info(data);

  return (
    <SceneLayout
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        pl: 2,
        pr: 2,
      }}
    >
      <Box
        sx={{
          pt: 10,
          pb: 10,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar
          sx={{
            mb: 2,
          }}
        >
          <PersonIcon />
        </Avatar>
        {!isVoiceOnboardingDone && (
          <Button onClick={handleOnboarding} size="small">
            Voice registration
          </Button>
        )}
        {/* {isVoiceOnboardingDone && data && (
          <Typography>{data.formatted} USDC</Typography>
        )} */}
        <Typography>1,000 USDC</Typography>
        <Button onClick={handleGetFaucet} size="small">
          Get Test Token
        </Button>
      </Box>
      <Button
        variant="contained"
        // disabled={!data || !isVoiceOnboardingDone}
        disabled={!isVoiceOnboardingDone}
        fullWidth
        onClick={handleClickSend}
      >
        Send
      </Button>

      <Divider
        sx={{
          mt: 1,
          mb: 1,
        }}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography>Activities</Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {data && <TransactionItem type="receive" />}
          {Array.from(Array(numberOfSendItemTest).keys()).map((i) => (
            <TransactionItem type="send" key={i} />
          ))}
        </Box>
      </Box>
    </SceneLayout>
  );
};

export default MainScene;
