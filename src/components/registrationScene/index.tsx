import { useMemo } from 'react';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
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

import SceneHeader from '../sceneHeader';

import { useRecord } from '~/hooks/useRecord';
import { Description, Heading, SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const RegistrationScene = () => {
  const {
    getMicrophonePermission,
    startRecording,
    stopRecording,
    isRecording,
    audio,
    permission,
  } = useRecord();
  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const setIsVoiceOnboardingDone = useSetAtom(isVoiceOnboardingDoneAtom);

  const handleSubmit = () => {
    // todo progress
    setPageStep(PAGE_STEPS.registration_pending);
    setIsVoiceOnboardingDone(true);
    return;

    if (pageStep === PAGE_STEPS.registration) {
      setIsVoiceOnboardingDone(true);
      setPageStep(PAGE_STEPS.registration_pending);
    }

    if (pageStep === PAGE_STEPS.voiceVerification) {
      setPageStep(PAGE_STEPS.confirm);
    }
  };

  const handleClickMic = () => {
    getMicrophonePermission();
  };

  const handleStart = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const sceneTitle = useMemo(() => {
    if (pageStep === PAGE_STEPS.registration) return 'Voice Training';
    if (pageStep === PAGE_STEPS.voiceVerification) return 'Voice Verification';
    return '';
  }, [pageStep]);

  const backTo = useMemo(() => {
    if (pageStep === PAGE_STEPS.registration) return PAGE_STEPS.main;
    if (pageStep === PAGE_STEPS.voiceVerification) return PAGE_STEPS.confirm;
    return PAGE_STEPS.main;
  }, [pageStep]);

  return (
    <SceneLayout
      sx={{
        position: 'relative',
      }}
    >
      <SceneHeader title={sceneTitle} backTo={backTo} />

      <Heading sx={{ mb: '16px' }}>
        Please read the sentence below and record your voice.
      </Heading>
      <Description sx={{ mb: '56px' }}>
        Train your voice in silent location for security
      </Description>

      <Paper
        sx={{
          p: 4,
          border: '1.5px solid var(--primary, #4465DA)',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: '1px solid #FF76C0',
            background: 'rgba(255, 118, 192, 0.10)',
            mb: '24px',
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
              {isRecording ? <StopIcon /> : <MicIcon />}
            </IconButton>
          ) : (
            <IconButton onClick={handleClickMic}>
              <MicOffIcon />
            </IconButton>
          )}
        </Box>
      </Paper>

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={!audio}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        Submit Recording
      </Button>
    </SceneLayout>
  );
};

export default RegistrationScene;
