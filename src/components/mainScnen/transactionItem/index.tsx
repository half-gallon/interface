import { Box, IconButton, Paper, Typography } from "@mui/material"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
interface TransactionItemProps {
  type: 'receive' | 'send'
}
const TransactionItem = ({type}: TransactionItemProps) => {
  return (
    <Paper sx={{
      width: '100%',
      p: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'

    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>

      <Box sx={{mr: 2}}>
      {type === 'receive' ? <FileDownloadIcon /> : <SendRoundedIcon />}
      </Box>
      <Box>
        <Typography>
          {type === 'receive'? 'Received' : 'Sent' }
        </Typography>
        <Typography>
          {'100000 USDC'}
        </Typography>
      </Box>
      </Box>

      <IconButton href='https://etherscan.io/' target="_blank">
        <OpenInNewRoundedIcon />
      </IconButton>
    

    </Paper>
  )
}

export default TransactionItem