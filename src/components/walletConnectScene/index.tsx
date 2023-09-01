import { Box, Button, Typography } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import { SceneLayout } from '~/layout';

const WalletConnectScene = () => {
  const { openConnectModal } = useConnectModal();

  const handleClickConnect = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <SceneLayout
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        component="h1"
        align="center"
        sx={{
          fontSize: '2rem',
        }}
      >
        Moo<strong>AA</strong>ho
      </Typography>

      <Button
        fullWidth
        variant="contained"
        sx={{
          // alignSelf: 'flex-end !important',
          justifySelf: 'flex-end',
        }}
        onClick={handleClickConnect}
        disabled={!openConnectModal}
      >
        connect wallet
      </Button>
    </SceneLayout>
  );
};

export default WalletConnectScene;
