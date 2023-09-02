import { useState } from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useSetAtom } from 'jotai';

import SceneHeader from '../sceneHeader';

import AccountItem from './accountItem';
import { SceneLayout } from '~/layout';
import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

const SendScene = () => {
  const [sendToAddress, setSendToAddress] = useState<string | undefined>();
  const setPageStep = useSetAtom(pageStepAtom);

  const handleClickItem = () => {
    setSendToAddress('0x1234567890');
  };

  const handleClickBack = () => {
    setSendToAddress(undefined);
  };

  const handleClickSendCancel = () => {
    setPageStep(PAGE_STEPS.main);
  };

  const handleClickConfirmRequest = () => {
    setPageStep(PAGE_STEPS.confirm);
  };

  return (
    <SceneLayout>
      <SceneHeader title="You are sending" backTo={PAGE_STEPS.main} />

      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>Send to</Typography>
          <Button onClick={handleClickSendCancel}>Cancel</Button>
        </Box>
        <TextField
          sx={{
            width: '100%',
          }}
          placeholder="address"
        />

        <Divider variant="middle" />

        <Box sx={{ mt: 4, mb: 8 }}>
          <Typography>Currency</Typography>
          <Paper sx={{ p: 2, borderRadius: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ mr: 1 }} />
              <Box>
                <Typography>USDC</Typography>
                <Typography>1000 USDC available</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box>
          <Typography>Amount</Typography>
          <Paper
            component="form"
            sx={{
              px: 1,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button color="primary" variant="contained" size="small">
              Max
            </Button>

            <InputBase
              sx={{ ml: 1, flex: 1, textAlign: 'right' }}
              style={{ textAlign: 'right' }}
              placeholder="input"
              endAdornment={
                <InputAdornment position="end">USDC</InputAdornment>
              }
            />
          </Paper>
        </Box>

        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          In case of transaction over 1,000 USDC, Voice Verification is needed
        </Alert>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClickBack}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickConfirmRequest}
          >
            Next
          </Button>
        </Box>
      </div>
      {/* )} */}
    </SceneLayout>
  );
};
export default SendScene;
