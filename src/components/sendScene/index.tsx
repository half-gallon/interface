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
  SvgIcon,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useSetAtom } from 'jotai';
import Image from 'next/image';

import SceneHeader from '../sceneHeader';

import AccountItem from './accountItem';
import UsdcPng from './usdc.png';
import { Label, SceneLayout, SubHeading } from '~/layout';
import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import theme from '~/styles/theme';

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
    <SceneLayout sx={{
      position: 'relative',
    }}>
      <SceneHeader title="You are sending" backTo={PAGE_STEPS.main} />

      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme.palette.primary.main,
          }}
        >
          <Label>Send to</Label>
          <CancelButton onClick={handleClickSendCancel}>Cancel</CancelButton>
        </Box>
        <TextField
          variant="filled"
          sx={{
            width: '100%',
          }}
          placeholder="Address"
        />

        <Divider variant="middle" sx={{
          my: '24px',
          mx: 0,
          background: theme.palette.primary.main,
        }} />

        <Box sx={{  mb: '24px' }}>
          <Label
            sx={{
              mb: '12px',
            }}
          >
            Currency
          </Label>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 4,
              border: '1px solid var(--primary, #4465DA)',
              background: 'rgba(255, 255, 255, 0.20)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src={UsdcPng} width={34} height={34} alt="usdc" style={{marginRight: '12px'}}/>
              <Box>
                <SubHeading>USDC</SubHeading>
                {/* todo balance */}
                <Typography sx={{
                  color: 'var(--primary, #4465DA)',
                  fontSize: '15px',
                  fontWeight: '400',
                }}>1000 USDC available</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box sx={{mb: '12px'}}>
          <Label sx={{mb: '8px'}}>Amount</Label>
          <Paper
            
            component="form"
            sx={{
              px: 1,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              background: 'rgba(68, 101, 218, 0.10)',

            }}
          >
            <Button color="primary" variant="contained" size="small">
              Max
            </Button>

            <InputBase
              sx={{ 
                ml: 1,
                 flex: 1,
                  textAlign: 'right',
                   fontSize: '40px',
                fontWeight: '700',
                '&:placeholder': {
                  fontSize: '1rem',
                }
               }}
              style={{ textAlign: 'right' }}
              placeholder="0"
              endAdornment={
                <InputAdornment position="end">
                  <Typography 
                     sx={{
                      color: 'var(--primary, #4465DA)',
                      fontSize: '40px',
                      fontWeight: '700',
    

                  }}>

                  USDC
                  </Typography>
                </InputAdornment>
              }
            />
          </Paper>
        </Box>

        <Typography align='center' sx={{
          fontSsize: '18px',
          fontWeight: '600',
          color: 'var(--primary, #4465DA)',
        }}>
          
          In case of transaction over 1,000 USDC,<br />
          Voice Verification is needed
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mt: 2, position:'absolute', width:'100%', bottom: 0, right: 0, left: 0 }}>
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

const CancelButton = styled(Button)`
  color: var(--primary-main, #2196f3);
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Hanken Grotesk;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 70.588% */
  letter-spacing: 0.15px;

  text-transform: capitalize !important;
  .MuiButton-contained {
  }
`;

export default SendScene;
