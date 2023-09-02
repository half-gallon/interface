import { Box, Paper, Typography } from '@mui/material';

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
      <Typography sx={{ mb: 1 }}>{label}</Typography>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography>{address}</Typography>
      </Paper>
    </Box>
  );
};
export default AddressBox;
AddressBox;
