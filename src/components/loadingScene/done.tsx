import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import { useInterval } from '~/hooks/useInterval';
import { Heading, SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import theme from '~/styles/theme';

const LoadingDoneScene = () => {
  const [pageStep, setPageStep] = useAtom(pageStepAtom);

  useInterval(() => {
    if(pageStep === PAGE_STEPS.registration_done) {
      setPageStep(PAGE_STEPS.main);
      return;
    }
    if(PAGE_STEPS.voiceVerification_done) {
      setPageStep(PAGE_STEPS.confirm);
      return;
    }
  }, 2_000);

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
        <CheckCircleOutlineIcon
          sx={{
            fontSize: '56px',
            color: theme.palette.primary.main,
          }}
        />
      </Box>
      <Heading
        sx={{
          mt: 4,
        }}
      >
        Voice Authentication Complete
      </Heading>
    </SceneLayout>
  );
};

export default LoadingDoneScene;
