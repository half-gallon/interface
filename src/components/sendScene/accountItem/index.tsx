import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';

interface AccountItemProps {
  accountName: string;
  address: string;
  onClick?: () => void;
}
const AccountItem = ({ accountName, address, onClick }: AccountItemProps) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
        p: 2,
      }}
    >
      <Avatar>
        <PersonIcon />
      </Avatar>

      <Box
        sx={{
          ml: 2,
        }}
      >
        <Typography>{accountName}</Typography>
        <Typography>{address}</Typography>
      </Box>
    </Button>
  );
};

export default AccountItem;
