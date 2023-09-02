import { Box, Typography, styled } from '@mui/material';

export const SceneLayout = styled(Box)`
  width: 100%;
  height: calc(100vh - 32px);

  min-height: 667px;
  box-sizing: border-box;
`;

export const Heading = styled(Typography)`
  color: var(--primary, #4465da);
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const SubHeading = styled(Typography)`
  color: var(--primary, #4465da);
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Hanken Grotesk;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 12px; /* 60% */
  letter-spacing: 0.15px;
`;

export const Label = styled(Typography)`
  color: var(--primary-main, #2196f3);
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Hanken Grotesk;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 70.588% */
  letter-spacing: 0.15px;
`;

export const Description = styled(Typography)`
  color: var(--primary, #4465da);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 125% */
`;

export const Numbers = styled(Typography)`
  color: var(--primary, #4465da);
  text-align: right;
  font-family: Darker Grotesque;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
