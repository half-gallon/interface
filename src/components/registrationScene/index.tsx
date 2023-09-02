import { use, useState } from 'react';

import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import { SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const RegistrationScene = () => {
  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const setIsVoiceOnboardingDone = useSetAtom(isVoiceOnboardingDoneAtom);

  const handleSubmit = () => {
    // todo progress
    if(pageStep === PAGE_STEPS.registration) {
      setPageStep(PAGE_STEPS.main);
      setIsVoiceOnboardingDone(true);
    }

    if(pageStep === PAGE_STEPS.voiceVerification) {
      setPageStep(PAGE_STEPS.confirm);
    }
  }


  return (
    <SceneLayout>
      <Box sx={{mb: 8}}>
        <Typography align='center'>
        {pageStep === PAGE_STEPS.registration && (
          
          'Voice Training'
          )}
          {pageStep === PAGE_STEPS.voiceVerification && (
          'Voice Verification'
          )}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '1.5rem',
        }}
      >
        Please read the sentence below and record your voice.
      </Typography>

      <Paper
        sx={{
        p: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            background: (theme) => theme.palette.grey[100],
          }}
        >
          The quick brown fox jumps over the lazy dog
        </Paper>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <IconButton>
            <MicIcon />
          </IconButton>
        </Box>
      </Paper>

      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Submit Recording
      </Button>
    </SceneLayout>
  );
};

export default RegistrationScene;
