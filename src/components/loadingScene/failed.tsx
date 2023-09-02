import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';

import { useInterval } from '~/hooks/useInterval';
import { Heading, SceneLayout } from '~/layout';
import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import theme from '~/styles/theme';

const LoadingFailedScene = () => {
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
            color: theme.palette.error.main,
          }}
        />
      </Box>
      <Heading
        sx={{
          mt: 4,
          color: theme.palette.error.main,
        }}
      >
        Voice Authentication Failed
      </Heading>
    </SceneLayout>
  );
};

export default LoadingFailedScene;
