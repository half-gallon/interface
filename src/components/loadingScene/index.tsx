import { Box, CircularProgress, Typography } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { useInterval } from '~/hooks/useInterval';
import { Heading, SceneLayout } from '~/layout';
import { isVoiceOnboardingDoneAtom, isVoiceVerifiedAtom, pageStepAtom, proofAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import { useContractRead, useNetwork } from 'wagmi'
import { VERIFIER_ABI } from '~/abi';
import { Verifier } from '~/constants';
import { useEffect } from 'react';


const LoadingScene = () => {
  const proof = useAtomValue(proofAtom);
  const [pageStep, setPageStep] = useAtom(pageStepAtom);
  const setIsVoiceOnboardingDone = useSetAtom(isVoiceOnboardingDoneAtom);
  const setIsVoiceVerified = useSetAtom(isVoiceVerifiedAtom);
  const {chain} = useNetwork();;

  const { data, isError, isLoading }  = useContractRead({
    abi: VERIFIER_ABI,
    chainId: chain ? chain.id: 31337,
    address: Verifier[chain ? chain.id: 31337],
    functionName: 'verify',
    enabled: chain !== undefined,
    args: [proof],
    watch: true,
  });

  useInterval(() => {
    if(pageStep === PAGE_STEPS.voiceVerification_pending) {
      setPageStep(PAGE_STEPS.voiceVerification_done);
      setIsVoiceVerified(true);
    }
    if(pageStep === PAGE_STEPS.registration_pending) {
      setPageStep(PAGE_STEPS.registration_done);
      setIsVoiceOnboardingDone(true);
    }
  }, 4000);


  // useEffect(() => {
  //   if(data === true) {
      
  //     if(pageStep === PAGE_STEPS.voiceVerification_pending) {
  //       setPageStep(PAGE_STEPS.registration_done);
  //       setIsVoiceVerified(true);
  //     }
  //     if(pageStep === PAGE_STEPS.registration_pending) {
  //       setPageStep(PAGE_STEPS.registration_done);
  //       setIsVoiceOnboardingDone(true);
  //     }
  //   }
  // }, [data, setPageStep, setIsVoiceOnboardingDone,setIsVoiceVerified, pageStep])


  return (
    <SceneLayout
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      <Heading
        sx={{
          mt: 4,
        }}
      >
        Voice Model Training
      </Heading>
    </SceneLayout>
  );
};

export default LoadingScene;
