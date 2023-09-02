import React, { useState } from 'react';

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
import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';

import SceneHeader from '../sceneHeader';

import AccountItem from './accountItem';
import { Label, SceneLayout, SubHeading } from '~/layout';
import { pageStepAtom, sendAmountAtom, toAddressAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import theme from '~/styles/theme';
import { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';

const SendScene = () => {
  const {address} = useAccount();
  const [sendToAddress, setSendToAddress] = useAtom(toAddressAtom);
  const [sendAmount, setSendAmount] = useAtom(sendAmountAtom);
  const setPageStep = useSetAtom(pageStepAtom);

  const handleChangeInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setSendToAddress(e.target.value as Address);
  };
  const handleChangeAmount = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setSendAmount(e.target.value);
  };

  const handleClickBack = () => {
    // setSendToAddress(undefined);
    setSendAmount('');
    setPageStep(PAGE_STEPS.main);
  };

  const handleClickSendCancel = () => {
    setPageStep(PAGE_STEPS.main);
  };

  const handleClickConfirmRequest = () => {
    setPageStep(PAGE_STEPS.confirm);
  };

  const { data } = useBalance({
    address,
    token: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    chainId: 31337,
    watch: true,

  });

  const handleClickMax = () => {
    if(data) {
      setSendAmount(data.formatted)
    } else {
      setSendAmount('0')

    }
  }

  console.info({data});

  const isNextDisabled = !sendToAddress || !sendAmount;

  return (
    <SceneLayout
      sx={{
        position: 'relative',
      }}
    >
      <SceneHeader title="You are sending" backTo={PAGE_STEPS.main} />

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
        value={sendToAddress}
        onChange={handleChangeInput}
      />

      <Divider
        variant="middle"
        sx={{
          my: '24px',
          mx: 0,
          background: theme.palette.primary.main,
        }}
      />

      <Box sx={{ mb: '24px' }}>
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
            <Box>
              <SubHeading>$YAHO</SubHeading>
              {/* todo balance */}
              <Typography
                sx={{
                  color: 'var(--primary, #4465DA)',
                  fontSize: '15px',
                  fontWeight: '400',
                }}
              >
                {data? data.formatted : '0'} YAHO available
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mb: '12px' }}>
        <Label sx={{ mb: '8px' }}>Amount</Label>
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
          <Button color="primary" variant="contained" size="small" onClick={handleClickMax}>
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
              },
            }}
            style={{ textAlign: 'right' }}
            placeholder="0"
            onChange={handleChangeAmount}
            value={sendAmount}
            endAdornment={
              <InputAdornment position="end">
                <Typography
                  sx={{
                    color: 'var(--primary, #4465DA)',
                    fontSize: '40px',
                    fontWeight: '700',
                  }}
                >
                  YAHO
                </Typography>
              </InputAdornment>
            }
          />
        </Paper>
      </Box>

      <Typography
        align="center"
        sx={{
          fontSsize: '18px',
          fontWeight: '600',
          color: 'var(--primary, #4465DA)',
        }}
      >
        In case of transaction over 1,000 YAHO,
        <br />
        Voice Verification is needed
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
          position: 'absolute',
          width: '100%',
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
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
          disabled={isNextDisabled}
        >
          Next
        </Button>
      </Box>
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
