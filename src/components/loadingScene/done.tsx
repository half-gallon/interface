import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';

import { useInterval } from '~/hooks/useInterval';
import { Heading, SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import theme from '~/styles/theme';

const LoadingDoneScene = () => {
  const setPageStep = useSetAtom(pageStepAtom);

  useInterval(() => {
    setPageStep(PAGE_STEPS.main);
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
