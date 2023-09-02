import { use, useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import ReplayIcon from '@mui/icons-material/Replay';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import { useRecord } from '~/hooks/useRecord';
import { SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const RegistrationScene = () => {
  const { getMicrophonePermission, startRecording,stopRecording, isRecording, audio, permission  } = useRecord();
  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const setIsVoiceOnboardingDone = useSetAtom(isVoiceOnboardingDoneAtom);

  const handleSubmit = () => {
    // todo progress
    if (pageStep === PAGE_STEPS.registration) {
      setPageStep(PAGE_STEPS.main);
      setIsVoiceOnboardingDone(true);
    }

    if (pageStep === PAGE_STEPS.voiceVerification) {
      setPageStep(PAGE_STEPS.confirm);
    }
  };

  const handleClickMic = () => {
    getMicrophonePermission();
  };

  const handleStart = () => {
    if(isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  return (
    <SceneLayout>
      <Box sx={{ mb: 8 }}>
        <Typography align="center">
          {pageStep === PAGE_STEPS.registration && 'Voice Training'}
          {pageStep === PAGE_STEPS.voiceVerification && 'Voice Verification'}
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
        {audio ? (
          <Box>
            <audio src={audio} controls></audio>
          </Box>
        ) : null}

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {permission ? (
          <IconButton onClick={handleStart}>
            {isRecording ?   <StopIcon />: <MicIcon />}
          </IconButton>

          ): (
            <IconButton onClick={handleClickMic}>
              <MicOffIcon />
            </IconButton>
          )}
        </Box>
      </Paper>

      <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!audio}>
        Submit Recording
      </Button>
    </SceneLayout>
  );
};

export default RegistrationScene;
