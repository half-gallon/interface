import { Box, Button } from "@mui/material";
import { useSetAtom } from "jotai";
import { pageStepAtom } from "~/state";
import { PAGE_STEPS } from "~/state/types";

const TestBox = () => {
  const setPageStep = useSetAtom(pageStepAtom);
  const handleChange =(page: PAGE_STEPS) => {
    setPageStep(page);
  }
  return (

    <Box sx={{
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',  
      bottom: 0,
      right: 0,
    }}>
      <Button onClick={() => handleChange(PAGE_STEPS.walletConnect)}>walletConnect</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.registration)}>registration</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.registration_pending)}>registration_pending</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.registration_done)}>registration_done</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.registration_failed)}>registration_failed</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.voiceVerification)}>voiceVerification</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.main)}>main</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.send)}>send</Button>
      <Button onClick={() => handleChange(PAGE_STEPS.confirm)}>confirm</Button>
    </Box>
  )
}

export default TestBox;