import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import SceneHeader from '../sceneHeader';

import AddressBox from './addressBox';
import VerificationButton from './verificationButton';
import { SceneLayout } from '~/layout';
import { numberOfSendItemTestAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const ConfirmScene = () => {
  const setPageStep = useSetAtom(pageStepAtom);
  const [numberOfSendItemTest, setNumberOfSendItemTest] = useAtom(
    numberOfSendItemTestAtom,
  );

  const handleClickVoiceVerification = () => {
    setPageStep(PAGE_STEPS.voiceVerification);
  };

  const handleClickBack = () => {
    setPageStep(PAGE_STEPS.send);
  };
  const handleClickConfirmation = () => {};

  const handleClickSend = () => {
    setNumberOfSendItemTest(numberOfSendItemTest + 1);
    setPageStep(PAGE_STEPS.main);
  };

  return (
    <SceneLayout>
      <SceneHeader title="Confirm Send" backTo={PAGE_STEPS.send} />

      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', mt: 4 }}>
        <AddressBox label="From" address={'0x1233'} />
        <Box
          sx={{
            borderRadius: '50%',
            p: 1,
            m: 1,
            flexShrink: 0,
            aspectRatio: '1/1',
          }}
        >
          <DoubleArrowIcon />
        </Box>
        <AddressBox label="To" address={'0x1233'} />
      </Box>

      <Box sx={{ mt: 8 }}>
        <Typography>Amount</Typography>
        <Typography>1 USDC</Typography>
      </Box>

      <Box sx={{ mt: 8 }}>
        <Box>
          <Typography>Additional steps needed</Typography>
          <Typography variant="caption">
            In case of transaction over 1,000 USDC, Voice Verification is needed
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <VerificationButton
            label="Voice verification"
            onClick={handleClickVoiceVerification}
          />
          <VerificationButton
            label="Conformation"
            onClick={handleClickConfirmation}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleClickSend}
        >
          Send
        </Button>
      </Box>
    </SceneLayout>
  );
};

export default ConfirmScene;
