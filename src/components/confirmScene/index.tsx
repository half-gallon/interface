import { use, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import SceneHeader from '../sceneHeader';

import AddressBox from './addressBox';
import VerificationButton from './verificationButton';
import { Heading, Label, Numbers, SceneLayout, SubHeading } from '~/layout';
import { isVoiceVerifiedAtom, numberOfSendItemTestAtom, pageStepAtom, sendAmountAtom, toAddressAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import { useAccount } from 'wagmi';

const ConfirmScene = () => {
  const {address} = useAccount();
  const setPageStep = useSetAtom(pageStepAtom);
  const toAddress = useAtomValue(toAddressAtom);
  const sendAmount = useAtomValue(sendAmountAtom);
  const isVoiceVerified = useAtomValue(isVoiceVerifiedAtom);

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
    <SceneLayout
      sx={{
        position: 'relative',
      }}
    >
      <SceneHeader title="You are sending" backTo={PAGE_STEPS.send} />

      <SubHeading>Abstract</SubHeading>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'flex-end',
          mt: 4,
          gap: '16px',
        }}
      >
        <AddressBox label="From" address={address || `0x123`} />
        <AddressBox label="To" address={toAddress || '0x123'} />
      </Box>

      <Box sx={{ mt: 8 }}>
        <Label>Amount</Label>
        <Numbers>{sendAmount} YAHO</Numbers>
      </Box>

      <Divider sx={{ mx: 0, my: '24px', background: '#4465DA' }} />

      <Box>
        <Box>
          <Heading>Additional steps needed</Heading>
          <Typography variant="caption">
            In case of transaction over 1,000 YAHO, Voice Verification is needed
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <VerificationButton
            label="Voice verification"
            onClick={handleClickVoiceVerification}
            isVerified={isVoiceVerified}
          />
          <VerificationButton
            label="Conformation"
            onClick={handleClickConfirmation}
            // isVerified={isVoiceVerified}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, position: 'absolute', bottom: 0 }}
        onClick={handleClickSend}
      >
        Send
      </Button>
    </SceneLayout>
  );
};

export default ConfirmScene;
