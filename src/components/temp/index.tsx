import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useAtom } from 'jotai';

import { SceneLayout } from '~/layout';
import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const RegistrationScene = () => {
  return (
    <SceneLayout>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar>
          <PersonIcon />
        </Avatar>
        <Button variant="contained">voice registration</Button>
        <Button>send</Button>
      </Box>
    </SceneLayout>
  );
};

export default RegistrationScene;
