import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';

import TransactionItem from './transactionItem';
import { SceneLayout } from '~/layout';

const MainScene = () => {
  const [hasBalance, setHasBalance] = useState<boolean>(false);
  const handleGetFaucet = () => {
    setHasBalance(true);
  };
  return (
    <SceneLayout
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        pl: 2,
        pr: 2,
      }}
    >
      <Box
        sx={{
          pt: 10,
          pb: 10,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar
          sx={{
            mb: 2,
          }}
        >
          <PersonIcon />
        </Avatar>
        {hasBalance ? (
          <Typography>1,000 USDC</Typography>
        ) : (
          <Button onClick={handleGetFaucet} size="small">
            Get Test Token
          </Button>
        )}
      </Box>
      <Button variant="contained" disabled={!hasBalance} fullWidth>
        Send
      </Button>

      <Divider
        sx={{
          mt: 1,
          mb: 1,
        }}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography>Activities</Typography>

        <Box
          sx={{
            width: '100%',
          }}
        >
          {hasBalance && <TransactionItem type="receive" />}
        </Box>
      </Box>
    </SceneLayout>
  );
};

export default MainScene;
