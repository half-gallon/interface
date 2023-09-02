import { useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
import { Label, SceneLayout, SubHeading, Numbers, Heading } from '~/layout';
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
    <SceneLayout sx={{
      position: 'relative'
    }}>
      <SceneHeader title="You are sending" backTo={PAGE_STEPS.send} />

      <SubHeading>
        Abstract
      </SubHeading>

      <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-end', mt: 4,gap: '16px' }}>
        <AddressBox label="From" address={'0x1233'} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(68, 101, 218, 0.10)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            p: 1,
            m: 1,
            flexShrink: 0,
            aspectRatio: '1/1',
          }}
        >
          <ChevronRightIcon sx={{
            color: 'var(--primary, #4465DA)',

          }}/>
        </Box>
        <AddressBox label="To" address={'0x1233'} />
      </Box>

      <Box sx={{ mt: 8 }}>
        <Label>Amount</Label>
        <Numbers>1 USDC</Numbers>
      </Box>

      <Divider sx={{mx: 0, my: '24px', background: '#4465DA'}} />

      <Box>
        <Box>
          <Heading>Additional steps needed</Heading>
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
      </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, position: 'absolute', bottom: 0, }}
          onClick={handleClickSend}
        >
          Send
        </Button>
    </SceneLayout>
  );
};

export default ConfirmScene;
