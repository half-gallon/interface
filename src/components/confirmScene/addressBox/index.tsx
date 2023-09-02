import { Box, Paper, Typography } from '@mui/material';

import { Label } from '~/layout';

interface AddressBoxProps {
  label: string;
  address: string;
}
const AddressBox = ({ label, address }: AddressBoxProps) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Label sx={{ mb: 1 }}>{label}</Label>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          background: 'rgba(68, 101, 218, 0.10)',
        }}
      >
        <Typography
          sx={{
            color: '#7A7A7A',
          }}
        >
          {address}
        </Typography>
      </Paper>
    </Box>
  );
};
export default AddressBox;
AddressBox;
