import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';

import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';

interface SceneHeaderProps {
  title: string;
  backTo?: PAGE_STEPS;
}
const SceneHeader = ({ title, backTo }: SceneHeaderProps) => {
  const setPageStep = useSetAtom(pageStepAtom);

  const handleClickBack = () => {
    if (!backTo) return;
    setPageStep(backTo);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        mb: 8,
      }}
    >
      {backTo && (
        <IconButton
          onClick={handleClickBack}
          sx={{
            justifySelf: 'flex-start',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Typography
        sx={{
          fontSize: '1rem',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SceneHeader;
