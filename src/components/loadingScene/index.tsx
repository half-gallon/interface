import { Box, CircularProgress, Typography } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { useInterval } from '~/hooks/useInterval';
import { Heading, SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom, proofAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const LoadingScene = () => {
  const proof = useAtomValue(proofAtom);
  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const setIsVoiceOnboardingDone = useSetAtom(isVoiceOnboardingDoneAtom);

  useInterval(() => {
    // setPageStep(PAGE_STEPS.registration_done);
    setPageStep(PAGE_STEPS.registration_failed);
    setIsVoiceOnboardingDone(true);
  }, 5_000);

  return (
    <SceneLayout
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      <Heading
        sx={{
          mt: 4,
        }}
      >
        Voice Model Training
      </Heading>
    </SceneLayout>
  );
};

export default LoadingScene;
