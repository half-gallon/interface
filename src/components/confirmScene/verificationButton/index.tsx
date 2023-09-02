import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';

interface VerificationButtonProps {
  label: string;
  isVerified?: boolean;
  onClick?: () => void;
}
const VerificationButton = ({
  label,
  onClick,
  isVerified,
}: VerificationButtonProps) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      onClick={onClick}
    >
      {label}
      {isVerified && <CheckCircleIcon />}
    </Button>
  );
};

export default VerificationButton;
