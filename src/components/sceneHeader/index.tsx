import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, IconButton, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';

import { pageStepAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import theme from '~/styles/theme';

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
            alignItems: 'baseline',
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: '12px',
              color: theme.palette.primary.main,
            }}
          />
        </IconButton>
      )}
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '500',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          color: theme.palette.primary.main,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SceneHeader;
