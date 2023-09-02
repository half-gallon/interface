import { Box, CircularProgress, Typography } from '@mui/material';
import { useAtom } from 'jotai';

import { useInterval } from '~/hooks/useInterval';
import { SceneLayout } from '~/layout';
import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const LoadingScene = () => {
  const [pageStep, setPageStep] = useAtom(pageStepAtom);

  useInterval(() => {
    setPageStep(PAGE_STEPS.registration_done);
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
      <Typography
        sx={{
          mt: 4,
        }}
      >
        Voice Model Training
      </Typography>
    </SceneLayout>
  );
};

export default LoadingScene;
